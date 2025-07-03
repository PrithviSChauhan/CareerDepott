import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Button2 from "./ui/Button2";

const JobApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleStartChat = (receiverId) => {
    navigate(`/messages/${receiverId}`);
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        setJob(res.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Could not fetch job");
      }
    };

    const fetchApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${id}/applicants`,
          { withCredentials: true }
        );

        if (res.status === 200) {
          setApplicants(res.data.applicants || []);
          console.log(res);
        } else {
          toast.error("Unexpected error fetching applicants");
        }
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching applicants"
        );
      }
    };

    fetchJob();
    fetchApplicants();
  }, [id]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Applicants for: {job?.title || "Loading..."}
      </h1>

      {applicants.length > 0 ? (
        <div className="grid grid-cols gap-6">
          {applicants.map((app, index) => (
            <div key={index}>
              <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                <table className="w-full text-center table-auto min-w-max">
                  <thead>
                    <tr>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">
                          Name
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">
                          Email
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">
                          Resume
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">
                          Applied on
                        </p>
                      </th>
                      <th className="p-4 border-b border-slate-300 bg-slate-50">
                        <p className="block text-sm font-normal leading-none text-slate-500">
                          Applied on
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 border-b border-slate-200">
                        <div className=" text-slate-800">
                          <div className="flex items-center justify-center gap-6">
                            <img
                              src={
                                app.applicant.profile.profilePhoto ||
                                "profileP "
                              }
                              alt="profile"
                              className="w-12 h-12"
                            />
                            {app.applicant.fullname}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="block text-sm text-slate-800">
                          {app.applicant.email}
                        </p>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <a
                          href={app.applicant.profile.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      </td>
                      <td className="p-4 border-b border-slate-200">
                        <p className="mt-3 inline-block bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td>
                        <button
                          onClick={() => handleStartChat(app.applicant._id)}
                          className="mt-2 bg-purple-600 text-white px-4 py-1 rounded"
                        >
                          Message
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No applicants found for this job.</p>
      )}
    </div>
  );
};

export default JobApplicants;
