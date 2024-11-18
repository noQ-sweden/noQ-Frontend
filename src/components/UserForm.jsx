import React, { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdownGender";
import noQicon from "../assets/images/noQiconNoQGreen.svg";
import PropTypes from "prop-types";

const UserForm = ({ isEditing = false, user = null, onSubmit, onClose }) => {
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

      setAgreedToTerms(false);
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

      if (!agreedToTerms) {
        alert("Snäll och godkänn villkoren");
        return;
      }
      onSubmit(formData);
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
                <h1 className="text-lg font-semibold mb-3">Kontouppgifter</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Förnamn"
                    required
                    className="border rounded border-gray-400 py-1 px-2"
                  />
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Efternamn"
                    className="border rounded border-gray-400 py-1 px-2"
                  />

                  <input
                    type="text"
                    name="unokod"
                    value={formData.unokod}
                    onChange={handleChange}
                    placeholder="UNO-Kod"
                    className="border rounded border-gray-400 py-1 px-3 w-full col-span-1"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2 mt-4">
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
            <div className="">
              <h1 className="text-lg font-semibold mb-3">
                Personlig information
              </h1>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-1 mb-6">
                <CustomDropdown
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

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Mail"
                  className="border rounded border-gray-400 py-1 px-3 w-1/3"
                />

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Telefon nummer"
                  className="border rounded border-gray-400 py-1 px-3 w-1/3"
                />
              </div>

              <div className="">
                <h1 className="text-lg font-semibold mb-3">Addressupgifter</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-6">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Stad"
                    required
                    className="border rounded border-gray-400 py-1 px-3 w-full"
                  />

                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    placeholder="Region"
                    className="border rounded border-gray-400 py-1 px-3 w-full"
                  />

                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Gata"
                    className="border rounded border-gray-400 py-1 px-3 w-full"
                  />

                  <input
                    type="string"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    placeholder="Post kod"
                    className="border rounded border-gray-400 py-1 px-3 w-full"
                  />

                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="Land"
                    className="border rounded border-gray-400 py-1 px-3 w-full"
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-1/6"
                >
                  {isEditing ? "Update" : "Skapa"}
                </button>
                {/* <button
                  type="button"
                  onClick={onClose} // Call onClose when "Close" is clicked
                  className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded w-1/2"
                >
                  Stäng
                </button> */}
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
};

export default UserForm;
