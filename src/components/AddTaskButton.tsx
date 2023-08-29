import { Link } from "react-router-dom"

export default function AddTaskButton() {
  return (
    <Link
      to={"/newTask"}
      className="absolute bottom-4 right-4 grid aspect-square w-10 place-content-center rounded-full bg-white text-blue-400 shadow-md shadow-black transition-transform ease-out hover:scale-110 hover:text-blue-600 hover:shadow-lg"
    >
      <span className="material-symbols-outlined boldIcon">add</span>
    </Link>
  )
}
