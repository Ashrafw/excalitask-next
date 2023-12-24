"use client";
import { MainTaskType, SubTaskType, taskType, usePersistStore } from "@/app/lib/zustand";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";

import React, { useEffect, useState } from "react";
import { letters } from "@/app/helper/helper";

const TaskItem = ({
  task,
  mainTaskId,
  isEditMode,
  editTaskId,
  setEditTaskId,
  isFinishEdit,
  setIsFinishEdit,
  isThisTheEditedTask,
  isLastItem,
  index,
  prefix,
  theme,
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
  index: number;
  prefix: string;
  theme: string;
}) => {
  const [actualSelectedTask, setActualSelectedTask] = useState(task);
  const [taskList, setTaskList] = useState([]);
  const [subTaskList, setSubTaskList] = useState<SubTaskType[]>([]);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [titleEdit, setTitleEdit] = useState(task.title);
  const { tasksMain, setTaskMain } = usePersistStore();
  const [focused, setFocused] = useState(false);
  const [openSubtask, setOpenSubtask] = useState(false);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
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

  const checkPrefix = (pref: string, index: number) => {
    if (letters[index]) {
      return `${letters[index]}. `;
    } else {
      return "";
    }
  };

  const handleSubmitSubTask = (e: any) => {
    e.preventDefault();
    console.log("taskList before", taskList);
    setSubTaskList((prev: SubTaskType[]): any => {
      return [
        ...prev,
        {
          id: uuidv4(),
          title: subTaskTitle,
          isComplete: false,
          isSubtask: true,
        },
      ];
    });
    const newTask = tasksMain.map((taskInner) => {
      if (taskInner.id === mainTaskId) {
        // Update the tasklist for the specific object
        const taskListInner = taskInner.taskList.map((item) => {
          if (item.id === task.id) {
            return {
              ...item,
              isSubtask: true,
              subTaskList: [
                ...item.subTaskList,
                {
                  id: uuidv4(),
                  title: subTaskTitle,
                  isComplete: false,
                  isSubtask: true,
                },
              ],
            };
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
    console.log("taskList after", taskList);
    setSubTaskTitle("");
  };
  const handleFinal = () => {
    const newTask = tasksMain.map((taskInner) => {
      if (taskInner.id === mainTaskId) {
        // Update the tasklist for the specific object
        const taskListInner = taskInner.taskList.map((item) => {
          if (item.id === task.id) {
            return {
              ...item,
              isSubtask: true,
              subTaskList: [
                ...item.subTaskList,
                {
                  id: uuidv4(),
                  title: subTaskTitle,
                  isComplete: false,
                  isSubtask: true,
                },
              ],
            };
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
  // useEffect(() => {
  //   if (isSaveAllClick) {
  //     handleFinal();
  //     setIsSaveAllClick(false);
  //   }
  // }, [isSaveAllClick]);

  console.log("task.id ", task.id);
  console.log("taskList ", taskList);

  return (
    <div
      className={`flex gap-2 items-center py-[4px] px-2  cursor-pointer border-opacity-5  hover:bg-slate-400 hover:bg-opacity-10 border-b`}
      onClick={() =>
        !(isFinishEdit && isThisTheEditedTask)
          ? updateTaskCompletion(!task.isComplete)
          : null
      }
    >
      {isFinishEdit && isThisTheEditedTask ? (
        <div className=" w-full">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="flex items-center justify-center w-[30px] h-[30px] text-sm  text-gray-400 p-2  rounded bg-gray-200 hover:bg-gray-300  "
            >
              <FaRegTrashAlt />
            </button>
            <input
              type="text"
              className=" w-[100%] rounded px-2 border text-lg"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
            />

            <button
              onClick={() => {
                onFocus();
                setOpenSubtask((prev) => !prev);
                // setDropDown((prev) => !prev);
              }}
              // className="   text-gray-500 text-md p-1 px-2 rounded-md  bg-gray-200 shadow "
              className="flex items-center justify-center w-[30px] h-[30px] text-sm  text-gray-400 p-2 rounded bg-gray-200 hover:bg-gray-300  "
            >
              <FaPlus />
            </button>
          </div>
          <div className="pl-8 flex flex-col gap-1 mt-1">
            {subTaskList.map((item) => (
              <div className="flex gap-2 border ">
                <button
                  onClick={() =>
                    setSubTaskList((prev) =>
                      subTaskList.filter((val) => val.id !== item.id)
                    )
                  }
                  className="flex items-center justify-center w-[30px] h-[30px] text-sm  text-gray-400 p-2  rounded bg-gray-200 hover:bg-gray-300  "
                >
                  <FaRegTrashAlt />
                </button>
                <h2>{item.title}</h2>
              </div>
            ))}
            {openSubtask && (
              <form onSubmit={handleSubmitSubTask}>
                <div className=" flex items-center gap-1 mb-2 ">
                  <input
                    required
                    type="text"
                    placeholder="Add a subtask"
                    className=" border-2 py-1 px-4 w-full text-base rounded"
                    value={subTaskTitle}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    autoFocus={focused}
                    onChange={(e) => setSubTaskTitle(e.target.value)}
                  />
                  <button
                    className={`  w-[40px] ${theme} text-gray-100 text-sm p-1 rounded h-[32px]  `}
                  >
                    <FaPlus />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          {/* <input type="checkbox" className=" m-2 my-[9px]" /> */}
          <div className="flex items-center  cursor-pointer justify-center w-[30px] h-[30px] mr-[13px] ">
            <input
              type="checkbox"
              className={` h-4 w-4 mt-1 ml-1 p-0 m-0 accent-slate-600`}
              checked={task.isComplete}
              // onChange={(e: any) => updateTaskCompletion(e.target.checked)}
            />
          </div>
          <label
            className={`w-full  text-lg cursor-pointer  text-gray-900  ${
              task.isComplete
                ? "  decoration-[2px] decoration-slate-800/25 text-gray-900/25"
                : " "
            } `}
          >
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
    </div>
  );
};

export default TaskItem;
