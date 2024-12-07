"use client";
import {
  ReactNode,
  ChangeEventHandler,
  createContext,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
  useContext,
} from "react";
import useInput from "../_hooks/useInput";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import KanbanContainer, { Container } from "./KanbanContainer";
import useContainers from "../_hooks/useContainers";
import { v4 as uuidv4 } from "uuid";

type RemoveContextType = {
  remove: boolean;
  setRemove: Dispatch<SetStateAction<boolean>>;
};

export const RemoveContext = createContext<RemoveContextType>({
  remove: false,
  setRemove: () => { },
});

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
  const [containers, filteredContainers, setContainers, onDragEnd] = useContainers([], search);
  const [ remove, setRemove ] = useState(false);
  useEffect(() => setContainers(
    [
      {
        id: uuidv4(),
        title: "Todo",
        elements: [
          { id: uuidv4(), text: "Todo Card 1" },
          { id: uuidv4(), text: "Todo Card 2" },
          { id: uuidv4(), text: "Todo Card 3" },
        ],
      },
      {
        id: uuidv4(),
        title: "In Progress",
        elements: [
          { id: uuidv4(), text: "In Progress Card 1" },
          { id: uuidv4(), text: "In Progress Card 2" },
          { id: uuidv4(), text: "In Progress Card 3" },
        ],
      },
      {
        id: uuidv4(),
        title: "Review",
        elements: [
          { id: uuidv4(), text: "Review Card 1" },
          { id: uuidv4(), text: "Review Card 2" },
          { id: uuidv4(), text: "Review Card 3" },
        ],
      },
      {
        id: uuidv4(),
        title: "Testing",
        elements: [
          { id: uuidv4(), text: "Testing Card 1" },
          { id: uuidv4(), text: "Testing Card 2" },
          { id: uuidv4(), text: "Testing Card 3" },
        ],
      },
      {
        id: uuidv4(),
        title: "Done",
        elements: [
          { id: uuidv4(), text: "Done Card 1" },
          { id: uuidv4(), text: "Done Card 2" },
          { id: uuidv4(), text: "Done Card 3" },
        ],
      },
    ],
  ), []);
  const removeContainer = (id: string) => {
      const newContainers = [...containers]
      newContainers.splice(newContainers.findIndex(e => e.id == id), 1);
      setContainers(newContainers);
  }
  return (
    <RemoveContext.Provider value={{ remove, setRemove }}>
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
                    className="flex py-4 justify-center overflow-x-auto"
                  >
                    {filteredContainers.map((container, index) => (
                      <Draggable
                        key={container.id}
                        draggableId={container.id}
                        index={index}
                      >
                        {(provided) => (
                          <KanbanContainer {...container} removeContainer={() => removeContainer(container.id)} {...provided} />
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
    </RemoveContext.Provider>
  );
}

export default Home;
