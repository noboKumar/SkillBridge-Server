import express, { Application, Request, Response } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";
import { tutorRoutes } from "./modules/tutors/tutors.route";
import { bookingsRoutes } from "./modules/bookings/bookings.route";
import { reviewRoutes } from "./modules/reviews/reviews.route";
import { adminRoutes } from "./modules/admin/admin.route";

const app: Application = express();

const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter(Boolean) as string[];

// parsers
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// auth
app.use("/api/auth", authRoutes);

// tutors
app.use("/api", tutorRoutes);

// bookings
app.use("/api", bookingsRoutes);

// reviews
app.use("/api", reviewRoutes);

// admin
app.use("/api/admin", adminRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("SkillBridge Server Is Running...");
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: import("express").NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err : undefined,
  });
});

export default app;
