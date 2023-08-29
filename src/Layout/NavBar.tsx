import { Link, useNavigate } from "react-router-dom"

export default function NavBar({ headline }: { headline: string }) {
  const navigate = useNavigate()
  return (
    <div className="my-2 flex items-center gap-2">
      <span
        onClick={(e) => {
          navigate(-1)
        }}
        className="grid cursor-pointer place-items-center hover:text-slate-400"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </span>
      <span className="text-xl font-bold tracking-wide">{headline}</span>
    </div>
  )
}
