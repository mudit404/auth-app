# QuoteKeeper Application

QuoteKeeper is a full-stack web application that allows users to register, login, and save their favorite quotes. The application consists of a Node.js backend with SQLite database and a Next.js frontend.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Database](#database)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

## Overview

QuoteKeeper is a simple but effective application that demonstrates a complete authentication flow with JWT tokens and secure storage of user data. Users can create accounts, login, and save or update their favorite quotes.

## Features

- User registration and authentication
- JWT-based authentication
- Secure password handling
- Personal quote management
- Responsive UI with custom styling
- Persistent sessions with localStorage

## Tech Stack

### Backend
- Node.js
- Express.js
- SQLite (via sqlite3)
- JSON Web Tokens (JWT)
- bcryptjs for password encryption

### Frontend
- Next.js 14
- React 18
- TypeScript
- CSS (custom styling)

## Project Structure

```
quotekeeper/
├── backend/               # Backend application
│   ├── db.js              # Database connection and initialization
│   ├── index.js           # Express server and API routes
│   ├── models/            # Data models
│   │   └── user.model.js  # User model
│   ├── auth.db            # SQLite database file (created at runtime)
│   └── package.json       # Backend dependencies
│
├── frontend/              # Next.js frontend application
│   ├── app/               # Next.js app directory
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page (dashboard)
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── context/           # React context
│   │   └── AuthContext.tsx # Authentication context
│   ├── services/          # API services
│   │   └── api.ts         # API client
│   └── package.json       # Frontend dependencies
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

The server will run on http://localhost:1337 and will automatically create the SQLite database file.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at http://localhost:3000

## API Endpoints

### Authentication

- **POST /api/register**
  - Register a new user
  - Body: `{ name, email, password }`
  - Response: `{ status: 'ok' }` or `{ status: 'error', error: '...' }`

- **POST /api/login**
  - Login with credentials
  - Body: `{ email, password }`
  - Response: `{ status: 'ok', user: 'JWT_TOKEN' }` or `{ status: 'error', error: '...' }`

### Quotes

- **GET /api/quote**
  - Get the user's current quote
  - Headers: `{ 'x-access-token': 'JWT_TOKEN' }`
  - Response: `{ status: 'ok', quote: '...', name: '...' }`

- **POST /api/quote**
  - Update the user's quote
  - Headers: `{ 'x-access-token': 'JWT_TOKEN' }`
  - Body: `{ quote: '...' }`
  - Response: `{ status: 'ok' }` or `{ status: 'error', error: '...' }`

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. When a user logs in, the server generates a token containing the user's information, which is then stored in the browser's localStorage. This token is sent with subsequent requests to authenticate the user.

## Database

The backend uses SQLite, a file-based database that requires no separate database server. The database schema includes:

### Users Table
- `id` - Primary key, auto-incrementing integer
- `name` - User's full name
- `email` - User's email (unique)
- `password` - User's password (stored securely)
- `quote` - User's saved quote

## Screenshots

[Add screenshots of your application here]

## Future Enhancements

- Multiple quotes per user
- Quote categories or tags
- Sharing quotes with other users
- Public profile pages
- Password reset functionality
- Social authentication (Google, Facebook, etc.)
- Dark/light theme toggle