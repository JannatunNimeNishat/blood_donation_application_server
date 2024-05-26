import { Router } from "express";
import auth from "../../middleWares/auth";
import { AdminController } from "./admin.controller";
import { USER_ROLE } from "../User/user.constant";

const router = Router();

//get all users
router.get(
  "/all-users",
  auth(USER_ROLE.admin),
  AdminController.getAllUsers
);

//activate-deactivate user
router.put(
  "/change-account-type/:userId",
  auth(USER_ROLE.admin),
  AdminController.updateUserAccountType
);
//edit user role
router.put(
  "/change-user-role/:userId",
  auth(USER_ROLE.admin),
  AdminController.updateUserRole
);

export const AdminRoutes = router;
