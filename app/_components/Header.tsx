"use client";
import { FaPlus } from "react-icons/fa";
import { Montserrat } from "next/font/google";
import SearchBar from "./SearchBar";
import { ReactNode, useContext, useState } from "react";
import PopupCard from "./PopupCard";
import useInput from "../_hooks/useInput";
import { ContainersContext, RemoveContext } from "./Home";
import DarkModeToggle from "./DarkModeToggle";
import { v4 as uuidv4 } from "uuid";

const headingFont = Montserrat({ subsets: ["latin"], weight: "600" });


function Header() {
  const [showPopup, setShowPopup] = useState(false);
  const [containerName, onInputContainerName, setContainerName] = useInput("");
  const { containers, setContainers } = useContext(ContainersContext);
  const { remove, setRemove } = useContext(RemoveContext);
  const addItem = () => {
    setContainers([
      ...containers,
      { id: uuidv4(), title: containerName, elements: [] },
    ]);
    closePopup();
  };
  const closePopup = () => {
    setContainerName("");
    setShowPopup(false);
  };
  return (
    <>
      <header className="max-w-[300px] mx-auto sm:max-w-none z-10 sticky top-0 bg-slate-100 dark:bg-slate-800">
        <div className="py-4 sm:px-4 flex justify-between items-center gap-4 text-2xl">
          <h1 className={`font-bold ${headingFont.className}`}>Kanbanxt</h1>
          <div className="flex gap-4 text-lg">
            <div className="hidden sm:flex gap-4">
              <label className="text-lg inline-flex cursor-pointer items-center gap-4">
                <div className="text-slate-400">Delete</div>
                <div className="relative">
                    <input id="switch" checked={remove} onChange={() => setRemove(!remove)} type="checkbox" className="peer sr-only" />
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-600 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-500 peer-checked:after:translate-x-full peer-checked:after:bg-red-300"></div>
                </div>
              </label>
              <SearchBar />
            </div>
            <button
              onClick={() => setShowPopup(true)}
              className="hidden sm:flex px-4 py-2 gap-2 rounded-md items-center whitespace-nowrap text-white bg-teal-700 hover:bg-teal-600"
            >
              <FaPlus className="inline w-4 h-4" />
              <span>Container</span>
            </button>
            <DarkModeToggle />
            {showPopup ? (
              <PopupCard
                title="Add Container"
                closePopup={closePopup}
                action={addItem}
              >
                <div className="my-4 sm:flex gap-4 items-center">
                  <label className="whitespace-nowrap text-lg" htmlFor="containerName">
                    Container Name
                  </label>
                  <input
                    className="w-full rounded-md border-0 p-2 text-black dark:text-white bg-slate-200 dark:bg-slate-600 ring-1 ring-inset ring-slate-300 dark:ring-slate-800 leading-6 focus-within:ring-2 focus-within:ring-teal-700 dark:focus-within:ring-teal-600 outline-0"
                    type="text"
                    name="containerName"
                    id="containerName"
                    autoFocus={true}
                    value={containerName}
                    onInput={onInputContainerName}
                  />
                </div>
              </PopupCard>
            ) : null}
          </div>
        </div>
      </header>
      <div className="max-w-[300px] mx-auto sm:hidden">
        <div className="my-4 flex gap-4">
          <label className="w-full text-lg flex cursor-pointer items-center gap-4">
            <div className="text-slate-400">Delete</div>
            <div className="relative">
              <input id="switch" checked={remove} onChange={() => setRemove(!remove)} type="checkbox" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-slate-200 dark:bg-slate-600 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-500 peer-checked:after:translate-x-full peer-checked:after:bg-red-300">
              </div>
            </div>
          </label>
          <button
            onClick={() => setShowPopup(true)}
            className="flex sm:hidden w-full px-4 py-2 gap-2 rounded-md justify-center items-center whitespace-nowrap text-white bg-teal-700 hover:bg-teal-600"
          >
            <FaPlus className="inline w-4 h-4" />
            <span>Container</span>
          </button>
        </div>
        <SearchBar />
      </div>
    </>
  );
}

export default Header;
