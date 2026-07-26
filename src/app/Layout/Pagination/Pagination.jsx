"use client";

const ChevronLeft = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const btnBase = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: "32px",
  height: "32px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(255,255,255,0.7)",
  fontSize: "13px",
  cursor: "pointer",
};

export default function Pagination({
  page,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  limitOptions = [10, 20, 30, 50],
}) {
  if (totalPages < 1) return null;

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  };

  // page number gulla kmn dekhabe (max 5 button, ...) generate kora
  const getPageNumbers = () => {
    const pages = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        padding: "16px 0",
        flexWrap: "wrap",
        padding: "20px 24px",
      }}
    >
      {/* LEFT: LIMIT SELECT */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
          Show
        </span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "8px",
            padding: "6px 10px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "13px",
            outline: "none",
            cursor: "pointer",
          }}
        >
          {limitOptions.map((n) => (
            <option key={n} value={n} style={{ background: "#0c0c14" }}>
              {n}
            </option>
          ))}
        </select>
        <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>
          per page
        </span>
      </div>

      {/* RIGHT: PAGE NUMBERS */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <button
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
          style={{
            ...btnBase,
            width: "32px",
            color:
              page === 1 ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.7)",
            cursor: page === 1 ? "not-allowed" : "pointer",
          }}
        >
          <ChevronLeft />
        </button>

        {pageNumbers[0] > 1 && (
          <>
            <button onClick={() => goToPage(1)} style={btnBase}>
              1
            </button>
            {pageNumbers[0] > 2 && (
              <span
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "13px",
                  padding: "0 2px",
                }}
              >
                ...
              </span>
            )}
          </>
        )}

        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => goToPage(p)}
            style={{
              ...btnBase,
              border: p === page ? "1px solid #7c3aed" : btnBase.border,
              background:
                p === page
                  ? "linear-gradient(135deg,#7c3aed,#6d28d9)"
                  : btnBase.background,
              color: p === page ? "#fff" : btnBase.color,
              fontWeight: p === page ? 600 : 400,
            }}
          >
            {p}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "13px",
                  padding: "0 2px",
                }}
              >
                ...
              </span>
            )}
            <button onClick={() => goToPage(totalPages)} style={btnBase}>
              {totalPages}
            </button>
          </>
        )}

        <button
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
          style={{
            ...btnBase,
            width: "32px",
            color:
              page === totalPages
                ? "rgba(255,255,255,0.25)"
                : "rgba(255,255,255,0.7)",
            cursor: page === totalPages ? "not-allowed" : "pointer",
          }}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
