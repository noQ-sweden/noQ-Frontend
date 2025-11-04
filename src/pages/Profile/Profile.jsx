import React, { useState, useEffect, useCallback } from "react";
import useLogin from "../../hooks/useLogin";
import AxiosNoqApi from "./../../api/AxiosNoqApi";
import { toast } from "react-toastify";
import { BasicInfo } from "./BasicInfo";
import { ChangePassword } from "./ChangePassword";
import { DeleteAccount } from "./DeleteAccount";

export default function Profile() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    day_of_birth: "",
    address: "",
    postcode: "",
    city: "",
    gender: "",
    avatar: "",
    presentation: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { login } = useLogin();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await AxiosNoqApi.get("/api/my_profile", {
        withCredentials: true,
      });
      setUser(res.data);
      setError(null);
    } catch (err) {
      console.log(err);
      console.error("Contact Dev-Team, new the page is down ", err);
      setError("Error Fetching the Data");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const onSave = async (formData) => {
    try {
      const res = await AxiosNoqApi.patch("/api/my_profile", formData);
      setUser(res.data);
      if (res.status === 200) {
        toast.success("Your profile was updated 👍");
      }
    } catch (err) {
      console.error("Data not sent to the DB: ", err);
    }
  };

  const passWordUpdate = async (password_data) => {
    try {
      const res = await AxiosNoqApi.post(
        "/api/my_profile/change_password",
        password_data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Change Password data: ", res.data);

      return res;
    } catch (err) {
      console.error("Password wasn't updated: ", err);
      setError(true);
    }
  };

  const deleteProfile = async () => {
    try {
      const res = await AxiosNoqApi.delete("/api/my_profile");
      if (res.status === 204) {
        return true;
      }
    } catch (err) {
      console.error(
        "Error wile deleting the Profile: ",
        err?.response?.status,
        err?.response?.data
      );
      setError(true);
    }
  };

  const uploadAvatar = async (file) => {
    if (!file) throw new Error("No file");
    const fd = new FormData();
    fd.append("avatar", file);
    const res = await AxiosNoqApi.post("/api/my_profile/avatar", fd, {
      headers: {},
      transformRequest: [
        (data, headers) => {
          delete headers.common?.["Content-Type"];
          delete headers.post?.["Content-Type"];
          return data;
        },
      ],
      withCredentials: true,
    });
    return res.data;
  };

  if (!login) return <p>No Data exists</p>;
  if (loading) return <p>...loading</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-noq-gray-extra p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-3xl sm:max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="grid grid-cols-1 gap-8 mb-4 mx-6">
          <BasicInfo user={user} onSave={onSave} uploadAvatar={uploadAvatar} />
          {/* Bytta lösenord */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
            <div>
              <ChangePassword user={user} passWordUpdate={passWordUpdate} />
            </div>
            {/* Delete account */}
            <div>
              <DeleteAccount user={user} deleteProfile={deleteProfile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
