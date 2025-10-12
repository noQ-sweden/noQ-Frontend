import React from "react";

export const ChangePassword = ({}) => {
  return (
    <>
      <div className="my-3">
        <h3 className="text-lg font-semibold mb-4">Ändra ditt lösenord</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-noq-gray-dark mb-1 block">
              Nuvarande Lösenord
            </label>
            <input
              className="w-1/2 rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
              placeholder="Nuvarande Lösenord"
            />
          </div>
          <div>
            <label className="block text-sm text-noq-gray-dark mb-3">
              Skapa nytt Lösenord
            </label>
            <input
              className="w-1/2 rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
              placeholder="Nytt Lösenord"
            />
          </div>
          <div>
            <label className="block text-sm text-noq-gray-dark mb-3">
              Upprepa lösenord
            </label>
            <input
              className="w-1/2 rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
              placeholder="Upprepa Lösenord"
            />
          </div>
          <div className="flex justify-end gap-9 mt-9">
            <button
              type="button"
              className="w-2/3 md:w-1/4 bg-emerald-600 text-white font-semibold py-3 rounded-full mt-2 hover:bg-emerald-700 transition"
            >
              Ändra Lösenord
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
