"use client";
import React, { useState } from "react";
import { getDateFormatStart } from "../../helper/helper";
import { MdModeEdit } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { taskType, usePersistStore } from "@/app/lib/zustand";
import AddSingleSubTask from "./AddSingleSubTask";

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
    <div className="  p-2 border-2 border-slate-700 rounded-2xl flex flex-col gap-2">
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
      <form onSubmit={handleSubmitTask}>
        <input
          //   ref={searchInput}
          //   onFocus={onFocus}
          //   onBlur={onBlur}
          required
          type="text"
          placeholder="Enter task"
          className="shadow rounded-full p-1  px-4 w-full"
          autoFocus
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        {/* <button className=" bg-gray-800 w-[40px] text-gray-100 text-xl p-2 rounded-md  ">
                    +
                  </button> */}
      </form>
      <form onSubmit={handleSubmitAll}>
        <button
          // onClick={() => setNumArr((prev) => [...prev, mainTaskTemplate])}
          className=" w-full bg-gray-300 rounded-md p-1 mt-4"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddSingleTask;
