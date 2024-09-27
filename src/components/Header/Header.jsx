import React from "react";
/* import PropTypes from "prop-types"; */
import useLogin from "./../../hooks/useLogin";
import Navbar from "./Navbar";
import Iconbar from "./Iconbar";

/* Header.propTypes = {
  login: PropTypes.any,
}; */

export default function Header() {
  const { login } = useLogin();

  return login?.first_name || login?.last_name ? (
    <div>
      <Navbar first_name={login.first_name} last_name={login.last_name} />
    </div>
  ) : (
    <div>
      <Iconbar />
    </div>
  );
}
