"use client";

import { useStateContext } from "@/context/StateContext";
import Cookie from "universal-cookie";
import type { SubmitEvent } from "react";

const cookie = new Cookie();

export default function TaskForm({ taskCreated }: { taskCreated: () => void }) {
  const { selectedTask, setSelectedTask } = useStateContext();

  const create = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/tasks/`,
      {
        method: "POST",
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          "Content-Type": "application/json",
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

    setSelectedTask({ id: 0, title: "" });
    taskCreated();
  };

  const update = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/tasks/${selectedTask.id}/`,
      {
        method: "PATCH",
        body: JSON.stringify({ title: selectedTask.title }),
        headers: {
          "Content-Type": "application/json",
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
    setSelectedTask({ id: 0, title: "" });
    taskCreated();
  };

  return (
    <div>
      <form onSubmit={selectedTask.id !== 0 ? update : create}>
        <input
          className="mb-8 px-2 py-1 text-black"
          type="text"
          value={selectedTask.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
        />
        <button
          type="submit"
          className="ml-2 rounded bg-gray-500 px-2 py-1 text-sm uppercase hover:bg-gray-600"
        >
          {selectedTask.id !== 0 ? "update" : "create"}
        </button>
      </form>
    </div>
  );
}
