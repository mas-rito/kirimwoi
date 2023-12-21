import React from "react";

const singleFile = ({ params }: { params: { id: string } }) => {
  return <div>singleFile {params.id}</div>;
};

export default singleFile;
