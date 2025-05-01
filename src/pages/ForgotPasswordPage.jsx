import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "./../api/AxiosNoqApi";
import SEO from "../components/SEO";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Du måste ange en e-postadress!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("api/forgot-password/", {
        username: email,
      });

      if (response.status === 200) {
        setMessage(
          "Instruktioner för återställning av lösenord har skickats till din e-post."
        );
        setEmail("");
      }
    } catch (error) {
      console.error("Fel vid API-anrop", error);
      setError("Kontrollera att din e-postadress är korrekt och försök igen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO title={`Glömt Lösenord | NoQ - Trygg Plats för att alla förtjänar det`} />
      <div className="flex items-center justify-center bg-noq-gray-light">
        <div className="flex items-center justify-center m-2 w-full max-w-xs lg:max-w-sm xl:max-w-md bg-white rounded-2xl sm:m-4 md:m-6">
          <div className="w-full max-w-xs rounded-2xl p-6 m-2 sm:max-w-xs md:max-w-xs">
            <h2 className="text-center text-2xl font-semibold text-noq-green mb-6">
              Glömt ditt lösenord?
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <p className="noq-red text-sm">{error}</p>}
              {message && <p className="noq-green text-sm">{message}</p>}

              <div>
                <label className="block text-sm text-noq-gray-dark mb-4">
                  E-postadress
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-400 rounded-2xl px-4 py-2 bg-noq-gray-light focus:outline-none mb-10"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="border border-gray-400 mt-10 w-48 mx-auto bg-green-600 text-white py-2 rounded-full hover:bg-noq-dark-green transition block"
              >
                {isLoading ? "Skickar..." : "Skicka instruktioner"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-sm text-noq-gray-dark hover:text-noq-green">
                Tillbaka till inloggning
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
