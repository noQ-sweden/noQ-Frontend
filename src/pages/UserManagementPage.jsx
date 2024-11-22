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

  // Fetch users when the component mounts
  useEffect(() => {
    axios
      .get("api/caseworker/user/all")
      .then((response) => {
        if (response.status === 200) {
          const fetchedUsers = response?.data;
          setUsers(fetchedUsers);
        } else {
          console.log("Error while fetching overview data.");
        }
      })
      .catch((error) => {
        console.log("API Error:", error);
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
        // Update user
        const url = "api/caseworker/user/" + formData.id;
        console.log(url);
        axios
          .put(url, formData)
          .then((response) => {
            if (response.status === 200) {
              setUsers((prevUsers) =>
                prevUsers.map((user) =>
                  user.id === selectedUser.id ? { ...user, ...formData } : user
                )
              );
              alert("Användare uppdaterad framgångsrikt!");
            } else {
              console.log("Error while fetching overview data.");
            }
          })
          .catch((error) => {
            console.log("API Error:", error);
          });
      } else {
        console.log("Creating new user");
        // Create new user
        axios
          .post("api/caseworker/user", formData)
          .then((response) => {
            if (response.status === 200) {
              setUsers((prevUsers) => [...prevUsers, formData]);
              alert("Användare skapad framgångsrikt!");
            } else {
              console.log("Error while fetching overview data.");
            }
          })
          .catch((error) => {
            console.log("API Error:", error);
          });
      }
      closeForm();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Fel vid uppdatering av användare.");
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    axios
      .delete("api/caseworker/user/" + userId)
      .then((response) => {
        if (response.status === 200) {
          setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
          alert("Användare raderad framgångsrikt!");
          closeForm();
        } else {
          console.log("Error while deleting user.");
        }
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Fel vid radering av användare.");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center border-b-2 border-gray-200 mb-6 pb-3">
        <h1 className="text-2xl font-bold  ">Hantera användare</h1>

        <button
          onClick={openCreateForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Skapa ny användare
        </button>
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
          onDelete={() => handleDeleteUser(selectedUser.id)}
          onClose={closeForm}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
