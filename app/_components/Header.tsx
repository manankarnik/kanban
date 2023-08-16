"use client";
import useInput from "../_hooks/useInput";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Montserrat } from "next/font/google";
import DarkModeToggle from "./DarkModeToggle";

const headingFont = Montserrat({ subsets: ["latin"], weight: "600" });

function Header() {
  const [search, setSearch] = useInput("");
  return (
    <header className="p-4 flex justify-between items-center text-2xl font-bold">
      <h1 className={headingFont.className}>Kanban Board</h1>
      <div className="flex gap-4 text-lg">
        <div className="flex gap-2 items-center w-full rounded-md border-0 p-2 text-gray-900 bg-gray-200 ring-1 ring-inset ring-gray-300 leading-6 focus-within:ring-2 focus-within:ring-teal-700">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={search}
            onChange={setSearch}
            className="bg-transparent placeholder:text-gray-400 outline-0 font-normal"
          />
        </div>
        <button className="flex px-4 py-2 gap-2 rounded-md items-center whitespace-nowrap text-white bg-teal-700 hover:bg-teal-600">
          <FaPlus className="inline w-4 h-4" />
          <span>Create Task</span>
        </button>
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
