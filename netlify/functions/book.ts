import type { Handler } from '@netlify/functions';
import { google } from 'googleapis';

const REQUIRED_ENV = [
  'GOOGLE_CLIENT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
  'GOOGLE_CALENDAR_ID',
];

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

type BookingPayload = {
  fullName?: string;
  phone?: string;
  date?: string;
  durationMinutes?: number;
};

const getMissingEnv = () => REQUIRED_ENV.filter((key) => !process.env[key]);

const createCalendarClient = () => {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_CLIENT_EMAIL,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });

  return google.calendar({ version: 'v3', auth });
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const missingEnv = getMissingEnv();
  if (missingEnv.length) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: `Не хватает переменных окружения: ${missingEnv.join(', ')}` }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}') as BookingPayload;
    const { fullName, phone, date, durationMinutes = 15 } = payload;

    if (!fullName?.trim() || !phone?.trim() || !date) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Нужно передать ФИО, телефон и дату записи.' }),
      };
    }

    const start = new Date(date);
    if (Number.isNaN(start.getTime())) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Некорректная дата записи.' }),
      };
    }

    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);
    const calendar = createCalendarClient();

    const createdEvent = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      requestBody: {
        summary: `Запись: ${fullName}`,
        description: [`Клиент: ${fullName}`, `Телефон: ${phone}`, 'Источник: сайт Бронзы'].join('\n'),
        start: {
          dateTime: start.toISOString(),
          timeZone: 'Asia/Yekaterinburg',
        },
        end: {
          dateTime: end.toISOString(),
          timeZone: 'Asia/Yekaterinburg',
        },
      },
    });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        ok: true,
        eventId: createdEvent.data.id,
        htmlLink: createdEvent.data.htmlLink,
      }),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Не удалось создать запись в календаре.';

    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: message }),
    };
  }
};
