import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setCompanyRegistered } from "@/redux/authSlice";
import {
  COMPANY_API_END_POINT,
  JOB_API_END_POINT,
  USER_API_END_POINT,
} from "@/utils/constant";
import axios from "axios";
import Footer from "./Footer";
import nojob from "../assets/nojobsfound.jpg";
import jobDoodle from "../assets/noresult.png";
import Spinner from "./ui/Spinner";
import GigCardComp from "./ownComponents/GigCardComp";
import ToggleSwitch from "./ui/ToggleSwitch";
import company from "../assets/Company.jpg";

function Gigs() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    jobType: "",
    totalOpenings: "",
    companyID: user.profile.company,
    experience: "",
    position: "",
    requirements: "",
  });

  const [companyFormData, setCompanyFormData] = useState({
    companyName: "",
    companyLocation: "",
    website: "",
    logo: "",
  });

  const registered = useSelector((state) => state.auth.registered);

  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [searched, setSearched] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const companyId = user.profile.companyID;
  const [companyname, setCompanyname] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCompanyDataChange = (e) => {
    setCompanyFormData({ ...companyFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      description,
      location,
      salary,
      jobType,
      totalOpenings,
      companyID,
      experience,
      position,
      requirements,
    } = formData;

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
      toast.error("Please fill all the fields.");
      return;
    }

    const salaryNum = Number(salary);
    const totalOpeningsNum = Number(totalOpenings);
    const experienceNum = Number(experience);

    if (isNaN(salaryNum) || isNaN(totalOpeningsNum) || isNaN(experienceNum)) {
      toast.error("Salary, openings, and experience must be valid numbers.");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${JOB_API_END_POINT}/post`,
        {
          ...formData,
          salary: salaryNum,
          totalOpenings: totalOpeningsNum,
          experience: experienceNum,
        },
        { withCredentials: true }
      );

      console.log(res.data);
      console.log(res.data.job);

      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          title: "",
          description: "",
          location: "",
          salary: "",
          jobType: "",
          totalOpenings: "",
          experience: "",
          position: "",
          requirements: "",
        });
      } else {
        toast.error(res.data.message || "Failed to post job");
      }
    } catch (err) {
      console.log("Post Job Error", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const searchJob = async (e) => {
    e.preventDefault();
    const combinedKeyword = `${jobTitle} ${jobLocation}`.trim();
    console.log("Searching for:", combinedKeyword); // 👈 ADD THIS

    if (!combinedKeyword) {
      toast.error("Please fill at least one field.");
      return;
    }
    try {
      dispatch(setLoading(true));
      setSearched(true);
      const [resSearch, resAll] = await Promise.all([
        axios.get(`${JOB_API_END_POINT}/search`, {
          params: { title: jobTitle, location: jobLocation },
          withCredentials: true,
        }),
        axios.get(`${JOB_API_END_POINT}/all`, {
          params: { keyword: combinedKeyword.trim() },
          withCredentials: true,
        }),
      ]);

      const jobsFromSearch =
        resSearch.status === 200 ? resSearch.data.data || [] : [];
      const jobsFromAll = resAll.status === 200 ? resAll.data.jobs || [] : [];

      const mergedJobs = [...jobsFromSearch, ...jobsFromAll];
      const shuffled = mergedJobs.sort(() => 0.5 - Math.random());
      setJobs(shuffled.slice(0, 10));
      toast.success("Jobs retrieved successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Some error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const normalizeJob = (job) => ({
    _id: job._id || job.id,
    title: job.title || job.job_title,
    location: job.location || `${job.job_city || ""}, ${job.job_country || ""}`,
    ...job,
  });

  const handleCompanyRegistration = async (e) => {
    e.preventDefault();

    const { companyName, companyLocation, website, logo } = companyFormData;

    if (!companyName || !companyLocation || !website || !logo) {
      toast.error("enter all fields");
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { ...companyFormData },
        {
          withCredentials: true,
        }
      );

      if (res.status === 201) {
        toast.success("company sccesfully registered!");
        dispatch(setCompanyRegistered(true));
        // const updatedUser = await axios.get(`${USER_API_END_POINT}/profile`, {
        //   withCredentials: true,
        // });

        // dispatch(setUser(updatedUser.data.user));
        // setFormData((prev) => ({
        //   ...prev,
        //   companyID: updatedUser.data.user.profile.company, // update form with new companyID
        // }));
        // const res = await axios.get(
        //   `${COMPANY_API_END_POINT}/get/${user.profile.companyID}`,
        //   {
        //     withCredentials: true,
        //   }
        // );
        // setCompanyname(res.data.data.companyName);
        const updatedUser = await axios.get(`${USER_API_END_POINT}/profile`, {
          withCredentials: true,
        });
        dispatch(setUser(updatedUser.data.user)); // this updates Redux
        setFormData((prev) => ({
          ...prev,
          companyID: updatedUser.data.user.profile.company, // company is the ID
        }));

        // Now fetch company name using this new ID
        const res = await axios.get(
          `${COMPANY_API_END_POINT}/get/${updatedUser.data.user.profile.company}`,
          {
            withCredentials: true,
          }
        );
        setCompanyname(res.data.data.companyName);
      } else {
        toast.error("some error");
      }
    } catch (error) {
      console.log("server error", error);
    }
  };

  useEffect(() => {
    const checkCompanyStatus = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/status`, {
          withCredentials: true,
        });

        if (res.status === 200 && res.data.registered) {
          dispatch(setCompanyRegistered(res.data.registered));
        } else {
          dispatch(setCompanyRegistered(false));
        }
      } catch (error) {
        console.error("Company status check failed:", error);
        dispatch(setCompanyRegistered(false));
      }
    };

    if (user?.role === "recruiter") {
      checkCompanyStatus();
    }
  }, [user]);

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  // useEffect(() => {
  //   const getCompanyName = async (companyId) => {
  //     try {
  //       const res = await axios.get(
  //         `${COMPANY_API_END_POINT}/get/${companyId}`
  //       );
  //       if (res.status === 200) {
  //         console.log("compnay name fetcehd succesfully");

  //       } else {
  //         console.log("some error occured while fetching name");
  //       }
  //     } catch (error) {
  //       console.log("servre error", error);
  //     }
  //   };

  //   if (user.role === "recruiter") {
  //     getCompanyName();
  //   }
  // }, [user]);

  return (
    <div className="w-full">
      <Navbar />
      {user.role === "recruiter" ? (
        <div>
          {registered ? (
            <div className="w-full min-h-screen bg-gray-100 p-6">
              <h2 className="text-3xl font-bold mb-6 text-center">
                Post a New Job
              </h2>
              <form
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
              >
                <Input
                  name="title"
                  label="Job Title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <TextArea
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <Input
                  name="location"
                  label="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
                <Input
                  name="salary"
                  label="Salary (in ₹)"
                  value={formData.salary}
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  name="jobType"
                  label="Job Type (e.g. Full-Time)"
                  value={formData.jobType}
                  onChange={handleChange}
                />
                <Input
                  name="totalOpenings"
                  label="Total Openings"
                  value={formData.totalOpenings}
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  name="companyID"
                  label="companyID"
                  value={formData.companyID}
                  type="text"
                  readOnly
                />
                <p>cn: {companyname}</p>
                <Input
                  name="experience"
                  label="Experience Level"
                  value={formData.experience}
                  onChange={handleChange}
                  type="number"
                />
                <Input
                  name="position"
                  label="Position"
                  value={formData.position}
                  onChange={handleChange}
                />
                <TextArea
                  name="requirements"
                  label="Requirements (comma separated)"
                  value={formData.requirements}
                  onChange={handleChange}
                />
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-900"
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex flex-col justify-center items-center mb-10">
                <img
                  src={company}
                  alt="company illustration"
                  className="h-3/5 w-3/5 md:w-3/6 md:h-3/6 min-h-40 min-w-40"
                />

                <form onSubmit={handleCompanyRegistration}>
                  <div class="grid gap-5 mb-6 md:grid-cols-2">
                    <div>
                      <label
                        for="companyName"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        value={companyFormData.companyName}
                        onChange={handleCompanyDataChange}
                        required
                      />
                    </div>

                    <div>
                      <label
                        for="companyLocation"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        name="companyLocation"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Noida"
                        value={companyFormData.companyLocation}
                        onChange={handleCompanyDataChange}
                        required
                      />
                    </div>

                    <div>
                      <label
                        for="website"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Website URL
                      </label>
                      <input
                        type="url"
                        name="website"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="flowbite.com"
                        value={companyFormData.website}
                        onChange={handleCompanyDataChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        for="logo"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Logo URL
                      </label>
                      <input
                        type="url"
                        name="logo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="flowbite.com"
                        value={companyFormData.logo}
                        onChange={handleCompanyDataChange}
                        required
                      />
                    </div>
                  </div>

                  {/* <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <label
                      for="remember"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      I agree with the{" "}
                      <a
                        href="#"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                      >
                        terms and conditions
                      </a>
                      .
                    </label>
                  </div> */}
                  <div className="self-center">
                    <button
                      type="submit"
                      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-500 hover:text-white active:bg-gray-900 "
                    >
                      Register
                    </button>
                  </div>
                </form>

                <p className="text-sm md:text-md">
                  <strong>Register your company to start hiring talent</strong>
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-6 px-4">
          <form
            className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl shadow"
            onSubmit={searchJob}
          >
            <input
              type="text"
              placeholder="Enter job title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Enter job location"
              value={jobLocation}
              onChange={(e) => setJobLocation(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
            >
              Search Jobs
            </button>

            <ToggleSwitch />
          </form>

          <div className="mt-6 w-full max-w-7xl flex flex-wrap justify-center gap-4 mb-10 min-h-[60vh]">
            {loading ? (
              <div className="flex items-center justify-center w-full min-h-[60vh]">
                <Spinner />
              </div>
            ) : jobs.length > 0 ? (
              jobs.map((job, idx) => (
                <div
                  key={job.id || idx}
                  className="w-full sm:w-[90%] md:w-[240px] lg:w-[260px] xl:w-[280px] h-[200px]"
                >
                  <GigCardComp key={idx} job={normalizeJob(job)} />
                </div>
              ))
            ) : searched ? (
              <div className="w-full flex flex-col items-center gap-4 text-center">
                <img
                  src={nojob}
                  alt="no jobs found"
                  className="w-1/2 max-w-xs h-auto"
                />
                <div className="font-bold text-xl sm:text-2xl">
                  No Jobs found!
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col md:flex-col items-center justify-center gap-6 p-4">
                <img
                  src={jobDoodle}
                  alt="jobs"
                  className="w-full md:w-1/2 max-w-md h-auto"
                />
                <div className="font-bold text-md sm:text-md md:text-md lg:text-md text-center">
                  Your next gig is just a search away.
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

const Input = ({ name, label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

const TextArea = ({ name, label, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);

export default Gigs;
