import React from "react";
import { Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import { FaPlus, FaArrowsAlt } from "react-icons/fa";
import KanbanCard, { Card } from "./KanbanCard";

export type Container = {
  title: string;
  elements: Card[];
};

type KanbanContainerProps = Container & DraggableProvided;

function KanbanContainer({
  title,
  elements,
  innerRef,
  draggableProps,
  dragHandleProps,
}: KanbanContainerProps) {
  return (
    <div
      ref={innerRef}
      {...draggableProps}
      className="p-4 mx-4 min-w-[200px] w-full h-fit rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      <div className="mb-4 flex justify-between items-center text-end font-semibold">
        <h2 className="flex items-center gap-2 text-lg">
          {title}
          <span className="px-3 rounded-full text-sm bg-teal-800 bg-opacity-40">
            {elements.length}
          </span>
        </h2>
        <div
          {...dragHandleProps}
          className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          <FaArrowsAlt />
        </div>
      </div>
      <Droppable droppableId={title} type="card">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.length == 0 && !snapshot.isDraggingOver ? (
              <span className="p-2 my-4 block text-center text-gray-400">
                No tasks available
              </span>
            ) : null}
            {elements.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => <KanbanCard {...item} {...provided} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button className="font-bold text-xl w-full flex px-4 py-2 gap-2 rounded-md justify-center items-center whitespace-nowrap text-white bg-teal-700 hover:bg-teal-600">
        <FaPlus className="inline w-4 h-4" />
        <span>Add task</span>
      </button>
    </div>
  );
}

export default KanbanContainer;
