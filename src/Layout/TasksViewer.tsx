import { useEffect, useState } from "react"
import { getAllTasks } from "../functions/services/task.service"
import { useNavigate, useSearchParams } from "react-router-dom"
import ListView from "../components/ListView"

export default function TasksViewer() {
  const [searchParams, setSearchParams] = useSearchParams()
  const tagFilter = searchParams.get("tags") || ``
  const [tasks, setTasks] = useState<Task[]>([])
  const [refresher, refresh] = useState(true)
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])
  const navigate = useNavigate()
  useEffect(() => {
    getAllTasks().then((res: Task[]) => {
      res.sort((a, b) => Number(b.done) - Number(a.done))
      if (tagFilter !== ``) {
        res = res.filter((task) => task.tags.includes(tagFilter))
      }
      setCompletedTasks(res.filter((t) => t.done))
      setTasks(res.filter((t) => !t.done))
    })
  }, [refresher, tagFilter, searchParams])

  return (
    <>
      <span
        onClick={() => {
          setSearchParams({})
        }}
        className="w-fit cursor-pointer rounded-md bg-slate-700 px-2 hover:bg-slate-900"
      >
        {tagFilter}
      </span>
      <div className="p-2">
        {completedTasks.map((t) => (
          <span
            className="material-symbols-outlined cursor-pointer hover:text-blue-400"
            key={t.id}
            onClick={() => {
              navigate(`/task/${t.id}`)
            }}
          >
            done
          </span>
        ))}
      </div>
      <ListView refresh={refresh} tasks={tasks} />
    </>
  )
}
