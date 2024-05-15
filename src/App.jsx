import { useState } from "react";
import { ReactDOM } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FrontPageView from "./components/Admin/FrontPageView";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";

function App() {
  const [loginState, setLoginState] = useState(false);
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div style={{ flex: 1 }}>
            <Header setLoginState={setLoginState} />
            <Routes>
              <Route
                path="/"
                element={<FrontPageView loginState={loginState} />}></Route>
              <Route path="/hej" element={<div>inte hej hej</div>}>
                {" "}
              </Route>
              <Route path="*" element={<div>error</div>}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
