import React from "react";
import useLogin from "./../../hooks/useLogin";
import useHeader from "./../../hooks/useHeader";

export default function PageTitle() {
  const { login } = useLogin();
  const { header } = useHeader();

  const getName = (first_name, last_name) => {
    if (!first_name || !last_name) return "Guest";

    const firstNameFormatted =
      first_name.charAt(0).toUpperCase() + first_name.slice(1);
    const lastNameFormatted =
      last_name.charAt(0).toUpperCase() + last_name.slice(1);

    return `${firstNameFormatted} ${lastNameFormatted}`;
  };
  return (
    <div className="flex items-center justify-between bg-white">
      <div className="my-6 text-3xl sm:mb-0 lg:flex justify-center font-bold">
        {login.first_name && login.last_name
          ? getName(login.first_name, login.last_name)
          : "Välkommen"}

        {/* {login.username != null ? getName(login?.username) : "Välkommen"} */}
      </div>
      <div className="my-6 text-3xl sm:mb-0 lg:flex justify-center font-bold mx-2">
        {header && typeof header === "string" && header !== "" ? " - " : ""}
      </div>
      <div className="my-6 text-3xl sm:mb-0 lg:flex justify-left font-bold">
        {header && typeof header === "string" ? header : ""}
      </div>
    </div>
  );
}
