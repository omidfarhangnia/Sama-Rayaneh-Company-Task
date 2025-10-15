"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const fontTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Vazirmatn, Roboto, sans-serif",
  },
});

export default function Template({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={fontTheme}>{children}</ThemeProvider>;
}
