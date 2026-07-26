/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import config from "@/app/config/Config";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const EditNote = ({ note, closeModal, onUpdated }) => {
  const { token } = useContext(GlobalData);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Prefill data
  useEffect(() => {
    if (note) {
      setTitle(note?.title);
      setContent(note?.content);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${config.API_URL}/api/v1/post/update/${note._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            content,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Note updated successfully");
        if (onUpdated) onUpdated(); // 🔥 refresh list
        closeModal();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded-lg w-full max-w-175 text-white">
        <h2 className="text-lg mb-4 font-semibold">Edit Note</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded bg-gray-800"
            required
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 rounded bg-gray-800"
            rows={5}
            required
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-600 cursor-pointer px-3 py-1 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 cursor-pointer px-3 py-1 rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
