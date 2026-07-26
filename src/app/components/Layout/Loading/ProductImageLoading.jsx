import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.png";

const ProductImageLoading = () => {
  return (
    <>
      <div className="max-[100%] p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-400">
        <div className="flex items-center justify-center h-[220px] sm:h-[300px] md:h-[322px] lg:h-[360px] xl:h-[420px] mb-4 bg-gray-300 rounded dark:bg-gray-400">
          <Image
            width={50}
            height={50}
            className="w-[50px] h-[50px] md:h-[50px] rotate-[0deg]  mx-auto"
            src={logo}
            alt="Logo"
          />
        </div>

        <div className="h-8 md:w-48 mb-4 mt-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-6 rounded-full mb-2.5 bg-gray-200 dark:bg-gray-700"></div>
        {/* <div className="h-2 max-w-[360px] mb-2.5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-6 rounded-full mb-2.5 bg-gray-200 dark:bg-gray-700"></div> */}
      </div>
    </>
  );
};

export default ProductImageLoading;
