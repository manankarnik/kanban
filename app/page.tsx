"use client";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import KanbanContainer from "./_components/KanbanContainer";

function Page() {
  const [columns, setColumns] = useState([
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
        { id: "4", text: "In Progres Card 1" },
        { id: "5", text: "In Progres Card 2" },
        { id: "6", text: "In Progres Card 3" },
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
  ]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const newColumns = [...columns];
    const src = newColumns.filter(
      (element) => element.title == result.source.droppableId,
    )[0];
    const removed = src.elements.splice(result.source.index, 1)[0];
    newColumns[newColumns.indexOf(src)] = src;
    const dest = newColumns.filter(
      (element) => element.title == result.destination!.droppableId,
    )[0];
    dest.elements.splice(result.destination!.index, 0, removed);
    newColumns[newColumns.indexOf(dest)].elements = dest.elements;
    setColumns(newColumns);
  };
  return (
    <main className="flex py-4 gap-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column) => (
          <KanbanContainer key={column.title} {...column} />
        ))}
      </DragDropContext>
    </main>
  );
}

export default Page;
