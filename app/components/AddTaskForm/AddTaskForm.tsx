"use client";
import React, { useState } from "react";
import { getDateFormatStart } from "../../helper/helper";
import { MdModeEdit } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import AddTaskItem from "./AddTaskItem";
import { taskType, usePersistStore } from "@/app/lib/zustand";
import { IoSettingsSharp } from "react-icons/io5";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import AddSetting from "./AddSetting";

type AddModalTypes = {
  setOpenAddTask: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddTaskForm = ({ setOpenAddTask }: AddModalTypes) => {
  const [category, setCategory] = useState(getDateFormatStart());
  const [taskTitle, setTaskTitle] = useState("");
  const [editCat, setEditCat] = React.useState(false);
  const [isSettingOpen, setIsSettingOpen] = React.useState(false);
  const [taskList, setTaskList] = useState<taskType[]>([]);
  const { tasksMain, setTaskMain } = usePersistStore();
  const [animationParent] = useAutoAnimate();

  const [theme, setTheme] = useState("bg-slate-700");
  const [fontStyle, setFontStyle] = useState("font-poppins");
  const [prefix, setPrefix] = useState("none");

  const searchInput = React.useRef<HTMLInputElement>(null);

  const handleSubmitCategory = (e: any) => {
    e.preventDefault();
    setEditCat(false);
  };

  const handleSubmitTask = (e: any) => {
    e.preventDefault();
    setTaskList((prev) => [
      ...prev,
      {
        id: uuidv4(),
        title: taskTitle,
        isComplete: false,
        subTaskList: [],
        isSubtask: false,
      },
    ]);
    setTaskTitle("");
  };

  const handleSubmitAll = (e: any) => {
    e.preventDefault();
    setTaskMain([
      ...tasksMain,
      {
        id: uuidv4(),
        title: category,
        isComplete: false,
        taskList: taskList,
        isSubtask: false,
        theme: theme,
        fontStyle: fontStyle,
        prefix: prefix,
      },
    ]);
    setOpenAddTask(false);
  };
  const handleTheme = (theTheme: string) => {
    setTheme(theTheme);
  };

  const handleFont = (theFont: string) => {
    setFontStyle(theFont);
  };

  const handlePrefix = (thePrefix: string) => {
    setPrefix(thePrefix);
  };
  const handleCancel = () => {
    setOpenAddTask(false);
  };
  return (
    <div
      className={`absolute w-screen h-screen z-40 top-0 left-0 flex justify-center items-start pt-16 blur-none`}
      //   onClick={() => setOpenAddTask(false)}
    >
      <div
        className={` relative max-w-[400px]  shadow-2xl w-[90%]  bg-gray-200 text-black z-40 p-4 rounded-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 shadow">
          <div
            className={`flex flex-col gap-2 justify-center bg-gray-50 shadow-md p-2 font-semibold rounded-lg ${fontStyle}`}
          >
            <form onSubmit={handleSubmitCategory}>
              {editCat ? (
                <input
                  type="text"
                  placeholder="Task category"
                  className="shadow rounded-lg p-2 px-4 w-full text-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              ) : (
                <label
                  className={` ${theme} px-4 py-2 rounded  text-lg text-gray-100 flex justify-between items-center`}
                >
                  {category}
                  <button
                    onClick={() => setEditCat(true)}
                    className=" bg-white bg-opacity-20 p-1 rounded"
                  >
                    <MdModeEdit />
                  </button>
                </label>
              )}
            </form>
            <div
              className="flex flex-col gap-2 font-normal text-lg"
              ref={animationParent}
            >
              {taskList.map((item, index) => (
                <AddTaskItem
                  key={item.id}
                  actualTask={item}
                  subTaskList={item.subTaskList}
                  index={index + 1}
                  setTaskList={setTaskList}
                  theme={theme}
                  fontStyle={fontStyle}
                  prefix={prefix}
                />
              ))}
            </div>
            <form
              className=" mt-2 flex items-center gap-1  font-normal "
              onSubmit={handleSubmitTask}
            >
              <input
                ref={searchInput}
                //   onFocus={onFocus}
                //   onBlur={onBlur}
                required
                type="text"
                placeholder="Enter task"
                className="border rounded p-2 px-4 w-full text-lg"
                autoFocus
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <button
                className={`  ${theme} w-[40px] text-gray-100 text-lg p-1 rounded h-[40px]  `}
              >
                +
              </button>
            </form>
          </div>
        </div>
        <div
          className=" bg-zinc-100 mt-4 p-2 py-2 rounded-md flex flex-col gap-2 shadow-lg"
          ref={animationParent}
        >
          {/* <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => setIsSettingOpen((prev) => !prev)}
          >
            <h2 className=" pl-2">Setting</h2>
            <IoSettingsSharp
              className={`p-2 text-[32px] rounded  ${theme} text-gray-100 `}
            />
          </div> */}
          {/* {isSettingOpen && ( */}
          <AddSetting
            theme={theme}
            fontStyle={fontStyle}
            prefix={prefix}
            handleTheme={handleTheme}
            handleFont={handleFont}
            handlePrefix={handlePrefix}
          />
          {/* )} */}
        </div>

        <div className=" flex gap-2 items-center mt-4  h-[40px]  ">
          <button
            onClick={handleCancel}
            className=" w-1/2 bg-gray-100   p-1 rounded h-full shadow"
          >
            Cancel
          </button>

          <form className=" w-1/2  h-full" onSubmit={handleSubmitAll}>
            <button
              // onClick={() => setNumArr((prev) => [...prev, mainTaskTemplate])}
              className={` w-full ${theme} text-gray-100  rounded p-1  h-full shadow`}
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskForm;
