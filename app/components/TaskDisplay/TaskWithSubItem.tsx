"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SubItem from "./SubItem";
import { IoIosArrowUp } from "react-icons/io";

import { FaRegTrashAlt } from "react-icons/fa";
import { taskType, usePersistStore } from "@/app/lib/zustand";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const TaskWithSubItem = ({
  task,
  mainTaskId,
  isEditMode,
  editTaskId,
  setEditTaskId,
  isFinishEdit,
  setIsFinishEdit,
  isThisTheEditedTask,
  isLastItem,
}: {
  task: taskType;
  mainTaskId: string;
  isEditMode: boolean;
  editTaskId: string;
  setEditTaskId: React.Dispatch<React.SetStateAction<string>>;
  isFinishEdit: boolean;
  setIsFinishEdit: React.Dispatch<React.SetStateAction<boolean>>;
  isThisTheEditedTask: boolean;
  isLastItem: boolean;
}) => {
  const [titleEdit, setTitleEdit] = useState(task.title);
  const { tasksMain, setTaskMain } = usePersistStore();
  const [isDropDown, setIsDropDown] = useState(true);
  const [animationChild] = useAutoAnimate();

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

  useEffect(() => {
    if (isThisTheEditedTask && isFinishEdit) {
      setIsDropDown(true);
    }
  }, [isFinishEdit, isThisTheEditedTask]);
  return (
    <div className=" rounded border -mt-[2px] bg-slate-50 ">
      <div
        className={`flex gap-2 items-center cursor-pointer py-[6px] h-[43px] px-2 justify-between border-b  hover:bg-slate-400 hover:bg-opacity-10  ${
          !isDropDown ? "bg-slate-200" : ""
        }`}
        onClick={() => setIsDropDown((prev) => !prev)}
      >
        {isFinishEdit && isThisTheEditedTask ? (
          <div className=" flex ">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className=" text-sm  text-gray-400 p-2  rounded bg-gray-200 hover:bg-gray-300 mr-2 "
            >
              <FaRegTrashAlt />
            </button>
            <input
              type="text"
              className=" w-full rounded border px-2 "
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
            />
          </div>
        ) : (
          <div className={`flex `} onClick={() => setIsDropDown((prev) => !prev)}>
            {/* <input type="checkbox" className=" m-2 my-[9px]" /> */}
            <div className=" h-[2px] w-[66px]"></div>
            <label className="w-full text-medium text-gray-900 ml-[8px]">
              {task.title}
            </label>
          </div>
        )}
        <div className=" flex justify-center items-center cursor-pointer p-2 rounded ">
          {isDropDown ? (
            <button
              disabled={isThisTheEditedTask && isFinishEdit}
              // onClick={() => setIsDropDown(false)}
            >
              <IoIosArrowUp />
            </button>
          ) : (
            <button
            // disabled={!(isThisTheEditedTask && isFinishEdit)}
            // onClick={() => setIsDropDown(true)}
            >
              <IoIosArrowDown />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col ml-8 p-0  border-l text-[16px] " ref={animationChild}>
        {isDropDown
          ? task.subTaskList?.map((item, i) => (
              <SubItem
                key={item.id}
                subTask={item}
                mainTaskId={mainTaskId}
                isEditMode={isEditMode}
                isFinishEdit={isFinishEdit}
                taskId={task.id}
                actualTask={task}
                editTaskId={editTaskId}
                doesItHaveSubtasks={task.isSubtask}
                isThisTheEditedTask={isThisTheEditedTask}
                isLastSubItem={task.subTaskList.length === i + 1}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default TaskWithSubItem;
