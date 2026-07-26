"use client";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import config from "@/app/config/Config";
import { useRouter } from "next/navigation";

import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

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

const CategoryDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = INTERESTS.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left p-2 rounded bg-gray-800 flex justify-between items-center"
      >
        <span className={value ? "text-white" : "text-gray-400"}>
          {value || "Select Category"}
        </span>
        <span className="ml-2 text-gray-400">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full rounded bg-gray-800 border border-gray-700 shadow-lg">
          <input
            type="text"
            autoFocus
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 bg-gray-900 text-white outline-none border-b border-gray-700"
          />

          <ul className="max-h-48 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <li
                  key={item}
                  onClick={() => {
                    onChange(item);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`p-2 cursor-pointer hover:bg-purple-600 capitalize ${
                    value === item ? "bg-purple-700" : ""
                  }`}
                >
                  {item}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-400">No match found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export const AddPost = () => {
  const { token, userData } = useContext(GlobalData);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userData?.role === "admin" || userData?.role === "user") {
      // Allow access
    } else {
      router.push("/");
    }
  }, [userData, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      toast.error("Please select a category");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${config.API_URL}/api/v1/post/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          category,
          user: userData.id,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Post created successfully");
        setTitle("");
        setContent("");
        setCategory("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">Add Post</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 rounded bg-gray-800"
          required
        />

        <CategoryDropdown value={category} onChange={setCategory} />

        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 rounded bg-gray-800"
          rows={5}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 p-2 rounded"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};
