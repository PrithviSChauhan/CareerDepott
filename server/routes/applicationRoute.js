import {getApplicants, getAppliedJobs, updateStatus, applyJob} from "../controller/applicationController.js";
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/applyJob").get(isAuthenticated, applyJob);
router.route("/get/appliedJobs").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);

export default router;