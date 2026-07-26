"use client";

import { useContext, useState } from "react";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import { toast } from "sonner";
import config from "@/app/config/Config";

const INTERESTS = [
  "tech",
  "programming",
  "frontend",
  "backend",
  "fullstack",
  "ai",
  "gaming",
  "movies",
  "music",
  "news",
  "business",
  "crypto",
  "football",
  "cricket",
  "fitness",
  "education",
  "books",
  "travel",
  "food",
  "career",
  "freelancing",
];

export default function MyProfile() {
  const { userData, token, logOut } = useContext(GlobalData);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    interests: [],
  });

  // open modal + set default values
  const handleOpen = () => {
    setForm({
      name: userData?.name || "",
      email: userData?.email || "",
      password: "",
      interests: userData?.interests || [],
    });
    setOpen(true);
  };

  // input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // multi select interest
  const handleInterestChange = (value) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value],
    }));
  };

  // submit update
  const handleSubmit = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${config.API_URL}/api/v1/users/profile/${userData.id}`,
        {
          method: "PATCH", // or PUT (depends on backend)
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();
      console.log(data, "user updated");

      // update global user
      if (data?.data) {
        logOut();
      }

      setOpen(false);
      toast.success("Profile Updated ✅");
    } catch (err) {
      console.log("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) return <p className="p-4">No user found</p>;

  return (
    <div className="p-6">
      {/* PROFILE */}
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className=" flex items-start justify-center  text-white">
        <div className="w-full max-w-sm bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl">
          {/* Avatar */}
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-2xl font-bold shadow-lg">
              {userData?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <h2 className="mt-3 text-lg font-semibold text-white">
              {userData.name}
            </h2>
            <p className="text-sm text-gray-400">{userData.email}</p>
          </div>

          {/* Info Section */}
          <div className="space-y-3 mt-4 text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span className="text-gray-400">Role</span>
              <span className="font-medium capitalize">{userData.role}</span>
            </div>

            <div className="border-b border-white/10 pb-2">
              <p className="text-gray-400 mb-1">Interests</p>
              <div className="flex flex-wrap gap-2">
                {userData.interests?.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center cursor-pointer">
            <button
              onClick={handleOpen}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded w-[400px]">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

            {/* name */}
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border p-2 mb-2"
            />

            {/* email */}
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border p-2 mb-2"
            />

            {/* password */}
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border p-2 mb-2"
            />

            {/* interests */}
            <div className="mb-3">
              <p className="mb-1 font-medium">Select Interests:</p>

              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2">
                {INTERESTS.map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={form.interests.includes(item)}
                      onChange={() => handleInterestChange(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                {loading ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
