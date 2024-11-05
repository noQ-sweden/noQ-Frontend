import React, { useEffect, useState } from "react";
import CustomDropdown from "./CustomDropdownGender";
import noQicon from "../assets/images/noQiconNoQGreen.svg";
import PropTypes from "prop-types";

const UserForm = ({ isEditing = false, user = null, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
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
    personnr_lastnr: "",
    region: "",
    password: "",
    confirmPassword: "",
    requirements: "",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    if (isEditing && user) {
      setFormData({
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
        personnr_lastnr: user.personnr_lastnr?.toString() || "",
        region: user.region || "",
        password: user.password || "",
        confirmPassword: user.confirmPassword || "",
        requirements: user.requirements || "",
      });
    }
  }, [isEditing, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "phone" ||
        name === "postcode" ||
        name === "unokod" ||
        name === "personnr_lastnr"
          ? value
            ? parseInt(value, 10)
            : ""
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEditing && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!agreedToTerms && !isEditing) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // Pass form data to the parent component for hadeling(create/update)
    onSubmit(formData);
  };

  return (
    <div
      className="min-h-screen py-20"
      style={{ backgroundImage: "linear-gradient(115deg, #9F7AEA, #FEE2FE)" }}
    >
      <div className="container mx-auto ">
        <div className="w-full py-16 px-12 bg-white bg-opacity-80 relative z-10">
          <div
            className="w-full md:w-8/12 bg-white rounded-xl mx-auto p-6 shadow-lg overflow-hidden"
            style={{
              backgroundImage: `url(${noQicon})`,
              backgroundSize: "contain", // Adjust size (you can use "cover", "contain", or a specific value)
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: "0.1",
            }}
          />
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              {/* <div className="w-1/2 py-16 px-12"> */}
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Firts Name"
                required
                className="border rounded border-gray-400 py-1 px-2"
              />
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                className="border rounded border-gray-400 py-1 px-2 "
              />

              <div className="mt-5">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>

              <div className="mt-5 relative">
                <CustomDropdown
                  name="gender"
                  value={formData.gender}
                  onChange={(value) =>
                    setFormData((prevData) => ({ ...prevData, gender: value }))
                  }
                  required={true}
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Gata"
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="string"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  placeholder="Post kod"
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Stad"
                  required
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="number"
                  name="day_of_birth"
                  value={formData.day_of_birth}
                  onChange={handleChange}
                  placeholder="Date of Birth"
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="number"
                  name="perosonnr_lastnr"
                  value={formData.personnr_lastnr}
                  onChange={handleChange}
                  placeholder="Person Number 4 sista"
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  placeholder="Region"
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>
              <div className="mt-5">
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="off"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required={!isEditing}
                  className="border rounded border-gray-400 py-1 px-3 w-full"
                />
              </div>

              <div className="mt-5">
                {/* <div className="col-span-2"> */}
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={() => setAgreedToTerms(!agreedToTerms)}
                  className="border border-gray-400"
                />
                <span className="px-2">
                  I agree to the
                  <a href="" className="text-blue-500 font-semibold">
                    {" "}
                    terms
                  </a>
                  ,
                  <a href="" className="text-blue-500 font-semibold">
                    {" "}
                    pirvacy & conditions.
                  </a>
                </span>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded w-full "
                >
                  {user ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={onClose} // Call onClose when "Close" is clicked
                  className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded w-full"
                >
                  Close
                </button>
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
