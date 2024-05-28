import React, { useState } from "react";
import axios from "./AxiosNoqApi";
import { ViewerGroup } from "../enums";

export default function Login({setLoginState, setViewerState}) {

  function UserLogin(username, password) {
    axios.post ('api/login/', {
      email: username,
      password: password
    })
    .then ((response) => {
      if (response.status === 200 && response.data.login_status === true) {
        setLoginState(true);
        setViewerState(response.data.groups[0]);
      } else {
        console.log("Login failed, invalid credentials.")
      }
    })
    .catch((error) => {
      console.log("Error while login.", error);
    });
  }

  return (
    <div>
      <div>
        {
        // These buttons are here to help testing while the Form is under construction
        // TO BE UPDATED when UI is ready
        }
        <button onClick={() => UserLogin("user.user@test.nu", "P4ssw0rd_for_Te5t+User")}>User Login</button>
        <br/>
        <br/>
        <button onClick={() => UserLogin("user.host@test.nu", "P4ssw0rd_for_Te5t+User")}>Host Login</button>
        <br/>
        <br/>
        <button onClick={() => UserLogin("unauthorized.user@test.nu", "P4ssw0rd_for_Te5t+User")}>Unauthorized Login</button>
      </div>
    </div>
  )
}