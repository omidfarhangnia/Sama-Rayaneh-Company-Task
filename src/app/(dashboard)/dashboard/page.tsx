"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/app/lib/axios";
import Typography from "@mui/material/Typography";

function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <Typography variant="h4" sx={{ m: "30px" }}>
        به صفحه داشبورد خوش آمدید
      </Typography>
    </div>
  );
}

export default Dashboard;
