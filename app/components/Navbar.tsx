"use client";
import { useState } from "react";
import { FaFont } from "react-icons/fa";
import Image from "next/image";
import logo from "../../public/logo.png";
import AddTaskForm from "./AddTaskForm/AddTaskForm";
const Navbar = () => {
  const [openAddTask, setOpenAddTask] = useState(false);

  const handleAddTask = () => {};
  return (
    <div>
      <div className=" bg-white rounded-lg shadow-lg p-2 text-lg flex justify-center gap-2 my-4 w-fit m-auto">
        <button
          onClick={() => setOpenAddTask((prev) => !prev)}
          className=" w-[50px] h-[50px] flex justify-center items-center rounded-lg hover:bg-slate-200 text-3xl"
        >
          +
        </button>
        {/* <button className=" w-[50px] h-[50px] flex justify-center items-center rounded-lg hover:bg-slate-200">
          <FaFont />
        </button> */}
      </div>
      {openAddTask && <AddTaskForm setOpenAddTask={setOpenAddTask} />}
    </div>
  );
};

export default Navbar;
