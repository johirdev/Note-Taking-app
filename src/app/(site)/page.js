"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { GlobalData } from "./globalDataProvider";
import config from "../config/Config";
import { NoteCard } from "../components/NoteCard/NoteCard";
import Link from "next/link";
import "../components/MyNoteList/notelist.css";

const PlusIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SearchIcon = () => (
  <svg
    width={14}
    height={14}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function Home() {
  const { token, userData } = useContext(GlobalData);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [posts, setPosts] = useState({ meta: { total: 0 }, data: [] });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef(null);
  const loadMoreRef = useRef(null);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
      setPosts({ meta: { total: 0 }, data: [] });
      setHasMore(true);
    }, 450);

    return () => clearTimeout(t);
  }, [search]);

  // fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
     

      try {
        setLoading(true);

        const res = await fetch(
          `${config.API_URL}/api/v1/notes?searchTerm=${encodeURIComponent(
            debouncedSearch,
          )}&page=${page}&limit=8&sortBy=createdAt&sortOrder=desc`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await res.json();

        if (data?.success) {
          setPosts((prev) =>
            page === 1
              ? data
              : {
                  meta: data.meta || prev.meta,
                  data: [...(prev.data || []), ...(data.data || [])],
                },
          );

          // ✅ IMPORTANT FIX (limit = 8)
          setHasMore((data.data?.length ?? 0) === 8);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [ debouncedSearch, page]);

  // infinite scroll (IntersectionObserver)
  useEffect(() => {
    if (loading) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }
  }, [loading, hasMore]);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* TOP BAR */}
      <div
        style={{
          padding: "16px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <SearchIcon />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "rgba(255,255,255,0.7)",
              fontSize: "13px",
              flex: 1,
            }}
          />
        </div>
        {userData?.email ? (
          <>
            <Link
              href={"/add-notes"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "linear-gradient(135deg,#7c3aed,#6d28d9)",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              <PlusIcon /> New Note
            </Link>
          </>
        ) : (
          <>
            <Link
              href={"/login"}
              className="bg-gradient-to-br from-violet-600 to-violet-800"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "8px",

                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              Login
            </Link>
          </>
        )}
      </div>

      {/* LIST */}
      <div
        style={{
          flex: 1,
          padding: "20px 24px",
          overflowY: "auto",
        }}
        className="scrollbar_none"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <span
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: "rgba(255,255,255,0.92)",
            }}
          >
            Latest Notes
          </span>

          <span style={{ fontSize: "12px", color: "#a78bfa" }}>
            {posts?.meta?.total || 0} notes →
          </span>
        </div>

        {/* NOTES */}
        <div className="grid grid-cols-1 gap-3  scrollbar_none pb-20">
          {posts?.data?.map((post) => (
            <NoteCard key={post._id} note={post} canAccess={false} />
          ))}

          {/* LOADING SKELETON */}
          {loading && (
            <>
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse h-24 bg-gray-700 rounded"
                />
              ))}
            </>
          )}

          {/* ENDLESS SCROLL TRIGGER */}
          <div ref={loadMoreRef} style={{ height: "40px" }} />

          {!loading && posts?.data?.length === 0 && (
            <p style={{ textAlign: "center", paddingTop: "20px" }}>
              No notes found
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
