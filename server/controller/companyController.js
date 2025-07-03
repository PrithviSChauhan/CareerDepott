import { Company } from "../models/companyModel.js";
import { user } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerCompany = async (req, res) => {
  try {
    const { companyName, companyLocation, website, logo } = req.body;

    if (!companyName || !companyLocation || !website || !logo) {
      return res.status(400).json({
        message: "Some fields are missing!",
        success: false,
      });
    }

    let company = await Company.findOne({ companyName });

    if (company) {
      return res.status(400).json({
        message: "Company already exists!",
        success: false,
      });
    }

    company = await Company.create({
      companyName,
      companyLocation,
      website,
      logo,
      userID: req.id,
    });

    const updatedUser = await user.findByIdAndUpdate(
      req.id,
      { $set: { "profile.company": company._id } },
      { new: true }
    );

    console.log("updated user: ", updatedUser);

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userID = req.id;
    const company = await Company.find({ userID });

    if (!company) {
      return res.status(404).json({
        message: "Company not found!",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyID = req.params.id;
    const company = await Company.findById(companyID);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    // Cloudinary logic can go here

    const updateData = { name, description, website, location };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company info updated.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getCompanyStatus = async (req, res) => {
  try {
    const userID = req.id;

    const company = await Company.findOne({ userID });

    if (company) {
      return res.status(200).json({
        success: true,
        registered: true,
      });
    } else {
      return res.status(200).json({
        success: true,
        registered: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
