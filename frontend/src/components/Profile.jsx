import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logoutUser, setUser } from "../redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import profileImg from "../assets/profile.png";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNum: user?.phoneNum || "",
    skills: user?.profile?.skills?.join(", ") || "",
    bio: user?.profile?.bio || "",
    resume: user?.profile?.resume || "",
    resumeOriginalName: user?.profile?.resumeOriginalName || "resume.pdf",
    resumeFile: null,
    profilePhoto: null,
  });

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`);
      if (res.status === 200) {
        dispatch(logoutUser());
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();

      if (formData.resumeFile) {
        const resumeData = new FormData();
        resumeData.append("file", formData.resumeFile);
        resumeData.append("folder", "careerDepott/user/resume");
        resumeData.append(
          "upload_preset",
          import.meta.env.VITE_UNSIGNED_RESUME_PRESET
        );

        try {
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_NAME
            }/raw/upload`,
            resumeData,
            { withCredentials: false }
          );

          const resume_url = res.data.secure_url;
          data.append("resume", resume_url);
          toast.success("Resume Uploaded Successfully");
        } catch (err) {
          console.error("Resume upload failed:", err);
          toast.error("Resume upload failed");
          return;
        }
      } else if (user?.profile?.resume) {
        data.append("resume", user?.profile?.resume);
      }

      if (formData.profilePhoto) {
        const photoData = new FormData();
        photoData.append("file", formData.profilePhoto);
        photoData.append("folder", "careerDepott/user/profile_picture");
        photoData.append(
          "upload_preset",
          import.meta.env.VITE_UNSIGNED_PROFILE_PRESET
        );

        try {
          const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUDINARY_NAME
            }/image/upload`,
            photoData,
            { withCredentials: false }
          );

          const profile_url = res.data.secure_url;
          data.append("profilePhoto", profile_url);
          toast.success("Profile Image Uploaded");
        } catch (err) {
          console.error("Profile image upload failed:", err);
          toast.error("Profile image upload failed");
          return;
        }
      } else if (user?.profile?.profilePhoto) {
        data.append("profilePhoto", user.profile.profilePhoto);
      }

      data.append("fullname", formData.fullname);
      data.append("email", formData.email);
      data.append("phoneNum", formData.phoneNum);
      data.append("skills", formData.skills);
      data.append("bio", formData.bio);

      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setEditMode(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
        <h1 className="text-2xl font-semibold">
          Welcome, {user?.fullname || "User"}
        </h1>
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="col-span-1 border-r pr-6 flex flex-col items-center text-center">
          <img
            src={user?.profile?.profilePhoto || profileImg}
            alt="Profile"
            className="w-28 h-28 rounded-full mb-4 object-cover"
          />
          <h2 className="text-lg font-semibold">{formData.fullname}</h2>
          <p className="text-gray-500">{formData.email}</p>
          <p className="text-gray-500">{formData.phoneNum}</p>
          <span className="mt-3 inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
            {user?.role}
          </span>
          <span className="mt-1 inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            {user?.profile?.company || "No Company"}
          </span>

          <div className="flex flex-col gap-2 mt-6 w-full">
            <Button onClick={() => setEditMode(!editMode)}>
              {editMode ? "Cancel Edit" : "Edit Profile"}
            </Button>
            <Button
              onClick={handleUpdate}
              disabled={!editMode}
              className="bg-blue-600 text-white"
            >
              Save Changes
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <MetricBox label="Skills" value={formData.skills} />
          <MetricBox label="Bio" value={formData.bio} large />
          <div className="grid grid-cols-2 gap-4">
            {formData.resume ? (
              <a
                href={user.profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                <MetricBox label="Resume" value="View Resume" />
              </a>
            ) : (
              <MetricBox label="Resume" value="No Resume Uploaded" />
            )}
            <MetricBox
              label="Resume Name"
              value={formData.resumeOriginalName}
            />
          </div>

          {editMode && (
            <div className="space-y-4">
              <EditableField
                label="Full Name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
              <EditableField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <EditableField
                label="Phone Number"
                name="phoneNum"
                value={formData.phoneNum}
                onChange={handleChange}
              />
              <EditableField
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
              <EditableField
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                isTextArea
              />

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Upload Resume (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  name="resume"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      resumeFile: e.target.files[0],
                    }))
                  }
                  className="w-full border p-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePhoto"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profilePhoto: e.target.files[0],
                    }))
                  }
                  className="w-full border p-2 rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value, large }) => (
  <div
    className={`p-6 rounded-xl shadow-sm border ${
      large ? "h-40" : "h-24"
    } bg-gray-100`}
  >
    <p className="text-sm text-gray-500 mb-1">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

const EditableField = ({ label, name, value, onChange, isTextArea }) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    {isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
      />
    ) : (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    )}
  </div>
);

export default Profile;
