"use client";
import React, { useState } from "react";
import { getDateFormatStart } from "../../helper/helper";
import { MdModeEdit } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { taskType, usePersistStore } from "@/app/lib/zustand";
import AddSingleSubTask from "./AddSingleSubTask";
import { FaPlus } from "react-icons/fa6";

const AddSingleTask = ({
  taskId,
  setAddSingleTask,
}: {
  taskId: string;
  setAddSingleTask: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [taskList, setTaskList] = useState<taskType[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const { tasksMain, setTaskMain } = usePersistStore();

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

    // const newTaskA = tasksMain.filter((itemTask) => itemTask.id === taskId)[0].taskList;
    // const newTaskList = [];
    if (taskList.length > 0) {
      const newTask = tasksMain.map((itemTask) => {
        if (itemTask.id === taskId) {
          return { ...itemTask, taskList: [...itemTask.taskList, ...taskList] };
        } else {
          return itemTask;
        }
      });
      setTaskMain(newTask);
    }
    setAddSingleTask(false);
  };

  return (
    <div className="  p-2 border-2 bg-slate-600 rounded-lg flex flex-col gap-2">
      <div className="flex flex-col gap-2 bg-white p-2 rounded">
        {taskList.length > 0 && (
          <div className="flex flex-col gap-2">
            {taskList.map((item, index) => (
              <AddSingleSubTask
                key={item.id}
                actualTask={item}
                subTaskList={item.subTaskList}
                index={index + 1}
                setTaskList={setTaskList}
              />
            ))}
          </div>
        )}
        <form className=" mt-2 flex items-center gap-1 " onSubmit={handleSubmitTask}>
          <input
            //   ref={searchInput}
            //   onFocus={onFocus}
            //   onBlur={onBlur}
            required
            type="text"
            placeholder="Enter task"
            // className="shadow rounded-full p-1  px-4 w-full"
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
      <form onSubmit={handleSubmitAll}>
        <button
          // onClick={() => setNumArr((prev) => [...prev, mainTaskTemplate])}
          className=" w-full bg-gray-50 rounded-md p-1 mt-2 flex justify-center items-center gap-2"
        >
          <div className="flex justify-center items-center  px-4 rounded">
            <p>Save</p>
          </div>
        </button>
      </form>
    </div>
  );
};

export default AddSingleTask;
