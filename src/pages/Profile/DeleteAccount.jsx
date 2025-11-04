import React, { useState } from "react";
import { ConfirmDialog } from "./ConfirmDialog";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const DeleteAccount = ({ deleteProfile }) => {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      setDeleting(true);
      const ok = await deleteProfile();
      if (ok) {
        toast.success("Kontot har anonymiserats.");
        navigate("/login");
      } else {
        toast.error("Kunde inte anonymisera kontot.");
      }
    } catch (err) {
      console.error("Error Deleting the Profile: ".err);
      toast.error("Något gick fel.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center w-full">
        <form className="w-full lg:w-1/2 md:w-3/4">
          <div>
            <h3 className="text-lg text-red-600 font-semibold mb-6">
              Radera Konto
            </h3>
            <p className="text-sm text-red-600 mb-6">
              När du väl raderar ditt konto finns det ingen återvändo. Var helt
              säker.
            </p>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="px-8 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-red-700 transition"
            >
              Radera Konton
            </button>
          </div>

          <ConfirmDialog
            open={open}
            onClose={() => !deleting && setOpen(false)}
            title="Är du säker att du vill radera kontot?"
            description="Detta går inte att ångra. Din profil och kopplade uppgifter tas bort."
            onConfirm={handleDelete}
          />
        </form>
      </div>
    </>
  );
};

DeleteAccount.propTypes = {
  deleteProfile: PropTypes.func,
};
