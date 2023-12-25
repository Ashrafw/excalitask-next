"use client";
import { useEffect, useState } from "react";
import { FaFont } from "react-icons/fa";
import Image from "next/image";
import logo from "../../public/logo.png";
import AddTaskForm from "./AddTaskForm/AddTaskForm";
import MainMenu from "./Menu/MainMenu";
import { usePersistStore } from "../lib/zustand";
import { FiPlus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Navbar = ({
  openAddTask,
  setOpenAddTask,
}: {
  openAddTask: boolean;
  setOpenAddTask: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const { tasksMain, setTaskMain } = usePersistStore();
  const [animationAlert] = useAutoAnimate();

  const handleAddTask = () => {};
  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3500);
    }
  }, [showAlert]);

  return (
    <div>
      <div
        className={`flex w-[95%] m-auto items-center justify-center my-4   ${
          openAddTask ? "blur" : ""
        }`}
        ref={animationAlert}
      >
        {/* <MainMenu /> */}

        {/* <div className={`  `}> */}
        <button
          onClick={() => {
            if (tasksMain.length > 2) {
              setShowAlert(true);
            } else {
              setOpenAddTask((prev) => !prev);
            }
          }}
          className={`
          relative w-[45px] h-[45px] flex justify-center shadow-lg items-center font- rounded bg-white  hover:bg-slate-100 text-2xl`}
        >
          <FaPlus />
          {showAlert && (
            <div className=" z-50 absolute top-full --translate-x-[10px] w-[220px] shadow-md border-slate-400 text-base rounded translate-y-[8px]">
              <div className=" rounded-lg  bg-slate-50 p-2">
                You can only have 3 main tasks.
              </div>
            </div>
          )}
        </button>
        {/* <button className=" w-[50px] h-[50px] flex justify-center items-center rounded-lg hover:bg-slate-200">
          <FaFont />
        </button> */}
        {/* </div> */}
      </div>

      {openAddTask && <AddTaskForm setOpenAddTask={setOpenAddTask} />}
    </div>
  );
};

export default Navbar;
