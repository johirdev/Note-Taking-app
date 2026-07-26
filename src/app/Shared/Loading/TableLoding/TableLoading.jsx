import React from "react";

export const TableLoading = () => {
  return (
    <>
      <div className="flex  py-[15px] w-full flex-col gap-4 border">
        <div className="flex items-center gap-4 ">
          <div className="skeleton h-16 w-16 shrink-0 rounded bg-gray-200 ms-3"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-32 bg-gray-200"></div>
            <div className="skeleton h-4 w-96 bg-gray-200"></div>
          </div>
        </div>
      </div>
    </>
  );
};
