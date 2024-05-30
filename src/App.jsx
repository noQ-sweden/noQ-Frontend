import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login"
import RequestPageView from "./components/RequestsPage/RequestPageView";
import HostelData from "./components/Admin/FrontPageView";

function UserDashboard() {
    return <div>UserDashboard</div>;
}

function App() {
  const [loginState, setLoginState] = useState(false);
  const [viewerState, setViewerState] = useState("");


    return (
        <>
            <BrowserRouter>
                {loginState ? (
                    <div className="flex">
                        <Sidebar loginState={loginState} viewerState={viewerState} />
                        <div style={{ flex: 1 }}>
                            <Header
                                setLoginState={setLoginState}
                                setViewerState={setViewerState}
                            />
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        viewerState === "host" ? (
                                            <HostelData loginState={loginState} />
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
                ) : (
                    <div>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Login
                                        setLoginState={setLoginState}
                                        setViewerState={setViewerState}
                                    />
                                }
                            ></Route>
                            <Route path="*" element={"404 cannot find page"}></Route>
                        </Routes>
                    </div>
                )}
            </BrowserRouter>
        </>
    );
}

export default App;