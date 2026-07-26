"use client";
import { DateTimeBd } from "@/app/Shared/DateTimeBd/DateTimeBd";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import { EditNote } from "../EditNote/EditNote";

const EditIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <path
      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.5a2.12 2.12 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DeleteIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CATEGORY_COLORS = {
  tech: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  programming: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  frontend: "bg-pink-500/15 text-pink-300 border-pink-500/30",
  backend: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  fullstack: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
  ai: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
  gaming: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  movies: "bg-red-500/15 text-red-300 border-red-500/30",
  music: "bg-rose-500/15 text-rose-300 border-rose-500/30",
  news: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30",
  business: "bg-teal-500/15 text-teal-300 border-teal-500/30",
  crypto: "bg-amber-500/15 text-amber-300 border-amber-500/30",
  football: "bg-lime-500/15 text-lime-300 border-lime-500/30",
  cricket: "bg-green-500/15 text-green-300 border-green-500/30",
  fitness: "bg-red-500/15 text-red-300 border-red-500/30",
  education: "bg-sky-500/15 text-sky-300 border-sky-500/30",
  books: "bg-purple-500/15 text-purple-300 border-purple-500/30",
  travel: "bg-violet-500/15 text-violet-300 border-violet-500/30",
  food: "bg-orange-500/15 text-orange-300 border-orange-500/30",
  career: "bg-blue-500/15 text-blue-300 border-blue-500/30",
  freelancing: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
};

const getCategoryStyle = (cat) =>
  CATEGORY_COLORS[cat] ||
  "bg-violet-500/15 text-violet-300 border-violet-500/30";

export function NoteCard({
  note,
  canAccess = false,
  onDeleted,
  onNote = "post",
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  console.log(onNote, "this notess");
  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setDeleteId(null);
  };

  const handleDeleted = () => {
    closeDeleteModal();
    if (onDeleted) onDeleted();
  };

  const handleUpdated = () => {
    setEditModalOpen(false);
    if (onDeleted) onDeleted(); // 🔥 reuse refresh
  };

  return (
    <>
      {/* DELETE MODAL */}
      {modalOpen && (
        <DeleteModal
          deleteUrl={`/api/v1/${onNote}/delete/${deleteId}`}
          title={onNote}
          onDeleted={handleDeleted}
          closeModal={closeDeleteModal}
          onNote={onNote}
        />
      )}

      {/* EDIT MODAL */}
      {editModalOpen && (
        <EditNote
          note={note}
          closeModal={() => setEditModalOpen(false)}
          onUpdated={handleUpdated}
          onNote={onNote}
        />
      )}

      <div className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-violet-500/30 hover:bg-white/[0.06] hover:shadow-[0_0_0_1px_rgba(139,92,246,0.15),0_8px_24px_-8px_rgba(139,92,246,0.25)]">
        {/* TOP ROW: category + actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          {note.category ? (
            <span
              className={`text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full border capitalize ${getCategoryStyle(
                note.category,
              )}`}
            >
              {note.category}
            </span>
          ) : (
            <span />
          )}

          {canAccess && (
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={handleEdit}
                title="Edit"
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-blue-500/15 text-blue-300 hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
              >
                <EditIcon />
              </button>

              <button
                onClick={() => handleDelete(note._id)}
                title="Delete"
                className="flex items-center justify-center w-7 h-7 rounded-lg bg-red-500/15 text-red-300 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>

        {/* TITLE */}
        <h3 className="text-[15px] font-semibold text-white leading-snug mb-1.5 line-clamp-1">
          {note.title}
        </h3>

        {/* CONTENT */}
        <p className="text-sm text-white/50 leading-relaxed line-clamp-2">
          {note.content}
        </p>

        {/* FOOTER: date */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <span className="text-[11px] text-white/30">
            {DateTimeBd(note.createdAt)}
          </span>
        </div>
      </div>
    </>
  );
}
