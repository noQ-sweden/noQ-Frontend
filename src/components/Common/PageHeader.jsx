import React from "react";
import PropTypes from "prop-types";

const PageHeader = ({ title }) => {
  PageHeader.propTypes = {
    title: PropTypes.string.isRequired
  };

  return (
    <div className=" bg-white flex flex-col rounded-lg my-4 p-3">
      <h2 className="text-xl font-semibold justify-start ml-2">{title}</h2>
    </div>
  );
};

export default PageHeader;
