import { useNavigate } from "react-router-dom"
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
      className={`rounded-md bg-slate-600 p-2`}
    >
      <div className="flex flex-wrap items-start gap-2">
        <span className="flex gap-2 whitespace-nowrap">
          <span
            className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-md bg-slate-900"
            onClick={(e) => {
              e.stopPropagation()
              markTaskAsDone(task).then(() => {
                refresh((prev: boolean) => !prev)
              })
            }}
          >
            <span
              className={`material-symbols-outlined opacity-0 hover:opacity-50`}
            >
              done
            </span>
          </span>
          <span
            className={` cursor-default whitespace-normal text-lg font-bold leading-[1.4rem] tracking-wide`}
          >
            {task.title}
          </span>
        </span>
        <span className="ml-auto">
          {task.tags !== null && (
            <div className="flex flex-wrap justify-end gap-2">
              {task.tags.map((tag, i) => (
                <Tag tag={tag} key={i} />
              ))}
            </div>
          )}
        </span>
      </div>
    </div>
  )
}
