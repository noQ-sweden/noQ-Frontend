import React from "react";
import useLogin from "./../../hooks/useLogin";
import Navbar from "./Navbar";
import noQiconWhiteOnGreen from "./../../assets/images/NoqIconWhiteOnGreen.svg";

export default function Header() {
  const { login } = useLogin();
  const isLoggedIn = !!(login?.first_name || login?.last_name);
  const viewerGroup = Array.isArray(login?.usergroups)
    ? login.usergroups[0]
    : null;

  return isLoggedIn ? (
    <div>
      <div className="bg-[#245b56] p-8 h-10 flex items-center w-full top-0 left-0 z-10">
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
  ) : null;
}
