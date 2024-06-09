import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ErrorPage() {
    return (
        <div>
            <p>Sidan finns inte.</p>
            <p><NavLink to="/">Gå till huvudsidan</NavLink></p>
        </div>
    )
}
