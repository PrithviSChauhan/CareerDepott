import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./shared/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { JOB_API_END_POINT } from "@/utils/constant";

const Listings = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const { user } = useSelector((store) => store.auth);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = `${JOB_API_END_POINT}/adminJobs`;
        const res = await axios.get(url, {
          params: user?.role !== "recruiter" ? { keyword: "" } : {},
          withCredentials: true,
        });

        if (res.status === 200) {
          console.log(res.data.jobs);
          const jobList = res.data.jobs;
          setJobs(jobList || []);
        }
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, [user]);

  return (
    <div>
      <Navbar />
      <div className="py-14 px-6 lg:px-20 bg-white min-h-screen">
        {jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="p-6 bg-white border-2 border-gray-200 rounded-xl active:border-2 hover:border-black shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-row justify-between">
                  <div>
                    <h4 className="text-md font-semibold">
                      {job.title}{" "}
                      <span className="text-sm text-gray-600">at</span>{" "}
                      <strong> {job.company.companyName}</strong>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {job.location} | {job.jobType}
                    </p>
                    <div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      Openings: {job.totalOpenings}
                    </div>
                  </div>
                  <div>
                    <img src={job.company?.logo} alt="companylogo" />
                  </div>
                </div>
                <div>
                  <a
                    href={job.company?.website}
                    alt="website logo"
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    website
                  </a>
                </div>
                <div>{job.description.slice(0, 100)}</div>

                <div className="mt-5">
                  <button
                    onClick={() => navigate(`/${job._id}/applicants`)}
                    className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                  >
                    View Applicants
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-10">No job posts yet.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Listings;
