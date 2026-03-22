import express from "express";
import { bookingsController } from "./bookings.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// create new bookings
router.post("/bookings", auth(), bookingsController.createBookings);

// get users bookings
router.get("/bookings", auth(), bookingsController.getBookings);

export const bookingsRoutes = router;
