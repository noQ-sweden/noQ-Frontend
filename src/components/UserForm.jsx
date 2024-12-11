import React, { useEffect, useState } from "react";
import CustomDropdownGender from "./CustomDropdownGender";
import CustomDropdownRegion from "./CustomDropdownRegion";
import PropTypes from "prop-types";

const UserForm = ({
  isEditing = false,
  user = null,
  onSubmit,
  onDelete,
  onClose,
  isDeleting,
  onPasswordUpdate,
}) => {
  // initialize form data with empty values
  const [formData, setFormData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    gender: "",
    street: "",
    postcode: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    unokod: "",
    day_of_birth: "",
    region: "",
    password: "",
    confirmPassword: "",
    requirements: "",
  });

  const [passwordMatchError, setPasswordMatchError] = useState(false);

  // Populate form with user data if editing or clear it for new user creation
  useEffect(() => {
    if (isEditing && user) {
      setFormData((prevData) => ({
        ...prevData,
        ...user,
        id: user?.id || "",
        postcode: user?.postcode?.toString() || "",
        phone: user?.phone?.toString() || "",
        unokod: user?.unokod?.toString() || "",
        day_of_birth: user?.day_of_birth?.toString() || "",
        password: "",
        confirmPassword: "",
        requirements: user?.requirements || "",
      }));
    }
  }, [isEditing, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "postcode" ? (value ? parseInt(value, 10) : "") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password || formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordMatchError(true);
        alert("Lösenord matchar inte");
        return;
      }
    }

    setPasswordMatchError(false);
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen rounded-xl border-2 border-gray-200">
      <div className="container mx-auto rounded-xl overflow-hidden">
        <div className="w-full py-16 px-12 bg-white bg-opacity-80 relative z-10 rounded-xl">
          {isEditing && onPasswordUpdate && (
            <div className="absolute top-16 right-6">
              <button
                type="button"
                onClick={onPasswordUpdate}
                className="bg-transparent hover:bg-gray-400 text-blue-500 font-bold py-2 px-4 border-b-2 border-blue-500 hover:border-gray-500 border rounded w-40"
              >
                Ändra Lösenord
              </button>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Hidden field for User ID */}
            <input type="hidden" name="id" value={formData.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {!isEditing && (
                  <div>
                    <h1 className="text-lg font-semibold mb-1">
                      Kontouppgifter
                    </h1>
                    <p className="text-xs font-thin mb-3 mt-0">
                      Alla fält markerade med asterisk{" "}
                      <span className="text-red-500">*</span> är obligatoriska
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-1">
                      Förnamn <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Förnamn"
                      required
                      className="border rounded border-gray-400 py-1 px-2"
                    />
                  </div>
                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-1">
                      Efternamn <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Efternamn"
                      className="border rounded border-gray-400 py-1 px-2"
                    />
                  </div>
                  {!isEditing && (
                    <div>
                      <label className="block text-md font-semibold text-gray-700 mb-1">
                        UNO-kod <samp className="text-red-500">*</samp>
                      </label>
                      <input
                        type="text"
                        name="unokod"
                        value={formData.unokod}
                        onChange={handleChange}
                        placeholder="UNO-Kod"
                        className="border rounded border-gray-400 py-1 px-3 w-full col-span-1"
                      />
                    </div>
                  )}
                  {!isEditing && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2 mt-4">
                      <div>
                        <label className="block text-md font-semibold text-gray-700 mb-1">
                          Lösenord <span className="text-red-500">*</span>{" "}
                        </label>
                        <input
                          type="password"
                          name="password"
                          autoComplete="off"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Lösenord"
                          required={!isEditing}
                          className="border rounded border-gray-400 py-1 px-3 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-md font-semibold text-gray-700 mb-1">
                          Bekräfta Lösenord{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          autoComplete="off"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Bekräfta lösenord"
                          required={!isEditing}
                          className="border rounded border-gray-400 py-1 px-3 w-full"
                        />
                        {passwordMatchError && (
                          <p className="text-red-500">
                            Lösenorden matchar inte.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="">
              {!isEditing && (
                <div>
                  <h1 className="text-lg font-semibold mb-1">
                    Personlig information
                  </h1>
                  <p className="text-xs font-thin mb-3 mt-0">
                    Alla fält markerade med asterisk{" "}
                    <span className="text-red-500">*</span> är obligatoriska
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-1 mb-6">
                {!isEditing && (
                  <div>
                    <label className="block text-md font-semibold text-gray-700 mb-0">
                      Kön <span>*</span>
                    </label>

                    <CustomDropdownGender
                      name="gender"
                      value={formData.gender}
                      onChange={(value) =>
                        setFormData((prevData) => ({
                          ...prevData,
                          gender: value,
                        }))
                      }
                      required={true}
                    />
                  </div>
                )}
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    E-post
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-post"
                    className="border rounded border-gray-400 py-1 px-3 w-1/3"
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Telefon"
                    className="border rounded border-gray-400 py-1 px-3 w-1/3"
                  />
                </div>
              </div>
              <div className="">
                {!isEditing && (
                  <div>
                    <h1 className="text-lg font-semibold mb-1">
                      Addressupgifter
                    </h1>
                    <p className="text-xs font-thin mb-3 mt-0">
                      Alla fält markerade med asterisk{" "}
                      <span className="text-red-500">*</span> är obligatoriska
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                  <CustomDropdownRegion
                    name="region"
                    value={{
                      region: formData.region || "",
                      kommun: formData.kommun || "",
                    }}
                    onChange={(selected) => {
                      setFormData((prev) => ({
                        ...prev,
                        region: selected.region,
                        kommun: selected.kommun,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Krav
                  </label>
                  <textarea
                    rows="4"
                    type="text"
                    name="requirements"
                    value={formData.requirements || ""}
                    onChange={handleChange}
                    placeholder="Skriv här"
                    className="border rounded text-sm border-gray-400 bg-gray-50 p-2.5 px-3 w-3/4"
                  />
                </div>
              </div>
              <div className="relative min-h-screen p-1">
                <div className="flex justify-between items-center mt-8">
                  {isEditing && onDelete && (
                    <button
                      type="button"
                      onClick={onDelete}
                      disabled={isDeleting}
                      className={`bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-2  border-red-700 hover:border-red-500 border rounded w-40 ${
                        isDeleting ? " opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isDeleting ? "Raderar..." : "Radera"}
                    </button>
                  )}
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="bg-transparent hover:bg-gray-400 text-blue-500 font-bold py-2 px-4 border-b-2 border-blue-500 hover:border-gray-500 border rounded w-40"
                    >
                      Avbryt
                    </button>
                    <button
                      type="submit"
                      className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-2 border-blue-700 hover:border-blue-500 border rounded w-40 ${
                        passwordMatchError || isDeleting
                          ? " opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {isEditing ? "Spara" : "Skapa Konto"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

UserForm.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  onDelete: PropTypes.func,
  isDeleting: PropTypes.bool,
  onPasswordUpdate: PropTypes.func,
};

export default UserForm;
