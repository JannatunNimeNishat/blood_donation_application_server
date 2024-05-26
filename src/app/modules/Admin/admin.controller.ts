import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AdminService } from "./admin.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully ",
    data: result,
  });
});

const updateUserAccountType = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { userId } = req.params;
    const result = await AdminService.updateUserAccountTypeIntoDB(
      userId,
      req.body
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User profile updated successfully",
      data: [],
    });
  }
);
const updateUserRole = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { userId } = req.params;
    const result = await AdminService.updateUserRoleIntoDB(userId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User role updated successfully",
      data: [],
    });
  }
);

export const AdminController = {
  updateUserAccountType,
  updateUserRole,
  getAllUsers,
};
