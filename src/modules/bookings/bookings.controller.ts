import { NextFunction, Request, Response } from "express";
import { bookingsService } from "./bookings.service";
import sendResponse from "../../utils/sendResponse";
import { user } from "../../types";

const createBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new Error("User not authenticated");
    }

    const user = req.user!;

    const result = await bookingsService.createBookings(req.body, user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bookings created successfully",
      data: result,
    });

    console.log(user);
  } catch (error: any) {
    next(error);
  }
};

const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error("User not authenticated");
    }

    const result = await bookingsService.getBookings(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Bookings fetched successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const bookingsController = {
  createBookings,
  getBookings,
};
