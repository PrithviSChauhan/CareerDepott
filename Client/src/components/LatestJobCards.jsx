import React from "react";
import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-md bg-white border-gray-100 cursor-pointer shadow-xl">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-medium text-lg my-2">Job Title</h1>
        <p className="text-gray-600 text-sm my-2">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">12 Positions</Badge>
        <Badge className={"text-red-700 font-bold"} variant="ghost">Part Time </Badge>
        <Badge className={"text-sky-700 font-bold"} variant="ghost">24 LPA</Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
