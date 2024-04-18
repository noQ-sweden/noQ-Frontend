import React from "react";
import Navbar from "./Navbar";
export default function Header({ setLoginState }) {
  return (
    <div>
      <Navbar setLoginState={setLoginState} />
    </div>
  );
}
