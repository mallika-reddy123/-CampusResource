# 🚀 Quick Start Guide

Follow these steps to run the Smart Campus Management Platform:

## Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

## Step 2: Seed the Database

```bash
node seed.js
```

This will populate your database with 12 sample resources (classrooms, labs, sports facilities).

## Step 3: Start Backend Server

```bash
npm run dev
```

Backend will run on: **http://localhost:5000**

## Step 4: Install Frontend Dependencies (New Terminal)

Open a new terminal window:

```bash
cd frontend
npm install
```

## Step 5: Start Frontend

```bash
npm run dev
```

Frontend will run on: **http://localhost:3000**

## Step 6: Access the Application

Open your browser and navigate to: **http://localhost:3000**

## Step 7: Create an Account

1. Click "Sign up"
2. Fill in your details:
   - Name: Your Full Name
   - Email: your@email.com
   - Password: (minimum 6 characters)
   - Role: Choose Student, Faculty, or Admin

3. Click "Create Account"

## Step 8: Start Exploring!

✅ **Dashboard** - View statistics and trends
✅ **Resources** - Browse 12 pre-loaded resources
✅ **Book Now** - Make a booking with smart conflict detection
✅ **My Bookings** - View and manage your reservations
✅ **Analytics** - Explore usage patterns and insights

---

## Features to Test

### 1. Smart Booking with Conflict Detection

- Go to Resources → Click "Book Now" on any resource
- Try booking the same resource at overlapping times
- System will detect conflict and suggest alternatives

### 2. QR Code Booking

- Access: `http://localhost:3000/book/resource/{resourceId}`
- Replace {resourceId} with any resource ID from the database
- Quick booking interface

### 3. Analytics Dashboard

- View peak hours
- See most used resources
- Identify underutilized facilities
- Interactive charts and graphs

### 4. Dark/Light Theme

- Toggle theme using the moon/sun icon in the navbar

### 5. Search and Filter

- Filter resources by type (Classroom, Lab, Sports)
- Search by name or description

---

## Default Resources Seeded

After running `node seed.js`, you'll have:

**Classrooms (4):**

- Lecture Hall A101 (100 capacity)
- Seminar Room C302 (30 capacity)
- Lecture Hall A203 (150 capacity)
- Meeting Room F101 (20 capacity)

**Labs (4):**

- Computer Lab B205 (50 capacity)
- Chemistry Lab D104 (40 capacity)
- Physics Lab E301 (35 capacity)
- Biology Lab G202 (45 capacity)

**Sports (4):**

- Basketball Court (20 capacity)
- Tennis Court (4 capacity)
- Swimming Pool (30 capacity)
- Badminton Court (8 capacity)

---

## Troubleshooting

### Backend won't start?

- Check if MongoDB connection string is correct in `backend/.env`
- Make sure MongoDB Atlas is accessible

### Frontend won't connect to backend?

- Ensure backend is running on port 5000
- Check `frontend/.env` has correct API URL

### Port already in use?

- Backend: Change PORT in `backend/.env`
- Frontend: Vite will prompt you to use another port

---

## Admin Features

To test admin features, create an account with role "admin":

- Add/Edit/Delete resources
- View all bookings from all users
- Access full analytics

---

## Need Help?

Check the main README.md for detailed documentation and API endpoints.

Happy testing! 🎉
