import express from "express";
import { paymentController } from "./payment.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/payment/create-payment-intent",
  auth("STUDENT"),
  paymentController.createPaymentIntent,
);

export const paymentRoutes = router;
