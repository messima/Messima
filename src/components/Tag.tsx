import { useNavigate, useSearchParams } from "react-router-dom"

export default function Tag({ tag }: { tag: string }) {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  return (
    <span
      onClick={(e) => {
        const alreadyFiltered = searchParams.getAll("tags").includes(tag)
        e.stopPropagation()
        navigate({
          pathname: `/`,
          search: `?${searchParams.toString()}${
            alreadyFiltered ? "" : "&tags=" + tag
          }`,
        })
      }}
      className="cursor-pointer rounded-md bg-neutral-700 px-2 py-0 hover:bg-neutral-900"
    >
      {tag}
    </span>
  )
}
