import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { FaChevronUp } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { PiArrowElbowRightDownFill } from "react-icons/pi";
import { FaPlus } from "react-icons/fa6";
import { SubTaskType, taskType } from "@/app/lib/zustand";

// type SubTaskType = {
//   id: string;
//   title: string;
//   isComplete: boolean;
//   isSubtask: boolean;
// };
// type taskType = {
//   id: string;
//   title: string;
//   isComplete: boolean;
//   subTaskList: SubTaskType[];
//   isSubtask: boolean;
// };
type AddTaskItemType = {
  actualTask: taskType;
  subTaskList: SubTaskType[];
  //   focusedMain: boolean;
  index: number;
  setTaskList: React.Dispatch<React.SetStateAction<taskType[]>>;
};
const AddTaskItem = ({
  actualTask,
  subTaskList,
  index,
  setTaskList,
}: AddTaskItemType) => {
  const [subTaskTitle, setSubTaskTitle] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const [openSubtask, setOpenSubtask] = useState(false);
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

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

  return (
    <div className="shadow rounded-2xl py-1 bg-gray-200 px-4 w-full flex flex-col ">
      <div className="flex justify-between items-center ">
        <div className="flex items-center">
          <button
            onClick={deleteTask}
            className="  bg-opacity-50 text-gray-400 text-md p-1 rounded-md  "
          >
            <FaRegTrashAlt />
          </button>{" "}
          <h1 className="ml-2 w-[70%]">
            <strong className="mr-1">{index}. </strong> {actualTask.title}
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
      <div>
        {dropDown && (
          <>
            <div className=" pl-8 mt-2 flex flex-col gap-1 ">
              {actualTask.subTaskList?.map((item, index) => (
                //   <AddModalTaskItem key={item.id} item={item} />
                // <div className="pl-8" key={item.id}>
                <div
                  key={item.id}
                  className="shadow p-1 flex justify-between bg-gray-100 px-4 w-full rounded-full"
                >
                  <div className="flex gap-2 ">
                    <button
                      onClick={() => deleteSubTask(item.id)}
                      className="  bg-opacity-50 text-gray-400 text-md  rounded-md  "
                    >
                      <FaRegTrashAlt />
                    </button>{" "}
                    <h1 className=" w-[70%] text-sm flex gap-1">
                      <strong className="">{index + 1}. </strong>
                      {item?.title}
                    </h1>
                  </div>
                </div>
                // </div>
              ))}
            </div>
            <div className="pl-8 ">
              {(openSubtask || !false) && (
                <form onSubmit={handleSubmitSubTask}>
                  <div className=" flex items-center ">
                    <input
                      required
                      type="text"
                      placeholder="Enter subtask"
                      className="shadow  py-1 px-4 w-full my-2  text-sm rounded-full"
                      value={subTaskTitle}
                      onFocus={onFocus}
                      onBlur={onBlur}
                      autoFocus={focused}
                      onChange={(e) => setSubTaskTitle(e.target.value)}
                    />
                    {/* <button className=" bg-gray-800 w-[40px] text-gray-100 text-sm p-2  rounded-md  ">
                          +
                        </button> */}
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