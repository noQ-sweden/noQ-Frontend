import React, { useEffect, useState } from "react";
import axios from "../api/AxiosNoqApi";
import PropTypes from "prop-types";

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("api/caseworker/user/all")
      .then((response) => {
        if (response.status === 200) {
          const fetchedUsers = response?.data;
          setUsers(fetchedUsers);
          setFilteredData(fetchedUsers);
          setLoading(false);
        } else {
          console.log("Error while fetching overview data.");
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
      </div>

      {/* Render search results */}
      {filteredData.length > 0 ? (
        <div className="p-2 border rounded-lg mt-2">
          <table className="w-full border-collapse table-auto ">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="border-b px-3 py-2 text-left w-1/4">Gäst</th>
                <th className="border-b px-0 py-2 text-left w-1/4">UNO-kod</th>
                <th className="border-b px-0 py-2 text-left w-1/4">Region</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {filteredData.map((user, index) => (
                <tr
                  key={index}
                  // onClick={() => onUserSelect(user)}
                  className="hover:bg-gray-100 cursor-pointer border-b "
                >
                  <td className="border-gray-200 px-3 py-3">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="">{user.unokod}</td>
                  <td className="">{user.region}</td>
                  <td>
                    <button
                      className="bg-white hover:bg-gray-300 text-blue-500 border-2 border-blue-500 font-light 
                       px-4 h-9 justify-center rounded"
                      onClick={() => onUserSelect(user)}
                    >
                      Redigera
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
