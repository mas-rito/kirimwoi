import React from "react";
import HeaderComponent from "../_components/Header";
import SideNavComponent from "../_components/SideNav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideNavComponent>{children}</SideNavComponent>
    </>
  );
};

export default layout;
