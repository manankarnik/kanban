import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import KanbanCard from "./KanbanCard";

function KanbanContainer({
  title,
  elements,
}: {
  title: String;
  elements: Array<{ id: string; text: string }>;
}) {
  return (
    <div className="p-4 w-full rounded-lg bg-gray-200 dark:bg-gray-700">
      <div className="mb-2 flex justify-between items-center text-end font-semibold">
        <h2 className="text-lg">{title}</h2>
        <button className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
          <FaPlus />
        </button>
      </div>
      <Droppable droppableId={`${title}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item, index) => (
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
      <button className="font-bold text-xl w-full flex px-4 py-2 gap-2 rounded-md justify-center items-center whitespace-nowrap text-white bg-teal-700 hover:bg-teal-600">
        <FaPlus className="inline w-4 h-4" /> Add task
      </button>
    </div>
  );
}

export default KanbanContainer;
