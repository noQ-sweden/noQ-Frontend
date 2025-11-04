import React from "react";
import useLogin from "./../../hooks/useLogin";
import Navbar from "./Navbar";
import noQiconWhiteOnGreen from "./../../assets/images/NoqIconWhiteOnGreen.svg";

export default function Header() {
  const { login } = useLogin();
  const userGroup = Array.isArray(login?.usergroups)
    ? login.usergroups[0]
    : null;

  if (!login || (!login.first_name && !login.last_name)) return null;

  const firstName = Array.isArray(login.first_name)
    ? login.first_name[0]
    : login.first_name ?? "";
  const lastName = login.last_name ?? "";

  if (userGroup === "user") {
    return (
      <header>
        <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-[#245b56] flex items-center px-8">
          <img
            src={noQiconWhiteOnGreen}
            alt="noQ"
            className="w-24 mx-auto lg:mx-0"
          />
        </div>
      </header>
    );
  }
  return <Navbar first_name={firstName} last_name={lastName} />;
}
