import React from "react";
import HeaderComponent from "../_components/Header";
import SideNavComponent from "../_components/SideNav";
import SideInfo from "../_components/SideInfo";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SideNavComponent>
        <SideInfo />
        {children}
      </SideNavComponent>
    </>
  );
};

export default layout;
