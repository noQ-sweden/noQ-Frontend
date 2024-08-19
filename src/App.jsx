import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import RequireLogin from "./components/RequireLogin";
import Layout from "./components/Layouts/Layout";
import LoginPage from "./pages/LoginPage";
import CaseworkerPage from "./pages/CaseworkerPage";
import HostPage from "./pages/HostPage";
import UserPage from "./pages/UserPage";
import RegistrationPage from "./pages/RegistrationPage";
import ErrorPage from "./pages/ErrorPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import RequestPageView from "./components/RequestsPage/RequestPageView";
import RoomPage from "./pages/RoomPage";

export const VisitorContext = createContext();

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Public pages */}
                <Route path="/" element={<LoginPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegistrationPage />} />
                <Route path="unauthorized" element={<UnauthorizedPage />} />

                {/* User pages */}
                <Route element={<RequireLogin allowedGroups={["user"]}/>}>
                    <Route path="user" element={<UserPage />} />
                </Route>
                {/* Host pages */}
                <Route element={<RequireLogin allowedGroups={["host"]}/>}>
                    <Route path="host" element={<HostPage />} />
                    <Route path="admin" element={<CaseworkerPage />} />
                    <Route path="host/requests" element={<RequestPageView />} />
                    <Route path="host/products" element={<RoomPage />} />
                </Route>
                {/* Invalid path */}
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    );
}

export default App;