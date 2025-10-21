import React from "react";
import PageTitle from "./PageTitle";

export default function Navbar() {
  return (
    <nav className="lg:flex items-center justify-between p-10 lg:p-4 bg-newGreen lg:bg-white transition-transform duration-100 ">
      <PageTitle />
      {/*Here gose the new NOQ logo */}
    </nav>
  );
}
