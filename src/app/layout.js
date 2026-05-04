import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/hooks/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import SettingsProvider from "@/hooks/SettingsProvider";

const openSans = localFont({
  src: [
    {
      path: "./fonts/OpenSans-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/OpenSans-Regular.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/OpenSans-Regular.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-open-sans",
});

const futuraSans = localFont({
  src: [
    {
      path: "/fonts/FuturaLT-Book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/FuturaLT-BookOblique.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "/fonts/FuturaLT-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/FuturaLT-LightOblique.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "/fonts/FuturaLT.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-futura-sans",
});

export const metadata = {
  title: "Ny Morgen",
  description: "Created by Ny morgen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${openSans.variable} ${futuraSans.variable} antialiased`}
      >
        <AuthProvider>
          <SettingsProvider>
            <main>{children}</main>
          </SettingsProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
{
  /* <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script> */
}
