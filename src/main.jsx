import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route } from "react-router-dom";
import { LoginProvider } from "./context/LoginProvider";
import { HostProvider } from "./context/HostProvider";
import { AccommodationProvider } from "./context/AccommodationProvider";
import { HeaderProvider } from "./context/HeaderProvider";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js"



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <LoginProvider>
                <HeaderProvider>
                    <HostProvider>
                        <AccommodationProvider>
                            <Routes>
                                <Route path="/*" element={<App />} />
                            </Routes>
                        </AccommodationProvider>
                    </HostProvider>
                </HeaderProvider>
            </LoginProvider>
        </BrowserRouter>
    </React.StrictMode>
);
