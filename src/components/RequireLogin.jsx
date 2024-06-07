import { useLocation, Navigate, Outlet } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import PropTypes from 'prop-types';

RequireLogin.propTypes = {
  allowedGroups: PropTypes.any,
};

export default function RequireLogin({ allowedGroups }) {
    const { login } = useLogin();
    const location = useLocation();

    return(
        login?.usergroups?.find(group => allowedGroups?.includes(group))
            ? <Outlet />
            : login?.username
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}