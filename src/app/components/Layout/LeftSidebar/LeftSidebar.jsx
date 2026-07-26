"use client";
import React, { useState } from "react";

export const LeftSidebar = () => {
  const Icon = ({ d, size = 14 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );

  const ShieldIcon = () => (
    <Icon size={16} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  );

  // ─── Sample Data ──────────────────────────────────────────────────────

  const NAV_ITEMS = [
    {
      label: "Home",
      badge: "24",
      active: true,
      iconD: "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
    },
    {
      label: "My Notes",
      badge: "6",
      active: true,
      iconD:
        "M6 2h7l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm2 9h8M8 13h8M8 17h5",
    },
    {
      label: "Pinned",
      badge: "3",
      active: false,
      iconD:
        "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    },
    {
      label: "Tags",
      active: false,
      iconD:
        "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z",
    },
    {
      label: "Activity",
      active: false,
      iconD: "M23 6L13.5 15.5 8.5 10.5 1 18 M17 6L23 6 23 12",
    },
  ];
  const [activeNav, setActiveNav] = useState("My Notes");

  return (
    <>
      <aside
        style={{
          background: "#0a0a12",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "20px 18px 16px",
            display: "flex",
            alignItems: "center",
            gap: "9px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: "linear-gradient(135deg,#7c3aed,#a78bfa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <ShieldIcon />
          </div>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "16px",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Note App
          </span>
        </div>

        {/* Nav */}
        <div
          style={{
            padding: "16px 12px 8px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Menu
        </div>
        {NAV_ITEMS.map((item) => (
          <div
            key={item.label}
            onClick={() => setActiveNav(item.label)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 14px",
              margin: "2px 8px",
              borderRadius: "8px",
              cursor: "pointer",
              background:
                activeNav === item.label
                  ? "rgba(139,92,246,0.18)"
                  : "transparent",
              color:
                activeNav === item.label ? "#a78bfa" : "rgba(255,255,255,0.45)",
              fontSize: "14px",
              fontWeight: 500,
              transition: "all .15s",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={item.iconD} />
            </svg>
            {item.label}
            {item.badge && (
              <span
                style={{
                  marginLeft: "auto",
                  background: "rgba(139,92,246,0.25)",
                  color: "#a78bfa",
                  fontSize: "12px",
                  fontFamily: "'JetBrains Mono', monospace",
                  padding: "2px 6px",
                  borderRadius: "4px",
                }}
              >
                {item.badge}
              </span>
            )}
          </div>
        ))}

        <div
          style={{
            padding: "16px 12px 8px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: ".1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          Workspace
        </div>
        {[
          {
            label: "My Profile",
            d: "M20 21a8 8 0 1 0-16 0M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
          },
          {
            label: "Help",
            d: "M12 18h.01M9.09 9a3 3 0 1 1 5.83 1c0 2-3 3-3 3M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z",
          },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "9px 14px",
              margin: "2px 8px",
              borderRadius: "8px",
              cursor: "pointer",
              color: "rgba(255,255,255,0.4)",
              fontSize: "14px",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={item.d} />
            </svg>
            {item.label}
          </div>
        ))}

        {/* User mini */}
        <div
          style={{
            marginTop: "auto",
            padding: "14px 12px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              padding: "8px 10px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "linear-gradient(135deg,#7c3aed,#f59e0b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              RH
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Rahim Hossain
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                user · free
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
