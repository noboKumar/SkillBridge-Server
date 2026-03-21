import express from "express";
import { authController } from "./auth.controller";
import auth from "../../middlewares/auth";

const router = express.Router();
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", auth(), authController.getCurrentUser);

export const authRoutes = router;
