import { Route, Routes } from "react-router-dom"

import TasksViewer from "./TasksViewer"

export default function MainView() {
  return (
    <Routes>
      <Route path="*" element={<TasksViewer />} />
      {/* <Route path="*" element={<AllTasks />} /> */}
    </Routes>
  )
}
