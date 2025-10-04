# Environment Variables Setup

This document explains how to set up the environment variables required for the MLSA CIT website to function properly.

## Required Environment Variables

Create a `.env.local` file in the root directory of the project with the following variables:

```env
# Google Service Account Credentials
GOOGLE_PROJECT_ID=your-google-project-id
GOOGLE_PRIVATE_KEY_ID=your-private-key-id
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
GOOGLE_TOKEN_URI=https://oauth2.googleapis.com/token
GOOGLE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
GOOGLE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/your-service-account-email%40your-project.iam.gserviceaccount.com

# Google Sheets IDs
NEXT_PUBLIC_GOOGLE_ATTENDANCE_SHEET_ID=your-google-sheet-id-for-attendance
NEXT_PUBLIC_GOOGLE_RECRUITMENT_SHEET_ID=your-google-sheet-id-for-recruitment
```

## Setting up Google Sheets Integration

1. Create a Google Cloud Project
2. Enable the Google Sheets API
3. Create a Service Account
4. Download the JSON credentials file
5. Share your Google Sheets with the service account email
6. Set up the environment variables with the values from the credentials file

## Google Sheets Structure

### Recruitment Sheet
The recruitment form data will be saved to a sheet named "Recruitment" with the following columns:
- Timestamp
- Name
- USN
- Branch
- Semester
- Official Email
- Phone Number
- Teams Interested In
- Motivation & Contribution
- Collaboration Experience
- Creative Idea
- Team Interest & Strengths

### Registration Sheet
The event registration form data will be saved to a sheet named "RegistrationActive" with the following columns:
- Timestamp
- Name
- Email
- USN
- Branch
- Semester
- Section
- College

## Testing the Forms

After setting up the environment variables:

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to http://localhost:3000/recruitment to access the recruitment form
3. Navigate to http://localhost:3000/registration-form to access the event registration form

Both forms should now be functional and save data to the respective Google Sheets.