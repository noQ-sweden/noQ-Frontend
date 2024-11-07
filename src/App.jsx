import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import RequireLogin from "./components/RequireLogin";
import Layout from "./components/Layouts/Layout";
import LoginPage from "./pages/LoginPage";
import CaseworkerPage from "./pages/CaseworkerPage";
import HostPage from "./pages/HostPage";
import UserPage from "./pages/UserPage";
import UserLandingPage from "./pages/UserLandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import ErrorPage from "./pages/ErrorPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import RequestPageView from "./components/RequestsPage/RequestPageView";
import StatisticsPage from "./components/Caseworker/StatisticsPage";
import RoomPage from "./pages/RoomPage";
import AccommodationDetail from "./components/User/AccommodationDetail";
import AccommodationBooking from "./components/User/AccommodationBooking";
import Bookings from "./components/User/Bookings";
import UserManagementPage from "./pages/UserManagementPage";

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
        <Route element={<RequireLogin allowedGroups={["user"]} />}>
          <Route path="user" element={<UserPage />} />
          <Route path="user-landing" element={<UserLandingPage />} />
          <Route path="accommodations/:id" element={<AccommodationDetail />} />
          <Route
            path="accommodations/:id/booking"
            element={<AccommodationBooking />}
          />
          <Route path="user/requests" element={<Bookings />} />
        </Route>
        {/* Host pages */}
        <Route element={<RequireLogin allowedGroups={["host"]} />}>
          <Route path="host" element={<HostPage />} />
          <Route
            path="host/requests"
            element={<RequestPageView userGroup="host" />}
          />
          <Route path="host/products" element={<RoomPage />} />
        </Route>
        {/* Host pages */}
        <Route element={<RequireLogin allowedGroups={["caseworker"]} />}>
          <Route path="caseworker" element={<CaseworkerPage />} />
          <Route
            path="caseworker/user-management"
            element={<UserManagementPage />}
          />
          <Route
            path="caseworker/requests"
            element={<RequestPageView userGroup="caseworker" />}
          />
          <Route
            path="caseworker/statistics"
            element={<StatisticsPage userGroup="caseworker" />}
          />
        </Route>
        {/* Invalid path */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
