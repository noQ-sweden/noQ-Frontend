import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import axios from "./../api/AxiosNoqApi";
import useHeader from "../hooks/useHeader";

const UserManagementPage = () => {
  const { setHeader } = useHeader();
  setHeader("Användare");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [isUserListVisible, setIsUserListVisible] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch users when the component mounts
  useEffect(() => {
    axios
      .get("api/caseworker/user/all")
      .then((response) => {
        if (response.status === 200) {
          const fetchedUsers = response?.data;
          setUsers(fetchedUsers);
        } else {
          console.error(
            `Error while fetching overview data. Status: ${response.status}`
          );
          alert("Fel vid laddning av användare. Försök igen senare.");
        }
      })
      .catch((error) => {
        console.log("API Error:", error);
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
      if (selectedUser) {
        if (!formData.id) {
          console.error("Error updating user: ID is missing");
          alert("Användare utan ID");
          return;
        }
        // Update user
        const url = `api/caseworker/user/${formData.id}`;
        console.log("updating user at:", url);
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
        // Create new user
        console.log("Creating new user");
        const response = await axios.post("api/caseworker/user", formData);

        if (response.status === 200) {
          const newUser = response.data;
          setUsers((prevUsers) => [...prevUsers, newUser]);
          alert("Användare skapad framgångsrikt!");
        }
      }
      closeForm();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Fel vid uppdatering av användare.");
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    if (!userId) {
      console.error("Error deleting user: ID is missing");
      alert("Användare utan ID");
      return;
    }
    setIsDeleting(true);
    try {
      const response = await axios.delete(`api/caseworker/user/${userId}`);
      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
        alert(response.data.message || "Användare raderad framgångsrikt!");
        closeForm();
      } else {
        alert("Användaren kunde inte hittas.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Fel vid radering av användare.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center border-b-2 border-gray-200 mb-6 pb-3">
        {(isUserListVisible && (
          <h1 className="text-2xl font-bold">Hantera användare</h1>
        )) ||
          (isFormVisible && !selectedUser && (
            <h1 className="text-2xl font-bold">Skapa konto för användare</h1>
          )) ||
          (isFormVisible && selectedUser && (
            <h1 className="text-2xl font-bold">
              Redigera Profil - {selectedUser?.first_name}{" "}
              {selectedUser?.last_name}
            </h1>
          ))}
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
          onDelete={() => {
            if (!selectedUser || !selectedUser.id) {
              console.error("Error deleting user: ID is missing");
              alert("Användare utan ID");
              return;
            }
            handleDeleteUser(selectedUser.id);
          }}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
