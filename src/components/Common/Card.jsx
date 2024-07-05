import React from "react";

const Card = ({ title, content, textColor, unit, icon }) => {
  const imageWidth = 40;
  const boxStyle = "bg-background-white rounded-lg border border-overview-border p-4"
  const imageStyle = "mb-4"

  return (
    <div className={boxStyle}>
      {icon ? <img src={icon} alt={title + " icon"} width={imageWidth} className={imageStyle} /> : <div /> }
      
      <p className="text-lg font-semibold">{content}</p>
      <p className="text-sm">{title}</p>
    </div>
  );
};

export default Card;
