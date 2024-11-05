import React, { useEffect, useState } from "react";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import {
  createUser,
  updateUser,
  deleteUser,
  fetchAllUsers,
} from "./../api/AxiosNoqApi";

const UserManagementPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [users, setUsers] = useState([]);

  // Fetch users when the component mounts
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.log("API Error:", error);
      }
    };
    loadUsers();
  }, []);

  // Handle opening the form for crating a new user
  const openCreateForm = () => {
    setSelectedUser(null);
    setIsFormVisible(true);
  };

  // Edit User handler
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsFormVisible(true);
  };

  // Handle form close
  const closeForm = () => {
    setIsFormVisible(false);
    setSelectedUser(null);
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      if (selectedUser) {
        // Update user
        await updateUser(selectedUser.id, formData);
        console.log("User updated:", selectedUser.id);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id ? { ...user, ...formData } : user
          )
        );
        alert("User updated successfully!");
      } else {
        // Create new user
        const newUser = await createUser(formData);
        setUsers((prevUsers) => [...prevUsers, newUser]);
        alert("User created successfully!");
      }
      closeForm();
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user.");
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
      alert("User deleted successfully!");
      closeForm();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <button
        onClick={openCreateForm}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create New User
      </button>

      {/* User List */}
      <UserList users={users} onUserSelect={handleSelectUser} />

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
