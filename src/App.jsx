import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import RequireLogin from "./components/RequireLogin";
import useLogin from "./hooks/useLogin";
import FrontPageView from "./components/Admin/FrontPageView";
import Layout from "./components/Layouts/Layout";
import LoginPage from "./pages/LoginPage";
import HostPage from "./pages/HostPage";
import UserPage from "./pages/UserPage";
import RegistrationPage from "./pages/RegistrationPage";
import ErrorPage from "./pages/ErrorPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import RequestPageView from "./components/RequestsPage/RequestPageView";

export const VisitorContext = createContext();

function App() {
    const { login } = useLogin();

    return (
        <Routes>
            <Route path="/" element={<Layout login={login} />}>
                {/* Public pages */}
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegistrationPage />} />
                <Route path="unauthorized" element={<UnauthorizedPage />} />

                {/* User pages */}
                <Route element={<RequireLogin allowedGroups={["user"]}/>}>
                    <Route path="/user" element={<UserPage />} />
                </Route>
                {/* Host pages */}
                <Route element={<RequireLogin allowedGroups={["host"]}/>}>
                    <Route path="/host" element={<HostPage />} />
                    <Route path="/admin" element={<FrontPageView />} />
                    <Route path="/host/requests" element={<RequestPageView />} />
                </Route>
                {/* Invalid path */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}

export default App;