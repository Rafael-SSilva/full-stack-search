import { PropsWithChildren } from "react"

export function BoxWrapper({ children }: PropsWithChildren) {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center py-4">
      <div className="bg-light p-4 rounded shadow-sm w-100 w-md-75">
        {children}
      </div>
    </div>
  )
}