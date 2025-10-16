import { Vazirmatn } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import "./style/globals.css";
import StoreProvider from "./components/storeProvider";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "تسک شرکت سما رایانه",
  description: "این یک تسک برای شرکت سما رایانه است",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body>
        {/* StoreProvider is for MUI */}
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          {/* StoreProvider is for RTK */}
          <StoreProvider>{children}</StoreProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
