import React from "react";
import PropTypes from "prop-types";

export default function Main({ children }) {
  Main.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    /* Main, Här ska allt skit som dyka upp dyka upp */
    <div className="flex justify-center bg-background-white">{children}</div>
  );
}
