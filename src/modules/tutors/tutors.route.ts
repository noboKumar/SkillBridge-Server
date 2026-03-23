import express from "express";
import { tutorsController } from "./tutors.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// get all teacher
router.get("/tutors", tutorsController.getAllTutors);

// get single teacher
router.get("/tutors/:id", tutorsController.getSingleTutor);

// get all categories
router.get("/categories", tutorsController.getAllCategories);

// update tutor profile
router.put("/tutors/:id", auth(), tutorsController.updateTutorProfile);

export const tutorRoutes = router;
