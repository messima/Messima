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
      className={`cursor-pointer rounded-md bg-neutral-600 p-2`}
    >
      <div className="flex flex-wrap items-start gap-2">
        <span
          className="flex aspect-square w-6  items-center justify-center rounded-md bg-neutral-900"
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
          className={` mr-3 grow-[2] basis-[min-content] text-lg font-bold leading-[1.4rem] tracking-wide`}
        >
          {task.title}
        </span>
        <span className="ml-auto grow basis-[min-content] self-end">
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
