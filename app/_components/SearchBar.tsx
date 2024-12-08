import React, { useContext } from "react";
import { FaSearch } from "react-icons/fa";
import { SearchContext } from "./Home";

function SearchBar() {
  const { search, setSearch } = useContext(SearchContext);
  return (
    <div className="flex gap-2 items-center w-full rounded-md border-0 p-2 text-black dark:text-white bg-slate-200 dark:bg-slate-600 ring-1 ring-inset ring-slate-300 dark:ring-slate-800 leading-6 focus-within:ring-2 focus-within:ring-teal-700 dark:focus-within:ring-teal-600">
      <FaSearch className="text-slate-400" />
      <input
        type="text"
        name="search"
        placeholder="Search"
        value={search}
        onChange={setSearch}
        className="w-full bg-transparent placeholder:text-slate-400 outline-0 font-normal"
      />
    </div>
  );
}

export default SearchBar;
