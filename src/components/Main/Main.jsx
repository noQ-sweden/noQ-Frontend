import React from "react";

export default function Main({ children }) {
  return (
    /* Main, Här ska allt skit som ska dyka upp, dyka upp */
    <div className="flex flex-1 align-middle justify-center bg-grey-noQ py-5">
      {children}
    </div>
  );
}
