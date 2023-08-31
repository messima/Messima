import { createDbFile } from "../functions/services/task.service"

export default function Welcome({
  update,
}: {
  update: (value: boolean) => void
}) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <img src="src/assets/Messima_logo.svg" className="w-48" alt="" />
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
