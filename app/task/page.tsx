import { getAllTasksData } from "@/lib/tasks";

import { Metadata } from "next";
import TaskList from "@/components/TaskList";

export const revalidate = 3;

export const metadata: Metadata = {
  title: "Task Page",
};

export default async function TaskPage() {
  const tasks = await getAllTasksData();
  return <TaskList initialTasks={tasks} />;
}
