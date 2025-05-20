import React from "react";
/* import PropTypes from "prop-types"; */
import useLogin from "./../../hooks/useLogin";
import Navbar from "./Navbar";
import Iconbar from "./Iconbar";
import noQiconWhiteOnGreen from "./../../assets/images/NoqIconWhiteOnGreen.svg";

export default function Header() {
  const { login } = useLogin();
  const viewerGroup =
    login?.usergroups instanceof Array ? login?.usergroups[0] : null;

  return login?.first_name || login?.last_name ? (
    <div>

      <div className="bg-[#245B56] px-4 py-2 flex items-center w-full fixed top-0 left-0 z-10">
        <img src={noQiconWhiteOnGreen} alt="noQ" className="w-24" />
      </div>
      {viewerGroup == "user" ? (
        <div className="bg-[#245b56] p-8 h-10 flex items-center w-full fixed top-0 left-0 z-10">
          <img src={noQiconWhiteOnGreen} alt="noQ" className="w-24" />
        </div>
      ) : null}

      {viewerGroup !== "user" ? (
        <Navbar
          first_name={
            Array.isArray(login.first_name)
              ? login.first_name[0]
              : login.first_name
          }
          last_name={login.last_name}
        />
      ) : (
        <div className="bg-[#245b56] p-8 h-10 flex items-center w-full fixed top-0 left-0">
          <img src={noQiconWhiteOnGreen} alt="noQ" className="w-24" />
        </div>
      )}
    </div>
  ) : (
    <div>
      <Iconbar />
    </div>
  );
}
