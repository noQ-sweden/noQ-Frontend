import React from "react";
import Navbar from "./Navbar";
export default function Header({ setLoginState, setViewerState }) {
  return (
    <div>
      <Navbar
        setLoginState={setLoginState}
        setViewerState={setViewerState} />
    </div>
  );
}
