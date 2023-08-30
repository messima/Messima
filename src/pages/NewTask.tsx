import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addNewTask } from "../functions/services/task.service"
import NavBar from "../Layout/NavBar"
export default function NewTask() {
  const titleInputElement = useRef<HTMLInputElement>(null)
  const descriptionInputElement = useRef<HTMLInputElement>(null)
  const [newTag, setNewTag] = useState("")
  const [tags, setTags]: [tags: string[], setTags: any] = useState([])
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
              tags: tags,
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
        <div className="flex gap-2">
          <label htmlFor="newTag">Tags</label>
          {tags.map((tag, i) => (
            <span
              className="cursor-pointer rounded bg-slate-900 px-1 hover:bg-slate-950"
              onClick={() => setTags(tags.filter((v) => v !== tag))}
              key={i}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            name="newTag"
            id="newTag"
            className="textInput"
            value={newTag}
            onInput={(e) => setNewTag(e.currentTarget.value)}
          />
          <button
            onClick={(e) => {
              e.preventDefault()
              if (newTag.trim() !== "") {
                setTags([...tags, newTag])
                setNewTag("")
              }
            }}
            className="grid aspect-square h-full w-12 place-items-center  rounded bg-slate-500 hover:bg-slate-600"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <div>{errMsg}</div>
        <button type="submit" className="rounded-lg bg-blue-500 px-3 py-2">
          Add Task
        </button>
      </form>
    </div>
  )
}
