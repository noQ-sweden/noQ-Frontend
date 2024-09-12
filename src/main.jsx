import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route } from "react-router-dom";
import { LoginProvider } from "./context/LoginProvider";
import { HostProvider } from "./context/HostProvider";
import { AccommodationProvider } from "./context/AccommodationProvider";
import App from "./App.jsx";
import "./index.css";



ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <LoginProvider>
                <HostProvider>
                     <AccommodationProvider>
                        <Routes>
                            <Route path="/*" element={<App />} />
                        </Routes>
                    </AccommodationProvider>
                </HostProvider>
            </LoginProvider>
        </BrowserRouter>
    </React.StrictMode>
);
