import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const secret = config.jwt_secret;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(
        token as string,
        secret as string,
      ) as JwtPayload;

      req.user = decoded;

      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return next(new Error("Forbidden"));
      }

      next();
    } catch (error: any) {
      next(error);
    }
  };
};
export default auth;
