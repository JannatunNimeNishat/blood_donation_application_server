import { Router } from "express";
import validateRequest from "../../middleWares/validateRequest";
import { UserValidationSchema } from "./user.validation";
import { UserController } from "./user.controller";
import auth from "../../middleWares/auth";
import { USER_ROLE } from "./user.constant";

const router = Router();

router.post(
  "/register",
  validateRequest(UserValidationSchema.createUserValidationSchema),
  UserController.createUser
);

router.get("/donor-list", UserController.donorList);

router.get("/donor/:donorId", UserController.getSingleDonor);


router.get(
  "/my-profile",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.getMyProfile
);

router.put(
  "/update-my-profile",
  validateRequest(UserValidationSchema.updateUserValidation),
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.updateMyProfile
);

router.put(
  "/changePassword",
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserController.changePassword
);

export const UserRoutes = router;
