import express from "express";
import { tutorsController } from "./tutors.controller";

const router = express.Router();

// get all teacher
router.get("/tutors", tutorsController.getAllTutors);

// get single teacher
router.get("/tutors/:id", tutorsController.getSingleTutor);

export const tutorRoutes = router;
