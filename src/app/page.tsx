"use client";

import Typography from "@mui/material/Typography";
import Btn from "./components/btn";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthResponse {
  status: number;
  data: {
    result: {
      credential: string;
    };
  };
}

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response: AuthResponse = await axios.get(
        "https://api.samateb.ir/API/Interview/Auth"
      );

      if (response.status === 200) {
        const jwtToken = response.data.result.credential;
        document.cookie = `token=${jwtToken}; path=/`;
        router.push("/dashboard");
      } else {
      }
    } catch (error) {
      console.log(error);
      alert("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-gray-400 flex gap-8 flex-col items-center justify-center">
        <Typography
          variant="h1"
          className="text-[2rem] md:text-[2.5rem] max-w-[500px] text-center"
        >
          سلام! به تسک شرکت سما رایانه خوش آمدید.
        </Typography>
        <Btn
          disabled={loading}
          label={loading ? "در حال ورود" : "وارد به سیستم"}
          handleClick={handleLogin}
        />
      </div>
    </>
  );
}
