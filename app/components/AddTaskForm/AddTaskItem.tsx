import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { SubTaskType, taskType } from "@/app/lib/zustand";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { letters } from "@/app/helper/helper";

type AddTaskItemType = {
  actualTask: taskType;
  subTaskList: SubTaskType[];
  //   focusedMain: boolean;
  index: number;
  setTaskList: React.Dispatch<React.SetStateAction<taskType[]>>;

  theme: string;
  fontStyle: string;
  prefix: string;
};
const AddTaskItem = ({
  actualTask,
  subTaskList,
  index,
  setTaskList,
  theme,
  fontStyle,
  prefix,
}: AddTaskItemType) => {
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [openSubtask, setOpenSubtask] = useState(false);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);
  const [animationParent1] = useAutoAnimate();
  const [animationParent2] = useAutoAnimate();

  const handleSubmitSubTask = (e: any) => {
    e.preventDefault();

    setTaskList((prev: taskType[]): any => {
      return prev.map((task) => {
        if (task.id === actualTask.id) {
          // Update the tasklist for the specific object
          return {
            ...task,
            isSubtask: true,
            subTaskList: [
              ...task.subTaskList,
              {
                id: uuidv4(),
                title: subTaskTitle,
                isComplete: false,
                isSubtask: true,
              },
            ],
          };
        } else {
          return task;
        }
      });
    });
    setSubTaskTitle("");
  };

  const deleteTask = (e: any) => {
    setTaskList((prev: taskType[]): any => {
      return prev.filter((task) => task.id !== actualTask.id);
    });
  };
  const deleteSubTask = (id: string) => {
    setTaskList((prev: taskType[]): any => {
      return prev.map((task) => {
        if (task.id === actualTask.id) {
          const newTask = task.subTaskList.filter((subtaskItem) => subtaskItem.id !== id);
          return { ...task, subTaskList: newTask };
        } else {
          return task;
        }
      });
    });
  };

  const checkPrefix = (pref: string, index: number) => {
    if (letters[index]) {
      return `${letters[index]}. `;
    } else {
      return "";
    }
  };
  return (
    <div className="border rounded py-1 bg-gray-100 px-4 w-full flex flex-col ">
      <div className="flex justify-between items-center ">
        <div className="flex items-center">
          <button
            onClick={deleteTask}
            className="  bg-opacity-50 text-gray-400 text-md p-1 rounded-md mr-1 "
          >
            <FaRegTrashAlt />
          </button>{" "}
          <h1 className="ml-2 text-lg w-full">
            {`${
              prefix === "none"
                ? ""
                : prefix === "numbers"
                ? `${index}. `
                : checkPrefix(prefix, index)
            }`}
            {actualTask.title}
          </h1>
        </div>

        {actualTask.subTaskList?.length > 0 ? (
          <button
            onClick={() => {
              onFocus();
              //   setOpenSubtask((prev) => !prev);
              setDropDown((prev) => !prev);
            }}
            className="   text-gray-600 text-md p-1 px-2 rounded-md bg-gray-200 shadow  "
          >
            {dropDown ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        ) : (
          <button
            onClick={() => {
              onFocus();
              setOpenSubtask((prev) => !prev);
              setDropDown((prev) => !prev);
            }}
            className="   text-gray-500 text-md p-1 px-2 rounded-md  bg-gray-200 shadow "
          >
            <FaPlus />
          </button>
        )}
      </div>
      <div ref={animationParent2}>
        {dropDown && (
          <>
            <div className=" pl-8 mt-2 flex flex-col gap-1 " ref={animationParent1}>
              {actualTask.subTaskList?.map((item, index) => (
                <div
                  key={item.id}
                  className="border-2 p-1 flex justify-between bg-gray-100 px-4 w-full rounded "
                >
                  <div className="flex gap-2 ">
                    <button
                      onClick={() => deleteSubTask(item.id)}
                      className="  bg-opacity-50 text-gray-400 text-md  rounded-md mr-2  "
                    >
                      <FaRegTrashAlt />
                    </button>{" "}
                    <h1 className=" w-full text-base flex gap-1">
                      {/* {`${
                        prefix === "numbers"
                          ? `${index + 1}. `
                          : prefix === "letters"
                          ? checkPrefix(prefix, index)
                          : ""
                      }`}{" "} */}
                      {item?.title}
                    </h1>
                  </div>
                </div>
              ))}
            </div>
            <div className="pl-8 ">
              {(openSubtask || !false) && (
                <form onSubmit={handleSubmitSubTask}>
                  <div className=" flex items-center gap-1 ">
                    <input
                      required
                      type="text"
                      placeholder="Enter subtask"
                      className=" border-2 py-1 px-4 w-full my-2 text-base rounded"
                      value={subTaskTitle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      autoFocus={focused}
                      onChange={(e) => setSubTaskTitle(e.target.value)}
                    />
                    <button
                      className={` ${theme} w-[40px] text-gray-100 text-sm p-1 rounded h-[30px]  `}
                    >
                      +
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddTaskItem;
