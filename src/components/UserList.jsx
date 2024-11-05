import React, { useEffect, useState } from "react";
import { fetchAllUsers } from "../api/AxiosNoqApi";
import PropTypes from "prop-types";

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchAllUsers();
        setUsers(usersData);
        setFilteredData(usersData);
        setLoading(false);
      } catch (err) {
        console.log("API Error:", err);
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  //  Handle Delete
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const filtered = users.filter(
        (user) =>
          (user.first_name && user.first_name.toLowerCase().includes(term)) ||
          (user.last_name && user.last_name.toLowerCase().includes(term)) ||
          (user.unokod && user.unokod.toLowerCase().includes(term))
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(users);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Sök gäst..."
        className="w-full border-2 border-gray-200 rounded px-4 py-2 mb-4"
      />

      {/* Render search results */}
      {filteredData.length > 0 ? (
        <div className="p-2 border mt-2">
          {filteredData.map((user, index) => (
            <div
              key={index}
              onClick={() => onUserSelect(user)}
              className="flex items-center justify-between p-2 hover:bg-gray-200 cursor-pointer"
            >
              {user.first_name} {user.last_name}
            </div>
          ))}
        </div>
      ) : (
        <p>Inga gäster hittades</p>
      )}
    </div>
  );
};

UserList.propTypes = {
  onUserSelect: PropTypes.func.isRequired,
};

export default UserList;
