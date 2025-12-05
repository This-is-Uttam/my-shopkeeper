"use client";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const notify = (e: string) => toast(e);
  return (
    <div>
      <main>
        Main Content
        <button onClick={() => notify("toastify succesfull")}>Notify!</button>
      </main>
      <ToastContainer />
    </div>
  );
}
