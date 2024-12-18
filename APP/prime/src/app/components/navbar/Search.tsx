"use client";

import { BiSearch } from "react-icons/bi";

export default function Search() {



  return (
    <div className="relative sm:w-[18rem] w-[9rem] h-full">
     <input
        type="text"
        placeholder="Search"
        className="border-gray-300 border-2 sm:w-[18rem] w-[9rem] h-full p-3 pr-12 rounded-2xl focus:outline-none focus:border-rose-500 transition-colors"
        aria-label="Search"
      />
      <button
        type="submit"
        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-1 sm:p-2 bg-rose-500 rounded-full text-white hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 transition-colors"
        aria-label="Submit search"
      >
        <BiSearch size={18} />
      </button>
      </div>
    
  );
}
