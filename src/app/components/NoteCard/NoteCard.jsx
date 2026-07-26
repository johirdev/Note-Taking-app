"use client";
import { DateTimeBd } from "@/app/Shared/DateTimeBd/DateTimeBd";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import { EditNote } from "../EditNote/EditNote";

export function NoteCard({ note, canAccess = false, onDeleted }) {
  const [hovered, setHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
          deleteUrl={`/api/v1/post/delete/${deleteId}`}
          title="Note"
          onDeleted={handleDeleted}
          closeModal={closeDeleteModal}
        />
      )}

      {/* EDIT MODAL */}
      {editModalOpen && (
        <EditNote
          note={note}
          closeModal={() => setEditModalOpen(false)}
          onUpdated={handleUpdated}
        />
      )}

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered
            ? canAccess
              ? "rgba(255,255,255,0.07)"
              : "rgba(139,92,246,0.07)"
            : "rgba(255,255,255,0.03)",
          borderRadius: "12px",
          padding: "16px",
          cursor: "pointer",
          transition: "all 0.15s",
        }}
      >
        {/* ACTION BUTTONS */}
        {canAccess && (
          <div className="flex justify-end gap-2 mb-2">
            <button
              onClick={handleEdit}
              className="bg-blue-500 cursor-pointer text-white text-xs px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(note._id)}
              className="bg-red-500 cursor-pointer text-white text-xs px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}

        {/* TITLE */}
        <p className="text-base font-semibold">{note.title}</p>

        {/* CONTENT */}
        <p className="text-sm opacity-60">{note.content}</p>

        {/* DATE */}
        <div className="flex justify-end mt-2 text-xs opacity-50">
          {DateTimeBd(note.createdAt)}
        </div>
      </div>
    </>
  );
}
