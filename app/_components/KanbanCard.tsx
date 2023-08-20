import { DraggableProvided } from "react-beautiful-dnd";

export type Card = { id: string; text: string };

type CardProps = Card & DraggableProvided;

function KanbanCard({
  text,
  innerRef,
  draggableProps,
  dragHandleProps,
}: CardProps) {
  return (
    <div
      ref={innerRef}
      {...draggableProps}
      {...dragHandleProps}
      className="p-4 mb-4 rounded-lg bg-gray-100 dark:bg-gray-800 ring-offset-gray-600"
    >
      {text}
    </div>
  );
}

export default KanbanCard;
