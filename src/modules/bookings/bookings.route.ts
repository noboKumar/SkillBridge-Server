import express from "express";
import { bookingsController } from "./bookings.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// create new bookings
router.post("/bookings", auth(), bookingsController.createBookings);

export const bookingsRoutes = router;
