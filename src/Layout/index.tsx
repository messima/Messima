import NewTask from "../pages/NewTask"
import ViewTask from "../pages/ViewTask"
import MainView from "./MainView"
import TabsBar from "./TabsBar"
import TopBar from "./TopBar"
import { Routes, Route } from "react-router-dom"

export default function Layout() {
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
