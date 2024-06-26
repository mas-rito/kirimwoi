import React from "react"

import SideNavComponent from "../../components/SideNav"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideNavComponent />
      <div className="lg:ml-64">{children}</div>
    </>
  )
}

export default layout
