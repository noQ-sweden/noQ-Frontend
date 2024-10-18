import React from "react";
import { NavLink } from "react-router-dom";
import SEO from "../components/SEO";
import useHeader from "../hooks/useHeader";

export default function ErrorPage() {
  const { setHeader } = useHeader();
  setHeader(""); 

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
