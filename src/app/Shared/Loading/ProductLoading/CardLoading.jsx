// ProductCardSkeleton.jsx
"use client";

import React from "react";

export const CardLoading = () => {
  return (
    <div className=" group w-full sm:w-[100%] md:w-[280px] lg:w-[280px] bg-transparent rounded overflow-hidden flex-shrink-0 animate-pulse">
      <div className="skeleton h-[150px] sm:h-[260px] md:h-[260px] lg:h-[240px] w-full bg-[#1b1b1beb] rounded"></div>
      <div className="mt-3 px-4 flex flex-col gap-2">
        <div className="skeleton h-4 w-28 bg-[#1b1b1beb] rounded"></div>
        <div className="skeleton h-4 w-full bg-[#1b1b1beb] rounded"></div>
        <div className="skeleton h-4 w-full bg-[#1b1b1beb] rounded"></div>
        <div className="skeleton h-8 w-full bg-[#1b1b1beb] rounded mt-2"></div>
      </div>
    </div>
  );
};
