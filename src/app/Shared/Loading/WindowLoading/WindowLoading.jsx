"use client";

import React from "react";

export const WindowLoading = () => {
  return (
    <div className="flex justify-center items-center mt-32 md:mt-52">
      <div className="flex flex-col items-center gap-4">
        {/* Animated icon */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-2xl bg-blue-500/20 dark:bg-blue-400/20 animate-ping" />
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500 dark:bg-blue-400 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6M9 8h6M5 3.5h14A1.5 1.5 0 0 1 20.5 5v14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5Z"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 tracking-wide">
            Note Management App
          </h2>
          <p className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            Loading
            <span className="flex ml-1">
              <span className="w-1 h-1 mx-0.5 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1 h-1 mx-0.5 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1 h-1 mx-0.5 rounded-full bg-gray-500 dark:bg-gray-400 animate-bounce" />
            </span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-40 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
          <div className="h-full w-1/3 bg-blue-500 dark:bg-blue-400 rounded-full animate-[loadingBar_1.2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loadingBar {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(150%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};
