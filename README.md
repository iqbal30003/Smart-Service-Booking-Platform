## Smart Service Booking Platform

A full-stack **service booking platform** built for portfolio and recruitment use.  
Users can browse services, view details, and book time slots. Admins can manage services, bookings, and view key business statistics.

---

### 🧩 Features

- **User Features**
  - JWT-based signup/login
  - Browse services and view service details
  - Book services with date & time selection
  - View booking history
  - Edit profile

- **Admin Features**
  - Admin authentication
  - Manage services (Add / Edit / Delete)
  - Manage bookings (Approve / Decline)
  - Dashboard with statistics (users, bookings, revenue simulation, active services)

- **System**
  - REST API with Express
  - MongoDB (MongoDB Atlas) or PostgreSQL
  - Role-based access (user/admin)
  - Centralized logging & error handling
  - API documentation (Swagger or Postman collection)

---

### 🏗️ Tech Stack

- **Frontend**
  - React (Create React App)
  - React Router
  - Axios
  - State: `useState`, `useEffect`, `useReducer`
  - Styling: CSS (TailwindCSS planned)
  - Optional: Chart.js, Toast notifications

- **Backend** (planned)
  - Node.js + Express
  - MongoDB (Mongoose) or PostgreSQL
  - JSON Web Tokens (JWT)
  - Deployed on Railway

---

### 🚀 Getting Started

#### Prerequisites

- Node.js (LTS)
- npm
- Git

#### Frontend (client)

```bash
git clone https://github.com/iqbal30003/Smart-Service-Booking-Platform.git
cd "Smart-Service-Booking-Platform"

cd client
npm install
npm start
```

The app will start on `http://localhost:3000`.

#### Backend (server) – coming soon

The backend will be added under a `server` directory with its own setup instructions.

---

### 📁 Project Structure

```text
.
├── client/          # React frontend (Create React App)
├── server/          # Express backend (planned)
└── README.md        # Project overview and setup instructions
```

---

### 💼 For Recruiters

This project is designed to demonstrate:

- **Full-stack architecture** (frontend, backend, database, deployment)
- **Clean code and separation of concerns**
- **Modern React patterns** (routing, state, API calls)
- **Authentication & authorization** with JWT
- **Admin dashboards and data visualization** (planned)

If you’d like to review specific parts (e.g. auth, booking flow, or admin dashboard), see the corresponding folders under `client/src` and `server/src` (once the backend is added).
