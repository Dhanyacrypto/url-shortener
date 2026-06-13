# URLForge - Smart URL Shortener

## Overview

URLForge is a modern URL shortening platform built using the MERN stack. It allows users to shorten long URLs, create custom aliases, generate QR codes, track analytics, and manage all links through an interactive dashboard.

---

## Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes

### URL Management

* Create Short URLs
* Custom Alias Support
* Delete URLs
* Redirect to Original URL

### Analytics

* Click Tracking
* Total Click Count
* Last Visited Time
* Recent Visit History
* Top Performing URL
* Performance Chart

### Extra Features

* QR Code Generation
* QR Code Download
* URL Search
* Responsive UI
* Dark Glassmorphism Theme

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Recharts
* QRCode React
* React Icons

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Tokens)
* bcryptjs

---

## System Architecture

![System Architecture](./screenshots/architecture.png)

The URLForge application follows a MERN Stack architecture. The React frontend communicates with the Express.js backend through REST APIs. The backend handles authentication, URL shortening, custom aliases, analytics tracking, QR code generation, and database operations. MongoDB Atlas is used for storing users, URLs, and analytics data.

---

## Screenshots

### Login Page

![Login Page](./screenshots/login.png)

Modern glassmorphism-based login interface with secure authentication.

### Register Page

![Register Page](./screenshots/register.png)

User registration page with form validation and responsive design.

### Dashboard

![Dashboard](./screenshots/dashboard.png)

Centralized dashboard for creating short URLs, managing links, searching URLs, viewing top performers, and accessing analytics.

### Analytics Page

![Analytics](./screenshots/analytics.png)

Displays click statistics, recent visits, and URL performance insights.

### QR Code Feature

![QR Code](./screenshots/qr.png)

Generate and download QR codes for shortened URLs, making sharing easier across devices.

---

## Project Structure

```text
url-shortener/
├── backend/
├── frontend/
├── screenshots/
│   ├── architecture.png
│   ├── login.png
│   ├── register.png
│   ├── dashboard.png
│   ├── analytics.png
│   └── qr.png
└── README.md
```

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Future Enhancements

* URL Expiry
* User Profile Dashboard
* Advanced Analytics
* Link Sharing
* Export Analytics Reports

---

## Author

**Dhanya V**

B.Tech – Artificial Intelligence and Data Science

Dr. N.G.P Institute of Technology
