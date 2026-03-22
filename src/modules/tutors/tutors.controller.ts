import { NextFunction, Request, Response } from "express";
import { tutorsService } from "./tutors.service";
import sendResponse from "../../utils/sendResponse";

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

export const tutorsController = {
  getAllTutors,
  getSingleTutor,
  getAllCategories,
};
