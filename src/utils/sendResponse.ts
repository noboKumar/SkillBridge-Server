import { Response } from "express";
import { TResponse } from "../types";

const sendResponse = <T>(res: Response, payload: TResponse<T>) => {
  const { statusCode, success, message, data } = payload;

  res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default sendResponse;
