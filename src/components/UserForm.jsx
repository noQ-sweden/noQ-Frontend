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
      setFormData({
        id: user.id || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        gender: user.gender || "",
        street: user.street || "",
        postcode: user.postcode?.toString() || "",
        city: user.city || "",
        country: user.country || "",
        phone: user.phone?.toString() || "",
        email: user.email || "",
        unokod: user.unokod?.toString() || "",
        day_of_birth: user.day_of_birth?.toString() || "",
        region: user.region || "",
        password: user.password || "",
        confirmPassword: user.confirmPassword || "",
        requirements: user.requirements || "",
      });
    } else {
      setFormData({
        id: "",
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

      /* setAgreedToTerms(false); */
    }
  }, [isEditing, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...formData,
      [name]: name === "postcode" ? (value ? parseInt(value, 10) : "") : value,
    };

    setFormData(updatedData);

    if (name === "password" || name === "confirmPassword") {
      setPasswordMatchError(
        updatedData.password !== updatedData.confirmPassword
      );
    }
    return updatedData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing) {
      if (formData.password !== formData.confirmPassword) {
        setPasswordMatchError(true);
        alert("Lösenord matchar inte");
        return;
      }
    }
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen rounded-xl border-2 border-gray-200">
      <div className="container mx-auto rounded-xl overflow-hidden">
        <div className="w-full py-16 px-12 bg-white bg-opacity-80 relative z-10 rounded-xl">
          <form onSubmit={handleSubmit}>
            {/* Hidden field for User ID */}
            <input type="hidden" name="id" value={formData.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h1 className="text-lg font-semibold mb-1">Kontouppgifter</h1>
                <p className="text-xs font-thin mb-3 mt-0">
                  Alla fält markerade med asterisk{" "}
                  <span className="text-red-500">*</span> är obligatoriska
                </p>
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
                        Bekråfta Lösenord{" "}
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
                        <p className="text-red-500">Lösenorden matchar inte.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h1 className="text-lg font-semibold mb-1">
                Personlig information
              </h1>
              <p className="text-xs font-thin mb-3 mt-0">
                Alla fält markerade med asterisk{" "}
                <span className="text-red-500">*</span> är obligatoriska
              </p>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-1 mb-6">
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
                <h1 className="text-lg font-semibold mb-1">Addressupgifter</h1>
                <p className="text-xs font-thin mb-3 mt-0">
                  Alla fält markerade med asterisk{" "}
                  <span className="text-red-500">*</span> är obligatoriska
                </p>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                  <CustomDropdownRegion
                    name="region"
                    value={formData.region}
                    onChange={(value) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        region: value,
                      }))
                    }
                    required={true}
                  />
                </div>
                <div>
                  <label className="block text-md font-semibold text-gray-700 mb-1">
                    Krav
                  </label>
                  <textarea
                    rows="4"
                    type="text"
                    name="requirement"
                    value={formData.requirements}
                    onChange={handleChange}
                    placeholder="Skriv här"
                    className="border rounded text-sm border-gray-400 bg-gray-50 p-2.5 px-3 w-3/4"
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-2 border-blue-700 hover:border-blue-500 border rounded w-2/12"
                >
                  {isEditing ? "Spara" : "Skapa Konto"}
                </button>
                {isEditing && onDelete && (
                  <button
                    type="button"
                    onClick={onDelete}
                    disabled={isDeleting}
                    className={`bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-2 border-red-700 hover:border-red-500 border rounded w-2/12 ml-4${
                      isDeleting ? " opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isDeleting ? "Raderar..." : "Radera"}
                  </button>
                )}
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
};

export default UserForm;
