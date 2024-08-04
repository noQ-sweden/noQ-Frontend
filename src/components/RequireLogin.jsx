import { useLocation, Navigate, Outlet } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import PropTypes from 'prop-types';


RequireLogin.propTypes = {
    allowedGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function RequireLogin({ allowedGroups }) {
    const { login } = useLogin();
    const location = useLocation();

    console.log("Login context:", login); // Debug log

    const isAuthorized = login?.groups?.some(group => allowedGroups.includes(group));
    const isLoggedIn = !!login?.username;

    if (isAuthorized) {
        return <Outlet />;
    }

    if (isLoggedIn) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
}
