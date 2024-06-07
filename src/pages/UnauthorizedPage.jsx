import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UnauthorizedPage() {
    return (
        <div>
            <p>Du har inte rättigheter att besöka denna sidan.</p>
            <p><NavLink to="/">Gå till huvudsidan</NavLink></p>
        </div>
    )
}
