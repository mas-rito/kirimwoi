import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2>Dashboard</h2>
      {children}
    </>
  );
};

export default layout;
