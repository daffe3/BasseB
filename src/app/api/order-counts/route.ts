import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin'; 
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const APP_TIMEZONE = 'Europe/Stockholm';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateString = searchParams.get('date');

    if (!dateString) {
      return NextResponse.json({ message: 'Date parameter is required' }, { status: 400 });
    }

    const targetDate = dayjs(dateString).tz(APP_TIMEZONE);
    const startOfDay = targetDate.startOf('day').toDate();
    const endOfDay = targetDate.endOf('day').toDate();

    const ordersRef = adminDb.collection('lunch_orders'); 
    const q = ordersRef.where('orderDate', '>=', startOfDay).where('orderDate', '<=', endOfDay); 

    const querySnapshot = await q.get(); 
    const currentOrders = querySnapshot.size;

    return NextResponse.json({ date: dateString, count: currentOrders }, { status: 200 });

  } catch (error) {
    console.error('Error fetching daily order count:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}