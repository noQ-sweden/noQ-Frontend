import React, { useState, useEffect } from "react";
import useLogin from "../../hooks/useLogin";

export const BasicInfo = ({ user, onSave }) => {
  const { login } = useLogin();
  const [form, setForm] = useState({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    email: user.email || "",
    phone: user.phone || "",
    day_of_birthday: user.day_of_birthday || "",
    address: user.address || "",
    postcode: user.postcode || "",
    city: user.city || "",
  });

  useEffect(() => {
    setForm({
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      phone: user.phone || "",
      day_of_birthday: user.day_of_birthday || "",
      address: user.address || "",
      postcode: user.postcode || "",
      city: user.city || "",
    });
  }, [user]);

  const update = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const formShipment = async (e) => {
    e.preventDefault();
    await onSave(form);
  };

  return (
    <>
      <form onSubmit={formShipment}>
        <div className="flex flex-col">
          <label
            htmlFor="firts_name"
            className="text-sm text-noq-gray-dark mb-2"
          >
            Förnamn *
          </label>
          <input
            id="firts_name"
            type="text"
            className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
            value={form.first_name}
            onChange={update("first_name")}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="last_name"
            className="text-sm text-noq-gray-dark mb-2"
          >
            Efternamen *
          </label>
          <input
            id="last_name"
            type="text"
            className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
            value={form.last_name}
            onChange={update("last_name")}
          />
          {/* Third column*/}
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
          <div className="flex flex-col gap-4 md:col-span-2">
            <div className="w-1/3">
              <label
                htmlFor="day_of_birthday"
                className="block text-sm text-noq-gray-dark mb-1"
              >
                Födelsedag
              </label>
              <input
                id="day_of_birthday"
                className="w-full rounded-3xl px-2 py-2 bg-noq-gray-light focus:outline-none"
                value={form.day_of_birthday}
                onChange={update("day_of_birthday")}
              />
            </div>

            <div className="flex gap-4 w-full">
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="block text-sm text-noq-gray-dark mb-1"
                >
                  E-post*
                </label>
                <input
                  type="email"
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  value={form.email}
                  onChange={update("email")}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="phone"
                  className="block text-sm text-noq-gray-dark mb-1"
                >
                  Telefonnummer*
                </label>
                <input
                  id="phone"
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  value={form.phone}
                  onChange={update("phone")}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm text-noq-gray-dark mb-1"
              >
                Postadress
              </label>
              <input
                id="address"
                className="w-1/2 rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                value={form.address}
                onChange={update("address")}
              />
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex-1 ">
                <label
                  htmlFor="postcode"
                  className="block text-sm text-noq-gray-dark mb-1"
                >
                  Postnummer
                </label>
                <input
                  id="postcode"
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  value={form.postcode}
                  onChange={update("postcode")}
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="city"
                  className="block text-sm text-noq-gray-dark mb-1"
                >
                  Ort
                </label>
                <input
                  id="city"
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  value={form.city}
                  onChange={update("city")}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-2/3 md:w-1/4 rounded-full bg-emerald-600 text-white font-semibold py-3"
              >
                Spara
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
