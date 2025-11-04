import React, { useState } from "react";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

export const ChangePassword = ({ passWordUpdate }) => {
  const [pwLoading, setPwLoading] = useState(false);
  const [seeCurrent, setSeeCurrent] = useState(false);
  const [seeNew, setSeeNew] = useState(false);
  const [seeConfirm, setSeeConfirm] = useState(false);
  const [newPassword, setNewPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const handleEditPassword = async (e) => {
    e.preventDefault();
    if (newPassword.new_password !== newPassword.confirm_password) {
      toast.error("Det nya lösenord måste vara lika");
      return;
    }
    const payload = {
      current_password: newPassword.current_password,
      new_password: newPassword.new_password,
    };

    setPwLoading(true);
    try {
      const res = await passWordUpdate(payload);
      if (res.status === 200 && !res.data.error) {
        toast.success("🎉 Lösenord har ändrats! 👏");
      } else if (res.data?.error) {
        toast.error(res.data.error);
      } else {
        toast.error(`Ett okänt fel inträffade: ${JSON.stringify(res.data)}`);
      }
    } catch (err) {
      const msg =
        err.response?.data?.error || "Fel vid uppdatering av lösenord.";
      toast.error(msg);
    } finally {
      setNewPassword({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
      setPwLoading(false);
    }
  };

  const SeePasswordEye = ({ isVisible, onToggle }) => {
    return (
      <>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault(), e.stopPropagation(), onToggle();
          }}
          className="ml-2 text-noq-gray-dark hove:text-noq-blue transition"
        >
          {isVisible ? (
            <EyeSlashIcon className="h-5 w-5" />
          ) : (
            <EyeIcon className="h-5 w-5" />
          )}
        </button>
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleEditPassword} className="w-full md:w-3/4 lg:w1/2">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Ändra ditt lösenord</h3>
          <div className="gap-4">
            <div>
              <label className="text-sm text-noq-gray-dark mb-1 block">
                Nuvarande Lösenord
              </label>
              <div>
                <input
                  type={seeCurrent ? "text" : "password"}
                  className="lg:1/2 md:w-2/3 rounded-3xl px-4 py-2 bg-noq-gray-light 
              focus:outline-none"
                  value={newPassword.current_password}
                  placeholder="Ange lösenord"
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      current_password: e.target.value,
                    })
                  }
                  autoComplete="current_password"
                  name="current_password"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <SeePasswordEye
                  isVisible={seeCurrent}
                  onToggle={() => setSeeCurrent(!seeCurrent)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-noq-gray-dark mb-3">
                Skapa nytt lösenord
              </label>
              <div>
                <input
                  value={newPassword.new_password}
                  type={seeNew ? "text" : "password"}
                  className="lg:1/2 md:w-2/3 rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  placeholder="Ange lösenord"
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      new_password: e.target.value,
                    })
                  }
                  autoComplete="new_password"
                  name="newPassword"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <SeePasswordEye
                  isVisible={seeNew}
                  onToggle={() => setSeeNew(!seeNew)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-noq-gray-dark mb-3">
                Upprepa lösenordet
              </label>
              <div>
                <input
                  value={newPassword.confirm_password}
                  type={seeConfirm ? "text" : "password"}
                  className="lg:1/2 md:w-2/3 rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  placeholder="Ange lösenordet"
                  onChange={(e) =>
                    setNewPassword({
                      ...newPassword,
                      confirm_password: e.target.value,
                    })
                  }
                  autoComplete="confirm_password"
                  name="confirmPassword"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                />
                <SeePasswordEye
                  onToggle={() => setSeeConfirm(!seeConfirm)}
                  isVisible={seeConfirm}
                />
              </div>
            </div>
            <div className="flex justify-center mt-9">
              <button
                type="submit"
                disabled={pwLoading}
                className="px-9 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition"
              >
                {pwLoading ? "Uppdaterar..." : "Ändra Lösenord"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

ChangePassword.propTypes = {
  passWordUpdate: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
  onToggle: PropTypes.func,
};
