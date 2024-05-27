import React, { useState } from "react";
import axios from "axios";
import { ViewerGroup } from "../enums";

export default function Login({setLoginState, setViewerState}) {

  function UserLogin(username, password) {
    axios.post ('http://127.0.0.1:8000/api/login/', {
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
      </div>
    </div>
  )
}