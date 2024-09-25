import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  employees: number;
  industry: string;
  lineOfBusiness: string;
  dataDomain: string;
  businessFunction: string;
  region: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
        setLoading(false);
      });
  };

  // Delete a user
  const deleteUser = (id: number) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        // After deleting, fetch the updated user list
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setError("Failed to delete user");
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (

    <div className="p-6 bg-gray-100 h-screen">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Organization List</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span>Show</span>
              <select className="border rounded px-2 py-1">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Create
            </button>
          </div>
        </div>
        <table className="table-auto w-full text-left text-gray-600">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">NAME</th>
              <th className="px-4 py-2">EMPLOYEES</th>
              <th className="px-4 py-2">INDUSTRY</th>
              <th className="px-4 py-2">LINE OF BUSINESS</th>
              <th className="px-4 py-2">DATA DOMAIN</th>
              <th className="px-4 py-2">BUSINESS FUNCTION</th>
              <th className="px-4 py-2">REGION</th>
              <th className="px-4 py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {" "}
            {users.map((user, index) => (
              <tr key={index} className="bg-white border-b">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.employees}</td>
                <td className="px-4 py-2">{user.industry}</td>
                <td className="px-4 py-2">{user.lineOfBusiness}</td>
                <td className="px-4 py-2">{user.dataDomain}</td>
                <td className="px-4 py-2">{user.businessFunction}</td>
                <td className="px-4 py-2">{user.region}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      {" "}
                      ✏️{" "}
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      {" "}
                      🗑️{" "}
                    </button>
                  </div>
                </td>
              </tr>
            ))}{" "}
          </tbody>
        </table>
        <div className="p-4 flex justify-between items-center">
          <span>1-4 of 28</span>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded-md">1</button>
            <button className="px-3 py-1 border rounded-md">2</button>
            <button className="px-3 py-1 border rounded-md">3</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
