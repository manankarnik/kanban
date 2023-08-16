import KanbanCard from "./_components/KanbanCard";
import { FaPlus } from "react-icons/fa";

function Page() {
  return (
    <main className="flex py-4 gap-4">
      {[1, 2, 3, 4].map((e) => (
        <div
          key={e}
          className="p-4 rounded-lg flex-grow flex flex-col gap-4 bg-gray-200 dark:bg-gray-700"
        >
          <div className="text-end">
            <button className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              <FaPlus />
            </button>
          </div>
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
          <KanbanCard />
        </div>
      ))}
    </main>
  );
}

export default Page;
