import { useEffect, useState } from "react"
import ListView from "../../components/ListView"
import { getAllTasks } from "../../functions/services/task.service"

export default function AllTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [refresher, refresh] = useState(true)
  useEffect(() => {
    getAllTasks().then((res: Task[]) => {
      res.sort((a, b) => Number(a.done) - Number(b.done))
      setTasks(res)
    })
  }, [refresher])
  return <ListView tasks={tasks} refresh={refresh} />
}
