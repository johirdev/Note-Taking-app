"use client";

import Link from "next/link";
import React from "react";

const MaintenancePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-50-500 to-gray-100-600 text-gray-800 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 animate-pulse">🚧</h1>
        <h2 className="text-4xl font-semibold mb-2">We'll be back soon!</h2>
        <p className="text-lg mb-6">
          Sorry for the inconvenience. <br /> We’re performing some{" "}
          <b>maintenance </b>
          at the moment. <br /> We’ll be back online shortly!
        </p>
        <div className="flex justify-center gap-4">
          <Link
            target="_blank"
            href="https://contact.hypertouchofficial.com"
            className="px-6 py-2 bg-white border text-blue-600 font-semibold rounded hover:bg-gray-100 transition"
          >
            Contact
          </Link>
        </div>
      </div>
      <footer className="mt-10 text-sm opacity-70">
        &copy; {new Date().getFullYear()} Hypertouch Official. All rights
        reserved.
      </footer>
    </div>
  );
};

export default MaintenancePage;
