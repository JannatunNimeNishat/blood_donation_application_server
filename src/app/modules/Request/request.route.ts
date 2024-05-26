import { Router } from "express";
import { RequestController } from "./request.controller";
import auth from "../../middleWares/auth";
import validateRequest from "../../middleWares/validateRequest";
import { RequestValidation } from "./request.validation";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

router.post(
  "/donation-request",
  validateRequest(RequestValidation.requestDonorValidationSchema),
  auth(USER_ROLE.admin,USER_ROLE.user),
  RequestController.donationRequest
);
router.get(
  "/donation-request",
  auth(USER_ROLE.admin,USER_ROLE.user),
  RequestController.getMyDonationRequests
);

router.get(
  "/get-my-all-blood-requests",
  auth(USER_ROLE.admin,USER_ROLE.user),
  RequestController.getMyAllBloodRequests
);



router.put(
  "/donation-request/:requestId",
  auth(USER_ROLE.admin,USER_ROLE.user),
  RequestController.updateDonationRequest
);

export const RequestRouter = router;
