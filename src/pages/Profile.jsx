import React from "react";
//import PropTypes from "prop-types";
import useLogin from "../hooks/useLogin";

export default function Profile() {
  const { login } = useLogin();
  console.log("is login: ", login);
  if (!login) return <p>No Data exists</p>;

  const { first_name, last_name } = login || {};

  return (
    <div className="min-h-screen flex flex-col justify-start bg-noq-gray-extra p-4 sm:p-6 lg:p-8">
      <form className="min-h-screen w-full mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div className="flex flex-col">
              <label className="text-sm text-noq-gray-dark mb-2">
                Förnamn *
              </label>
              <input
                type="text"
                className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                placeholder={first_name}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-noq-gray-dark mb-2">
                Efternamen *
              </label>
              <input
                className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                placeholder={last_name}
              />
            </div>
            <div>
              <h3 className="block text-sm text-noq-gray-dark mb-1">Kön</h3>
              <div className="flex flex-row gap-3">
                <label className="flex items-center gap-3">
                  <input type="radio" name="gender" className="w-4 h-4" />
                  Kvinna
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="gender" className="w-4 h-4" />
                  Man
                </label>

                <label className="flex items-center gap-3">
                  <input type="radio" name="gender" className="w-4 h-4" />
                  Annat
                </label>
              </div>
            </div>
            <div>
              <div>
                <label className="block text-sm text-noq-gray-dark mb-1">
                  Födelsedag
                </label>
                <input
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  placeholder="Datum"
                />
              </div>
            </div>
            <div>
              <div>
                <label className="block text-sm text-noq-gray-dark mb-1">
                  E-post*
                </label>
                <input
                  type="email"
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  placeholder="E-post"
                />
              </div>
            </div>
            <div>
              <div>
                <label className="block text-sm text-noq-gray-dark mb-1">
                  Telefonnummer*
                </label>
                <input
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  placeholder="telefonnummer"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-noq-gray-dark mb-1">
                Postadress
              </label>
              <input
                className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                placeholder="Postadress"
              />
            </div>
            <div>
              <label className="block text-sm text-noq-gray-dark mb-1">
                Postnummer
              </label>
              <input
                className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                placeholder="Postnummer"
              />
            </div>
            <div>
              <label className="block text-sm text-noq-gray-dark mb-1">
                Ort
              </label>
              <input
                className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                placeholder="Ort"
              />
            </div>
            <button
              type="button"
              className="w-1/4 rounded-full bg-emerald-600 text-white font-semibold py-3"
            >
              Spara
            </button>
          </div>
          {/* Bytta lösenord */}
          <div className="p-3 mt-3">
            <h3 className="text-lg font-semibold mb-4">Ändra ditt lösenord</h3>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-noq-gray-dark mb-1 block">
                  Nuvarande Lösenord
                </label>
                <input
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  placeholder="Nuvarande Lösenord"
                />
              </div>
              <div>
                <label className="block text-sm text-noq-gray-dark mb-3">
                  Skapa nytt Lösenord
                </label>
                <input
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  placeholder="Nytt Lösenord"
                />
              </div>
              <div>
                <label className="block text-sm text-noq-gray-dark mb-3">
                  Upprepa lösenord
                </label>
                <input
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  placeholder="Upprepa Lösenord"
                />
              </div>

              <button
                type="button"
                className="w-1/2 bg-emerald-600 text-white font-semibold py-3 rounded-full mt-2 hover:bg-emerald-700 transition"
              >
                Ändra Lösenord
              </button>
            </div>
          </div>
          {/* Delete account */}
          <div className="p-3 mt-3">
            <p className="text-sm text-red-600 mb-4">
              När du väl raderar ditt konto finns det ingen återvändo. Var helt
              säker.
            </p>

            <button
              type="button"
              className="w-1/2 rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-red-700 transition"
            >
              Radera Konton
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* 
export default Profile;
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  postcode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  unokod: PropTypes.string.isRequired,
  dayOfBirth: PropTypes.string.isRequired,
  personnrLastnr: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  lastEdit: PropTypes.string.isRequired,
};
 */
