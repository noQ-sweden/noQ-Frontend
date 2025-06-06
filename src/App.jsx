import { createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import RoomPage from "./pages/RoomPage";
import AccommodationDetail from "./components/User/AccommodationDetail";
import Bookings from "./components/User/Bookings";
import CaseworkerStatisticsPage from "./pages/CaseworkerStatisticsPage";
import VolunteerPage from "./pages/VolunteerPage";
import Activityes from "./pages/ActivityesPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VolunteerManagementDashboard from "./pages/VolunteerManagementDashboard";

import VolunteerDetails from "./components/Admin/VolunteerManagement/VolunteerDetails";

import StartPage from "./pages/compass/StartPage";
import ServiceTypePage from "./pages/compass/ServiceTypePage";
import AgePage from "./pages/compass/AgePage";
import ResultPage from "./pages/compass/ResultPage";
import VolunteersList from "./pages/VolunteersList";

export const VisitorContext = createContext();

function App() {
  return (

    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Pages */}
          <Route path="/" element={<LoginPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/login/:uid/:token" element={<LoginPage />} />
          <Route path="register" element={<RegistrationPage />} />
          <Route path="unauthorized" element={<UnauthorizedPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
          <Route path="reset-password/:uidb64/:token" element={<ResetPasswordPage/>}/>

          {/* User Pages */}
          <Route element={<RequireLogin allowedGroups={["user"]} />}>
            <Route path="user" element={<UserPage />} />
            <Route path="user-landing" element={<UserLandingPage />} />
            <Route
              path="accommodations/:id"
              element={<AccommodationDetail />}
            />
            <Route path="user/requests" element={<Bookings />} />
          </Route>

          {/* Host Pages */}
          <Route element={<RequireLogin allowedGroups={["host"]} />}>
            <Route path="host" element={<HostPage />} />
            <Route
              path="host/requests"
              element={<RequestPageView userGroup="host" />}
            />
            <Route path="host/products" element={<RoomPage />} />
            <Route path="host/volunteerlist" element={<VolunteersList />} />

          </Route>

          {/* Caseworker Pages */}
          <Route element={<RequireLogin allowedGroups={["caseworker"]} />}>
            <Route path="caseworker" element={<CaseworkerPage />} />
            <Route
              path="caseworker/requests"
              element={<RequestPageView userGroup="caseworker" />}
            />
            <Route
              path="caseworker/statistics"
              element={<CaseworkerStatisticsPage userGroup="caseworker" />}
            />
          </Route>

          {/* Activities Pages */}
          <Route element={<RequireLogin allowedGroups={["volunteer"]} />}>
            <Route path="/activities" element={<Activityes />} />
          </Route>

          {/* Volunteer Pages */}
          <Route element={<RequireLogin allowedGroups={["volunteer"]} />}>
            <Route path="volunteer" element={<VolunteerPage />} />
            <Route
              path="volunteer/requests"
              element={<RequestPageView userGroup="volunteer" />}
            />
            <Route path="volunteer/compass" element={<StartPage />} />
            <Route path="volunteer/compass/service-type" element={<ServiceTypePage />} />
            <Route path="volunteer/compass/age" element={<AgePage />} />
            <Route path="volunteer/compass/result" element={<ResultPage />} />
          </Route>

          {/* Volunteer Management Dashboard */}
          <Route element={<RequireLogin allowedGroups={["admin", "host"]} />}>
            {/* Volunteer Testing Page */}
            <Route
              path="host/volunteers"
              element={<VolunteerManagementDashboard />}
            />

             {/* Volunteer details */}
             <Route path="admin/volunteers/:id" element={<VolunteerDetails />} />
          </Route>
          {/* Invalid path */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes >
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
