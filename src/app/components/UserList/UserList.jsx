"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import config from "@/app/config/Config";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import { DateTimeBd } from "@/app/Shared/DateTimeBd/DateTimeBd";
import "../../components/MyNoteList/notelist.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useRouter } from "next/navigation";
import Pagination from "@/app/Layout/Pagination/Pagination";

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

export default function UserList() {
  const { token, userData } = useContext(GlobalData);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ total: 0 });

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const total = meta?.total || 0;
  const totalPages = Math.max(Math.ceil(total / limit), 1);

  // DELETE
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // EDIT
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    interests: [],
  });

  const [submitLoading, setSubmitLoading] = useState(false);

  // ======================
  // debounce search
  // ======================
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // ======================
  // fetch users
  // ======================
  useEffect(() => {
    if (userData?.role !== "admin") {
      return router.push("/");
    }
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${config.API_URL}/api/v1/users?searchTerm=${encodeURIComponent(
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
          setMeta(data.meta);
          setUsers(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedSearch, page, limit, token]);

  // ======================
  // pagination handlers
  // ======================
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1);
  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setDeleteId(null);
  };

  const handleDeleted = () => {
    setUsers((prev) => prev.filter((u) => u._id !== deleteId));
    closeDeleteModal();
  };

  // ======================
  // EDIT OPEN
  // ======================
  const handleEdit = (user) => {
    setEditId(user._id);

    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role || "user",
      interests: user.interests || [],
    });

    setEditModalOpen(true);
  };

  // ======================
  // FORM CHANGE
  // ======================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleInterestChange = (item) => {
    setForm((prev) => {
      const exists = prev.interests.includes(item);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== item)
          : [...prev.interests, item],
      };
    });
  };

  // ======================
  // UPDATE USER
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const res = await fetch(
        `${config.API_URL}/api/v1/users/update/${editId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );

      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u._id === editId ? { ...u, ...data.data } : u)),
        );

        setEditModalOpen(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      {/* DELETE MODAL */}
      {modalOpen && (
        <DeleteModal
          deleteUrl={`/api/v1/users/delete/${deleteId}`}
          title="User"
          onDeleted={handleDeleted}
          closeModal={closeDeleteModal}
        />
      )}

      {/* EDIT MODAL */}
      {editModalOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center">
          <div className="bg-[#111] p-5 rounded w-[400px]">
            <h1 className="text-center py-2">Edit User</h1>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Name"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Email"
              />

              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
                placeholder="Password"
              />

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

              <div className="grid grid-cols-2 gap-1 text-sm">
                {INTERESTS.map((item) => (
                  <label key={item} className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={form.interests.includes(item)}
                      onChange={() => handleInterestChange(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>

              <button type="submit" className="w-full bg-blue-600 p-2 rounded">
                {submitLoading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                onClick={() => setEditModalOpen(false)}
                className="w-full bg-gray-500 p-2 rounded"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MAIN UI */}
      <main className="flex flex-col h-screen overflow-hidden scrollbar_none bg-[#0b0b12] text-white">
        {/* HEADER */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <div className="flex items-center gap-2 flex-1 bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
            <SearchIcon />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="bg-transparent outline-none text-sm w-full text-white/80"
            />
          </div>

          {userData?.email ? (
            <Link
              href="/add-user"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-br from-violet-600 to-violet-800"
            >
              + Add User
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-violet-700"
            >
              Login
            </Link>
          )}
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto scrollbar_none p-5">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-bold">User List</h2>
            <span className="text-sm text-violet-400">{total} Users</span>
          </div>

          <div className="grid gap-3">
            {loading ? (
              <div className="p-4 py-8 rounded-xl  relative border border-white/10 bg-white/5 hover:bg-white/10 transition">
                Loading...
              </div>
            ) : (
              <>
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="p-4 rounded-xl  relative border border-white/10 bg-white/5 hover:bg-white/10 transition"
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-xs text-white/60">{user.email}</p>
                      </div>

                      <div className="flex gap-2 absolute right-4 top-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="bg-blue-500 cursor-pointer text-white text-xs px-3 py-1 rounded"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-red-500 cursor-pointer text-white text-xs px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between mt-2">
                      <p className="text-xs">{user.role}</p>
                      <p className="text-[11px] text-white/40">
                        {DateTimeBd(user.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}

            {!loading && users.length === 0 && (
              <p className="text-center pt-5">No users found</p>
            )}
          </div>
        </div>
        {/* PAGINATION */}
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
    </>
  );
}
