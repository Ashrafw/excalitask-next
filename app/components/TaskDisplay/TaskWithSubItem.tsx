"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SubItem from "./SubItem";
import { IoIosArrowUp } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

import { FaRegTrashAlt } from "react-icons/fa";
import { taskType, usePersistStore } from "@/app/lib/zustand";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { letters } from "@/app/helper/helper";
import { FaPlus } from "react-icons/fa6";
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
  theme,
  index,
  prefix,
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
  theme: string;
  index: number;
  prefix: string;
}) => {
  const [titleEdit, setTitleEdit] = useState(task.title);
  const { tasksMain, setTaskMain } = usePersistStore();
  const [isDropDown, setIsDropDown] = useState(true);
  const [subTaskTitle, setSubTaskTitle] = useState("");

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
  const checkPrefix = (pref: string, index: number) => {
    if (letters[index]) {
      return `${letters[index]}. `;
    } else {
      return "";
    }
  };
  const handleSubmitSubTask = (e: any) => {
    e.preventDefault();
    const newSubtaskList = [
      ...task.subTaskList,
      {
        id: uuidv4(),
        title: subTaskTitle,
        isComplete: false,
        isSubtask: true,
      },
    ];

    const newTaskItem = { ...task, subTaskList: newSubtaskList };

    const newTask = tasksMain.map((item) => {
      if (item.id === mainTaskId) {
        const newIsh = item.taskList.map((inTask) => {
          if (inTask.id === task.id) {
            return newTaskItem;
          } else {
            return inTask;
          }
        });

        return { ...item, taskList: newIsh };
      } else {
        return item;
      }
    });
    setTaskMain(newTask);
    setSubTaskTitle("");
  };
  return (
    <div className=" rounded border -mt-[2px] bg-slate-50 w-full ">
      <button
        className={`flex gap-2 ${theme} items- py-[6px] h-[43px] px-2 justify-between border-b w-full  hover:bg-opacity-10  ${
          !isDropDown ? "bg-opacity-25" : " bg-opacity-25"
        }`}
        disabled={isFinishEdit && isThisTheEditedTask}
        onClick={() => setIsDropDown((prev) => !prev)}
      >
        {isFinishEdit && isThisTheEditedTask ? (
          <div className=" flex w-full">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className=" text-sm  text-gray-400 p-2  rounded bg-white/50 hover:bg-white mr-2 "
            >
              <FaRegTrashAlt />
            </button>
            <input
              type="text"
              className=" w-full rounded border px-2 text-lg  cursor-pointer"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
            />
          </div>
        ) : (
          <div className={`flex w-full  cursor-pointer text-start`}>
            {/* <input type="checkbox" className=" m-2 my-[9px]" /> */}
            <div className=" h-[2px] w-[56px] cursor-pointer"></div>
            <label className="w-full text-lg text-gray-900  cursor-pointer">
              {`${
                prefix === "numbers"
                  ? `${index + 1}. `
                  : prefix === "letters"
                  ? checkPrefix(prefix, index)
                  : ""
              }`}

              {task.title}
            </label>
          </div>
        )}
        <div
          className={` flex justify-center items-center cursor-pointer p-2 rounded ${
            isFinishEdit && isThisTheEditedTask ? " opacity-5 " : ""
          }`}
        >
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
      </button>
      <div className="flex flex-col ml-8 p-0  border-l text-base " ref={animationChild}>
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
        {isFinishEdit && isThisTheEditedTask ? (
          <form onSubmit={handleSubmitSubTask}>
            <div className=" flex items-center gap-1 mb-2 p-1">
              <input
                required
                type="text"
                placeholder="Add a subtask"
                className=" border-2 py-1 px-4 w-full text-base rounded"
                value={subTaskTitle}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // autoFocus={focused}
                onChange={(e) => setSubTaskTitle(e.target.value)}
              />
              <button
                className={`w-[40px] ${theme} text-gray-100 flex justify-center items-center text-sm p-1 rounded h-[32px]  `}
              >
                <FaPlus />
              </button>
            </div>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default TaskWithSubItem;
