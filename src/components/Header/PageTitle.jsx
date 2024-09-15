import React from "react";
import useLogin from "./../../hooks/useLogin";
import useHeader from "./../../hooks/useHeader";

export default function PageTitle() {
    const { login } = useLogin();
    const { header } = useHeader();
    
    const getName = (username) => {
        const names = username.split(/[.@]+/);
        let name = "";
        const firstName = names[0].charAt(0).toUpperCase() + names[0].slice(1);
        const lastName = names[1].charAt(0).toUpperCase() + names[1].slice(1);
        return name.concat(firstName, " ", lastName)
    }

    return (
        <div className="flex items-center justify-between bg-white">
            <div className="my-6 text-3xl sm:mb-0 lg:flex justify-center font-bold">
                {login.username != null ? getName(login?.username) : "Välkommen"}
            </div>
            <div className="my-6 text-3xl sm:mb-0 lg:flex justify-center font-bold mx-2">
                {header != null && header != "" ? " - " : ""}
            </div>
            <div className="my-6 text-3xl sm:mb-0 lg:flex justify-left font-bold">
                {header != null ? header : ""}
            </div>
        </div>
    );
}