import React from "react";

export default function Main({ children }) {
  return (
    /* Main, Här ska allt skit som dyka upp dyka upp */
    <div className="w-full h-dvh bg-green-100 flex flex-col items-center py-10">
      {children}
    </div>
  );
}
