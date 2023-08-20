"use client";
import { ReactNode } from "react";
import useInput from "../_hooks/useInput";
import { DragDropContext } from "react-beautiful-dnd";
import KanbanContainer from "./KanbanContainer";
import { ChangeEventHandler, createContext } from "react";
import useContainers from "../_hooks/useContainers";

type SearchContextType = {
  search: string;
  setSearch: ChangeEventHandler<HTMLInputElement>;
};

export const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => { },
});

type HomeProps = { children: ReactNode };

function Home({ children }: HomeProps) {
  const [search, setSearch] = useInput("");
  const [containers, filteredContainers, onDragEnd] = useContainers(
    [
      {
        title: "Todo",
        elements: [
          { id: "1", text: "Todo Card 1" },
          { id: "2", text: "Todo Card 2" },
          { id: "3", text: "Todo Card 3" },
        ],
      },
      {
        title: "In Progress",
        elements: [
          { id: "4", text: "In Progress Card 1" },
          { id: "5", text: "In Progress Card 2" },
          { id: "6", text: "In Progress Card 3" },
        ],
      },
      {
        title: "Review",
        elements: [
          { id: "7", text: "Review Card 1" },
          { id: "8", text: "Review Card 2" },
          { id: "9", text: "Review Card 3" },
        ],
      },
      {
        title: "Testing",
        elements: [
          { id: "10", text: "Testing Card 1" },
          { id: "11", text: "Testing Card 2" },
          { id: "12", text: "Testing Card 3" },
        ],
      },
      {
        title: "Done",
        elements: [
          { id: "13", text: "Done Card 1" },
          { id: "14", text: "Done Card 2" },
          { id: "15", text: "Done Card 3" },
        ],
      },
    ],
    search,
  );
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
      <main className="flex py-4 gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {filteredContainers.map((container) => (
            <KanbanContainer key={container.title} {...container} />
          ))}
        </DragDropContext>
      </main>
    </SearchContext.Provider>
  );
}

export default Home;
