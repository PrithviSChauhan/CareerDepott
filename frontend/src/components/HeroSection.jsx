import React, { useEffect, useState } from "react";
import hs1 from ".././assets/hs1.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import tfhs from ".././assets/24-hour-service.png";
import hire from ".././assets/hire.png";
import postjob from ".././assets/postjob.jpg";
import recommend from ".././assets/recommend.png";
import cv from ".././assets/cv.png";
import assessment from ".././assets/assessment.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "./ui/Skeleton";
import FacilitiesStudent from "./ui/FacilitiesStudent";
import FacilitiesRecruiter from "./ui/FacilitiesRecruiter";
import Ratings from "./ui/Ratings";
import { setLoading } from "@/redux/authSlice";

const HeroSection = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (user?.role === "recruiter") {
          const res = await axios.get(`${JOB_API_END_POINT}/adminjobs`, {
            withCredentials: true,
          });
          if (res.status === 200) {
            setJobs(res.data.jobs || []);
          }
        } else {
          // const res = await axios.get(`${JOB_API_END_POINT}/search`, {
          //   params: { title: "", location: "" },
          //   withCredentials: true,
          // });
          // if (res.status === 200) {
          //   const shuffled = res.data.data.sort(() => 0.5 - Math.random());
          //   setJobs(shuffled.slice(0, 10));
          // }
          const res = await axios.get(`${JOB_API_END_POINT}/all`, {
            params: { keyword: "" },
            withCredentials: true,
          });
          if (res.status === 200) {
            const shuffled = res.data.jobs.sort(() => 0.5 - Math.random());
            setJobs(shuffled.slice(0, 10));
          }
        }
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };

    fetchJobs();
  }, [user]);

  const applyJob = async (jobID) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/applyJob/${jobID}`,
        null,
        {
          withCredentials: true,
        }
      );
      if (res.status == "200") {
        toast.success(res.data.message);
      } else {
        toast.error(res?.data?.message || "some error applying job");
      }
    } catch (error) {
      console.log("some error applying to job", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      {!user ? (
        <div className="bg-gradient-to-r from-[#f7efd2] to-[#b9e2f5] text-gray-800">
          {/* Guest Hero */}
          <div className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 py-12 gap-10">
            <div className="flex-1 text-center md:text-left space-y-6 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold">
                Welcome to <span className="text-blue-600">CareerDepott</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700">
                Sign up to find jobs or hire talented individuals with ease.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button
                  className="px-6 py-3 text-lg rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                  onClick={() => navigate("/login")}
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <img
                src={hs1}
                alt="hero"
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>
          <div>
            <FacilitiesStudent />
          </div>
        </div>
      ) : user?.role === "student" ? (
        <div className="bg-gradient-to-r from-[#f7efd2] to-[#b9e2f5] text-gray-800">
          {/* Student Hero */}
          <div className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 py-12 gap-10">
            <div className="flex-1 text-center md:text-left space-y-6 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold">
                Find Your <span className="text-blue-600">Dream Job</span>{" "}
                Today!
              </h1>
              <p className="text-lg md:text-xl text-gray-700">
                Discover career opportunities matched to your skills and
                aspirations.
              </p>
              <Button
                className="px-6 py-3 text-lg rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                onClick={() => navigate("/gigs")}
              >
                Start Exploring
              </Button>
            </div>
            <div className="flex-1">
              <img
                src={hs1}
                alt="hero"
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>

          {/* Student Carousel */}
          <div className="py-14 px-6 lg:px-20 bg-gradient-to-r from-[#f7efd2] to-[#b9e2f5]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Latest Openings
            </h2>
            {jobs.length > 0 ? (
              <Carousel>
                {/* <CarouselContent className="flex gap-6">
                  {jobs.map((job, index) => (
                    <CarouselItem
                      key={job.id || index}
                      className="min-w-[250px] max-w-sm bg-white p-5 rounded-xl shadow-md"
                    >
                      <div className="flex flex-col bg-white  border-gray-200 shadow-2xs rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                        <h3 className="text-md font-bold text-gray-800 dark:text-white">
                          {job.job_title} at {job.employer_name || "Company"}
                        </h3>
                        <p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-neutral-500">
                          {job.job_city}, {job.job_country}
                        </p>
                        <p className="mt-2 text-gray-500 dark:text-neutral-400">
                          {(job.job_description).slice(0,100)}<strong>....</strong>
                        </p>
                        <a
                          className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-hidden focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600"
                          href={job.job_apply_link}
                        target="_blank"
                        rel="noreferrer"
                        >
                          Apply now
                          <svg
                            className="shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6"></path>
                          </svg>
                        </a>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent> */}
                <CarouselContent className="flex gap-6">
                  {jobs.map((job, index) => (
                    <CarouselItem
                      key={job._id || index}
                      className="min-w-[250px] max-w-sm bg-white p-5 rounded-xl shadow-md md:ml-5"
                    >
                      <div className="flex flex-row justify-between">
                        <div>
                          <h4 className="text-md font-semibold">
                            {job.title} at{" "}
                            <span>
                              <strong>{job.company.companyName}</strong>
                            </span>
                          </h4>
                          <p className="text-sm text-gray-500 mt-1">
                            {job.location} | {job.jobType}
                          </p>
                          <div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            Openings: {job.totalOpenings}
                          </div>
                        </div>
                        <div>
                          <img src={job.company.logo} alt="companyLogo" />
                          <div className="flex justify-center">
                            <a
                              href={job?.company?.website}
                              className="text-blue-500 underline"
                              target="_blank"
                            >
                              website
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row">
                        <div className="mt-5">
                          <button
                            onClick={() => navigate(`job/${job._id}`)}
                            type="button"
                            className="px-5 py-2.5 rounded-lg text-sm cursor-pointer tracking-wider font-medium border-2 border-current outline-none bg-black hover:bg-transparent text-white hover:text-black transition-all duration-300"
                          >
                            View Details
                          </button>
                        </div>
                        <div className="mt-5">
                          <button
                            onClick={() => applyJob(job._id)}
                            type="button"
                            className="px-5 py-2.5 rounded-lg text-sm cursor-pointer tracking-wider font-medium border-2 border-current outline-none bg-blue-700 hover:bg-transparent text-white hover:text-black transition-all duration-300 active:bg-blue-700"
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            ) : (
              <div>
                <Skeleton />
              </div>
            )}
          </div>

          {/* Student Facilities */}
          <div>
            <FacilitiesStudent />
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-[#e8f1f9] to-[#f9f9f9] text-gray-800">
          {/* Recruiter Hero */}
          <div className="flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 py-12 gap-10">
            <div className="flex-1 text-center md:text-left space-y-6 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold">
                Hire <span className="text-blue-600">Top Talent</span>{" "}
                Effortlessly
              </h1>
              <p className="text-lg md:text-xl text-gray-700">
                Manage job postings, track applicants, and build your dream
                team.
              </p>
              <button
                onClick={() => navigate("/gigs")}
                type="button"
                className="px-5 py-2.5 rounded-lg text-sm cursor-pointer tracking-wider font-medium border-2 border-current outline-none bg-blue-700 hover:bg-transparent text-white hover:text-black transition-all duration-300"
              >
                Post a Job
              </button>
            </div>
            <div className="flex-1">
              <img
                src={postjob}
                alt="recruiter"
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>

          {/* Recruiter Jobs */}
          <div className="py-14 px-6 lg:px-20 bg-gradient-to-r from-[#e8f1f9] to-[#f9f9f9]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Your Recent Job Posts
            </h2>
            {jobs.length > 0 ? (
              <Carousel>
                <CarouselContent className="flex gap-6">
                  {jobs.map((job, index) => (
                    <CarouselItem
                      key={job._id || index}
                      className="min-w-[250px] max-w-sm bg-white p-5 rounded-xl shadow-md md:ml-5"
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

                      <div className="mt-5">
                        <button
                          onClick={() => navigate(`/${job._id}/applicants`)}
                          type="button"
                          className="px-5 py-2.5 rounded-lg text-sm cursor-pointer tracking-wider font-medium border-2 border-current outline-none bg-blue-700 hover:bg-transparent text-white hover:text-black transition-all duration-300 active:bg-blue-700"
                        >
                          View Applicants
                        </button>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
              </Carousel>
            ) : (
              <p className="text-gray-600 text-center">No job posts yet.</p>
            )}
          </div>

          {/*applicant */}
          {/* <div className="py-10 px-6 lg:px-20 bg-gradient-to-r from-[#e8f1f9] to-[#f9f9f9]">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Applicants</h2>
            <div>
              {applicants.length > 0 ? (
                <Carousel>
                  <CarouselContent>
                    {applicants.map((applicant, index) => (
                      <CarouselItem key={job._id || index} className="">
                        <div className="p-4 border rounded shadow">
                          <p className="font-bold">
                            {applicant?.applicant?.fullname}
                          </p>
                          <p className="text-sm">
                            {applicant?.applicant?.email}
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex" />
                  <CarouselNext className="hidden md:flex" />
                </Carousel>
              ) : (
                <div>couldnt fetch applicatns</div>
              )}
            </div>
          </div> */}

          {/* Recruiter Perks */}
          <div>
            <FacilitiesRecruiter />
          </div>
        </div>
      )}
      <div className="bg-gradient-to-r from-[#f7efd2] to-[#b9e2f5]">
        <Ratings />
      </div>
    </>
  );
};

export default HeroSection;
