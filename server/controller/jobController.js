import { Job } from "../models/jobModel.js";

//admin
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      jobType,
      totalOpenings,
      companyID,
      experience,
      position,
      requirements,
    } = req.body;
    const userID = req.id;

    const salary = Number(req.body.salary);

    if (
      !title ||
      !description ||
      !location ||
      !salary ||
      !jobType ||
      !totalOpenings ||
      !companyID ||
      !experience ||
      !position ||
      !requirements
    ) {
      return res.status(400).json({
        message: "some field empty!",
        success: false,
      });
    }

    const createdJob = await Job.create({
      title,
      description,
      location,
      requirements: requirements.split(","),
      salary,
      jobType,
      totalOpenings,
      companyID,
      experienceLevel: experience,
      position,
      company: companyID,
      createdBy: userID,
    });

    const job = await Job.findById(createdJob._id);

    return res.status(200).json({
      message: "new job created successfully!",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//student
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword?.trim() || "";
    const keywords = keyword.split(" ").filter(Boolean);

    const query = {
      $or: keywords.flatMap((kw) => [
        { title: { $regex: kw, $options: "i" } },
        { description: { $regex: kw, $options: "i" } },
        { location: { $regex: kw, $options: "i" } },
      ]),
    };

    const jobs = await Job.find(query).populate(
      "company",
      "companyName logo website"
    );

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

//student
export const getJobByID = async (req, res) => {
  try {
    const jobID = req.params.id;

    const job = await Job.findById(jobID);

    if (!job) {
      return res.status(404).json({
        message: "job not found!",
        success: false,
      });
    }

    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//admin
export const getJobsByAdmin = async (req, res) => {
  try {
    const adminID = req.id;

    const jobs = await Job.find({ createdBy: adminID }).populate(
      "company",
      "companyName logo website"
    );

    if (!jobs) {
      return res.status(404).json({
        message: "couldnt find admin jobs",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
        success: false,
      });
    }

    const jobs = await Job.find({ title: { title } });

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found with the specified title",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getJobsByLocation = async (req, res) => {
  try {
    const { location } = req.params;

    if (!location) {
      return res.status(400).json({
        message: "location is required",
        success: false,
      });
    }

    const jobs = await Job.find({ location: { location } });

    if (jobs.length === 0) {
      return res.status(404).json({
        message: "No jobs found for the specified location",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
