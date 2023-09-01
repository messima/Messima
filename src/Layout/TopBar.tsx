import { path, tauri } from "@tauri-apps/api"
import { useEffect, useState } from "react"

export default function TopBar() {
  const [logoSrc, setLogoSrc] = useState("")
  useEffect(() => {
    path.resolveResource(`assets/Messima_logo.svg`).then((srcPath) => {
      setLogoSrc(tauri.convertFileSrc(srcPath))
    })
  })

  return (
    <div className="mb-2 flex cursor-default items-center gap-1 text-3xl">
      <img src={logoSrc} alt="" className="w-12" />
      <span>Messima</span>
    </div>
  )
}
