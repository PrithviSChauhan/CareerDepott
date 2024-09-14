import {postJob, getAllJobs, getJobByID, getJobsByAdmin} from "../controller/jobController.js";
import express from "express";
import isUthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isUthenticated, postJob);
router.route("/get/:id").post(isUthenticated, getJobByID);
router.route("/all").get(isUthenticated, getAllJobs);
router.route("/adminJobs").post(isUthenticated, getJobsByAdmin);

export default router;