import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";

const JobCardHeroSection = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        setJob(res.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job)
    return <div className="p-10 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-white py-12 px-6 sm:px-12">
      <button onClick={() => navigate(-1)}>back</button>
      <div className="max-w-5xl mx-auto bg-white  rounded-3xl p-8 sm:p-12 ">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-blue-900 mb-2">
            {job.title}
          </h1>
          <p className="text-gray-600 text-base">{job.description}</p>
        </div>

        <div className=" mt-8 text-sm text-gray-700">
          <div className="bg-blue-50 p-4 grid  grid-cols-1 sm:grid-cols-4 rounded-xl shadow-sm border">
            <div>
              <p>
                <span className="font-semibold text-blue-800">Location:</span>{" "}
                {job.location}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold text-blue-800">Job Type:</span>{" "}
                {job.jobType}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold text-blue-800">Openings:</span>{" "}
                {job.totalOpenings}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold text-blue-800">Posted:</span>{" "}
                {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {job.requirements?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold text-blue-900 mb-2">
              Requirements
            </h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index} className="pl-1">
                  {req}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCardHeroSection;
