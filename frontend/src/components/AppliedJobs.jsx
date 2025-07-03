import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./Footer";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useParams } from "react-router-dom";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const { applicationID } = useParams();
  const [status, setStatus] = useState("");

  const FetchAppliedJobs = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/get/appliedJobs`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setAppliedJobs(res.data.data || []);
        console.log(res.data.data);
      } else {
        toast.error("somee rror occured in fetching applied jobs");
      }
    } catch (error) {
      console.log("api error", error);
    }
  };

  //   const fetchApplicationStatus = async () => {
  //     try {
  //         const res = await axios.get(`${APPLICATION_API_END_POINT}/status/${applicationID}/update`, {
  //             withCredentials: true
  //         })

  //         if(res.status === 200){
  //             console.log("status fetcehd successfully")
  //             toast.success(res.data.message);
  //             setStatus(res.data.data)
  //         }else{
  //             toast.error("some error occured")
  //         }

  //     } catch (error) {
  //         console.log("server error", error);
  //     }
  //   }

  useEffect(() => {
    FetchAppliedJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen px-4 py-8 bg-gray-50">
        {appliedJobs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {appliedJobs
              .filter((application) => application.job)
              .map((application) => (
                <div
                  key={application._id}
                  className="bg-white rounded-2xl shadow p-5 border"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    {/* Text Section */}
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold">
                        {application.job?.title} at{" "}
                        <strong>{application.job?.company?.companyName}</strong>
                      </h2>

                      <p className="mt-2 text-gray-800 line-clamp-3">
                        {application.job?.description}
                      </p>
                    </div>

                    <div className="w-full md:w-32 h-32">
                      <img
                        src={application.job?.company?.logo}
                        alt="company logo"
                        className="w-full h-full object-contain rounded"
                      />
                      <div className="flex justify-center">
                        <a
                          href={application.job?.company?.website}
                          className="text-blue-500 underline"
                          target="_blank"
                        >
                          website
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-sm text-gray-500">
                    <p className="p-1">
                      <strong>Location:</strong> {application.job?.location}
                    </p>
                    <p className="p-1">
                      <strong>Salary:</strong> ₹{application.job?.salary}
                    </p>
                    <div className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      <strong>Status:</strong> {application.status}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Applied on:{" "}
                    {new Date(application.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            You haven’t applied to any jobs yet.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AppliedJobs;
