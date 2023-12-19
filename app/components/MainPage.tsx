"use client";
import { MainTaskType, usePersistStore } from "@/app/lib/zustand";
import React, { useEffect, useState } from "react";
import TaskDisplay from "./TaskDisplay/TaskDisplay";

const MainPage = () => {
  const { tasksMain, setTaskMain } = usePersistStore();
  const [data, setData] = useState<MainTaskType[]>();
  const [editTaskId, setEditTaskId] = useState<string>("");

  useEffect(() => {
    if (tasksMain) setData(tasksMain);
  }, [tasksMain]);

  return (
    <div className="flex flex-wrap items-start justify-center gap-4 p-2 px-4">
      {data?.map((tasks) => (
        <TaskDisplay
          key={tasks.id}
          task={tasks}
          editTaskId={editTaskId}
          setEditTaskId={setEditTaskId}
          isThisTheEditedTask={editTaskId === tasks.id}
        />
      ))}
    </div>
  );
};

export default MainPage;