import { Outlet, useLocation } from "react-router-dom";
import useLogin from "./../../hooks/useLogin";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import PropTypes from "prop-types";

Layout.propTypes = {
  login: PropTypes.any,
};

export default function Layout() {
  const { login } = useLogin();
  const viewerGroup =
    login?.usergroups instanceof Array ? login?.usergroups[0] : null;

  const location = useLocation();
  const isVolunteersListPage = location.pathname === "/host/volunteerlist";

  return (
    <div className="App bg-background-white">
      <main>
        <div className="flex">
          {/*Show sidebar only if viewer is host*/}
          {["host", "caseworker", "user", "volunteer", "admin"].includes(
            viewerGroup
          ) && <Sidebar />}
          <div style={{ flex: 1 }}>
            {!isVolunteersListPage && <Header />}
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
