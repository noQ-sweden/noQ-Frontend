import React from "react";
import { NavLink } from "react-router-dom";
import SEO from "../components/SEO";

export default function ErrorPage() {
  return (
    <>
      <SEO
        title={`Sidan finns inte | NoQ - Trygg Plats för att alla förtjänar det`}
      />

      <div>
        <p>Sidan finns inte.</p>
        <p>
          <NavLink to="/">Gå till huvudsidan</NavLink>
        </p>
      </div>
    </>
  );
}
