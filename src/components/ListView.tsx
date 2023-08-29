import TaskInList from "./TaskInList"

export default function ListView({
  tasks,
  refresh,
}: {
  tasks: Task[]
  refresh: any
}) {
  if (tasks) {
    return (
      <div className="no-scrollbar flex grow flex-col gap-2 overflow-y-scroll rounded-md py-2 ">
        {tasks.map((task) => (
          <TaskInList task={task} key={task.id} refresh={refresh} />
        ))}
      </div>
    )
  } else {
    return <div>ListView</div>
  }
}
