"use client";
import { Task } from "@/lib/tasks";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TaskDetail({
  initialTask,
  id,
}: {
  initialTask: Task;
  id: string;
}) {
  const { data: task } = useSWR(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-task/${id}/`,
    fetcher,
    {
      fallbackData: initialTask,
    },
  );

  return (
    <>
      <span className="mb-4">
        {"ID : "}
        {task.id}
      </span>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/task">
        <div className="mt-8 flex cursor-pointer">
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
          <span>Back to task-page</span>
        </div>
      </Link>
    </>
  );
}
