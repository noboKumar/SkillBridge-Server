import express from "express";
import { tutorsController } from "./tutors.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// get all teacher
router.get("/tutors", tutorsController.getAllTutors);

// get featured teachers
router.get("/tutors/featured", tutorsController.getFeaturedTutors);

// get all categories
router.get("/categories", tutorsController.getAllCategories);

// post categories
router.post("/categories", auth(), tutorsController.postCategories);

// Static routes MUST come before dynamic /:id routes to avoid route conflicts
// update availability
router.put("/tutors/availability", auth(), tutorsController.updateAvailability);

// get my tutor profile (authenticated tutor only)
router.get("/tutors/me", auth(), tutorsController.getMyProfile);

// get single teacher by profile ID
router.get("/tutors/:id", tutorsController.getSingleTutor);

// update tutor profile
router.put("/tutors/:id", auth(), tutorsController.updateTutorProfile);

export const tutorRoutes = router;
