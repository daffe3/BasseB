import { NextRequest, NextResponse } from 'next/server';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const APP_TIMEZONE = 'Europe/Stockholm';
const COUNTRY_CODE = 'SE';

const cachedHolidays: { [year: string]: dayjs.Dayjs[] } = {};
const lastFetchTime: { [year: string]: number } = {};
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  try {
    const currentYear = dayjs().tz(APP_TIMEZONE).year();
    const nextYear = currentYear + 1;

    let allHolidays: dayjs.Dayjs[] = [];

    for (const year of [currentYear, nextYear]) {
      if (cachedHolidays[year] && (Date.now() - lastFetchTime[year] < CACHE_DURATION_MS)) {
        allHolidays = allHolidays.concat(cachedHolidays[year]);
        console.log(`Fetched holidays for ${year} from cache.`);
      } else {
        console.log(`Fetching holidays for ${year} from Nager.Date API...`);
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${COUNTRY_CODE}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch holidays for ${year} from external API: ${response.statusText}`);
        }

        const data = await response.json();
        const yearHolidays = data.map((holiday: any) => dayjs(holiday.date).tz(APP_TIMEZONE));

        cachedHolidays[year] = yearHolidays;
        lastFetchTime[year] = Date.now();
        allHolidays = allHolidays.concat(yearHolidays);
        console.log(`Successfully fetched and cached holidays for ${year}.`);
      }
    }

    const serializableHolidays = allHolidays.map(d => d.toISOString());

    return NextResponse.json(serializableHolidays, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching public holidays:', error);
    return NextResponse.json({ message: 'Failed to retrieve public holidays', error: error.message }, { status: 500 });
  }
}