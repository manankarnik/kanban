import React from "react";

function KanbanCard({ text }: { text: string }) {
  return (
    <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 ring-offset-gray-600">
      {text}
    </div>
  );
}

export default KanbanCard;
