import React  from "react";
import PropTypes from 'prop-types';
import useLogin from "./../../hooks/useLogin";
import Navbar from "./Navbar";
import Iconbar from "./Iconbar";

Header.propTypes = {
    login: PropTypes.any,
};

export default function Header() {
    const { login } = useLogin();

    return (
        login?.username !== undefined
            ? <div><Navbar /></div>
            : <div><Iconbar /></div>
    );
}
