import React from "react";

const Panel = ({ title, children }) => {
  return (
    <div className="bg-white flex flex-col shadow-md rounded-lg py-2  my-4">
      {" "}
      <div>
        <h2 className="text-xl font-semibold pl-4 mb-2">{title}</h2>
      </div>
      <div className=" max-w-full p-2 border-t  ">{children}</div>
    </div>
  );
};

export default Panel;
