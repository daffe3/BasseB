import { NextRequest, NextResponse } from 'next/server';
import { adminDb, admin } from '@/lib/firebase-admin';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import nodemailer from 'nodemailer';

dayjs.extend(utc);
dayjs.extend(timezone);

const APP_TIMEZONE = 'Europe/Stockholm';
const MAX_DAILY_ORDERS = 40;

let cachedPublicHolidays: dayjs.Dayjs[] = [];
let lastHolidayFetchTimestamp: number = 0;
const HOLIDAY_CACHE_DURATION_MS = 12 * 60 * 60 * 1000;

async function getPublicHolidays(): Promise<dayjs.Dayjs[]> {
  if (cachedPublicHolidays.length > 0 && (Date.now() - lastHolidayFetchTimestamp < HOLIDAY_CACHE_DURATION_MS)) {
    console.log('Fetching public holidays from backend cache.');
    return cachedPublicHolidays;
  }

  try {
    console.log('Fetching public holidays from internal /api/holidays route...');
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/holidays`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch public holidays from internal API: ${response.status} - ${errorText}`);
    }

    const data: string[] = await response.json();
    const fetchedHolidays = data.map(dateStr => dayjs(dateStr).tz(APP_TIMEZONE));

    cachedPublicHolidays = fetchedHolidays;
    lastHolidayFetchTimestamp = Date.now();
    console.log('Successfully fetched and cached public holidays on backend.');
    return fetchedHolidays;
  } catch (error: unknown) {
    console.error('Error fetching public holidays for backend validation:', error);
    let errorMessage = "Could not retrieve public holidays for validation.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new Error(errorMessage);
  }
}

