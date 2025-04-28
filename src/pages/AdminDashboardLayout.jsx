import React from "react";
import PropTypes from "prop-types";

AdminDashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default function AdminDashboardLayout({ children }) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <>{children}</>
    </div>
  );
}
