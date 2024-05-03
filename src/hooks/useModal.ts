import { useState } from "react"

export const useModal = () => {
  const [isShow, setIsShow] = useState(true)

  const openModal = () => setIsShow(true)
  const closeModal = () => setIsShow(false)

  return { isShow, openModal, closeModal }
}
