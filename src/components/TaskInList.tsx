import { Link, useNavigate } from "react-router-dom"
import { markTaskAsDone } from "../functions/services/task.service"
import Tag from "./Tag"

export default function TaskInList({
  task,
  refresh,
}: {
  task: Task
  refresh: any
}) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/task/${task.id}`)}
      className={`rounded-md p-2 ${
        task.done ? "bg-slate-700 " : "bg-slate-600"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className="flex aspect-square w-6  cursor-pointer items-center justify-center rounded-md bg-slate-900"
          onClick={(e) => {
            e.stopPropagation()
            markTaskAsDone(task).then(() => {
              refresh((prev: boolean) => !prev)
            })
          }}
        >
          <span
            className={`material-symbols-outlined hover:opacity-50 ${
              task.done ? "" : "opacity-0"
            }`}
          >
            done
          </span>
        </span>
        <span
          className={`cursor-default text-lg font-bold tracking-wide ${
            task.done ? "line-through" : ""
          }`}
        >
          {task.title}
        </span>
      </div>
      <div className="greyedOut cursor-default">{task.description}</div>
      {task.tags !== null && (
        <div className="mt-2 flex gap-2">
          {task.tags.map((tag, i) => (
            <Tag tag={tag} key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
