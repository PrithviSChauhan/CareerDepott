import express from "express";
import {register, logout, login, updateProfile } from "../controller/userController.js";
import isUthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isUthenticated, updateProfile);

export default router;