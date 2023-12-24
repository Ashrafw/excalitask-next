import React, { useState } from "react";
import { IoMenuOutline } from "react-icons/io5";

const MainMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [themeColor, setThemeColor] = useState("");
  const [textSize, setTextSize] = useState("");
  const [fontStyle, setFontStyle] = useState("");
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={` p-2 flex justify-center items-center rounded bg-white  hover:bg-slate-100 text-2xl`}
      >
        <IoMenuOutline />
      </button>
      {isOpen ? (
        <div className=" absolute bg-zinc-100 mt-2 p-2 rounded-md w-[260px] flex flex-col gap-4">
          <div>
            <h2 className=" text-lg pb-2">Theme</h2>
            <div className=" flex gap-2 items-center">
              <button className=" w-12 h-6 bg-slate-700 rounded ring-4 ring-slate-400"></button>
              <button className=" w-12 h-6 bg-yellow-500 rounded"></button>
              <button className=" w-12 h-6 bg-red-500 rounded"></button>
              <button className=" w-12 h-6 bg-sky-500 rounded"></button>
              <button className=" w-12 h-6 bg-pink-500 rounded"></button>
            </div>
          </div>
          <div>
            <h2 className=" text-lg pb-2">Font Style</h2>
            <div className=" grid grid-cols-2 gap-y-2 gap-x-4 text-md items-center">
              <button className="w- font-poppins border rounded shadow-sm p-1 px-2 bg-zinc-100 ring-2 ring-slate-400">
                Excalitask
              </button>
              <button className="w- font-rokkitt border rounded shadow-sm p-1 px-2 bg-zinc-100">
                Excalitask
              </button>
              <button className="w- font-architects border rounded shadow-sm p-1 px-2 bg-zinc-100 text-lg">
                Excalitask
              </button>
              <button className="w- font-swanky border rounded shadow-sm p-1 px-2 bg-zinc-100  text-xl">
                Excalitask
              </button>
              {/* <button className=" w- font-shadows border rounded shadow-sm p-1 px-2 bg-zinc-100  text-lg">
                Excalitask
              </button> */}
              {/* <button className="w- font-gluten border rounded shadow-sm p-1 px-2 bg-zinc-100">
                Excalitask
              </button> */}
            </div>
          </div>
          <div></div>
        </div>
      ) : null}
    </div>
  );
};

export default MainMenu;
