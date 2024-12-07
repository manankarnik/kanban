import { useState, useContext } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";
import PopupCard from "./PopupCard";
import { RemoveContext } from "./Home";

export type Card = { id: string; text: string };

type CardProps = Card & {removeCard: () => void } & DraggableProvided;

function KanbanCard({
  text,
  removeCard,
  innerRef,
  draggableProps,
  dragHandleProps,
}: CardProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { remove, setRemove } = useContext(RemoveContext);
  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="p-4 mb-4 flex justify-between items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 ring-offset-gray-600"
    >
      <div>{text}</div>
      {remove ? (
          <button onClick={() => setShowConfirm(true)}>
            <FaTrash className="text-red-500"/>
          </button>
      ) : null}
      {showConfirm ? (
        <PopupCard title="Remove Card?" closePopup={() => setShowConfirm(false)} actionText="Remove" action={removeCard}>
          <div className="my-4 flex gap-4 items-center">
            The card will be removed from the container.
          </div>
        </PopupCard>
      ) : null}
    </div>
  );
}

export default KanbanCard;
