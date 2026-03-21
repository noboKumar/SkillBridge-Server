import { NextFunction, Request, RequestHandler, Response } from "express";
import { authService } from "./auth.service";

// register user controller
const registerUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

// login user controller
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const authController = {
  registerUser,
  loginUser,
};
