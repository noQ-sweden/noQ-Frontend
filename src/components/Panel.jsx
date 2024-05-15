import React from "react";

const Panel = ({ title, children }) => (
  <div className="border border-gray-300 rounded-md mb-4">
    <div className="border-b border-gray-300 bg-white p-4 rounded-t-md">
      <h2 className="text-xl ">{title}</h2>
    </div>
    <div className="bg-white p-4 rounded-b-md">{children}</div>
  </div>
);

export default Panel;
