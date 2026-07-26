"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import "./NoteListAdmin.css";
import { NoteCard } from "../NoteCard/NoteCard";
import config from "@/app/config/Config";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import { useRouter } from "next/navigation";
import Pagination from "@/app/Layout/Pagination/Pagination";

const PlusIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <line
      x1="12"
      y1="5"
      x2="12"
      y2="19"
      stroke="currentColor"
      strokeWidth="2.5"
    />
    <line
      x1="5"
      y1="12"
      x2="19"
      y2="12"
      stroke="currentColor"
      strokeWidth="2.5"
    />
  </svg>
);

const SearchIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
    <line
      x1="21"
      y1="21"
      x2="16.65"
      y2="16.65"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export default function NoteListAdmin() {
  const { token, userData } = useContext(GlobalData);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [posts, setPosts] = useState({ meta: { total: 0 }, data: [] });

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [refresh, setRefresh] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const router = useRouter();

  const notes = posts?.data || [];
  const total = posts?.meta?.total || 0;
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  // ======================
  // debounce search
  // ======================
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(t);
  }, [search]);

  // ======================
  // FETCH NOTES
  // ======================
  useEffect(() => {
    if (userData?.role !== "admin") {
      return router.push("/");
    }
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${config.API_URL}/api/v1/notes?searchTerm=${encodeURIComponent(
            debouncedSearch,
          )}&page=${page}&limit=${limit}&sortBy=createdAt&sortOrder=desc`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data?.success) {
          setPosts(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [debouncedSearch, page, limit, refresh, token]);

  // ======================
  // refresh function (IMPORTANT)
  // ======================
  const handleRefresh = () => {
    setPage(1);
    setRefresh((r) => !r);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  // ======================
  // unique categories ber kora
  // ======================
  const categories = useMemo(() => {
    return [...new Set(notes.map((n) => n.category).filter(Boolean))];
  }, [notes]);

  // ======================
  // active category diye filter kora (current page er data theke)
  // ======================
  const filteredNotes =
    activeCategory === "all"
      ? notes
      : notes.filter((n) => n.category === activeCategory);

  return (
    <main className="flex flex-col h-screen scrollbar_none overflow-hidden">
      {/* TOP BAR */}
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="flex items-center gap-2 flex-1 bg-white/5 px-3 py-2 rounded">
          <SearchIcon />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            className="bg-transparent outline-none w-full"
          />
        </div>

        {userData?.email ? (
          <Link
            href="/add-notes"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-violet-600 to-violet-800 rounded text-white"
          >
            <PlusIcon /> Add Note
          </Link>
        ) : (
          <Link href="/login" className="px-4 py-2 bg-violet-700 rounded">
            Login
          </Link>
        )}
      </div>

      {/* CATEGORY FILTER BOXES */}
      {!loading && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 px-5 pt-4">
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

      {/* LIST */}
      <div className="flex-1 overflow-y-auto scrollbar_none p-5 min-h-[70vh]">
        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Latest Notes</h2>
          <span className="text-violet-400">{total} notes</span>
        </div>

        {/* NOTES */}
        <div className="grid gap-3">
          {filteredNotes.map((post) => (
            <NoteCard
              key={post._id}
              note={post}
              canAccess={true}
              onDeleted={handleRefresh}
            />
          ))}

          {/* LOADING */}
          {loading && (
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-gray-700 animate-pulse rounded"
                />
              ))}
            </>
          )}

          {!loading && filteredNotes.length === 0 && (
            <p className="text-center mt-10">No notes found</p>
          )}
        </div>
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
    </main>
  );
}
