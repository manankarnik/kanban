import { FaPlus } from "react-icons/fa";
import { Montserrat } from "next/font/google";
import DarkModeToggle from "./DarkModeToggle";
import SearchBar from "./SearchBar";

const headingFont = Montserrat({ subsets: ["latin"], weight: "600" });

function Header() {
  return (
    <header className="p-4 flex justify-between items-center text-2xl font-bold">
      <h1 className={headingFont.className}>Kanban Board</h1>
      <div className="flex gap-4 text-lg">
        <SearchBar />
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
