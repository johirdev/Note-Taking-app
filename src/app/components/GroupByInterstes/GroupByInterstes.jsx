"use client";

import { GlobalData } from "@/app/(site)/globalDataProvider";
import config from "@/app/config/Config";
import React, { useContext, useEffect, useState } from "react";

export const GroupByInterstes = () => {
  const { token, userData } = useContext(GlobalData);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openGroup, setOpenGroup] = useState(null);

  useEffect(() => {
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
  }, []);

  const toggleGroup = (id) => {
    setOpenGroup(openGroup === id ? null : id);
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading interests data...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4">
      {userData?.role === "admin" ? (
        <>
          {" "}
          <h1 className="text-2xl font-bold mb-4">
            Users Grouped by Interests
          </h1>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">
            This is grouping users by their interests. Only admin can see this
            page.
          </h1>
        </>
      )}

      {data.map((group) => (
        <div
          key={group._id}
          className="border rounded-xl shadow-sm overflow-y-auto scrollbar_none bg-white"
        >
          {/* Header */}
          <div
            onClick={() => toggleGroup(group._id)}
            className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-[#0C0C14] to-[#714CC9] text-white"
          >
            <div className="flex items-center gap-3">
              <span className="font-semibold uppercase">{group._id}</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {group.count} users
              </span>
            </div>

            <span className="text-sm">
              {openGroup === group._id ? "▲" : "▼"}
            </span>
          </div>

          {/* Body */}
          {openGroup === group._id && (
            <div className="p-4 space-y-2 bg-[#0C0C14]">
              {group.users.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center justify-between p-3  bg-[#0C0C14] rounded-lg border hover:shadow-sm transition"
                >
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  <span className="text-xs text-gray-400">
                    ID: {user._id.slice(-5)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
