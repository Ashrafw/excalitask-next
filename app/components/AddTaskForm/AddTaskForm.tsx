"use client";
import React, { useState } from "react";
import { getDateFormatStart } from "../../helper/helper";
import { MdModeEdit } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import AddTaskItem from "./AddTaskItem";
import { taskType, usePersistStore } from "@/app/lib/zustand";

type AddModalTypes = {
  setOpenAddTask: React.Dispatch<React.SetStateAction<boolean>>;
};
const AddTaskForm = ({ setOpenAddTask }: AddModalTypes) => {
  const [category, setCategory] = useState(getDateFormatStart());
  const [taskTitle, setTaskTitle] = useState("");
  const [editCat, setEditCat] = React.useState(false);
  const [taskList, setTaskList] = useState<taskType[]>([]);
  const { tasksMain, setTaskMain } = usePersistStore();

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
      },
    ]);
    setOpenAddTask(false);
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
        className={` relative max-w-[520px]  shadow-2xl w-[90%]  bg-gray-400 text-black z-40 p-4 rounded-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 bg-gray-50 shadow-md p-2 rounded-lg">
            <form onSubmit={handleSubmitCategory}>
              {editCat ? (
                <input
                  type="text"
                  placeholder="Task category"
                  className="shadow rounded-lg p-2 px-4 w-full"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              ) : (
                <label className=" bg-gray-700 px-4 py-2 rounded-lg  text-gray-100 flex justify-between items-center">
                  {category}
                  <button
                    onClick={() => setEditCat(true)}
                    className=" bg-gray-500 p-1 rounded"
                  >
                    <MdModeEdit />
                  </button>
                </label>
              )}
            </form>
            <div className="flex flex-col gap-2">
              {taskList.map((item, index) => (
                <AddTaskItem
                  key={item.id}
                  actualTask={item}
                  subTaskList={item.subTaskList}
                  index={index + 1}
                  setTaskList={setTaskList}
                />
              ))}
            </div>
            <form className=" mt-2 flex items-center gap-1 " onSubmit={handleSubmitTask}>
              <input
                ref={searchInput}
                //   onFocus={onFocus}
                //   onBlur={onBlur}
                required
                type="text"
                placeholder="Enter task"
                className="border rounded p-2 px-4 w-full"
                autoFocus
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <button className=" bg-gray-700 w-[40px] text-gray-100 text-lg p-1 rounded h-[40px]  ">
                +
              </button>
            </form>
          </div>
        </div>
        <div className=" flex gap-1 items-center mt-4  h-[40px] ">
          <button
            onClick={handleCancel}
            className=" w-1/2 bg-gray-100   p-1 rounded h-full "
          >
            Cancel
          </button>

          <form className=" w-1/2  h-full" onSubmit={handleSubmitAll}>
            <button
              // onClick={() => setNumArr((prev) => [...prev, mainTaskTemplate])}
              className=" w-full bg-gray-700 text-gray-100  rounded p-1  h-full"
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
