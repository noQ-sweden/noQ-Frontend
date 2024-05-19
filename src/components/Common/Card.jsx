import React from "react";

const Card = ({ title, content, textColor, unit }) => {
  return (
    <div className="border-2 border-#000000 rounded-lg text-center justify-between flex flex-col items-center">
      <div className="py-2">
        <div className="text-4xl font-medium" style={{ color: textColor }}>
          {content}
        </div>
        <div className="pt-2 text-xs">{unit}</div>
      </div>
      <div className="text-sm min-w-32 mt-2 border-t-2 px-4 py-2 ">{title}</div>
    </div>
  );
};

export default Card;
