import { useState } from "react";
import { ReactDOM } from "react";
import { ViewerGroup } from "./enums";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPageView from "./components/Admin/FrontPageView";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import RequestPageView from "./components/RequestsPage/RequestPageView";
function App() {
  const [loginState, setLoginState] = useState(false);
  const [viewerState, setViewerState] = useState(ViewerGroup.Unauthorized);

  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <Sidebar
            loginState={loginState}
            viewerState={viewerState} />
          <div style={{ flex: 1 }}>
            <Header
              setLoginState={setLoginState}
              setViewerState={setViewerState} />
            <Routes>
              <Route
                path="/"
                element={<FrontPageView loginState={loginState} />}></Route>
              <Route path="/requests" element={<RequestPageView />}></Route>

              <Route path="*" element={"404 cannot find page"}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
