import React from "react"

export const Copyright = () => {
  const year = new Date().getFullYear()
  return (
    <p className="text-center text-sm text-gray-600">
      Copyright &copy; {year} Kirimwoi. All rights reserved.
    </p>
  )
}
