"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import config from "@/app/config/Config";

export const Login = () => {
  const { saveToken, setWindowLoading, userInfo } = useContext(GlobalData);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ip, setIp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ---------------- Submit ----------------
  const onSubmit = async (data) => {
    if (!data.email) {
      toast.error("Email is required");
      return;
    }

    if (!data.password) {
      toast.error("Password is required");
      return;
    }

    const payload = {
      email: data.email,
      password: data.password,
    };

    try {
      setLoading(true);

      const response = await fetch(`${config.API_URL}/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-secret": config.CLIENT_TOKEN,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        saveToken(result.data.access_token);
        setWindowLoading(true);
        router.push("/");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 md:mt-16 w-full flex items-center justify-center">
      <div className="w-full md:w-[500px] mx-3 md:mx-auto  border rounded-lg p-6 md:p-10">
        <h2 className="text-[18px] font-semibold text-center mb-2">
          User Login
        </h2>

        <p className="text-center text-gray-500 mb-6 text-[14px]">
          Please enter your email and password
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="block mb-2 text-[14px]">
              Email <span className="text-red-500 ">*</span>
            </label>

            <input
              type="email"
              {...register("email")}
              placeholder="Enter email"
              className="w-full border rounded-md px-4 py-2 text-[14px] outline-none focus:border-white-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-[14px]">
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="Enter password"
                className="w-full border rounded-md px-4 py-2 text-[14px] pr-10 outline-none focus:border-white-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-gray-500"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-md cursor-pointer text-white text-[14px] transition mt-2 ${
              loading ? "bg-gray-400" : "bg-[#9971F6] hover:bg-[#7c3aed]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
