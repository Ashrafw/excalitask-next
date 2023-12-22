import React, { useEffect, useState } from "react";
import TaskWithSubItem from "./TaskWithSubItem";
import TaskItem from "./TaskItem";
import { MainTaskType, usePersistStore } from "@/app/lib/zustand";
import { IoIosExpand } from "react-icons/io";
import { HiMiniArrowsPointingIn } from "react-icons/hi2";
import { MdOutlineMoreVert } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdReturnLeft } from "react-icons/io";
import AddSingleTask from "../AddSingleTask/AddSingleTask";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type TaskDisplayType = {
  task: MainTaskType;
  editTaskId: string;
  setEditTaskId: React.Dispatch<React.SetStateAction<string>>;
  isThisTheEditedTask: boolean;
};

const TaskDisplay = ({
  task,
  editTaskId,
  setEditTaskId,
  isThisTheEditedTask,
}: TaskDisplayType) => {
  const { tasksMain, setTaskMain } = usePersistStore();

  const [isShown, setIsShown] = useState(false);
  const [addSingleTask, setAddSingleTask] = useState(false);
  const [dataAll, setDataAll] = useState<MainTaskType[]>(tasksMain);
  const [isFinishEdit, setIsFinishEdit] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState(task.title);
  const handleCategoryChange = () => {
    const newTask = tasksMain.map((taskInner) => {
      if (taskInner.id === editTaskId) {
        // Update the tasklist for the specific object
        return { ...taskInner, title: categoryEdit };
      } else {
        return taskInner;
      }
    });
    setTaskMain(newTask);
  };
  const [animationParent] = useAutoAnimate();
  useEffect(() => {
    setTimeout(() => {
      const newTask = tasksMain.map((taskInner) => {
        if (taskInner.id === editTaskId) {
          // Update the tasklist for the specific object
          return { ...taskInner, title: categoryEdit };
        } else {
          return taskInner;
        }
      });
      setTaskMain(newTask);
    }, 600);
  }, [categoryEdit]);
  const handleFinishEdit = () => {
    if (categoryEdit !== task.title) handleCategoryChange();
    setIsFinishEdit(false);
  };

  const handleDeleteAll = (id: string) => {
    const newTaskAfterDelete = tasksMain.filter((item) => item.id !== id);
    setTaskMain(newTaskAfterDelete);
  };

  if (task) {
    return (
      <div className=" relative shadow-xl rounded  bg-gray-50  min-w-[340px] ">
        {isFinishEdit && isThisTheEditedTask ? (
          <div className="  rounded-tl rounded-tr border-slate-800 px-2 py-2  bg-gray-700 text-gray-800 flex justify-between items-center gap-4">
            <input
              type="text"
              className=" w-full rounded p-1 px-2"
              value={categoryEdit}
              onChange={(e) => setCategoryEdit(e.target.value)}
            />
            <button
              onClick={() => setIsFinishEdit(false)}
              className=" bg-gray-200  text-gray-500 text-2xl rounded p-1"
            >
              <IoMdReturnLeft />
            </button>
          </div>
        ) : (
          <div className="  rounded-tl rounded-tr border-slate-800 px-2 py-2  bg-gray-700 text-gray-200 flex justify-between items-center gap-4">
            <h1 className=" font-semibold  px-2 ">{task.title}</h1>
            <button
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
              onClick={() => {
                setEditTaskId(task.id);
                setIsFinishEdit(true);
              }}
              className=" bg-gray-800 text-2xl rounded p-1 "
            >
              <MdOutlineMoreVert />
            </button>
          </div>
        )}

        <div className="flex flex-col text-[18px] gap-1 p-2 py-2" ref={animationParent}>
          {task.taskList?.map((item) => {
            return item?.isSubtask ? (
              <TaskWithSubItem
                key={item.id}
                task={item}
                mainTaskId={task.id}
                isEditMode={editTaskId === task.id}
                editTaskId={editTaskId}
                setEditTaskId={setEditTaskId}
                isFinishEdit={isFinishEdit}
                setIsFinishEdit={setIsFinishEdit}
                isThisTheEditedTask={isThisTheEditedTask}
              />
            ) : (
              <TaskItem
                key={item.id}
                task={item}
                mainTaskId={task.id}
                isEditMode={editTaskId === task.id}
                editTaskId={editTaskId}
                setEditTaskId={setEditTaskId}
                isFinishEdit={isFinishEdit}
                setIsFinishEdit={setIsFinishEdit}
                isThisTheEditedTask={isThisTheEditedTask}
              />
            );
          })}
        </div>

        {isFinishEdit && isThisTheEditedTask ? (
          <>
            <div className=" flex items-center px-4 py-2 rounded-b gap-4 w-full justify-center bg-gray-200 text-gray-50 cursor-pointer text-lg">
              <button
                onClick={handleFinishEdit}
                className="bg-slate-500 min-w-[120px] shadow text-gray-50 py-1 px-4 text-[14px] rounded-lg "
              >
                Save changes
              </button>
              <button
                onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}
                onClick={() => {
                  handleDeleteAll(task.id);
                  setIsFinishEdit(true);
                }}
                className=" bg-slate-500 min-w-[120px] shadow text-gray-50 py-1 px-4 text-[14px] rounded-lg flex items-center justify-center gap-2 "
              >
                <FaRegTrashAlt />
                <p>Delete all</p>
              </button>
            </div>
            {/* <AddSingleTask taskId={task.id} setAddSingleTask={setAddSingleTask} /> */}
          </>
        ) : (
          <>
            {addSingleTask ? (
              <AddSingleTask taskId={task.id} setAddSingleTask={setAddSingleTask} />
            ) : (
              <div
                onClick={() => setAddSingleTask(true)}
                className=" flex gap-2 items-center px-4 py-2 hover:bg-slate-400 hover:bg-opacity-10 cursor-pointer text-lg"
              >
                +
              </div>
            )}
          </>
        )}
      </div>
    );
  }
};

export default TaskDisplay;
