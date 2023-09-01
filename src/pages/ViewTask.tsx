import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import {
  deleteTaskById,
  getTaskById,
  markTaskAsDone,
} from "../functions/services/task.service"
import Tag from "../components/Tag"
import NavBar from "../Layout/NavBar"

export default function ViewTask() {
  const navigate = useNavigate()
  const [refresher, refresh] = useState(true)
  const [task, setTask]: [Task, Dispatch<SetStateAction<Task>>] =
    useState<Task>({
      id: 0,
      title: ``,
      description: ``,
      done: false,
      tags: [],
    })
  const id = Number(useParams().id)

  useEffect(() => {
    getTaskById(id).then((res: any) => {
      setTask(res)
    })
  }, [refresher])

  return (
    <div className="flex flex-col gap-2 p-2 ">
      <button
        onClick={() => {
          markTaskAsDone(task).then(() => {
            refresh((prev) => !prev)
          })
        }}
        className="rounded bg-neutral-500 px-2 py-2 hover:bg-neutral-600"
      >
        <span className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded bg-neutral-800">
            <span className="material-symbols-outlined ">
              {task.done && "done"}
            </span>
          </span>
          mark tasks as {task.done && "un"}done
        </span>
      </button>
      <div className="flex items-start justify-between gap-2 p-2">
        <NavBar headline={task.title} />
        <button
          onClick={() => {
            deleteTaskById(task.id).then(() => {
              navigate(`/`)
            })
          }}
          className="grid place-items-center text-neutral-300 hover:text-rose-300"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div className="select-text text-neutral-300">{task.description}</div>
      {task.tags !== null && (
        <div className="mt-2 flex flex-wrap gap-2">
          {task.tags.map((tag, i) => (
            <Tag tag={tag} key={i} />
          ))}
        </div>
      )}
    </div>
  )
}
