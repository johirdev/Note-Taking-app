/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { createContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { WindowLoading } from "../Shared/Loading/WindowLoading/WindowLoading";
import MaintenancePage from "../Layout/Loading/Maintenance";

export const GlobalData = createContext();

export default function GlobalDataProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null); // decoded token
  const [userInfo, setUserInfo] = useState(null); // full DB user
  const [loading, setLoading] = useState(true);
  const [windowLoading, setWindowLoading] = useState(false); // manual loader

  // ----------------------------
  // Load Token & Decode
  // ----------------------------
  const loadToken = useCallback(() => {
    const savedToken = Cookies.get("token");
    if (!savedToken) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(savedToken);
      const now = Date.now() / 1000;

      // Token expired?
      if (decoded.exp && decoded.exp < now) {
        Cookies.remove("token");
        setToken(null);
        setUserData(null);
      } else {
        setToken(savedToken);
        setUserData(decoded);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      Cookies.remove("token");
      setToken(null);
      setUserData(null);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") loadToken();
  }, [loadToken]);

  // ----------------------------
  // Login Handler
  // ----------------------------
  const saveToken = (newToken) => {
    Cookies.set("token", newToken, { expires: 60, secure: true });

    try {
      const decoded = jwtDecode(newToken);
      setToken(newToken);
      setUserData(decoded);
    } catch (e) {
      console.error("Token decode failed:", e);
    }

    window.location.href = "/";
  };

  // ----------------------------
  // Logout
  // ----------------------------
  const logOut = () => {
    Cookies.remove("token");
    setToken(null);
    setUserData(null);
    window.location.href = "/login";
  };

  if (loading || windowLoading) {
    return (
      <div>
        <WindowLoading />
      </div>
    );
  }


  return (
    <GlobalData.Provider
      value={{
        token,
        userData,
        userInfo,
        saveToken,
        logOut,
        loading,
        setLoading,
        windowLoading,
        setWindowLoading,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
}
