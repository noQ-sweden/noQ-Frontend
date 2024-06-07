import React  from "react";
import Navbar from "./Navbar";
import Iconbar from "./Iconbar";

export default function Header({ login }) {
    const viewerGroup = (login?.usergroups instanceof Array) ? login?.usergroups[0] : null;

    return (
        viewerGroup == "host"
            ? <div><Navbar /></div>
            : <div><Iconbar /></div>
    );
}
