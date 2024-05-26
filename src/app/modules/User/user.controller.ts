import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const donorList = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await UserService.donorListIntoDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donors successfully found",
    data: result,
  });
});

const getSingleDonor = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {

    const {donorId} = req.params;

    const result = await UserService.getSingleDonorFromDB(donorId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donor retrieved successfully",
      data: result,
    });
  }
);

const getMyProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userData = req.user;
    const result = await UserService.getMyProfileFromDB(userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Profile retrieved successfully",
      data: result,
    });
  }
);

const updateMyProfile = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userData = req.user;
    const result = await UserService.updateMyProfileIntoDB(userData, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const userData = req.user;
    const result = await UserService.changePasswordIntoDB(userData, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password changed successfully",
      data: [],
    });
  }
);

export const UserController = {
  createUser,
  donorList,
  getMyProfile,
  updateMyProfile,
  changePassword,
  getSingleDonor
};
