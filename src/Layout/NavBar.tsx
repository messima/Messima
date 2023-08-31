import { useNavigate } from "react-router-dom"

export default function NavBar({ headline }: { headline: string }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-start gap-2">
      <span
        onClick={() => {
          navigate(-1)
        }}
        className=" grid cursor-pointer place-items-center justify-center hover:text-slate-400"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </span>
      <span className="text-xl font-bold leading-[1.4rem] tracking-wide">
        {headline}
      </span>
    </div>
  )
}
