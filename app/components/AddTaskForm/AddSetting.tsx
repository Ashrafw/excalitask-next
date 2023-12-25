import React from "react";

type AddSettingType = {
  theme: string;
  fontStyle: string;
  prefix: string;
  handleFont: (fontStyle: string) => void;
  handleTheme: (theme: string) => void;
  handlePrefix: (prefix: string) => void;
};

const AddSetting = ({
  prefix,
  theme,
  fontStyle,
  handleFont,
  handleTheme,
  handlePrefix,
}: AddSettingType) => {
  return (
    <div>
      <div className=" border-b-2  border-b-zinc-700  pb-2">
        {/* <h2 className=" text pb-2 pt-1 font-semibold">Theme</h2> */}
        <div className=" flex gap-2 items-center justify-between">
          <h1>Theme: </h1>
          <button
            onClick={() => handleTheme("bg-slate-700")}
            className={` w-12 h-6 bg-slate-700 rounded border ${
              theme === "bg-slate-700" ? " ring-2 ring-blue-500" : ""
            }`}
            // " w-12 h-6 bg-slate-700 rounded ring-4 ring-blue-500"
          ></button>
          <button
            onClick={() => handleTheme("bg-neutral-900")}
            className={` w-12 h-6 bg-neutral-900 rounded border ${
              theme === "bg-neutral-900" ? " ring-2 ring-blue-500" : ""
            }`}
          ></button>
          <button
            onClick={() => handleTheme("bg-cyan-800")}
            className={` w-12 h-6 bg-cyan-800 rounded border ${
              theme === "bg-cyan-800" ? " ring-2 ring-blue-500" : ""
            }`}
          ></button>
          <button
            onClick={() => handleTheme("bg-emerald-700")}
            className={` w-12 h-6 bg-emerald-700 rounded border ${
              theme === "bbg-emerald-700" ? " ring-2 ring-blue-500" : ""
            }`}
          ></button>
          <button
            onClick={() => handleTheme("bg-rose-900")}
            className={` w-12 h-6 bg-rose-900 rounded border ${
              theme === "bg-rose-900" ? " ring-2 ring-blue-500" : ""
            }`}
          ></button>
          <button
            onClick={() => handleTheme("bg-pink-700")}
            className={` w-12 h-6 bg-pink-700 rounded border ${
              theme === "bg-pink-700" ? " ring-2 ring-blue-500" : ""
            }`}
          ></button>
        </div>
      </div>
      <div className="mt-2">
        {/* <h2 className=" text pb-2 font-semibold">Font Style</h2> */}
        <div className=" grid grid-cols-3 gap-y-2 gap-x-2 text-sm items-center">
          <button
            onClick={() => handleFont("font-poppins")}
            className={`w- font-poppins ${
              fontStyle === "font-poppins" ? " ring-2 ring-blue-500" : ""
            } border rounded shadow-sm p-1 px-2 bg-zinc-100`}
          >
            Font Style
          </button>
          <button
            onClick={() => handleFont("font-playpen")}
            className={`w- font-playpen ${
              fontStyle === "font-playpen" ? " ring-2 ring-blue-500" : " "
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100`}
          >
            Font Style
          </button>
          <button
            onClick={() => handleFont("font-mali")}
            className={`w- font-mali ${
              fontStyle === "font-mali" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100 `}
          >
            Font Style
          </button>
          {/* <button
            onClick={() => handleFont("font-rokkitt")}
            className={` font-rokkitt ${
              fontStyle === "font-rokkitt" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100  `}
          >
            Font Style
          </button> */}
          {/* <button
            onClick={() => handleFont("font-ubuntu")}
            className={` font-ubuntu ${
              fontStyle === "font-ubuntu" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100  `}
          >
            Font Style
          </button>{" "} */}
          {/* <button
            onClick={() => handleFont("font-rubik")}
            className={` font-rubik ${
              fontStyle === "font-rubik" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100  `}
          >
            Font Style
          </button>{" "} */}
          {/* <button
            onClick={() => handleFont("font-raj")}
            className={` font-raj ${
              fontStyle === "font-raj" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100  `}
          >
            Font Style
          </button>{" "} */}
          <button
            onClick={() => handleFont("font-mplus")}
            className={` font-mplus ${
              fontStyle === "font-mplus" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100  `}
          >
            Font Style
          </button>{" "}
          {/* <button
            onClick={() => handleFont("font-orbit")}
            className={` font-orbit ${
              fontStyle === "font-orbit" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100  `}
          >
            Font Style
          </button>{" "} */}
          <button
            onClick={() => handleFont("font-philosopher")}
            className={` font-philosopher ${
              fontStyle === "font-philosopher" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100  `}
          >
            Font Style
          </button>{" "}
          {/* <button
            onClick={() => handleFont("font-fahkwang")}
            className={` font-fahkwang ${
              fontStyle === "font-fahkwang" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100  `}
          >
            Font Style
          </button>{" "} */}
          {/* <button
            onClick={() => handleFont("font-upright")}
            className={` font-upright ${
              fontStyle === "font-upright" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100  `}
          >
            Font Style
          </button>{" "} */}
          <button
            onClick={() => handleFont("font-lora")}
            className={` font-lora ${
              fontStyle === "font-lora" ? " ring-2 ring-blue-500" : ""
            }  border rounded shadow-sm p-1 px-2 bg-zinc-100  `}
          >
            Font Style
          </button>{" "}
        </div>
      </div>
      <div className="mt-2  border-t-zinc-700 border-t-2">
        {/* <h2 className=" text pb-2 font-semibold">Font Style</h2> */}
        <div className=" grid grid-cols-3 gap-y-2 gap-x-2 text-sm mt-2 items-center">
          <button
            onClick={() => handlePrefix("none")}
            className={` border rounded shadow-sm p-1 px-2 bg-zinc-100  ${
              prefix === "none" ? " ring-2 ring-blue-500" : ""
            }`}
          >
            No prefix
          </button>
          <button
            onClick={() => handlePrefix("letters")}
            className={`w-  border rounded shadow-sm p-1 px-2 bg-zinc-100  ${
              prefix === "letters" ? " ring-2 ring-blue-500" : ""
            }`}
          >
            a. b. c. d.
          </button>
          <button
            onClick={() => handlePrefix("numbers")}
            className={`  border rounded shadow-sm p-1 px-2 bg-zinc-100   ${
              prefix === "numbers" ? " ring-2 ring-blue-500" : ""
            }`}
          >
            1. 2. 3. 4.
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSetting;
