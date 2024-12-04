import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import axios from "./../api/AxiosNoqApi";
import useHeader from "../hooks/useHeader";
import DeleteConfirmationPopup from "../components/DeleteConfirmationPopup";
import PasswordConfirmationPopup from "../components/PasswordConfirmationPopup";

const UserManagementPage = () => {
  const { setHeader } = useHeader();
  setHeader("Användare");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUserListVisible, setIsUserListVisible] = useState(true);
  const [activePopup, setActivePopup] = useState(null);

  // Fetch users when the component mounts
  useEffect(() => {
    axios
      .get("api/caseworker/user/all")
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
        } else alert("Fel vid laddning av användare. Försök igen senare.");
      })
      .catch(() => {
        alert("Fel uppstod vid hämtning av användare.");
      });
  }, []);

  // Handle opening the form for crating a new user
  const openCreateForm = () => {
    setSelectedUser(null);
    setIsFormVisible(true);
    setIsUserListVisible(false);
  };

  // Edit User handler
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsFormVisible(true);
    setIsUserListVisible(false);
  };

  // Handle form close
  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedUser(null);
    setIsUserListVisible(true);
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (formData.id) {
        const url = `api/caseworker/user/${formData.id}`;
        /* console.log("Updating user at URL:", url); */

        const response = await axios.put(url, formData);
        if (response.status === 200) {
          const updatedUser = response.data;

          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          );
          alert("Användare uppdaterad framgångsrikt!");
        }
      } else {
        // Create a new user
        /* console.log("Creating new user"); */

        const response = await axios.post("api/caseworker/user", formData);
        if (response.status === 200) {
          const newUser = response.data;

          // Add the new user to the users list
          setUsers((prevUsers) => [...prevUsers, newUser]);
          alert("Användare skapad framgångsrikt!");
        }
      }
      closeForm();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Ett fel uppstod. Försök igen senare.");
    }
  };
  // Handle deleting a user
  const handleDeleteUser = async () => {
    if (!selectedUser?.id) return alert("Användare utan ID");
    await axios.delete(`api/caseworker/user/${selectedUser.id}`);
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== selectedUser.id));
    alert("Användare raderad framgångsrikt!");
    closePopup();
    closeForm();
  };
  // Handle password reset
  const handlePasswordUpdate = async ({ password, confirmPassword }) => {
    if (!selectedUser?.id) {
      alert("Användare utan ID");
      return;
    }
    // send only password to BE only for update
    try {
      const updatedUser = await axios.put(
        `api/caseworker/user/${selectedUser.id}`,
        {
          password,
        }
      );
      // Update the user in the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.data.id
            ? { ...updatedUser.data, password, confirmPassword }
            : user
        )
      );

      // Update the selected user state in the form
      setSelectedUser((prevUser) => ({
        ...prevUser,
        password,
        confirmPassword,
      }));

      alert("Lösenord uppdaterat framgångsrikt!");
      closePopup();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Ett fel uppstod. Försök igen senare.");
    }
  };
  // Handle Popup Open
  const openPopup = (popupType) => {
    setActivePopup(popupType);
  };

  // Handle Popup Close
  const closePopup = () => {
    setActivePopup(null);
  };

  const handleOpenDeletePopup = () => {
    openPopup("delete");
  };

  const handleOpenPasswordPopup = () => {
    openPopup("password");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center border-b-2 border-gray-200 mb-6 pb-3">
        <h1 className="text-2xl font-bold">
          {isUserListVisible
            ? "Hantera användare"
            : selectedUser
            ? `Redigera Profil - ${selectedUser.first_name} ${selectedUser.last_name}`
            : "Skapa konto för användare"}
        </h1>
        {!isFormVisible && (
          <button
            onClick={openCreateForm}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Skapa ny användare
          </button>
        )}
      </div>
      {/* User List */}
      {isUserListVisible && (
        <UserList
          users={users}
          onUserSelect={handleSelectUser}
          onOpenCreateForm={openCreateForm}
        />
      )}
      {/* Conditionally render the form */}
      {isFormVisible && (
        <UserForm
          isEditing={!!selectedUser}
          user={selectedUser}
          onSubmit={handleFormSubmit}
          onDelete={handleOpenDeletePopup}
          onPasswordUpdate={handleOpenPasswordPopup}
          onClose={closeForm}
        />
      )}
      {/* Delete Confirmation Popup */}
      {activePopup === "delete" && (
        <DeleteConfirmationPopup
          isOpen={activePopup === "delete"}
          user={selectedUser}
          onClose={closePopup}
          onConfirm={handleDeleteUser}
        />
      )}
      {/* Password Confirmation Popup */}
      {activePopup === "password" && (
        <PasswordConfirmationPopup
          isOpen={activePopup === "password"}
          onClose={closePopup}
          onConfirm={handlePasswordUpdate}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
