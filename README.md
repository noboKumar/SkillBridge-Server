# SkillBridge Backend ⚙️
**"The Robust Engine Powering Expert Tutoring"**

[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.0-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7.0-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 🌟 Overview

The **SkillBridge Backend** is a scalable RESTful API built to handle tutor-student matchmaking, complex scheduling, and role-based authentication. It leverages the power of Prisma and PostgreSQL to ensure data integrity and high performance.

---

## 🚀 Core Features

- **RBAC (Role-Based Access Control):** Granular permissions for Students, Tutors, and Admins.
- **Transactional Bookings:** Ensures atomicity when booking slots (updates booking and slot status simultaneously).
- **Advanced Filtering:** Query engine for tutors based on categories, price ranges, and ratings.
- **Secure Authentication:** JWT-based stateless authentication with password hashing via Bcrypt.
- **Type Safety:** Full TypeScript implementation from models to controllers.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT, BcryptJS
- **Validation:** Zod
- **API Documentation:** REST Architecture

---

## ⚙️ Setup & Installation

### **Prerequisites**
- Node.js (v18+)
- PostgreSQL instance (Local or Managed)

### **Local Setup**

1. **Clone & Install:**
   ```bash
   git clone https://github.com/noboKumar/SkillBridge-backend.git
   cd skillbridge-backend
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/skillbridge_db"
   JWT_SECRET="your_jwt_secret_key"
   PORT=5000
   ```

3. **Database Migration:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

4. **Seed Data (Optional):**
   ```bash
   npm run seed
   ```

5. **Start Server:**
   ```bash
   npm run dev
   ```

---

## 🛣️ API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Authenticate user

### **Tutors**
- `GET /api/tutors` - Fetch all tutors (with filters)
- `GET /api/tutors/featured` - Get top-rated tutors
- `GET /api/tutors/:id` - Get tutor profile details

### **Bookings**
- `POST /api/bookings` - Create new session booking
- `GET /api/bookings` - Get user-specific bookings
- `PATCH /api/bookings/:id` - Update booking status (Cancel/Complete)

### **Admin**
- `GET /api/admin/users` - View all users
- `PATCH /api/admin/users/:id` - Manage user status (Ban/Unban)

---

## 📂 Project Structure

```text
src/
├── modules/         # Feature-based modules (Auth, Bookings, Tutors, etc.)
│   ├── controller.ts
│   ├── service.ts
│   └── routes.ts
├── lib/             # Third-party library initializations (Prisma)
├── middlewares/     # Auth, Global Error, Not Found handlers
├── types/           # TypeScript interfaces/types
└── server.ts        # Entry point
```

---

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [Nobo Kumar](https://github.com/noboKumar)
