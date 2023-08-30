"use client";
import {
  ReactNode,
  ChangeEventHandler,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
import useInput from "../_hooks/useInput";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import KanbanContainer, { Container } from "./KanbanContainer";
import useContainers from "../_hooks/useContainers";

type SearchContextType = {
  search: string;
  setSearch: ChangeEventHandler<HTMLInputElement>;
};

export const SearchContext = createContext<SearchContextType>({
  search: "",
  setSearch: () => { },
});

type ContainersContextType = {
  containers: Container[];
  setContainers: Dispatch<SetStateAction<Container[]>>;
};

export const ContainersContext = createContext<ContainersContextType>({
  containers: [],
  setContainers: () => { },
});

type HomeProps = { children: ReactNode };

function Home({ children }: HomeProps) {
  const [search, setSearch] = useInput("");
  const [containers, filteredContainers, setContainers, onDragEnd] =
    useContainers(
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
    <ContainersContext.Provider value={{ containers, setContainers }}>
      <SearchContext.Provider value={{ search, setSearch }}>
        {children}
        <main>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="container"
              type="container"
              direction="horizontal"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  className="flex py-4 overflow-x-auto"
                >
                  {filteredContainers.map((container, index) => (
                    <Draggable
                      key={container.title}
                      draggableId={container.title}
                      index={index}
                    >
                      {(provided) => (
                        <KanbanContainer {...container} {...provided} />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </main>
      </SearchContext.Provider>
    </ContainersContext.Provider>
  );
}

export default Home;
