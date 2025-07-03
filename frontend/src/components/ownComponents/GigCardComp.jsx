import { setLoading } from "@/redux/authSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

const GigCardComp = ({ job }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const handleCardClick = () => {
    dispatch(setLoading(true));
    setTimeout(() => {
      navigate(`/gig/${job._id || job.id}`, { state: { job } });
      dispatch(setLoading(false));
    }, 300);
  };

  const title = job.title || job.job_title || "No Title";
  const location =
    job.location ||
    `${job.job_city || ""}, ${job.job_country || ""}` ||
    "Unknown";

  return (
    <div
      onClick={handleCardClick}
      className="relative w-full h-full font-sans p-4 rounded-xl bg-[#ffffff] shadow-md cursor-pointer transition group flex flex-col justify-between"
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h3 className="text-[1rem] font-bold text-[#3c3852] transition line-clamp-2">
            {title}
          </h3>
          <div className="flex-grow" />
          <div className="text-[#6e6b80] text-[0.8rem]">{location}</div>
          <div className="absolute bottom-0 right-0 p-2 bg-[#7257fa] rounded-tl-xl rounded-br-xl transition group-hover:bg-[#111] flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              height="15"
              width="15"
              className="transition-transform group-hover:translate-x-[3px]"
            >
              <path
                fill="#fff"
                d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"
              />
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default GigCardComp;
