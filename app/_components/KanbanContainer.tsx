import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import KanbanCard from "./KanbanCard";

function KanbanContainer({ title }: { title: String }) {
  const [cards, setCards] = useState([
    { id: "1", text: "Card 1" },
    { id: "2", text: "Card 2" },
    { id: "3", text: "Card 3" },
  ]);
  return (
    <div className="p-4 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
      <div className="mb-2 flex justify-between items-center text-end font-semibold">
        <h2 className="text-lg">{title}</h2>
        <button className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
          <FaPlus />
        </button>
      </div>
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) {
            return;
          }
          const newCards = [...cards];
          const [removed] = newCards.splice(result.source.index, 1);
          newCards.splice(result.destination.index, 0, removed);
          setCards(newCards);
        }}
      >
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {cards.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      className="mb-4"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <KanbanCard text={item.text} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button className="font-bold text-xl w-full flex px-4 py-2 gap-2 rounded-md justify-center items-center whitespace-nowrap text-white bg-teal-700 hover:bg-teal-600">
        <FaPlus className="inline w-4 h-4" /> Add task
      </button>
    </div>
  );
}

export default KanbanContainer;
