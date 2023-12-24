"ues client";

import { SubTaskType, taskType, usePersistStore } from "@/app/lib/zustand";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const SubItem = ({
  subTask,
  mainTaskId,
  isEditMode,
  isFinishEdit,
  taskId,
  editTaskId,
  actualTask,
  doesItHaveSubtasks,
  isThisTheEditedTask,
  isLastSubItem,
}: {
  subTask: SubTaskType;
  mainTaskId: string;
  isEditMode: boolean;
  isFinishEdit: boolean;
  taskId: string;
  editTaskId: string;
  actualTask: taskType;
  doesItHaveSubtasks: boolean;
  isThisTheEditedTask: boolean;
  isLastSubItem: boolean;
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
  const handleDeleteSubTaskNew = (id: string) => {
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

  const handleDeleteSubTask = (id: string) => {
    const theEditedTask = tasksMain.filter((taskInner) => taskInner.id === editTaskId)[0];
    const newTaskMain = theEditedTask.taskList.map((task) => {
      if (task.id === taskId) {
        if (task.subTaskList.filter((innerSub) => innerSub.id !== id).length > 0) {
          return {
            ...task,
            subTaskList: task.subTaskList.filter((innerSub) => innerSub.id !== id),
          };
        } else {
          return {
            ...task,
            isSubtask: false,
            subTaskList: task.subTaskList.filter((innerSub) => innerSub.id !== id),
          };
        }
      } else {
        return task;
      }
    });
    const newTaskMainTwo = { ...theEditedTask, taskList: newTaskMain };
    const newVal = tasksMain.map((task) => {
      if (task.id === editTaskId) {
        return newTaskMainTwo;
      } else {
        return task;
      }
    });
    setTaskMain(newVal);
  };

  const updateTaskCompletion = (targetComplete: boolean) => {
    const taskListInner = actualTask.subTaskList.map((item) => {
      if (item.id === subTask.id) {
        return { ...item, isComplete: targetComplete };
      } else {
        return item;
      }
    });
    const newTask = tasksMain.map((taskInner) => {
      if (taskInner.id === mainTaskId) {
        const taskListNew = taskInner.taskList.map((item) => {
          return { ...item, subTaskList: [...taskListInner] };
        });
        return { ...taskInner, taskList: taskListNew };
      } else {
        return taskInner;
      }
    });
    setTaskMain(newTask);
  };
  const handleSubmitSubTask = (e: any) => {
    e.preventDefault();
  };
  return (
    <div
      className={`flex gap-2 items-center h-[38px] px-2  hover:bg-slate-400 hover:bg-opacity-10  ${
        isLastSubItem ? "" : " border-b"
      }`}
      onClick={() =>
        !(isFinishEdit && isThisTheEditedTask)
          ? updateTaskCompletion(!subTask.isComplete)
          : null
      }
    >
      {isFinishEdit && isThisTheEditedTask ? (
        <>
          <button
            onClick={() => handleDeleteSubTask(subTask.id)}
            className=" flex items-center justify-center w-[30px] h-[30px] text-sm  text-gray-400 p-1 rounded bg-gray-200 hover:bg-gray-300 "
          >
            <FaRegTrashAlt />
          </button>
          <input
            type="text"
            className=" w-full rounded px-2 py-[2px] border text-base  "
            value={titleSubEdit}
            onChange={(e) => setTitleSubEdit(e.target.value)}
          />
        </>
      ) : (
        <>
          <div className="flex gap-2 items-center w-full cursor-pointer ">
            <div className="flex items-center justify-center w-[30px] h-[30px] mr-[10px] ">
              <input
                type="checkbox"
                className=" h-[14px] w-[14px] mt-1 ml-1 p-0 m-0 accent-slate-600"
                checked={subTask.isComplete}
                // onChange={(e: any) => updateTaskCompletion(e.target.checked)}
              />
            </div>
            <label
              className={`w-full cursor-pointer text-medium text text-gray-00 py-[2px] text-base  ${
                subTask.isComplete ? " decoration-slate-800 text-gray-900/25" : " "
              } `}
            >
              {subTask.title}
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default SubItem;
