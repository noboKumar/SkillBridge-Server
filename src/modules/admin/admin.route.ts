import express from "express";
import { adminController } from "./admin.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// get all users
router.get("/users", auth(), adminController.getAllUsers);

// update user status
router.patch("/users/:id", auth(), adminController.updateUserStatus);

export const adminRoutes = router;
