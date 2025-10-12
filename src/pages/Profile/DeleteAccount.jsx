import React from "react";

export const DeleteAccount = ({}) => {
  return (
    <>
      <h3 className="text-lg text-red-600 font-semibold mb-6">Radera Konto</h3>
      <p className="text-sm text-red-600 mb-6">
        När du väl raderar ditt konto finns det ingen återvändo. Var helt säker.
      </p>
      <div className="flex justify-end gap-9 mt-9">
        <button
          type="button"
          className="w-2/3 md:w-1/4 rounded-full bg-emerald-600 text-white font-semibold py-3 hover:bg-red-700 transition"
        >
          Radera Konton
        </button>
      </div>
    </>
  );
};
