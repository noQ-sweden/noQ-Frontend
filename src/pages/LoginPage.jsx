import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import axios from "./../api/AxiosNoqApi";
import PropTypes from "prop-types";
import useLogin from "./../hooks/useLogin";
import useHeader from "./../hooks/useHeader";
import SEO from "../components/SEO";
import { roleToRouteMap } from "../config/roleRoutes";
import noQicon from "../assets/images/noQiconNoQGreen.svg";

LoginPage.propTypes = {
  loginHandler: PropTypes.func,
};

export default function LoginPage() {
  const { setLogin } = useLogin();
  const { setHeader } = useHeader();
  const { uid, token } = useParams();
  const hasActivated = useRef(false);
  const userRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function getSafeRedirect(from, usergroups) {
    // Centralized redirect logic based on user role
    // Role-to-path mapping are defined in scr/config/roleRoutes.js
    // This function will return the correct dashboard path to the user
    // depending on their role and the route they came from.
    const userRole = usergroups?.[0];
    if (from === "/" || !roleToRouteMap[userRole]) {
      return roleToRouteMap[userRole] || "/";
    }
    return from;
  }

  useEffect(() => {
    if (uid && token && !hasActivated.current) {
      hasActivated.current = true;
      axios.post(`/api/activate/${uid}/${token}/`).finally(() => {
        navigate("/login", { replace: true });
      });
    }
  }, []);

  useEffect(() => {
    // check if user is already logged in
    // automaticaly login after refresh page
    axios
      .get("/api/self/auth/", {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.login_status === true) {
          const usergroups = response?.data?.groups;
          const host = response?.data?.host;
          const first_name = response?.data?.first_name;
          const last_name = response?.data?.last_name;
          setLogin({ username, first_name, last_name, usergroups, host });
          setHeader("");

          setUsername("");
          setPassword("");

          navigate(getSafeRedirect(from, usergroups), { replace: true });
        }
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          console.log("No Active session - user not logged in");
        } else {
          console.warn("Unknown error during /self/auth check", err);
        }
      });
  }, []);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const navigateToRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post(
        "/api/login/",
        {
          email: username,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        if (response.status === 200 && response.data.login_status === true) {
          const usergroups = response?.data?.groups;
          const host = response?.data?.host;
          const first_name = response?.data?.first_name;
          const last_name = response?.data?.last_name;
          setLogin({ username, first_name, last_name, usergroups, host });
          setHeader("");

          setUsername("");
          setPassword("");

          navigate(getSafeRedirect(from, usergroups), { replace: true });
        } else {
          setErrorMessage("Autentisering misslyckades.");
          setUsername("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.log("Error while login.", error);
      });
    setPassword("");
  };

  // Inject Botpress scripts
  useEffect(() => {
    const botpressScript1 = document.createElement("script");
    botpressScript1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    botpressScript1.async = true;

    const botpressScript2 = document.createElement("script");
    botpressScript2.src =
      "https://files.bpcontent.cloud/2024/11/02/09/20241102093854-JYPQTPG9.js";
    botpressScript2.async = true;

    document.body.appendChild(botpressScript1);
    document.body.appendChild(botpressScript2);

    return () => {
      document.body.removeChild(botpressScript1);
      document.body.removeChild(botpressScript2);
    };
  }, []);
  return (
    <>
      <SEO
        title={`Inloggning | NoQ - Trygg Plats för att alla förtjänar det`}
      />
      <div className="min-h-dvh flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-sm">
          <div className="mb-12 text-red-600 text-xl font-semibold">
            <p
              ref={errorRef}
              className={errorMessage ? "errorMessage" : "offScreen"}
            >
              {errorMessage}
            </p>
          </div>
          <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
            <img src={noQicon} alt="noQ" className="mx-auto mb-6 h-10" />
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold text-emerald-600 text-center mb-8">
                  Välkommen till noQ
                </h1>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-base font-semibold mb-2"
                  htmlFor="username"
                >
                  E-post
                  <input
                    className="
                  w-full
                  rounded-full
                  bg-gray-100
                  px-4
                  py-3
                  outline-none
                  focus:ring-emerald-500
                  focus:ring-2"
                    placeholder="E-post"
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="on"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                  />
                </label>
              </div>
              <div className="mb-1">
                <label
                  className="block text-gray-700 text-base font-semibold mb-2"
                  htmlFor="password"
                >
                  Lösenord
                  <input
                    className="
                  w-full
                  rounded-full
                  bg-gray-100
                  px-4
                  py-3
                  outline-none
                  focus:ring-emerald-500
                  focus:ring-2"
                    placeholder="Lösenord"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    autoComplete="current-password"
                  />
                </label>
              </div>
              <div>
                <p className="mt-2 text-right">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-emerald-700 underline"
                  >
                    Glömt lösenordet?
                  </Link>
                </p>
              </div>
              <div className="flex flex-col items-center mt-10">
                <button
                  type="submit"
                  className="w-full rounded-full bg-emerald-600 text-white font-semibold py-3"
                  id="login-button"
                >
                  Logga in
                </button>
              </div>
              <div className="mt-6 space-y-2 text-center">
                <p className="text-sm mb-1">Har du inget konto?</p>
                <Link
                  type="button"
                  onClick={navigateToRegister}
                  className="inline-flex w-full justify-center rounded-full border border-emerald-600 py-3 font-semibold text-emerald-600"
                  id="register-button"
                >
                  Registrera dig
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
