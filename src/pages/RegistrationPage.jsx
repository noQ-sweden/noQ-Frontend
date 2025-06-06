import React, { useState, useRef, } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./../api/AxiosNoqApi";
import SEO from "../components/SEO";

const ROLE_MAP = { guest: "user", volunteer: "volunteer" };

export default function RegistrationPage() {
  const [userType, setUserType] = useState("guest");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Client-side validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      setError("Alla fält markerade med * måste fyllas i.");
      errorRef.current?.focus();
      return;
    }
    if (!confirmPassword) {
      setError("Du måste bekräfta lösenordet.");
      errorRef.current?.focus();
      return;
    }
    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte.");
      errorRef.current?.focus();
      return;
    }

    const payload = { first_name: firstName, last_name: lastName, email, password };

    try {
      const response = await axios.post(
        "/api/register/",
        payload,
        {
          headers: { "X-User-Role": ROLE_MAP[userType] },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setSuccess(response.data.success);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => navigate("/login"), 3500);
      } else {
        setError(response.data.error);
        errorRef.current?.focus();
      }
    } catch (err) {
      const msg = err.response?.data?.error || "Internet fel uppstod.";
      setError(msg);
      errorRef.current?.focus();
    }
  };

  return (
    <>
      <SEO title={`Registrering | NoQ - Trygg Plats för att alla förtjänar det`} />
      <div className="flex items-center justify-center bg-noq-gray-light">
        <div className="flex items-center justify-center m-2 w-full max-w-xs lg:max-w-sm xl:max-w-md bg-white rounded-2xl sm:m-4 md:m-6">
          <div className="w-full max-w-xs rounded-2xl p-6 m-2 sm:max-w-xs md:max-w-xs">
            <h2 className="text-center text-2xl font-semibold text-noq-green mb-6">
              Registrera dig
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <p className="noq-red text-sm">{error}</p>}
              {success && <p className="noq-green text-sm">{success}</p>}

              <div>
                <label className="block text-sm text-noq-gray-dark mb-1">
                  Förnamn*
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-noq-gray-dark mb-1">
                  Efternamn*
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-noq-gray-dark mb-1">
                  E-post*
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-noq-gray-dark mb-1">
                  Lösenord*
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-noq-gray-dark mb-1">
                  Upprepa lösenord*
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                />
              </div>

              <div className="">
                <label className="block text-sm text-noq-gray-dark mb-1">
                  Välj användartyp*
                </label>
                <div className="flex space-x-4">
                  {Object.entries(ROLE_MAP).map(([key, _]) => (
                    <label
                      key={key}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={key}
                        checked={userType === key}
                        onChange={() => setUserType(key)}
                        className="accent-noq-green"
                      />
                      <span className="text-noq-gray-dark">
                        {key === "guest" ? "Gäst" : "Volontär"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="!mt-10 w-48 mx-auto bg-noq-green text-white py-2 rounded-full hover:bg-noq-dark-green transition block"
              >
                Registrera dig
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}