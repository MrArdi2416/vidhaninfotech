import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Header } from "../../Components/Header";
import CreateNewModal from "../../Components/Modal";
import { RiPlayListAddFill } from "react-icons/ri";

import axios from "axios";
import DeleteModal from "../../Components/DeleteModal";


interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  languages: string[];
  address: string;
}


const DashboardLayout: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [deleteUserId, setDeleteUserId] = useState<string | null>(null); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");




  const fetchUsers = async (query: string = "") => {
    try {
      const response = await axios.get(`http://localhost:5000/users`);
      const filteredUsers = query
        ? response.data.filter((user: User) =>
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase()) ||
          user.email.toLowerCase().includes(query.toLowerCase())
        )
        : response.data;

      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  const handleDeleteClick = (id: string) => {
    setDeleteUserId(id); 
    setIsDeleteModalOpen(true);
  };

  const deleteUser = async () => {
    if (deleteUserId) {
      try {
        await axios.delete(`http://localhost:5000/users/${deleteUserId}`);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deleteUserId));
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
      } finally {
        setIsDeleteModalOpen(false); 
        setDeleteUserId(null); 
      }
    }
  };


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    fetchUsers(query); 
  };


  const openModal = (user?: User) => {
    setEditUser(user || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditUser(null);
    fetchUsers(searchQuery);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / pageSize);
  const paginatedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col mt-2 py-4">
          <div className="flex justify-end px-4 mb-4">
            <button
              className="flex bg-[#1FBCFF] items-center	 text-white px-4 py-2 rounded-xl"
              onClick={() => openModal()} 
            >
              <RiPlayListAddFill size={25} />
              <span className="font-bold ml-2 text-xl" >
                Create
              </span>
            </button>
          </div>
          <header className="flex items-center justify-between p-4 rounded-lg bg-white shadow mx-4">
            <h1 className="text-xl font-semibold">Organization List</h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 border border-gray-300 rounded"
                value={searchQuery}
                onChange={handleSearch}
              />

            </div>
          </header>

          <div className="p-4 flex-1 overflow-auto">
            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="min-w-full text-left">
                <thead className="rounded-lg">
                  <tr className="border-2 rounded-lg">
                    <th className="px-6 py-3 bg-gray-50 font-semibold text-gray-700">
                      First Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 font-semibold text-gray-700">
                      Last Name
                    </th>
                    <th className="px-6 py-3 bg-gray-50 font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-3 bg-gray-50 font-semibold text-gray-700">
                      Password
                    </th>
                    <th className="px-6 py-3 bg-gray-50 font-semibold text-gray-700">
                      Phone
                    </th>
                    <th className="px-6 py-3 bg-gray-50 font-semibold text-gray-700">
                      Gender
                    </th>
                    <th className="px-6 py-3 bg-gray-50 font-semibold text-gray-700">
                      Languages
                    </th>
                    <th className="px-6 py-3 bg-gray-50 font-semibold text-gray-700">
                      Address
                    </th>
                    <th className="px-6 py-3 bg-gray-50 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {paginatedUsers.map((org, index) => (
                    <tr key={org.id} className="rounded-lg hover:bg-gray-100 my-2 border">
                      <td className="px-6 py-4">{org.firstName}</td>
                      <td className="px-6 py-4">{org.lastName}</td>
                      <td className="px-6 py-4">{org.email}</td>
                      <td className="px-6 py-4">{org.password}</td>
                      <td className="px-6 py-4">{org.phone}</td>
                      <td className="px-6 py-4">{org.gender}</td>
                      <td className="px-6 py-4">{org.languages}</td>
                      <td className="px-6 py-4">{org.address}</td>
                      <td className="px-6 py-4 flex space-x-4">
                        <FaEdit className="text-blue-500 cursor-pointer" onClick={() => openModal(org)} />
                        <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDeleteClick(org.id)}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

 
            <div className="flex items-center justify-between py-4">
          
              <div className="flex items-center space-x-2">
                <label htmlFor="rows" className="text-gray-700">Show</label>
                <select
                  id="rows"
                  className="border border-gray-300 rounded px-2 py-1"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                >
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
                <span className="text-gray-700">of {totalUsers}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  className="px-2 py-1 border border-gray-300 rounded"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {"<"}
                </button>
                <span>{`${currentPage} - ${totalPages}`}</span>
                <button
                  className="px-2 py-1 border border-gray-300 rounded"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={deleteUser}
      />

      {isModalOpen && <CreateNewModal closeModal={closeModal} userData={editUser} isEdit={!!editUser} />}
    </>
  );
};

export default DashboardLayout;
