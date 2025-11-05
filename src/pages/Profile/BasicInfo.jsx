import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Avatar } from "./Avatar";
import { CameraIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import AxiosNoqApi from "./../../api/AxiosNoqApi";

export const BasicInfo = ({ user, onSave, uploadAvatar }) => {
  const [uploadImg, setUploadImg] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formUpdate, setFormUpdate] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    day_of_birth: "",
    address: "",
    postcode: "",
    city: "",
    gender: "",
    presentation: "",
    avatar_url: "",
  });
  const fileRef = useRef(null);

  const update = (key) => (e) =>
    setFormUpdate((prev) => ({ ...prev, [key]: e.target.value }));

  const gender = [
    { label: "Kvina", value: "f" },
    { label: "Man", value: "m" },
    { label: "Annat", value: "o" },
  ];

  const formShipment = async (e) => {
    e.preventDefault();
    const merged = { ...user, ...formUpdate };
    setIsSaving(true);
    try {
      await onSave(merged);
    } catch (err) {
      console.error("Error Saving profile: ", err);
    } finally {
      setIsSaving(false);
    }
  };

  const buildAvatarSrc = (raw) => {
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw;
    const apiBase =
      AxiosNoqApi?.defaults?.baseURL || "http://localhost:8000/api/";
    const origin = new URL(apiBase, window.location.origin).origin; // => http://localhost:8000
    const path = raw.startsWith("/") ? raw : `/${raw}`;
    return `${origin}${path}`;
  };

  const handleChangeImg = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadImg(true);
    try {
      const data = await uploadAvatar(file); // returns { avatar_url: "/media/..." or absolute }
      const abs = buildAvatarSrc(data?.avatar_url); // make absolute if needed
      const cacheKey = Date.now();
      const nextUrl = `${abs}?t=${cacheKey}`;

      setFormUpdate((p) => ({ ...p, avatar: nextUrl, avatar_url: nextUrl }));

      setFormUpdate((p) => ({
        ...p,
        avatar_url: nextUrl,
      }));
      toast.success("Avatar uppdaterad!");
    } catch (err) {
      console.error("[handleChangeImg] upload failed: ", err);
      const msg = err?.response?.data?.error || "Kunde inte ladda upp avatar.";
      toast.error(msg);
    } finally {
      setUploadImg(false);
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (!user) return;
    setFormUpdate((p) => ({
      ...p,
      ...user,
      avatar_url: buildAvatarSrc(user.avatar_url ?? user.avatar ?? ""),
    }));
  }, [user]);

  return (
    <>
      <form onSubmit={formShipment}>
        <div className="flex flex-col">
          <div className="flex flex-col gap-6 py-9 lg:flex-row lg:gap-8">
            <div className="self-center lg:self-center">
              <Avatar
                avatar={formUpdate.avatar_url}
                alt={
                  `${formUpdate.first_name ?? ""} ${
                    formUpdate.last_name ?? ""
                  }`.trim() || "avatar"
                }
                className="w-28 sm:w-32 md:w-[158px] lg:w-32"
              />

              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploadImg}
                className="inline-flex items-center gap-2 text-sm underline text-gray-600 hover:text-gray-800 disabled:opacity-60"
              >
                <CameraIcon className="w-4 h-4" aria-hidden="true" />
                {uploadImg ? "Laddar upp..." : "Byt bild"}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
                onChange={handleChangeImg}
              />
            </div>
            <div className="w-full lg:flex-1 lg:min-w-0">
              <label
                htmlFor="presentation"
                className="block text-sm font-medium mb-2"
              >
                Min presentation
              </label>
              <div className="flex items-center gap-2">
                <textarea
                  type="text"
                  id="presentation"
                  value={formUpdate.presentation ?? ""}
                  className="block w-full lg:w-3/4 min-h-32 md:min-h-36 lg:min-h-40 rounded-xl px-3 py-3
                     bg-noq-gray-light border border-gray-200 focus:outline-none
                     focus:ring-2 focus:ring-emerald-600 resize-y"
                  placeholder="Skriv en kort presentation..."
                  rows={4}
                  onChange={update("presentation")}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-9">
            <div className="w-2/3 md:self-stretch md:flex-1">
              <label
                htmlFor="firts_name"
                className="text-sm text-noq-gray-dark mb-2"
              >
                Förnamn *
              </label>
              <input
                id="firts_name"
                className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                value={formUpdate.first_name}
                onChange={update("first_name")}
              />
            </div>

            <div className="w-2/3 md:self-stretch md:flex-1">
              <label
                htmlFor="last_name"
                className="text-sm text-noq-gray-dark mb-2"
              >
                Efternamen *
              </label>
              <input
                id="last_name"
                className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                value={formUpdate.last_name}
                onChange={update("last_name")}
              />
            </div>
          </div>
          {/* Third column*/}
          <div>
            <h3 className="block text-sm text-noq-gray-dark mb-1">Kön</h3>
            <div className="flex flex-row gap-3">
              {gender.map((g) => (
                <label
                  htmlFor="gender"
                  key={g.value}
                  className="flex items-center gap-3"
                >
                  <input
                    id={g.value}
                    type="radio"
                    name="gender"
                    className="w-4 h-4"
                    checked={formUpdate.gender === g.value}
                    value={g.value}
                    onChange={update("gender")}
                  />
                  {g.label}
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 md:col-span-2">
            <div className="w-1/2">
              <label
                htmlFor="day_of_birth"
                className="block text-sm text-noq-gray-dark mb-1"
              >
                Födelsedag
              </label>
              <input
                id="day_of_birth"
                type="date"
                className="rounded-3xl px-2 py-2 bg-noq-gray-light focus:outline-none"
                value={formUpdate.day_of_birth}
                onChange={update("day_of_birth")}
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
                  value={formUpdate.email}
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
                  type="tel"
                  //pattern="[0-9+\s-]*"
                  inputMode="numeric"
                  className="w-full rounded-3xl px-4 py-2 bg-noq-gray-light focus:outline-none"
                  value={formUpdate.phone}
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
                value={formUpdate.address}
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
                  value={formUpdate.postcode}
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
                  value={formUpdate.city}
                  onChange={update("city")}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-2/3 md:w-1/4 rounded-full bg-emerald-600 text-white font-semibold py-3"
                disabled={isSaving}
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

BasicInfo.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    day_of_birth: PropTypes.string,
    address: PropTypes.string,
    postcode: PropTypes.string,
    city: PropTypes.string,
    gender: PropTypes.string,
    avatar: PropTypes.string,
    avatar_url: PropTypes.string,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  uploadAvatar: PropTypes.func.isRequired,
};
