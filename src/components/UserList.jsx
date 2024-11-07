import React, { useEffect, useState } from "react";
import axios from "../api/AxiosNoqApi";
import PropTypes from "prop-types";

const UserList = ({ onUserSelect, onOpenCreateForm }) => {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get ('api/caseworker/user/all')
    .then ((response) => {
      if (response.status === 200) {
        const fetchedUsers = response?.data;
        setUsers(fetchedUsers);
        setFilteredData(fetchedUsers);
        setLoading(false);
      } else {
        console.log('Error while fetching overview data.');
      }
    })
    .catch((error) => {
      console.log("API Error:", error);
      setError("Failed to fetch users");
      setLoading(false);
    });
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
      <div className="flex items-center mb-4 space-x-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Sök gäst..."
          className="w-300 border-2 border-gray-200 rounded px-4 py-2 mb-4"
        />

        <button
          onClick={onOpenCreateForm}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Skapa ny användare
        </button>
      </div>

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
  onOpenCreateForm: PropTypes.func.isRequired,
};

export default UserList;
