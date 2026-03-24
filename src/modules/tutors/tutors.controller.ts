import { NextFunction, Request, Response } from "express";
import { tutorsService } from "./tutors.service";
import sendResponse from "../../utils/sendResponse";
import { th } from "zod/v4/locales";

const getAllTutors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await tutorsService.getAllTutors();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tutors retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getSingleTutor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await tutorsService.getSingleTutor(req.params?.id as string);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tutor retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await tutorsService.getAllCategories();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Categories retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateTutorProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const userId = user?.id as string;

    if (user?.role !== "TUTOR") {
      throw new Error("Unauthorized");
    }

    const result = await tutorsService.updateTutorProfile(req.body, userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Tutor profile updated successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const updateAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    const userId = user?.id as string;
    const result = await tutorsService.updateAvailability(req.body, userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Availability updated successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const tutorsController = {
  getAllTutors,
  getSingleTutor,
  getAllCategories,
  updateTutorProfile,
  updateAvailability,
};
