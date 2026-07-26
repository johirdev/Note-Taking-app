"use client";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import Link from "next/link";
import React, { useContext } from "react";

export const RightSidebar = () => {
  const { token, userData, logOut } = useContext(GlobalData);
  const INTERESTS = ["Chess", "Reading", "Coding", "Security", "MongoDB"];
  const ACTIVITY = [40, 70, 30, 90, 55, 80, 45];

  return (
    <>
      <>
        <aside
          style={{
            background: "#0a0a12",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          {userData?.email && (
            <>
              {/* Avatar + name */}
              <div
                style={{
                  padding: "24px 20px 20px",
                  textAlign: "center",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#7c3aed,#f59e0b)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#fff",
                    margin: "0 auto 12px",
                    position: "relative",
                  }}
                >
                  {userData?.name?.charAt(0).toUpperCase() || "U"}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      right: "2px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: "#22c55e",
                      border: "2px solid #0a0a12",
                    }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.95)",
                    marginBottom: "4px",
                  }}
                >
                  {userData?.name || "user"}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.38)",
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: "10px",
                  }}
                >
                  {userData?.email || "user"}
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "4px 10px",
                    borderRadius: "100px",
                    background: "rgba(139,92,246,0.15)",
                    border: "1px solid rgba(139,92,246,0.25)",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#a78bfa",
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#a78bfa",
                    }}
                  />{" "}
                  role- {userData?.role || "user"}
                </div>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "8px",
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {[
                  ["24", "Notes"],
                  ["3", "Pinned"],
                  ["47", "Days"],
                ].map(([n, l]) => (
                  <div
                    key={l}
                    style={{
                      textAlign: "center",
                      padding: "10px 6px",
                      background: "rgba(255,255,255,0.03)",
                      borderRadius: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: 700,
                        color: "#a78bfa",
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {n}
                    </div>
                    <div
                      style={{
                        fontSize: "10px",
                        color: "rgba(255,255,255,0.3)",
                        marginTop: "3px",
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>

              {/* Interests */}
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: "10px",
                  }}
                >
                  Interests
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {userData?.interests?.map((i) => (
                    <span
                      key={i}
                      style={{
                        padding: "4px 10px",
                        borderRadius: "100px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontSize: "11px",
                        color: "rgba(255,255,255,0.55)",
                      }}
                    >
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
          {/* Buttons */}
          <div style={{ padding: "0 20px 8px" }}>
            {token && (
              <>
                <Link
                  className="flex justify-center items-centert w-full text-center"
                  href={"/my-profile"}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    color: "#a78bfa",
                    fontSize: "13px",
                    fontWeight: 600,
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: "8px",
                    transition: "background .15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(139,92,246,0.22)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(139,92,246,0.12)")
                  }
                >
                  Edit Profile
                </Link>
              </>
            )}

            {!token ? (
              <div className="mt-20">
                <h1 className="text-center font-bold text-[16px] uppercase pb-3">
                  Welcome to Our Note App
                </h1>
                <Link
                  href="/login"
                  className="w-full flex justify-center items-center "
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    background: "rgba(202,122,92,0.08)",
                    border: "1px solid rgba(202,122,92,0.25)",
                    color: "#CA7A5C",
                    fontSize: "13px",
                    fontWeight: 500,
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: "20px",
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(202,122,92,0.15)";
                    e.currentTarget.style.borderColor = "rgba(202,122,92,0.4)";
                    e.currentTarget.style.color = "#CA7A5C";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(202,122,92,0.08)";
                    e.currentTarget.style.borderColor = "rgba(202,122,92,0.25)";
                    e.currentTarget.style.color = "#CA7A5C";
                  }}
                >
                  Login
                </Link>
              </div>
            ) : (
              <>
                <div
                  onClick={() => logOut()}
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    color: "rgba(255,255,255,0.35)",
                    fontSize: "13px",
                    fontWeight: 500,
                    textAlign: "center",
                    cursor: "pointer",
                    marginBottom: "20px",
                    transition: "all .15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(239,68,68,0.08)";
                    e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)";
                    e.currentTarget.style.color = "#f87171";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.35)";
                  }}
                >
                  Sign Out
                </div>
              </>
            )}
          </div>
        </aside>
      </>
    </>
  );
};
