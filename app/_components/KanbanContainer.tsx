import React, { useContext, useState } from "react";
import { Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import { FaPlus, FaArrowsAlt, FaTrash } from "react-icons/fa";
import KanbanCard, { Card } from "./KanbanCard";
import PopupCard from "./PopupCard";
import useInput from "../_hooks/useInput";
import { ContainersContext } from "./Home";
import { RemoveContext } from "./Home";
import { v4 as uuidv4 } from "uuid";

export type Container = {
  id: string;
  title: string;
  elements: Card[];
};

type KanbanContainerProps = Container & { removeContainer: () => void; } & DraggableProvided;

function KanbanContainer({
  id,
  title,
  elements,
  removeContainer,
  innerRef,
  draggableProps,
  dragHandleProps,
}: KanbanContainerProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskName, onInputTaskName, setTaskName] = useInput("");
  const { containers, setContainers } = useContext(ContainersContext);
  const { remove, setRemove } = useContext(RemoveContext);
  const addItem = () => {
    const newContainers = [...containers];
    newContainers
      .find((container) => container.id == id)!
      .elements.push({ id: uuidv4(), text: taskName });
    setContainers(newContainers);
    closePopup();
  };
  const closePopup = () => {
    setTaskName("");
    setShowPopup(false);
  };
  const removeCard = function(cardId: string) {
      const newContainers = [...containers]
      const elements = newContainers.find((container) => container.id == id)!.elements
      elements.splice(elements.findIndex(e => e.id == cardId), 1);
      setContainers(newContainers);
  }

  return (
    <div
      ref={innerRef}
      {...draggableProps}
      className="p-4 my-4 sm:mx-4 w-full mx-auto sm:min-w-[200px] max-w-[300px] h-fit rounded-lg bg-slate-200 dark:bg-slate-700"
    >
      <div className="mb-4 flex justify-between items-center text-end font-semibold">
        <h2 className="flex items-center gap-2 text-lg">
          {title}
          <span className="px-3 rounded-full text-sm text-white bg-teal-700">
            {elements.length}
          </span>
        </h2>
        <div className="flex justify-center items-center gap-2">
          <div
            {...dragHandleProps}
            className="p-2 text-slate-500 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100"
          >
            <FaArrowsAlt />
          </div>
          {remove ? (
              <button onClick={() => setShowConfirm(true)}>
                <FaTrash className="text-red-500"/>
              </button>
          ) : null}
        </div>
      </div>
      <Droppable droppableId={id} type="card">
        {(provided, snapshot) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.length == 0 && !snapshot.isDraggingOver ? (
              <span className="p-2 my-4 block text-center text-slate-400">
                No tasks available
              </span>
            ) : null}
            {elements.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => <KanbanCard {...item} removeCard={() => removeCard(item.id)} {...provided} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        className="font-bold text-xl w-full flex px-4 py-2 gap-2 rounded-md justify-center items-center whitespace-nowrap text-white bg-teal-700 hover:bg-teal-600"
        onClick={() => setShowPopup(true)}
      >
        <FaPlus className="inline w-4 h-4" />
        <span>Add task</span>
      </button>
      {showConfirm ? (
        <PopupCard title="Remove Container?" closePopup={() => setShowConfirm(false)} actionText="Remove" action={removeContainer}>
          <div className="my-4 flex gap-4 items-center">
            All the cards in this container will be removed.
          </div>
        </PopupCard>
      ) : null}
      {showPopup ? (
        <PopupCard title="Add Task" closePopup={closePopup} action={addItem}>
          <div className="my-4 sm:flex gap-4 items-center">
            <label className="whitespace-nowrap text-lg" htmlFor="taskName">
              Task Name
            </label>
            <input
              className="w-full rounded-md border-0 p-2 text-black dark:text-white bg-slate-200 dark:bg-slate-600 ring-1 ring-inset ring-slate-300 dark:ring-slate-800 leading-6 focus-within:ring-2 focus-within:ring-teal-700 dark:focus-within:ring-teal-600 outline-0"
              type="text"
              name="taskName"
              id="taskName"
              autoFocus={true}
              value={taskName}
              onInput={onInputTaskName}
            />
          </div>
        </PopupCard>
      ) : null}
    </div>
  );
}

export default KanbanContainer;
