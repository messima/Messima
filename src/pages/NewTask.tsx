import { useRef, useState } from "react"
import { Link, redirect, useNavigate } from "react-router-dom"
import { addNewTask } from "../functions/services/task.service"
import NavBar from "../Layout/NavBar"
export default function NewTask() {
  const titleInputElement = useRef<HTMLInputElement>(null)
  const descriptionInputElement = useRef<HTMLInputElement>(null)
  const [errMsg, setErrMsg] = useState("")
  const navigate = useNavigate()
  return (
    <div className="p-2">
      <NavBar headline="New Task" />
      <form
        autoComplete="off"
        action=""
        onSubmit={(e) => {
          e.preventDefault()
          if (titleInputElement.current && descriptionInputElement.current) {
            addNewTask({
              id: Date.now(),
              title: titleInputElement.current.value,
              description: descriptionInputElement.current.value,
              tags: [""],
              done: false,
            }).then(() => {
              navigate("/")
            })
          } else {
            setErrMsg("something is missing")
          }
        }}
        className="flex flex-col gap-2"
      >
        <label htmlFor="title">Title</label>
        <input
          placeholder="Title"
          type="text"
          className="textInput"
          name="title"
          id="title"
          ref={titleInputElement}
        />
        <label htmlFor="description">Description</label>
        <input
          placeholder="description"
          type="text"
          className="textInput"
          name="description"
          id="description"
          ref={descriptionInputElement}
        />
        <label htmlFor="tags">tags</label>
        <form action="">
          <input type="text" name="newTag" id="newTag" className="textInput" />
        </form>
        <div>{errMsg}</div>
        <button type="submit" className="rounded-lg bg-blue-500 px-3 py-2">
          Add Task
        </button>
      </form>
    </div>
  )
}
