"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import Btn from "../components/btn";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "../lib/hook";
import { logout } from "../lib/features/auth/authSlice";
import Typography from "@mui/material/Typography";
import Link from "next/link";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar className="flex justify-between min-h-[100px]">
          <Typography variant="h6" component={"div"} className="select-none">
            داشبورد
          </Typography>
          <Btn
            label="خروج از داشبورد"
            disabled={false}
            handleClick={handleLogout}
          />
        </Toolbar>
      </AppBar>
      <div className="flex flex-col md:flex-row items-center md:h-[calc(100vh-100px)] bg-gray-200">
        <nav className="flex flex-col w-full md:w-[20%] bg-gray-800 md:h-full text-white p-4 space-y-2">
          <Link href="/dashboard">
            <div
              className={`px-4 py-3 rounded-lg bg-gray-900 transition duration-150 cursor-pointer ${
                pathname === "/dashboard" ? "!bg-blue-600" : ""
              }`}
            >
              داشبورد اصلی
            </div>
          </Link>

          <Link href="/patient-management">
            <div
              className={`px-4 py-3 rounded-lg bg-gray-900 transition duration-150 cursor-pointer ${
                pathname === "/patient-management" ? "!bg-blue-600" : ""
              }`}
            >
              مدیریت بیماران
            </div>
          </Link>
        </nav>
        <main className="md:h-[calc(100vh-100px)] md:w-[80%]">{children}</main>
      </div>
    </>
  );
}

export default Layout;
