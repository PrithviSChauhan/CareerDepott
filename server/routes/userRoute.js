import express from "express";
import {
  register,
  logout,
  login,
  updateProfile,
} from "../controller/userController.js";
import isUthenticated from "../middlewares/isAuthenticated.js";
import { multiUpload } from "../middlewares/multer.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .post(multiUpload, isUthenticated, updateProfile);

export default router;
