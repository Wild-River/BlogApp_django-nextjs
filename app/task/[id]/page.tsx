import { getAllTaskIds, getTaskData } from "@/lib/tasks";
import { notFound } from "next/navigation";
import TaskDetail from "@/components/TaskDetail";

export const revalidate = 3;

export async function generateStaticParams() {
  return getAllTaskIds();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await getTaskData(Number(id));
  return { title: task?.title ?? "Task" };
}

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const task = await getTaskData(Number(id));
  if (!task) notFound();
  return <TaskDetail initialTask={task} id={id} />;
}
