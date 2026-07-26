"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { NoteCard } from "../NoteCard/NoteCard";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import config from "@/app/config/Config";
import "./notelist.css";
import Link from "next/link";
import Pagination from "@/app/Layout/Pagination/Pagination";

export const MyNoteList = () => {
  const { token, userData } = useContext(GlobalData);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!userData?.id) return;

      try {
        setLoading(true);

        const res = await fetch(
          `${config.API_URL}/api/v1/users/${userData.id}/notes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data?.success) {
          setPosts(data || []);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userData?.id, refresh]);

  const notes = posts?.data?.notes || [];

  // ======================
  // unique categories ber kora
  // ======================
  const categories = useMemo(() => {
    const unique = [...new Set(notes.map((n) => n.category).filter(Boolean))];
    return unique;
  }, [notes]);

  // ======================
  // active category diye filter kora
  // ======================
  const filteredNotes =
    activeCategory === "all"
      ? notes
      : notes.filter((n) => n.category === activeCategory);

  // ======================
  // category change hole page reset
  // ======================
  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  // ======================
  // client-side pagination
  // ======================
  const total = filteredNotes.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  const paginatedNotes = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredNotes.slice(start, start + limit);
  }, [filteredNotes, page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-semibold mb-4">My Notes</h1>
        {userData?.id && notes.length > 0 ? (
          <p className="text-[14px] font-semibold mb-4">{notes.length} notes</p>
        ) : (
          <Link
            href="/add-notes"
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-br from-violet-600 to-violet-800"
          >
            + Add Note
          </Link>
        )}
      </div>

      {/* CATEGORY FILTER BOXES */}
      {!loading && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-colors ${
              activeCategory === "all"
                ? "bg-violet-600 border-violet-600 text-white"
                : "bg-transparent border-white/15 text-gray-300 hover:border-violet-500"
            }`}
          >
            All ({notes.length})
          </button>

          {categories.map((cat) => {
            const count = notes.filter((n) => n.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize border transition-colors ${
                  activeCategory === cat
                    ? "bg-violet-600 border-violet-600 text-white"
                    : "bg-transparent border-white/15 text-gray-300 hover:border-violet-500"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 mb-7 overflow-y-auto scrollbar_none pb-20 max-h-[80vh]">
        {loading && (
          <>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse h-24 bg-gray-700 rounded"
              ></div>
            ))}
          </>
        )}

        {!loading && paginatedNotes.length === 0 && (
          <p className="text-center pt-5">No notes found</p>
        )}

        {paginatedNotes.map((post) => (
          <NoteCard
            key={post._id}
            note={post}
            canAccess={true}
            onDeleted={() => setRefresh((r) => !r)} // 🔥 used for delete + edit
          />
        ))}
      </div>

      {!loading && total > 0 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          limitOptions={[1, 10, 20, 30, 50]}
        />
      )}
    </div>
  );
};
