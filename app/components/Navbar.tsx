"use client";
import { useState } from "react";
import { FaFont } from "react-icons/fa";
import Image from "next/image";
import logo from "../../public/logo.png";
import AddTaskForm from "./AddTaskForm/AddTaskForm";
import MainMenu from "./Menu/MainMenu";
const Navbar = ({
  openAddTask,
  setOpenAddTask,
}: {
  openAddTask: boolean;
  setOpenAddTask: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleAddTask = () => {};
  return (
    <div>
      <div
        className={`flex w-[95%] m-auto items-center justify-between my-4   ${
          openAddTask ? "blur" : ""
        }`}
      >
        <MainMenu />

        {/* <div className={`  `}> */}
        <button
          onClick={() => setOpenAddTask((prev) => !prev)}
          className={` w-[40px] h-[40px] flex justify-center items-center rounded bg-white  hover:bg-slate-100 text-2xl`}
        >
          +
        </button>
        {/* <button className=" w-[50px] h-[50px] flex justify-center items-center rounded-lg hover:bg-slate-200">
          <FaFont />
        </button> */}
        {/* </div> */}
        <button>ds</button>
      </div>

      {openAddTask && <AddTaskForm setOpenAddTask={setOpenAddTask} />}
    </div>
  );
};

export default Navbar;
