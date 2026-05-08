import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "./provider";


export const metadata: Metadata = {
  title: "MyShopkeeper",
  description: "A shopkeeper that gives your whatever you want.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* <script src="https://cdn.lordicon.com/lordicon.js"></script> */}
        </head>
        <ReduxProvider>
        <body
          className={` antialiased bg-white`}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
        </ReduxProvider>
      </html>
    </ClerkProvider>
  );
}