const isPublicHoliday = (date: dayjs.Dayjs): boolean => {
  return cachedPublicHolidays.some(holiday => holiday.isSame(date, 'day'));
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateString = searchParams.get('date');

    if (!dateString) {
      return NextResponse.json({ message: 'Missing date parameter' }, { status: 400 });
    }

    const queryDate = dayjs(dateString).tz(APP_TIMEZONE);
    const startOfDay = queryDate.startOf('day').toDate();
    const endOfDay = queryDate.endOf('day').toDate();

    const ordersRef = adminDb.collection('lunch_orders');
    const q = ordersRef.where('orderDate', '>=', startOfDay).where('orderDate', '<=', endOfDay);

    const querySnapshot = await q.get();
    const count = querySnapshot.size;

    return NextResponse.json({ count }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching daily order count (GET /api/order):', error);
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, lunchOption, quantity, address, orderDate: orderDateString } = await req.json();

    if (!name || !email || !lunchOption || !quantity || !address || !orderDateString) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    if (quantity <= 0) {
      return NextResponse.json({ message: 'Quantity must be positive' }, { status: 400 });
    }

    const orderDate = dayjs(orderDateString).tz(APP_TIMEZONE);
    const today = dayjs().tz(APP_TIMEZONE);

    if (orderDate.isBefore(today.add(1, 'day').startOf('day'))) {
      return NextResponse.json({ message: 'Orders can only be placed for tomorrow or later.' }, { status: 400 });
    }

    try {
      await getPublicHolidays();
    } catch (holidayError: unknown) {
      console.error('Error in POST: Failed to fetch public holidays:', holidayError);
      let errorMessage = "Failed to validate order date against public holidays.";
      if (holidayError instanceof Error) {
        errorMessage = holidayError.message;
      }
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }

    if (orderDate.day() === 0 || orderDate.day() === 6) {
      return NextResponse.json({ message: 'Orders cannot be placed on weekends.' }, { status: 400 });
    }

    if (isPublicHoliday(orderDate)) {
      return NextResponse.json({ message: 'Orders cannot be placed on public holidays.' }, { status: 400 });
    }

    const ordersRef = adminDb.collection('lunch_orders');
    const startOfDay = orderDate.startOf('day').toDate();
    const endOfDay = orderDate.endOf('day').toDate();

    const q = ordersRef.where('orderDate', '>=', startOfDay).where('orderDate', '<=', endOfDay);

    let currentOrdersForDate = 0;
    try {
      const querySnapshot = await q.get();
      currentOrdersForDate = querySnapshot.size;
      console.log(`Current orders for ${orderDate.format('YYYY-MM-DD')}: ${currentOrdersForDate}`);
    } catch (firestoreGetError: unknown) {
      console.error('Firestore Error: Failed to get current order count:', firestoreGetError);
      return NextResponse.json({ message: 'Failed to retrieve daily order count for validation.' }, { status: 500 });
    }


    if (currentOrdersForDate + quantity > MAX_DAILY_ORDERS) {
      return NextResponse.json(
        { message: `Daily limit of ${MAX_DAILY_ORDERS} for ${orderDate.format('YYYY-MM-DD')} reached. Only ${MAX_DAILY_ORDERS - currentOrdersForDate} spots left.` },
        { status: 400 }
      );
    }

    try {
      await ordersRef.add({
        name,
        email,
        lunchOption,
        quantity,
        address,
        orderDate: admin.firestore.Timestamp.fromDate(orderDate.toDate()),
        timestamp: admin.firestore.Timestamp.now(),
      });
      console.log('Order successfully added to Firebase Firestore.');
    } catch (firebaseAddError: unknown) {
      console.error('Firebase Error: Failed to add order to Firestore:', firebaseAddError);
      let errorMessage = 'Failed to save order to database.';
      if (firebaseAddError instanceof Error) {
        errorMessage = firebaseAddError.message;
      }
      return NextResponse.json({ message: errorMessage }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const ownerMailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO_NOTIFY,
      subject: `New Lunch Order for ${orderDate.format('YYYY-MM-DD')}`,
      html: `
        <p><strong>New Lunch Order Details:</strong></p>
        <ul>
          <li><strong>Customer Name:</strong> ${name}</li>
          <li><strong>Customer Email:</strong> ${email}</li>
          <li><strong>Delivery Address:</strong> ${address}</li>
          <li><strong>Lunch Option:</strong> ${lunchOption}</li>
          <li><strong>Quantity:</strong> ${quantity}</li>
          <li><strong>Order Date:</strong> ${orderDate.format('YYYY-MM-DD')}</li>
          <li><strong>Order Placed On:</strong> ${dayjs().tz(APP_TIMEZONE).format('YYYY-MM-DD HH:mm:ss')}</li>
        </ul>
        <p>Total orders for ${orderDate.format('YYYY-MM-DD')}: ${currentOrdersForDate + quantity} / ${MAX_DAILY_ORDERS}</p>
      `,
    };

    const customerMailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Your Basse Brodd Lunch Order Confirmation for ${orderDate.format('YYYY-MM-DD')}`,
      html: `
        <p>Hello ${name},</p>
        <p>Thank you for your order with Basse Brodd! Here are the details of your lunch delivery:</p>
        <ul>
          <li><strong>Order Date:</strong> ${orderDate.format('YYYY-MM-DD')}</li>
          <li><strong>Lunch Option:</strong> ${lunchOption}</li>
          <li><strong>Quantity:</strong> ${quantity}</li>
          <li><strong>Delivery Address:</strong> ${address}</li>
        </ul>
        <p>We'll deliver your delicious lunch on ${orderDate.format('YYYY-MM-DD')}.</p>
        <p>If you have any questions, please contact us at ${process.env.EMAIL_FROM}.</p>
        <p>Best regards,<br/>The Basse Brodd Team</p>
      `,
    };

    try {
      await transporter.sendMail(ownerMailOptions);
      console.log('Nodemailer: Notification email sent to owner successfully!');
    } catch (ownerEmailError: unknown) {
      console.error('Nodemailer Error: Failed to send owner notification email:', ownerEmailError);
    }

    try {
      await transporter.sendMail(customerMailOptions);
      console.log('Nodemailer: Confirmation email sent to customer successfully!');
    } catch (customerEmailError: unknown) {
      console.error('Nodemailer Error: Failed to send customer confirmation email:', customerEmailError);
    }

    return NextResponse.json({ message: 'Order placed successfully!', currentOrders: currentOrdersForDate + quantity }, { status: 200 });

  } catch (error: unknown) {
    console.error('Critical Error processing lunch order (unhandled exception in POST /api/order):', error);
    let errorMessage = 'Internal Server Error';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}