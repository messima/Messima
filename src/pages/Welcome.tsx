import { useEffect, useState } from "react"
import { createDbFile } from "../functions/services/task.service"

export default function Welcome({
  update,
}: {
  update: (value: boolean) => void
}) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-light">Welcome to Messima!</h1>
      <button
        className="rounded bg-blue-500 px-3 py-2 font-bold hover:bg-blue-600"
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
