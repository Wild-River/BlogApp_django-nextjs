"use client";

import Task from "@/components/Task";
import TaskForm from "@/components/TaskForm";
import StateContextProvider from "@/context/StateContext";
import type { Task as TaskType } from "@/lib/tasks";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TaskList({
  initialTasks,
}: {
  initialTasks: TaskType[];
}) {
  const { data: tasks, mutate } = useSWR<TaskType[]>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`,
    fetcher,
    { fallbackData: initialTasks },
  );

  const filteredTasks = tasks?.toSorted(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <StateContextProvider>
      <TaskForm taskCreated={mutate} />
      <ul>
        {filteredTasks &&
          filteredTasks.map((task) => (
            <Task key={task.id} task={task} taskDeleted={mutate} />
          ))}
      </ul>
      <Link href="/main">
        <div className="mt-12 flex cursor-pointer">
          <svg
            className="mr-3 h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </StateContextProvider>
  );
}
