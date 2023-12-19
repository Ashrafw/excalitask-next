"use client";
import { MainTaskType, taskType, usePersistStore } from "@/app/lib/zustand";
import { FaRegTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";

const TaskItem = ({
  task,
  isEditMode,
  editTaskId,
  setEditTaskId,
  isFinishEdit,
  setIsFinishEdit,
  isThisTheEditedTask,
}: {
  task: taskType;
  isEditMode: boolean;
  editTaskId: string;
  setEditTaskId: React.Dispatch<React.SetStateAction<string>>;
  isFinishEdit: boolean;
  setIsFinishEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isThisTheEditedTask: boolean;
}) => {
  const [titleEdit, setTitleEdit] = useState(task.title);
  const { tasksMain, setTaskMain } = usePersistStore();

  useEffect(() => {
    setTimeout(() => {
      if (task.title !== titleEdit) {
        const newTask = tasksMain.map((taskInner) => {
          if (taskInner.id === editTaskId) {
            // Update the tasklist for the specific object

            const taskListInner = taskInner.taskList.map((item) => {
              if (item.id === task.id) {
                return { ...item, title: titleEdit };
              } else {
                return item;
              }
            });
            return { ...taskInner, taskList: taskListInner };
          } else {
            return taskInner;
          }
        });
        setTaskMain(newTask);
      }
    }, 600);
  }, [titleEdit]);

  const handleDeleteTask = (id: string) => {
    const newTask = tasksMain.map((taskInner) => {
      if (taskInner.id === editTaskId) {
        // Update the tasklist for the specific object
        const taskListInner = taskInner.taskList.filter((item) => item.id !== id);
        return { ...taskInner, taskList: taskListInner };
      } else {
        return taskInner;
      }
    });
    console.log("newTask", newTask);
    setTaskMain(newTask);
  };

  return (
    <div className="flex gap-2 items-center  px-4 py-2 border-b border-t rounded-lg border-opacity-5  cursor-pointer hover:bg-slate-400 hover:bg-opacity-10 ">
      {isFinishEdit && isThisTheEditedTask ? (
        <div className="flex gap-2 items-center">
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="  bg-opacity-50 text-gray-400 text-sm rounded-md  "
          >
            <FaRegTrashAlt />
          </button>{" "}
          <input
            type="text"
            className=" w-full rounded-xl p-1 px-2"
            value={titleEdit}
            onChange={(e) => setTitleEdit(e.target.value)}
          />
        </div>
      ) : (
        <>
          <input type="checkbox" className=" p-2" />
          <label className="w-full text-medium text-gray-900">{task.title}</label>
        </>
      )}
    </div>
  );
};

export default TaskItem;
