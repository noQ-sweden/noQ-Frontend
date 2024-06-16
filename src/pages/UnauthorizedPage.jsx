import React from 'react'
import { NavLink } from 'react-router-dom'
import useLogin from "../hooks/useLogin";

export default function UnauthorizedPage() {
    const { login } = useLogin();
    const path = (login?.usergroups !== undefined) ? login?.usergroups[0] : "";
    const returnUrl = "/" + path;

    return (
        <div>
            <p>Du har inte rättigheter att besöka denna sidan.</p>
            <p><NavLink to={returnUrl}>Gå till huvudsidan</NavLink></p>
        </div>
    )
}
