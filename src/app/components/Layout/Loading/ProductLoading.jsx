import Image from "next/image";
import React from "react";

const ProductLoading = () => {
  return (
    <>
      <div className="max-[100%] p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-400">
        <div className="flex items-center justify-center h-[220px] md:h-[400px] mb-4 bg-gray-300 rounded dark:bg-gray-400">
          <Image
            width={40}
            height={40}
            className="w-[60px] h-[60px] rotate-0 mx-auto"
            src={""}
            alt="Logo"
          />
        </div>
      </div>
    </>
  );
};

export default ProductLoading;
