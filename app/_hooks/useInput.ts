import { ChangeEvent, ChangeEventHandler, useState } from "react";

export default function useInput(
  initialValue: string,
): [value: string, setValue: ChangeEventHandler<HTMLInputElement>] {
  const [value, setValue] = useState(initialValue);
  return [
    value,
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  ];
}
