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
  focusedSubtask,
  setFocusedSubtask,
  onFocusSubtask,
  onBlurSubtask,
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
  focusedSubtask: boolean;
  setFocusedSubtask: React.Dispatch<React.SetStateAction<boolean>>;
  onFocusSubtask: () => void;
  onBlurSubtask: () => void;
}) => {
  const [actualSelectedTask, setActualSelectedTask] = useState(task);
  const [taskList, setTaskList] = useState([]);
  const [subTaskList, setSubTaskList] = useState<SubTaskType[]>([]);
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [titleEdit, setTitleEdit] = useState(task.title);
  const { tasksMain, setTaskMain } = usePersistStore();
  const [openSubtask, setOpenSubtask] = useState(false);
  const [focused, setFocused] = useState(false);

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

  const checkPrefix = (pref: string, index: number) => {
    if (letters[index]) {
      return `${letters[index]}. `;
    } else {
      return "";
    }
  };

  const handleSubmitSubTask = (e: any) => {
    e.preventDefault();
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
                // ...item.subTaskList,
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

  const handleChecked = (e: any) => {
    e.preventDefault();
    // console.log("e.target", e.target);/
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
  const handleAccent = () => {
    if (theme === "bg-slate-700") {
      return "accent-[#334155]";
    } else if (theme === "bg-neutral-900") {
      return "accent-[#171717b2]";
    } else if (theme === "bg-cyan-800") {
      return "accent-[#155E75]";
    } else if (theme === "bg-emerald-700") {
      return "accent-[#047857]";
    } else if (theme === "bg-rose-900") {
      return "accent-[#881337]";
    } else if (theme === "bg-pink-700") {
      return "accent-[#BE185E]";
    } else {
      return "accent-slate-700";
    }
  };
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
                onFocusSubtask();
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
                <h2 className=" ">{item.title}</h2>
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
                    onFocus={onFocusSubtask}
                    onBlur={onBlurSubtask}
                    autoFocus={focusedSubtask}
                    onChange={(e) => setSubTaskTitle(e.target.value)}
                  />
                  <button
                    className={`  w-[40px] ${theme} text-gray-100 text-sm p-1 rounded h-[32px]  flex items-center justify-center `}
                  >
                    <FaPlus />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleChecked} className="flex gap-2 items-center">
          {/* <input type="checkbox" className=" m-2 my-[9px]" /> */}
          <div className="flex items-center  cursor-pointer justify-center w-[30px] h-[30px] mr-[13px] ">
            <input
              type="checkbox"
              className={` h-4 w-4 mt-1 ml-1 p-0 m-0 accent-slate-60 ${handleAccent()}`}
              checked={task.isComplete}
              onChange={(e: any) => updateTaskCompletion(e.target.checked)}
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
        </form>
      )}
    </div>
  );
};

export default TaskItem;
