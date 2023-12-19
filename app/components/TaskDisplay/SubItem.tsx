"ues client";

import { SubTaskType, taskType, usePersistStore } from "@/app/lib/zustand";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const SubItem = ({
  subTask,
  isEditMode,
  isFinishEdit,
  taskId,
  editTaskId,
  actualTask,
  doesItHaveSubtasks,
  isThisTheEditedTask,
}: {
  subTask: SubTaskType;
  isEditMode: boolean;
  isFinishEdit: boolean;
  taskId: string;
  editTaskId: string;
  actualTask: taskType;
  doesItHaveSubtasks: boolean;
  isThisTheEditedTask: boolean;
}) => {
  const [titleSubEdit, setTitleSubEdit] = useState(subTask.title);
  const { tasksMain, setTaskMain } = usePersistStore();
  useEffect(() => {
    setTimeout(() => {
      if (doesItHaveSubtasks && subTask.title !== titleSubEdit) {
        const taskListInner = actualTask.subTaskList.map((item) => {
          if (item.id === subTask.id) {
            return { ...item, title: titleSubEdit };
          } else {
            return item;
          }
        });
        const newTask = tasksMain.map((taskInner) => {
          if (taskInner.id === editTaskId) {
            const taskListNew = taskInner.taskList.map((item) => {
              return { ...item, subTaskList: taskListInner };
            });
            return { ...taskInner, taskList: taskListNew };
          } else {
            return taskInner;
          }
        });

        setTaskMain(newTask);
      }
    }, 500);
  }, [titleSubEdit]);
  return (
    <div className="flex gap-2 items-center justify-center pl-2 py-2 border-b border-t  border-opacity-5 rounded-lg  cursor-pointer hover:bg-slate-400 hover:bg-opacity-10 ">
      {isFinishEdit && isThisTheEditedTask ? (
        <>
          <button
            // onClick={deleteTask}
            className="  bg-opacity-50 text-gray-400 text-sm rounded-md  "
          >
            <FaRegTrashAlt />
          </button>{" "}
          <input
            type="text"
            className=" w-full rounded-xl p-1 px-2 mr-4"
            value={titleSubEdit}
            onChange={(e) => setTitleSubEdit(e.target.value)}
          />
        </>
      ) : (
        <>
          <input type="checkbox" className="" />
          <label className="w-full text-medium  text-gray-00">{subTask.title}</label>
        </>
      )}
    </div>
  );
};

export default SubItem;
