import { Outlet } from "react-router-dom";
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

  return (
    <div className="App bg-background-white">
      <main>
        <div className="flex">
          {/*Show sidebar only if viewer is host*/}
          {viewerGroup === "host" || viewerGroup === "caseworker" || viewerGroup === "user" || viewerGroup === "volunteer" ? (
            <Sidebar />
          ) : null}
          <div style={{ flex: 1 }}>
            <Header />
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
