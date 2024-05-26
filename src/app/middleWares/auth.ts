import { NextFunction, Request, Response } from "express";
import { jwtHelpers } from "../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new Error("You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.access_token_secret as Secret
      );
      // console.log(verifiedUser);
      req.user = verifiedUser;
      if (roles.length && !roles.includes(verifiedUser?.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN!");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
