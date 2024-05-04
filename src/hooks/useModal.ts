import { useState } from "react"

export const useModal = () => {
  const [isShow, setIsShow] = useState(false)

  const openModal = () => {
    setIsShow(true)
    document.body.style.overflow = "hidden"
  }
  const closeModal = () => {
    setIsShow(false)
    document.body.style.overflow = "auto"
  }

  return { isShow, openModal, closeModal }
}
