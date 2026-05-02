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

    const user = req.user as user;

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
    const user = req.user as user;

    if (!user) {
      throw new Error("User not authenticated");
    }

    const result = await bookingsService.getBookings(user);

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

const getSingleBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;

    const result = await bookingsService.getSingleBookings(id as string);
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

const updateBookingStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;
    const user = req.user as user;

    const result = await bookingsService.updateBookingStatus(id, status, user);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Booking status updated successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const bookingsController = {
  createBookings,
  getBookings,
  getSingleBookings,
  updateBookingStatus
};
