import { useEffect, useState } from "react"
import NewTask from "../pages/NewTask"
import ViewTask from "../pages/ViewTask"
import Welcome from "../pages/Welcome"
import MainView from "./MainView"
import TabsBar from "./TabsBar"
import TopBar from "./TopBar"
import { Routes, Route } from "react-router-dom"
import { isTasksTableExist } from "../functions/services/task.service"

export default function Layout() {
  const [isFirstRun, setIsFirstRun] = useState(true)
  const [updater, update] = useState(false)
  useEffect(() => {
    isTasksTableExist().then((res) => {
      setIsFirstRun(!res)
    })
  }, [updater])

  if (isFirstRun) {
    return <Welcome update={update} />
  } else {
    return (
      <Routes>
        <Route
          path="*"
          element={
            <div className="flex h-screen max-h-screen flex-col p-2">
              <TopBar />
              <MainView />
              <TabsBar />
            </div>
          }
        />
        <Route path="/newTask" element={<NewTask />} />
        <Route path="/task/:id" element={<ViewTask />} />
      </Routes>
    )
  }
}
