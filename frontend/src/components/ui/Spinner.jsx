import React from "react";

const Spinner = () => {
  return (
    <div class="relative w-12 h-12 mx-auto">
      <div class="spinner-4 relative w-12 animate-spin">
        <div class="absolute top-0 left-0  bg-orange-600 w-4 h-4 rounded-full"></div>
        <div class="absolute top-1/2 right-0 bg-black w-4 h-4 rounded-full"></div>
      </div>
    </div>
  );
};

export default Spinner;
