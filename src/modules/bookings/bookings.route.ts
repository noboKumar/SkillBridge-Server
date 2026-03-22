import express from "express";
import { bookingsController } from "./bookings.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// create new bookings
router.post("/bookings", auth(), bookingsController.createBookings);

// get users bookings
router.get("/bookings", auth(), bookingsController.getBookings);

// get single bookings
router.get("/bookings/:id", auth(), bookingsController.getSingleBookings);

export const bookingsRoutes = router;
