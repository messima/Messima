import { useEffect, useState } from "react"
import { createDbFile } from "../functions/services/task.service"
import { path, tauri } from "@tauri-apps/api"

export default function Welcome({
  update,
}: {
  update: (value: boolean) => void
}) {
  const [logoSrc, setLogoSrc] = useState("")
  useEffect(() => {
    path.resolveResource(`assets/Messima_logo.svg`).then((srcPath) => {
      setLogoSrc(tauri.convertFileSrc(srcPath))
    })
  })
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <img src={logoSrc} className="w-48" alt="" />
      <h1 className="text-center text-2xl font-light">Welcome to Messima!</h1>
      <button
        className="rounded bg-rose-500 px-3 py-2 font-bold hover:bg-rose-600"
        onClick={() => {
          createDbFile().then(() => {
            update(true)
          })
        }}
      >
        Let's start
      </button>
    </div>
  )
}
