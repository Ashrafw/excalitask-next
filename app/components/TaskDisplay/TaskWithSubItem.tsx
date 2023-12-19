"use client";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SubItem from "./SubItem";
import { FaRegTrashAlt } from "react-icons/fa";
import { taskType, usePersistStore } from "@/app/lib/zustand";
const TaskWithSubItem = ({
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
  return (
    <div className="">
      <div className="flex gap-2 items-center justify-between px-4 py-2 border-b  border-opacity-5  cursor-pointer hover:bg-slate-400 hover:bg-opacity-10 ">
        {isFinishEdit && isThisTheEditedTask ? (
          <div className=" flex">
            <button
              // onClick={deleteTask}
              className="  bg-opacity-50 text-gray-400 text-sm rounded-md mr-2 "
            >
              <FaRegTrashAlt />
            </button>
            <input
              type="text"
              className=" w-full rounded-xl p-1 px-2"
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
            />
          </div>
        ) : (
          <div>
            <input type="checkbox" className=" p-2  mr-2" />
            <label className="w-full text-medium text-gray-900">{task.title}</label>
          </div>
        )}
        <IoIosArrowDown />
      </div>
      <div className="flex flex-col ml-8 border-l rounded-lg text-[16px] ">
        {task.subTaskList?.map((item) => (
          <SubItem
            key={item.id}
            subTask={item}
            isEditMode={isEditMode}
            isFinishEdit={isFinishEdit}
            taskId={task.id}
            actualTask={task}
            editTaskId={editTaskId}
            doesItHaveSubtasks={task.isSubtask}
            isThisTheEditedTask={isThisTheEditedTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskWithSubItem;
