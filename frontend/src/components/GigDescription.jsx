import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setLoading } from "@/redux/authSlice";

const GigDescriptionPage = () => {
  const location = useLocation();
  const { job } = location.state || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!job)
    return <p className="text-center mt-10 text-lg">Job details not found.</p>;

  const isExternal = Boolean(job.job_apply_link); // if true → external job

  const title = job.title || job.job_title || "Untitled Job";
  const locationText =
    job.location ||
    `${job.job_city || "Unknown City"}, ${
      job.job_country || "Unknown Country"
    }`;
  const description =
    job.description || job.job_description || "No description available.";
  const employmentType =
    job.jobType || job.job_employment_type || "Not specified";
  const employer = job.company || job.employer_name || "N/A";

  const handleApply = async () => {
    if (isExternal) {
      window.open(job.job_apply_link, "_blank");
    } else {
      if (!user) {
        toast.error("You need to login first.");
        return navigate("/login");
      }

      try {
        dispatch(setLoading(true));
        const res = await axios.post(
          `${JOB_API_END_POINT}/applyJob/${job._id}`,
          {
            withCredentials: true,
          }
        );

        if (res.data.success) {
          toast.success(res.data.message || "Applied successfully!");
        } else {
          toast.error(res.data.message || "Failed to apply.");
        }
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.message || "Something went wrong");
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 bg-white rounded-xl shadow-md font-sans">
      <div className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold text-[#3c3852] mb-2">{title}</h1>
        <p className="text-[#7257fa] text-sm font-medium">{locationText}</p>
      </div>

      <div className="space-y-4 text-[#333] leading-relaxed">
        <p className="whitespace-pre-line text-sm text-[#444]">{description}</p>

        <div className="border-t pt-4 mt-4 space-y-2">
          <p>
            <strong className="text-[#3c3852]">Employer:</strong> {employer}
          </p>
          <p>
            <strong className="text-[#3c3852]">Job Type:</strong>{" "}
            {employmentType}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleApply}
          className="inline-block px-5 py-2 bg-[#7257fa] hover:bg-[#5c45c7] text-white font-semibold rounded-lg shadow transition duration-200"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default GigDescriptionPage;
