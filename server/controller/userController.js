import { user } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNum, password, role } = req.body;
    console.log(fullname, email, phoneNum, password, role);

    if (!fullname || !email || !phoneNum || !password || !role) {
      return res.status(400).json({
        message: "Some fields are empty",
        success: false,
      });
    }

    const Check_user = await user.findOne({ email });

    if (Check_user) {
      return res.status(400).json({
        message: "User already exists!",
        success: false,
      });
    }

    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    await user.create({
      fullname,
      email,
      phoneNum,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      message: "Account created successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Registration failed!",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Some fields are empty!",
        success: false,
      });
    }

    let User = await user.findOne({ email });

    if (!User) {
      return res.status(400).json({
        message:
          "User doesn't exist or incorrect email or password, please register!",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, User.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message:
          "User doesn't exist or incorrect email or password, please register!",
        success: false,
      });
    }

    // Check role is correct or not
    if (role !== User.role) {
      return res.status(400).json({
        message: "Role doesn't match!",
        success: false,
      });
    }

    const tokenData = {
      userID: User._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    const userData = {
      userID: User._id,
      fullname: User.fullname,
      email: User.email,
      phoneN: User.phoneNum,
      role: User.role,
      profile: User.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${User.fullname}`,
        user: userData,
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successful!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNum, skills, bio, resume, profilePhoto } =
      req.body;

    console.log({
      fullname,
      email,
      phoneNum,
      skills,
      bio,
      resume,
      profilePhoto,
    });

    const userID = req.id;
    // const User = await user.findById(userID);

    const User = await user.findByIdAndUpdate(
      userID,
      {
        fullname,
        email,
        phoneNum,
        profile: { skills, bio, resume, profilePhoto },
      },
      { new: true }
    );

    if (!User) {
      return res
        .status(400)
        .json({ message: "User not found!", success: false });
    }

    // // Update basic profile fields
    // if (fullname) User.fullname = fullname;
    // if (email) User.email = email;
    // if (phoneNum) User.phoneNum = phoneNum;
    // if (skills) User.profile.skills = skills.split(",").map((s) => s.trim());
    // if (bio) User.profile.bio = bio;

    // await User.save();

    const userData = {
      userID: User._id,
      fullname: User.fullname,
      email: User.email,
      phoneNum: User.phoneNum,
      role: User.role,
      profile: User.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully!",
      user: userData,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
