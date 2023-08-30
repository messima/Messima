import { useNavigate } from "react-router-dom"

export default function Tag({ tag }: { tag: string }) {
  const navigate = useNavigate()

  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        navigate({ pathname: `/`, search: `?tags=${tag}` })
      }}
      className="cursor-pointer rounded-md bg-slate-700 px-2 py-0 hover:bg-slate-900"
    >
      {tag}
    </span>
  )
}
