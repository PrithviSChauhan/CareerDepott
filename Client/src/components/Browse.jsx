import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";

const randomJobs = [1,2,3];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-lg font-bold my-10">Search Results ({randomJobs.length})</h1>
        <hr className="mt-3 mb-3"/>
        <div className="grid grid-cols-3 gap-4 mt-4">
        {
            randomJobs.map((item, index) => {
                return (
                    <Job/>
                )
            })
        }
        </div>
      </div>
    </div>
  );
};

export default Browse;
