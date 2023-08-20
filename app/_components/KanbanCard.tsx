export type Card = { id: string; text: string };

function KanbanCard({ text }: Card) {
  return (
    <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 ring-offset-gray-600">
      {text}
    </div>
  );
}

export default KanbanCard;
