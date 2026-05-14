import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import sendResponse from "../../utils/sendResponse";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const createPaymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { amount, currency = "usd", bookingId } = req.body;

    if (!amount || amount <= 0) {
      res.status(400).json({ success: false, message: "Invalid amount" });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: {
        bookingId: bookingId || "",
      },
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Payment intent created",
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const paymentController = {
  createPaymentIntent,
};
