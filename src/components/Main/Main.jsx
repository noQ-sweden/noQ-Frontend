import React from "react";

console.log(import.meta.env);

export default function Main({ children }) {
  return (
    /* Main, Här ska allt skit som dyka upp dyka upp */
    <div className="flex justify-center bg-grey-noQ">{children}</div>
  );
}
