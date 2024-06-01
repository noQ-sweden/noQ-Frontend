import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"
import RequestPageView from "./components/RequestsPage/RequestPageView";
import HostelData from "./components/Admin/FrontPageView";
import { VisitorGroup} from "./enums"

function UserDashboard() {
    return <div>UserDashboard</div>;
}

export const VisitorContext = createContext();

function App() {
    const [loginState, setLoginState] = useState(false);
    const [visitorGroupState, setVisitorGroupState] = useState(VisitorGroup.Unauthorized);
    const [visitorId, setVisitorIdState] = useState("");

    const loginHandler = (loginState, visitorGroupState, visitorId ) => {
        setLoginState(loginState);
        setVisitorGroupState(visitorGroupState);
        setVisitorIdState(visitorId);
    }

    return (
        <>
            <BrowserRouter>
                {loginState ? (
                    <VisitorContext.Provider value={{loginState, visitorGroupState, visitorId, loginHandler}}>
                        <div className="flex">
                            <Sidebar />
                            <div style={{ flex: 1 }}>
                                <Header />
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            visitorGroupState === "host" ? (
                                                <HostelData />
                                            ) : (
                                                <UserDashboard />
                                            )
                                        }
                                    ></Route>
                                    <Route
                                        path="/requests"
                                        element={<RequestPageView />}
                                    ></Route>
                                    <Route path="*" element={"404 cannot find page"}></Route>
                                </Routes>
                            </div>
                        </div>
                    </VisitorContext.Provider>
                ) : (
                    <div>
                        <Routes>
                            <Route
                                path="/register/"
                                element={
                                    <RegistrationPage />
                                }>
                            </Route>
                            <Route
                                path="*"
                                element={
                                    <LoginPage
                                        loginHandler={loginHandler}
                                    />
                                }>
                            </Route>
                        </Routes>
                    </div>
                )}
            </BrowserRouter>
        </>
    );
}

export default App;