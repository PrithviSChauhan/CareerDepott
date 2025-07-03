import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userID = req.id;

    const { id: jobID } = req.params;

    if (!jobID) {
      return res.status(400).json({
        message: "job id required!",
        success: false,
      });
    }

    const existingApplication = await Application.findOne({
      job: jobID,
      applicant: userID,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "Already Applied!",
        success: false,
      });
    }

    //check if job exists;
    const job = await Job.findById(jobID);
    if (!job) {
      return res.status(404).json({
        message: "Job doesnt exist!",
        success: false,
      });
    }

    //create a new application
    const newApplication = await Application.create({
      job: jobID,
      applicant: userID,
    });

    //enter the application to applications[] array in job model
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      message: "Successfully Applied",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//to get all jobs applied by user
export const getAppliedJobs = async (req, res) => {
  try {
    const userID = req.id;

    const application = await Application.find({ applicant: userID })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createsAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createsAt: -1 } },
        },
      });

    if (!application) {
      return res.status(404).json({
        message: "User hasnt applied to any company yet!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Application successfully retreived",
      success: true,
      data: application,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobID = req.params.id;
    const job = await Job.findById(jobID).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        model: "User",
      },
    });
    console.log("we are here");
    if (!job) {
      return res.status(404).json({
        message: "Job not found!",
        success: false,
      });
    }
    console.log("job found");
    console.log("applicant data sent");

    return res.status(200).json({
      applicants: job.applications,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicantionID = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "status req",
        success: false,
      });
    }

    //find the application by applicantionID
    const application = await Application.findOne({ _id: applicantionID });

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updates succesfully",
      success: true,
      data: application,
    });
  } catch (error) {
    console.log(error);
  }
};
