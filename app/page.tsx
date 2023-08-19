"use client";

import KanbanContainer from "./_components/KanbanContainer";

function Page() {
  const columns = ["Todo", "In Progress", "Review", "Testing", "Done"];
  return (
    <main className="flex py-4 gap-4">
      {columns.map((title) => (
        <KanbanContainer key={title} title={title} />
      ))}
    </main>
  );
}

export default Page;
