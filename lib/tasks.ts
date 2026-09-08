export type Task = {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
};

export async function getAllTasksData(): Promise<Task[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`,
    { next: { revalidate: 3 } },
  );
  const tasks: Task[] = await res.json();
  const filterdTasks = tasks.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
  return filterdTasks;
}

export async function getAllTaskIds(): Promise<{ id: string }[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/list-task/`,
    { next: { revalidate: 3 } },
  );
  const tasks: Task[] = await res.json();

  return tasks.map((task) => ({ id: String(task.id) }));
}

export async function getTaskData(id: number): Promise<Task | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/detail-task/${id}/`,
    { next: { revalidate: 3 } },
  );

  if (res.status === 404) {
    return null; // 見つからなかったことを呼び出し元に伝える
  }
  if (!res.ok) {
    throw new Error(`Failed to fetch task: ${res.status}`);
  }
  const task: Task = await res.json();
  return task;
}
