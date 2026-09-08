"use client";
import { Task } from "@/lib/tasks";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  ReactNode,
} from "react";

type EditTask = Pick<Task, "id" | "title">;

type StateContextType = {
  selectedTask: EditTask;
  setSelectedTask: Dispatch<SetStateAction<EditTask>>;
};

export const StateContext = createContext<StateContextType | undefined>(
  undefined,
);

export function useStateContext() {
  const ctx = useContext(StateContext);
  if (!ctx) throw new Error("StateContextProvider の外で使われています");
  return ctx;
}

export default function StateContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedTask, setSelectedTask] = useState<EditTask>({
    id: 0,
    title: "",
  });
  return (
    <StateContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
