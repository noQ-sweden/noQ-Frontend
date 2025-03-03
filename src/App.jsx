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
import BookingUpdate from "./pages/BookingUpdateNotification";
import ErrorPage from "./pages/ErrorPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import RequestPageView from "./components/RequestsPage/RequestPageView";
import RoomPage from "./pages/RoomPage";
import AccommodationDetail from "./components/User/AccommodationDetail";
import AccommodationBooking from "./components/User/AccommodationBooking";
import Bookings from "./components/User/Bookings";
import CaseworkerStatisticsPage from "./pages/CaseworkerStatisticsPage";
import VolunteerPage from "./pages/VolunteerPage";


export const VisitorContext = createContext();

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Pages */}
        <Route path="/" element={<LoginPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegistrationPage />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />

        {/* User Pages */}
        <Route element={<RequireLogin allowedGroups={["user"]} />}>
          <Route path="user" element={<UserPage />} />
          <Route path="user-landing" element={<UserLandingPage />} />
          <Route path="accommodations/:id" element={<AccommodationDetail />} />
          <Route path="accommodations/:id/booking" element={<AccommodationBooking />} />
          <Route path="user/requests" element={<Bookings />} />
          <Route path="notifications" element={<BookingUpdate />} />
        </Route>

        {/* Host Pages */}
        <Route element={<RequireLogin allowedGroups={["host"]} />}>
          <Route path="host" element={<HostPage />} />
          <Route path="host/requests" element={<RequestPageView userGroup="host" />} />
          <Route path="host/products" element={<RoomPage />} />
        </Route>

        {/* Caseworker Pages */}
        <Route element={<RequireLogin allowedGroups={["caseworker"]} />}>
          <Route path="caseworker" element={<CaseworkerPage />} />
          <Route path="caseworker/requests" element={<RequestPageView userGroup="caseworker" />} />
          <Route path="caseworker/statistics" element={<CaseworkerStatisticsPage userGroup="caseworker" />} />
        </Route>

        {/* Volunteer Pages */}
        <Route element={<RequireLogin allowedGroups={["volunteer"]} />}>
          <Route path="volunteer" element={<VolunteerPage />} />
          <Route path="volunteer/requests" element={<RequestPageView userGroup="volunteer" />} />
          
        </Route>

        {/* Invalid path */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;