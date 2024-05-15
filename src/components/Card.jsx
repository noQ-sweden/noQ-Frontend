import React from "react";

const Card = ({ title, content, color }) => {
  return (
    <div className={`p-4 rounded-lg border border-gray-300 bg-white shadow-md`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-semibold">{content}</span>
      </div>
      <div
        className={`border-t border-gray-300 mt-4 pt-4 text-center text-${color}-500 font-semibold`}>
        {title}
      </div>
    </div>
  );
};

export default Card;
