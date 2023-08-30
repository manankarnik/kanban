import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

export default function useInput(
  initialValue: string,
): [
    value: string,
    onInputValue: ChangeEventHandler<HTMLInputElement>,
    setValue: Dispatch<SetStateAction<string>>,
  ] {
  const [value, setValue] = useState(initialValue);
  return [
    value,
    (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    setValue,
  ];
}
