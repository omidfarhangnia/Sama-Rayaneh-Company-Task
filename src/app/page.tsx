"use client";

import Typography from "@mui/material/Typography";
import Btn from "./components/btn";

export default function Home() {
  return (
    <>
      <div className="w-full h-screen bg-gray-400 flex gap-8 flex-col items-center justify-center">
        <Typography
          variant="h1"
          className="text-[2rem] md:text-[2.5rem] max-w-[500px] text-center"
        >
          سلام! به تسک شرکت سما رایانه خوش آمدید.
        </Typography>
        <Btn label="وارد به سیستم" handleClick={() => console.log("clicked")} />
      </div>
    </>
  );
}
