"use client";

import { useState, useContext, useEffect } from "react";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import { toast } from "sonner";
import config from "@/app/config/Config";
import { useRouter } from "next/navigation";

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

export default function AddUserPage() {
  const { token, userData } = useContext(GlobalData);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.role !== "admin") {
      router.push("/");
    }
  }, [userData, router]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    interests: [],
  });

  // input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // interest toggle
  const handleInterestChange = (value) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value],
    }));
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        interests: form.interests.filter((i) => i !== ""), // remove empty
      };

      const res = await fetch(`${config.API_URL}/api/v1/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create user");
      }

      toast.success("User Created ✅");

      // reset form
      setForm({
        name: "",
        email: "",
        password: "",
        role: "user",
        interests: [],
      });
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16  p-6 rounded-lg ">
      <h2 className="text-2xl font-bold mb-6 text-white">Add New User</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          required
        />

        {/* Role Dropdown */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        {/* Interests */}
        <div>
          <p className="mb-2 text-white font-medium">Select Interests:</p>

          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto bg-gray-800 p-2 rounded border border-gray-700">
            {INTERESTS.map((item) => (
              <label
                key={item}
                className="flex items-center gap-2 text-sm text-white"
              >
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
}
