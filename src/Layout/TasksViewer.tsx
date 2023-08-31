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
      res.sort((a, b) => Number(a.id) - Number(b.id))
      if (searchParams.getAll("tags").length) {
        searchParams.getAll("tags").forEach((tf) => {
          res = res.filter((task) => task.tags.includes(tf))
        })
      }
      setCompletedTasks(res.filter((t) => t.done))
      setTasks(res.filter((t) => !t.done))
    })
  }, [refresher, tagFilter, searchParams])

  return (
    <>
      <div className="flex gap-2">
        {searchParams.getAll("tags").map((t, i) => {
          return (
            <span
              onClick={() => {
                setSearchParams({
                  tags: searchParams.getAll("tags").filter((v) => {
                    return v !== t
                  }),
                })
              }}
              className="w-fit cursor-pointer rounded-md bg-neutral-700 px-2 hover:bg-neutral-900"
              key={i}
            >
              {t}
            </span>
          )
        })}
      </div>
      <div className="p-2">
        {completedTasks.map((t) => (
          <span
            className="material-symbols-outlined cursor-pointer text-sm hover:text-rose-300"
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
