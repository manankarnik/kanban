"use client";
import { FaPlus } from "react-icons/fa";
import { Montserrat } from "next/font/google";
import SearchBar from "./SearchBar";
import { ReactNode, useContext, useState } from "react";
import PopupCard from "./PopupCard";
import useInput from "../_hooks/useInput";
import { ContainersContext } from "./Home";

const headingFont = Montserrat({ subsets: ["latin"], weight: "600" });

type HeaderProps = { children: ReactNode };

function Header({ children }: HeaderProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [containerName, onInputContainerName, setContainerName] = useInput("");
  const { containers, setContainers } = useContext(ContainersContext);
  const addItem = () => {
    setContainers([...containers, { title: containerName, elements: [] }]);
    closePopup();
  };
  const closePopup = () => {
    setContainerName("");
    setShowPopup(false);
  };
  return (
    <header className="p-4 flex justify-between items-center text-2xl font-bold">
      <h1 className={headingFont.className}>Kanban Board</h1>
      <div className="flex gap-4 text-lg">
        <SearchBar />
        <button
          onClick={() => setShowPopup(true)}
          className="flex px-4 py-2 gap-2 rounded-md items-center whitespace-nowrap text-white bg-teal-700 hover:bg-teal-600"
        >
          <FaPlus className="inline w-4 h-4" />
          <span>Add Container</span>
        </button>
        {children}
        {showPopup ? (
          <PopupCard
            title="Add Container"
            closePopup={closePopup}
            addItem={addItem}
          >
            <div className="my-4 flex gap-4 items-center">
              <label className="text-lg" htmlFor="containerName">
                Container Name
              </label>
              <input
                className="rounded-md border-0 p-2 text-black dark:text-white bg-gray-200 dark:bg-gray-600 ring-1 ring-inset ring-gray-300 dark:ring-gray-800 leading-6 focus-within:ring-2 focus-within:ring-teal-700 dark:focus-within:ring-teal-600 outline-0"
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
    </header>
  );
}

export default Header;
