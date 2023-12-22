"use client";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import { useState } from "react";

export default function Home() {
  const [openAddTask, setOpenAddTask] = useState(false);

  return (
    <div className={` bg-gray-200 text-gray-950 w-screen min-h-screen flex flex-col  `}>
      <Navbar openAddTask={openAddTask} setOpenAddTask={setOpenAddTask} />
      <div className={`${openAddTask ? "blur" : ""}`}>
        <MainPage />
      </div>
    </div>
  );
}
