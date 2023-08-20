import { useEffect, useState } from "react";
import { DropResult, OnDragEndResponder } from "react-beautiful-dnd";
import { Container } from "../_components/KanbanContainer";

export default function useContainers(
  data: Container[],
  search: string,
): [
    containers: Container[],
    filteredContainers: Container[],
    onDragEnd: OnDragEndResponder,
  ] {
  const [containers, setContainers] = useState([...data]);
  const [filteredContainers, setFilteredContainers] = useState([...data]);

  useEffect(() => {
    setFilteredContainers([...containers]);
    if (search !== "") {
      const newFilteredContainers = containers.map((column) => ({
        ...column,
        elements: column.elements.filter((element) =>
          element.text.toLowerCase().includes(search.toLowerCase()),
        ),
      }));
      setFilteredContainers(newFilteredContainers);
    }
  }, [search, containers]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    } else {
      const newContainers = [...containers];
      if (result.source.droppableId == "container") {
        const moved = newContainers.splice(result.source.index, 1)[0];
        newContainers.splice(result.destination.index, 0, moved);
      } else {
        const src = newContainers.find(
          (column) => column.title == result.source.droppableId,
        );
        const dest = newContainers.find(
          (column) => column.title == result.destination!.droppableId,
        );
        const moved = src!.elements.splice(result.source.index, 1)[0];
        dest!.elements.splice(result.destination!.index, 0, moved);
      }
      setContainers(newContainers);
      setFilteredContainers(newContainers);
    }
  };

  return [containers, filteredContainers, onDragEnd];
}
