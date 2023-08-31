import { fs } from "@tauri-apps/api"
import taskController from "../db/task.controller"
import { BaseDirectory } from "@tauri-apps/api/fs"

export async function getAllTasks(): Promise<Task[]> {
  return await taskController.readAll()
}
export async function markTaskAsDone(task: Task) {
  return await taskController.updateOne({ ...task, done: !task.done })
}
export async function addNewTask(task: Task) {
  return await taskController.createOne(task)
}

export async function getTaskById(id: number) {
  return await taskController.readOne(id)
}
export async function deleteTaskById(id: number) {
  return await taskController.deleteOne(id)
}

export async function createDbFile() {
  return await taskController.createTaskTable()
}

export async function isTasksTableExist() {
  return await taskController.isTableExist()
}
