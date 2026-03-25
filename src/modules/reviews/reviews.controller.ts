import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { reviewService } from "./reviews.service";

const postReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = req.user?.id;
    const result = await reviewService.postReview(
      req.body,
      studentId as string,
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review posted successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const reviewController = {
  postReview,
};
