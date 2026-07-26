"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import config from "@/app/config/Config";
import { ChevronRight } from "lucide-react";
import { User } from "lucide-react";
import { Shield } from "lucide-react";

export const Login = () => {
  const { saveToken, setWindowLoading, userInfo } = useContext(GlobalData);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const DEMO_ACCOUNTS = [
    {
      label: "Admin",
      email: "admin@gmail.com",
      password: "123456",
      icon: Shield,
    },
    {
      label: "User 1",
      email: "user1@gmail.com",
      password: "123456",
      icon: User,
    },
    {
      label: "User 2",
      email: "user2@gmail.com",
      password: "123456",
      icon: User,
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Autofill the react-hook-form fields (email/password aren't local state,
  // they live inside react-hook-form, so we set them with setValue)
  const fillDemo = (acc, index) => {
    setValue("email", acc.email, { shouldValidate: true, shouldDirty: true });
    setValue("password", acc.password, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1200);
  };

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
      email: data.email.trim(),
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
    <div className="mt-12 md:mt-16 w-full flex flex-col items-center justify-center">
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
            className={`w-full  py-3 rounded-md cursor-pointer text-white text-[14px] transition mt-2 ${
              loading ? "bg-gray-400" : "bg-[#9971F6] hover:bg-[#7c3aed]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <div className="mt-5 md:w-[500px] mx-3 md:mx-auto rounded-2xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-medium tracking-wide text-gray-400 mb-3">
          Demo accounts — tap to autofill
        </p>
        <div className="space-y-2">
          {DEMO_ACCOUNTS.map((acc, i) => {
            const Icon = acc.icon;
            return (
              <button
                key={acc.email}
                type="button"
                onClick={() => fillDemo(acc, i)}
                className="w-full flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-left transition hover:border-purple-400/40 hover:bg-purple-500/[0.06] group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
                    <Icon size={15} className="text-purple-300" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-100 font-medium truncate">
                      {acc.label}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {acc.email}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 text-xs text-gray-500 group-hover:text-purple-300 flex items-center gap-1">
                  {copiedIndex === i ? "Filled" : "Use"}
                  <ChevronRight size={13} />
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-[13px] text-gray-600 mt-3">
          Password for all demo accounts: 123456
        </p>
      </div>
    </div>
  );
};
