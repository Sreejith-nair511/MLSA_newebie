import { google } from 'googleapis';
import { GoogleAuth } from 'google-auth-library';
import { NextResponse } from 'next/server';

export async function POST(req) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
  }

  const auth = new GoogleAuth({
    credentials: {
      type: 'service_account',
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      client_id: process.env.GOOGLE_CLIENT_ID,
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_CERT_URL,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const spreadsheetId = process.env.NEXT_PUBLIC_GOOGLE_RECRUITMENT_SHEET_ID || process.env.NEXT_PUBLIC_GOOGLE_ATTENDANCE_SHEET_ID;
  const formData = await req.json();

  const {
    name, usn, branch, semester, email, phone, teams, motivation, collaboration, creativeIdea, teamInterest
  } = formData;

  try {
    // Check if email already exists
    const existingDataResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Recruitment!F2:F',
    });

    const existingEmails = existingDataResponse.data.values || [];

    const emailAlreadyRegistered = existingEmails.some((row) => row[0] === email);

    if (emailAlreadyRegistered) {
      return NextResponse.json({ message: 'Email already registered' }, { status: 400 });
    }

    // Append data to Google Sheets
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Recruitment!A2:L',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [
          [
            new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
            name,
            usn,
            branch,
            semester,  // Now accepts "3" or "MCA"
            email,
            phone,
            teams,
            motivation,
            collaboration,
            creativeIdea,
            teamInterest
          ],
        ],
      },
    });

    return NextResponse.json({ message: 'Recruitment form submitted successfully!' }, { status: 200 });
  } catch (err) {
    console.error('Error submitting recruitment form:', err);
    return NextResponse.json({ message: err.message || 'Error submitting recruitment form' }, { status: 500 });
  }
}