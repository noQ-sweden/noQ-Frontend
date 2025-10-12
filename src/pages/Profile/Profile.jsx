import React, { useState, useEffect } from "react";
//import PropTypes from "prop-types";
import useLogin from "../../hooks/useLogin";
import AxiosNoqApi from "./../../api/AxiosNoqApi";

import { BasicInfo } from "./BasicInfo";
import { ChangePassword } from "./ChangePassword";
import { DeleteAccount } from "./DeleteAccount";

export default function Profile() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { login } = useLogin();
  const token = login?.accessToken || localStorage.getItem("accessToken");
  //console.log("is login: ", login);
  if (!login) return <p>No Data exists</p>;

  const fetchUser = async () => {
    setLoading(true);
    try {
      //const testToken = "ReutuDZ64TiwT9a1957VCkP3jxRSzDHE";
      const res = await AxiosNoqApi.get("/api/my_profile", {
        withCredentials: true,
      });
      const loggedUser = res.data;
      setUser(loggedUser);
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.error("Contact Dev-Team, new the page is down ", error);
      setError("Error Fetching the Data");
      setLoading(false);
    }
  };

  /* const handleSave = async (patch) => {
    const res = await AxiosNoqApi.fetch("/api/my_profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error("Failed to save");
    const updated = await res.json();
    setUser(updated);
    //show tost?
  }; */

  //console.log("Loged data: ", user);
  useEffect(() => {
    fetchUser();
  }, []);

  const { first_name, last_name } = login || {};

  return (
    <div className="min-h-screen flex flex-col justify-start bg-noq-gray-extra p-4 sm:p-6 lg:p-8">
      <div className="min-h-screen w-full mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4 px-9">
          <BasicInfo user={user} />
          {/* Bytta lösenord */}
          <div className="md:col-span-2 my-3">
            <ChangePassword
              user={user}
              first_name={first_name}
              last_name={last_name}
            />
          </div>
          {/* Delete account */}
          <div className="md:col-span-2 my-9">
            <DeleteAccount user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
export default Profile;
Profile.propTypes = {
  user: PropTypes.object.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  postcode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  unokod: PropTypes.string.isRequired,
  dayOfBirth: PropTypes.string.isRequired,
  personnrLastnr: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  lastEdit: PropTypes.string.isRequired,
};
 */
