import { useNavigate, useSearchParams } from "react-router-dom"

export default function Tag({ tag }: { tag: string }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  return (
    <span
      onClick={(e) => {
        e.stopPropagation()
        setSearchParams({ tags: tag })

        // navigate(`/?tag=${tag}`)
      }}
      className="cursor-pointer rounded-md bg-slate-700 px-2 py-0 hover:bg-slate-900"
    >
      {tag}
    </span>
  )
}
