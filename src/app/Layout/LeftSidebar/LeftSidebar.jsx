"use client";
import { GlobalData } from "@/app/(site)/globalDataProvider";
import Link from "next/link";
import React, { useContext, useState } from "react";

export const LeftSidebar = () => {
  const { token, userData } = useContext(GlobalData);
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


  const NAV_ITEMS = [
    {
      label: "Home",
      badge: "10+",
      link: "/",
      active: true,
      iconD: "M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",
    },
  ];
  const NAV_ITEMS_END = [
    {
      label: "About",
      badge: "",
      link: "/about",
      active: false,
      iconD: "M12 8h.01M11 12h1v4h1M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z",
    },
    {
      label: "Contact",
      badge: "",
      link: "/contact",
      active: false,
      iconD: "M21 8V7l-3 2-2-2-5 4-4-3-3 2v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1z",
    },
  ];
  const NAV_ITEMS_USER = [
    {
      label: "My Note List",
      badge: "",
      link: "/my-note-list",
      active: false,
      iconD: "M4 4h16v16H4z M8 8h8M8 12h8M8 16h5",
    },
    {
      label: "My Profile",
      badge: "0",
      link: "/my-profile",
      active: true,
      iconD: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 8a7 7 0 0 1 14 0",
    },
    {
      label: "Add Notes",
      badge: "01",
      link: "/add-notes",
      active: true,
      iconD: "M12 5v14M5 12h14 M4 4h10l6 6v10a2 2 0 0 1-2 2H4z",
    },
  ];
  const NAV_ITEMS_ADMIN = [
    {
      label: "Add User",
      badge: "1",
      link: "/add-user",
      active: true,
      iconD: "M16 11V7a4 4 0 1 0-8 0v4M12 11v6M9 14h6M4 20a8 8 0 0 1 16 0",
    },
    {
      label: "User List",
      badge: "10+",
      link: "/user-list",
      active: true,
      iconD:
        "M17 21v-2a4 4 0 0 0-3-3.87M7 21v-2a4 4 0 0 1 3-3.87M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6 4a3 3 0 1 0-2-5.83M6 11a3 3 0 1 1 2-5.83",
    },
    {
      label: "Note List",
      link: "/note-list",
      badge: "10+",
      active: true,
      iconD: "M4 4h16v16H4z M8 8h8M8 12h8M8 16h5",
    },
    {
      label: "Group by interests",
      link: "/group-by-interests",
      badge: "10+",
      active: true,
      iconD:
        "M17 21v-2a4 4 0 0 0-3-3.87M7 21v-2a4 4 0 0 1 3-3.87M12 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm6 4a3 3 0 1 0-2-5.83M6 11a3 3 0 1 1 2-5.83",
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
          ></div>
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
          <Link
            href={item?.link}
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
          </Link>
        ))}

        {userData?.role === "admin" &&
          NAV_ITEMS_ADMIN?.map((item) => (
            <Link
              href={item?.link}
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
                  activeNav === item.label
                    ? "#a78bfa"
                    : "rgba(255,255,255,0.45)",
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
            </Link>
          ))}
        {userData?.role === "user" &&
          NAV_ITEMS_USER?.map((item) => (
            <Link
              href={item?.link}
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
                  activeNav === item.label
                    ? "#a78bfa"
                    : "rgba(255,255,255,0.45)",
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
            </Link>
          ))}
        {NAV_ITEMS_END.map((item) => (
          <Link
            href={item?.link}
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
          </Link>
        ))}
      </aside>
    </>
  );
};
