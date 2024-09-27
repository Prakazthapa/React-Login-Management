import { Router } from "express";
import {
  createWebUserController,
  deleteWebUserController,
  forgotPasswordController,
  loginController,
  myProfileController,
  readAllWebUserController,
  readSpecificWebUserController,
  resetPasswordController,
  updatePasswordController,
  updateProfileController,
  updateWebUserController,
  verifyEmailController,
} from "../controller/webUserController.js";
import validation from "../middleware/validation.js";
import webUserValidation from "../validation/webUserValidation.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import authorized from "../middleware/authorized.js";

let webUserRouter = Router();
webUserRouter
  .route("/web-user")
  .post(validation(webUserValidation), createWebUserController)
  .get(
    isAuthenticated,
    authorized(["admin", "superadmin"]),
    readAllWebUserController
  );
webUserRouter.route("/web-user/verify-email").patch(verifyEmailController);
webUserRouter.route("/web-user/login").post(loginController);
webUserRouter
  .route("/web-user/my-profile")
  .get(isAuthenticated, myProfileController);
webUserRouter
  .route("/web-user/update-profile")
  .patch(isAuthenticated, updateProfileController);
webUserRouter
  .route("/web-user/update-password")
  .patch(isAuthenticated, updatePasswordController);
webUserRouter.route("/web-user/forgot-password").post(forgotPasswordController);
webUserRouter
  .route("/web-user/reset-password")
  .patch(isAuthenticated, resetPasswordController);
//the below must be in last if not it runs instead of others
webUserRouter
  .route("/web-user/:id") //kabaf case
  .get(
    isAuthenticated,
    authorized(["admin", "superadmin"]),
    readSpecificWebUserController
  ) //admin, superadmin
  .patch(
    isAuthenticated,
    authorized(["admin", "superadmin"]),
    updateWebUserController
  ) //admin, superadmin
  .delete(isAuthenticated, authorized(["superadmin"]), deleteWebUserController); //superadmin

export default webUserRouter;
