import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route } from "react-router-dom";
import { LoginProvider } from "./context/LoginProvider";
import App from "./App.jsx";
import "./index.css";



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <LoginProvider>
                  <Routes>
                      <Route path="/*" element={<App />} />
                  </Routes>
            </LoginProvider>
        </BrowserRouter>
    </React.StrictMode>
);
