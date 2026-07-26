"use client";

import { GlobalData } from "@/app/(site)/globalDataProvider";
import config from "@/app/config/Config";
import React, { useContext, useEffect, useState } from "react";

const ChevronDown = ({ open }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const LockIcon = () => (
  <svg
    width={40}
    height={40}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

export const GroupByInterstes = () => {
  const { token, userData } = useContext(GlobalData);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openGroup, setOpenGroup] = useState(null);

  const isAdmin = userData?.role === "admin";

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `${config.API_URL}/api/v1/users/group-by-interests`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const json = await res.json();
        setData(json.data || []);
      } catch (err) {
        console.error("Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAdmin, token]);

  const toggleGroup = (id) => {
    setOpenGroup(openGroup === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white">
      <div className="p-6 max-w-4xl mx-auto space-y-5">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Users Grouped by Interests</h1>
          <p className="text-sm text-white/40 mt-1">
            See how many users are interested in each topic.
          </p>
        </div>

        {/* NOT ADMIN */}
        {!isAdmin && (
          <div className="flex flex-col items-center justify-center gap-3 py-20 rounded-2xl border border-white/10 bg-white/[0.03] text-white/40">
            <LockIcon />
            <p className="text-sm">Only admins can view this page.</p>
          </div>
        )}

        {/* LOADING */}
        {isAdmin && loading && (
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl bg-white/5 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {isAdmin && !loading && data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-white/10 bg-white/[0.03] text-white/40">
            <p className="text-sm">No interest groups found.</p>
          </div>
        )}

        {/* GROUPS */}
        {isAdmin &&
          !loading &&
          data.map((group) => {
            const open = openGroup === group._id;

            return (
              <div
                key={group._id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors hover:border-violet-500/20"
              >
                {/* Header */}
                <button
                  type="button"
                  onClick={() => toggleGroup(group._id)}
                  className="w-full flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-[#141420] to-[#3f2a73] hover:to-[#4d34a3] transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold uppercase text-sm tracking-wide">
                      {group._id}
                    </span>
                    <span className="text-xs bg-white/15 px-2.5 py-1 rounded-full">
                      {group.count} {group.count === 1 ? "user" : "users"}
                    </span>
                  </div>

                  <ChevronDown open={open} />
                </button>

                {/* Body */}
                {open && (
                  <div className="p-3 space-y-2 bg-[#0e0e16]">
                    {group.users.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 flex items-center justify-center">
                            <span className="text-xs font-semibold uppercase">
                              {user.name?.charAt(0) || "?"}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm text-white">
                              {user.name}
                            </p>
                            <p className="text-xs text-white/40">
                              {user.email}
                            </p>
                          </div>
                        </div>

                        <span className="text-[11px] text-white/30 font-mono">
                          #{user._id.slice(-5)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
