"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GlobalData } from "./globalDataProvider";
import { WindowLoading } from "@/Shared/Loading/WindowLoading/WindowLoading";

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContext(GlobalData);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login");
    }
  }, [loading, token, router]);

  if (loading) {
    return <WindowLoading />; 
  }

  if (!token) {
    return null; 
  }

  return <>{children}</>;
};

export default PrivateRoute;
