import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobsDescription = () => {
  const isApplied = false;
  return (
    <div className="max-w-7xl mx-auto py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Title:<span className="pl-4 font-normal text-gray-800">Frontend Developer</span> </h1>
          <div className="mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              12 Positions
            </Badge>
            <Badge className={"text-red-700 font-bold"} variant="ghost">
              Part Time{" "}
            </Badge>
            <Badge className={"text-sky-700 font-bold"} variant="ghost">
              24 LPA
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#652193]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <div>
        <h1 className="font-bold text-lg my-5 border-b-2 border-gray-300 ">Job Description</h1>
        <div>
          <h1 className="font-bold text-lg my-1">Role: <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
          <h1 className="font-bold text-lg my-1">Location: <span className="pl-4 font-normal text-gray-800">  Noida</span></h1>
          <h1 className="font-bold text-lg my-1">Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi quasi ut, reprehenderit veritatis doloremque sit velit! Blanditiis maiores facere amet dolor explicabo in, tempore, voluptatem error </span></h1>
          <h1 className="font-bold text-lg my-1">Experience: <span className="pl-4 font-normal text-gray-800"> 2 Years</span></h1>
          <h1 className="font-bold text-lg my-1">Salary: <span className="pl-4 font-normal text-gray-800">14 LPA</span></h1>
          <h1 className="font-bold text-lg my-1">Applicants: <span className="pl-4 font-normal text-gray-800">558</span></h1>
          <h1 className="font-bold text-lg my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">F</span></h1>
        </div>
      </div>
    </div>
  );
};

export default JobsDescription;
