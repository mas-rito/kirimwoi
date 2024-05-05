import { useState } from "react"

export const useError = () => {
  const [error, setError] = useState<string>("")

  return { error, setError }
}
