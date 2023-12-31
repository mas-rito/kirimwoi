import React from "react";

const CopyrightComponent = () => {
  const year = new Date().getFullYear();
  return (
    <p className="text-center text-gray-600 text-sm">
      Copyright &copy; {year} Kirimwoi. All rights reserved.
    </p>
  );
};

export default CopyrightComponent;
