import React from "react";

const ToggleSwitch = () => {
  return (
    <div class="flex items-center gap-x-3">
      <label
        htmlFor="hs-basic-with-description-unchecked"
        className="relative inline-block w-11 h-6 cursor-pointer"
      >
        <input
          type="checkbox"
          id="hs-basic-with-description-unchecked"
          className="peer sr-only"
        ></input>
        <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-blue-600 dark:bg-neutral-700 dark:peer-checked:bg-blue-500 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
        <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:bg-neutral-400 dark:peer-checked:bg-white"></span>
      </label>
      
    </div>
  );
};

export default ToggleSwitch;
