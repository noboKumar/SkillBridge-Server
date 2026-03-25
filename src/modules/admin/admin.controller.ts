import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import sendResponse from "../../utils/sendResponse";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.user;
    if (user?.role !== "ADMIN") {
      sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden",
      });
    }
    const result = await adminService.getAllUsers();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const adminController = {
  getAllUsers,
};
