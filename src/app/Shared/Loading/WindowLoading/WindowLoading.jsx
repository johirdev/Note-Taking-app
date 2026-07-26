import React from "react";
import Image from "next/image";

export const WindowLoading = () => {
  return (
    <>
      <div className="flex justify-center items-center mt-32 md:mt-52  ">
        <div className="animate-pulse">
          <Image
            width={500}
            height={500}
            src={""}
            className="object-contain"
            alt="Logo"
          />
        </div>
      </div>
    </>
  );
};
