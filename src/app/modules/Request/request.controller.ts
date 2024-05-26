import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { RequestService } from "./request.service";

const donationRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await RequestService.donationRequestIntoDB(
      req.body,
      req.user
    );

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Request successfully made",
      data: result,
    });
  }
);

const getMyDonationRequests = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await RequestService.getMyDonationRequestsFromDB(req.user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation requests retrieved successfully",
      data: result,
    });
  }
);

const updateDonationRequest = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const { requestId } = req.params;
    const result = await RequestService.updateDonationRequestIntoDB(
      req.body,
      requestId as string
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation request status successfully updated",
      data: result,
    });
  }
);

const getMyAllBloodRequests = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await RequestService.getMyAllBloodRequestsFromDB(req.user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Donation requests retrieved successfully",
      data: result,
    });
  }
);



export const RequestController = {
  donationRequest,
  getMyDonationRequests,
  updateDonationRequest,
  getMyAllBloodRequests
};
