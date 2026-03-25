import express from "express";
import { reviewController } from "./reviews.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// create reviews
router.post("/reviews", auth(), reviewController.postReview);

export const reviewRoutes = router;
