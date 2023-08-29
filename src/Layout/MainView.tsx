import { Route, Routes } from "react-router-dom"

import TaskViewer from "./TaskViewer"

export default function MainView() {
  return (
    <Routes>
      <Route path="*" element={<TaskViewer />} />
      {/* <Route path="*" element={<AllTasks />} /> */}
    </Routes>
  )
}
