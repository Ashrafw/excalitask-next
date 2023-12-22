"use client";
import { MainTaskType, taskType, usePersistStore } from "@/app/lib/zustand";
import { FaRegTrashAlt } from "react-icons/fa";
import React, { useEffect, useState } from "react";

const TaskItem = ({
  task,
  mainTaskId,
  isEditMode,
  editTaskId,
  setEditTaskId,
  isFinishEdit,
  setIsFinishEdit,
  isThisTheEditedTask,
}: {
  task: taskType;
  mainTaskId: string;
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
    setTaskMain(newTask);
  };
  const updateTaskCompletion = (targetComplete: boolean) => {
    const newTask = tasksMain.map((taskInner) => {
      if (taskInner.id === mainTaskId) {
        // Update the tasklist for the specific object
        const taskListInner = taskInner.taskList.map((item) => {
          if (item.id === task.id) {
            return { ...item, isComplete: targetComplete };
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
  };

  return (
    <div className="flex gap-2 items-center py-[6px] px-2 border-b border-opacity-5 h-[43px] hover:bg-slate-400 hover:bg-opacity-10 ">
      {isFinishEdit && isThisTheEditedTask ? (
        <>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="flex items-center justify-center w-[30px] h-[30px] text-sm  text-gray-400 p-2  rounded bg-gray-200 hover:bg-gray-300  "
          >
            <FaRegTrashAlt />
          </button>
          <input
            type="text"
            className=" w-full rounded px-2 border"
            value={titleEdit}
            onChange={(e) => setTitleEdit(e.target.value)}
          />
        </>
      ) : (
        <>
          {/* <input type="checkbox" className=" m-2 my-[9px]" /> */}
          <div className="flex items-center justify-center w-[30px] h-[30px] mr-[13px] ">
            <input
              type="checkbox"
              className=" mt-1 ml-1 p-0 m-0"
              checked={task.isComplete}
              onChange={(e: any) => updateTaskCompletion(e.target.checked)}
            />
          </div>
          <label className="w-full text-medium text-gray-900 ">{task.title}</label>
        </>
      )}
    </div>
  );
};

export default TaskItem;
