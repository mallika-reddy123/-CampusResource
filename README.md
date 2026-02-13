# Smart Campus Management & Predictive Analytics Platform

A full-stack MERN application for managing campus resources with smart booking, conflict detection, and predictive analytics.

## 🚀 Features

### Core Features

- **JWT Authentication** - Secure user authentication with bcrypt password hashing
- **Smart Booking System** - Book resources with real-time conflict detection
- **Alternate Resource Suggestions** - Get suggestions when a resource is unavailable
- **Predictive Analytics** - Peak hours, usage trends, and resource utilization insights
- **QR Code Booking** - Quick booking via QR code scanning
- **Dark/Light Theme** - Beautiful UI with theme toggle
- **Role-Based Access** - Student, Faculty, and Admin roles

### Smart Features

- ✅ Conflict Prevention System - Detects overlapping bookings
- ✅ Live Availability Indicators
- ✅ Alternative Resource Engine
- ✅ Peak Hour Analytics
- ✅ Utilization Tracking
- ✅ Real-time Dashboard with Charts

## 🛠️ Tech Stack

### Backend

- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

### Frontend

- React 18
- React Router v6
- Tailwind CSS
- Recharts for data visualization
- Axios for API calls
- React Icons
- React Hot Toast

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Environment variables are already configured in `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://Mallika:Mallika06@mongodbdemo.7scmwpr.mongodb.net/campusresource?retryWrites=true&w=majority&appName=Mongodbdemo
JWT_SECRET=your_super_secure_jwt_secret_key_change_in_production_2026
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Seed the database with sample resources:

```bash
node seed.js
```

5. Start the backend server:

```bash
npm run dev
```

Backend will run on: `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Environment variables are already configured in `.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:

```bash
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 🎯 Usage

### Getting Started

1. **Create an Account**
   - Navigate to `http://localhost:3000`
   - Click "Sign up"
   - Fill in your details and select your role (Student/Faculty/Admin)

2. **Explore Dashboard**
   - View booking statistics and trends
   - See peak hours and popular resources

3. **Browse Resources**
   - Go to Resources page
   - Filter by type or search
   - View available facilities

4. **Make a Booking**
   - Click "Book Now" on any resource
   - Select date and time
   - System will detect conflicts and suggest alternatives
   - Confirm your booking

5. **View Analytics**
   - Access detailed insights
   - See peak usage hours
   - Identify underutilized resources

### Admin Features

- Add/Edit/Delete resources
- View all bookings
- Access full analytics

## 📁 Project Structure

```
campusresource/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── resourceController.js
│   │   ├── bookingController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── error.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Resource.js
│   │   └── Booking.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── resourceRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── analyticsRoutes.js
│   ├── utils/
│   │   └── jwt.js
│   ├── .env
│   ├── package.json
│   ├── seed.js
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── Sidebar.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── StatCard.jsx
    │   │   ├── ResourceCard.jsx
    │   │   ├── BookingCard.jsx
    │   │   └── LoadingSpinner.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ThemeContext.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Resources.jsx
    │   │   ├── Booking.jsx
    │   │   ├── MyBookings.jsx
    │   │   ├── Analytics.jsx
    │   │   └── QRBooking.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Resources

- `GET /api/resources` - Get all resources
- `GET /api/resources/:id` - Get single resource
- `POST /api/resources` - Create resource (Admin only)
- `PUT /api/resources/:id` - Update resource (Admin only)
- `DELETE /api/resources/:id` - Delete resource (Admin only)

### Bookings

- `POST /api/bookings/create` - Create booking (Protected)
- `GET /api/bookings/user/:userId` - Get user bookings (Protected)
- `GET /api/bookings/all` - Get all bookings (Admin/Faculty)
- `PUT /api/bookings/cancel/:id` - Cancel booking (Protected)
- `POST /api/bookings/check-availability` - Check availability

### Analytics

- `GET /api/analytics/usage` - Get usage analytics (Protected)
- `GET /api/analytics/peak-hours` - Get peak hours (Protected)
- `GET /api/analytics/top-resources` - Get top resources (Protected)
- `GET /api/analytics/underutilized` - Get underutilized resources (Protected)
- `GET /api/analytics/stats` - Get booking stats (Protected)

## 🎨 Design Features

- **Professional SaaS UI** - Inspired by Stripe, Linear, and Notion
- **Smooth Animations** - Fade-in, slide-up effects
- **Responsive Design** - Works on all devices
- **Modern Color Palette** - Blue/Purple gradient theme
- **Glass Morphism Effects** - Soft shadows and cards
- **Dark Mode Support** - Toggle between themes
- **Custom Scrollbars** - Styled for consistency

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes middleware
- Role-based authorization
- Input validation
- XSS protection

## 📊 Analytics Features

- Total bookings tracking
- Active bookings monitoring
- Resource utilization rate
- Peak hours identification
- Most used resources
- Underutilized resources detection
- Booking trends visualization
- Resource type distribution

## 🤝 Contributing

This is a complete production-ready application. Feel free to fork and customize for your needs.

## 📝 License

MIT License - feel free to use this project for learning or production.

## 👨‍💻 Author

Built with ❤️ for Smart Campus Management

---

**Note:** Database is already seeded with 12 sample resources including classrooms, labs, and sports facilities.
