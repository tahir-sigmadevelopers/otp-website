# OTP Verification App

A simple MERN stack application for OTP verification using Twilio.

## Features

- Phone number input
- OTP sending via Twilio SMS
- OTP verification
- OTP resend functionality
- 5-minute OTP expiration

## Tech Stack

- **Frontend**: React.js with Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **SMS Service**: Twilio

## Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── App.jsx         # Main application component
│   └── ...
│
└── server/                 # Express backend
    ├── config/             # Configuration files
    ├── controllers/        # Request handlers
    ├── models/             # Database models
    ├── routes/             # API routes
    ├── .env.example        # Environment variables example
    └── index.js            # Entry point
```

## Setup and Installation

### Prerequisites

- Node.js and npm
- MongoDB (local or Atlas)
- Twilio account (SID, Auth Token, and phone number)

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB URI and Twilio credentials.

5. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

- `POST /api/otp/send`: Send OTP to a phone number
  - Request body: `{ "phoneNumber": "+1234567890" }`

- `POST /api/otp/verify`: Verify OTP
  - Request body: `{ "phoneNumber": "+1234567890", "otp": "123456" }`

## License

MIT 