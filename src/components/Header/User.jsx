import React, { useState } from "react";
import axios from "axios";

export default function User({ isDropdownOpen, onClick, setLoginState }) {
  const [loginSuccessful, setLoginSuccessful] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [admin, setAdmin] = useState({});

  const client = axios.create({
    headers: {
      "Content-type": "application/json",
    },
    withCredentials: true,
  });

  /*
  const loginHandler = async () => {
    try {
      const response = await client.post("http://localhost:8000/api/login/", {
        email: "ngustafsson@example.net",
        password: "23OD*q^b@+",
      });

      if (response.status === 200) {
        setLoginSuccessful(true);
        setIsUserLoggedIn(true);
        setLoginState(true);
        const admin = {
          email: "ngustafsso
*/
}
