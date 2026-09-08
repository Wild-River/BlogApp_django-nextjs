"use client";

import Link from "next/link";
import Cookie from "universal-cookie";
import { useStateContext } from "@/context/StateContext";
import type { Task as TaskType } from "@/lib/tasks";

const cookie = new Cookie();

export default function Task({
  task,
  taskDeleted,
}: {
  task: TaskType;
  taskDeleted: () => void;
}) {
  const { setSelectedTask } = useStateContext();
  const deleteTask = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/tasks/${task.id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: `JWT ${cookie.get("access_token")}`,
        },
      },
    );
    if (!res.ok) {
      alert(
        res.status === 401 ? "JWT Token not valid" : `failed: ${res.status}`,
      );
      return; // ← ここで抜ける
    }
    taskDeleted();
  };

  return (
    <div>
      <span>{task.id}</span>
      {" : "}
      <Link href={`/task/${task.id}/`}>
        <span className="cursor-pointer border-b border-gray-500 text-white hover:bg-gray-600">
          {task.title}
        </span>
      </Link>

      <div className="float-right ml-20">
        <svg
          onClick={() => setSelectedTask({ id: task.id, title: task.title })}
          className="float-left h-6 w-6 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
        <svg
          onClick={deleteTask}
          className="mr-2 h-6 w-6 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </div>
    </div>
  );
}
