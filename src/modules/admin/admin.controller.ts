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

const updateUserStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req?.user;
    if (user?.role !== "ADMIN") {
      sendResponse(res, {
        statusCode: 403,
        success: false,
        message: "Forbidden",
      });
    }
    const userId = req?.params?.id;
    const result = await adminService.updateUserStatus(
      req.body,
      userId as string,
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const adminController = {
  getAllUsers,
  updateUserStatus,
};
