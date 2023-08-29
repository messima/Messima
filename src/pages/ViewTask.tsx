import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteTaskById, getTaskById } from "../functions/services/task.service"
import Tag from "../components/Tag"
import NavBar from "../Layout/NavBar"

export default function ViewTask() {
  const navigate = useNavigate()
  const [task, setTask]: [Task, Dispatch<SetStateAction<Task>>] =
    useState<Task>({
      id: 0,
      title: `asdgf`,
      description: `asdf`,
      done: false,
      tags: [],
    })
  const id = Number(useParams().id)

  useEffect(() => {
    getTaskById(id).then((res: any) => {
      setTask(res)
    })
  }, [])

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center justify-between gap-2">
        <NavBar headline={task.title} />
        <button
          onClick={() => {
            deleteTaskById(task.id).then(() => {
              navigate(`/`)
            })
          }}
          className="grid place-items-center text-slate-300 hover:text-slate-100"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
      <div className="text-slate-300">{task.description}</div>
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
