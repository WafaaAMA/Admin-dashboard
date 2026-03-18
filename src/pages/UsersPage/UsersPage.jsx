import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaSearch, FaExclamationTriangle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [deleteModal, setDeleteModal] = useState({ show: false, userId: null });
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users/get_users');
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const nextStatus = currentStatus?.toLowerCase() === 'approved' ? 'rejected' : 'approved';
      await axios.patch(`http://localhost:5000/api/users/user_status/${id}`, {
        account_status: nextStatus
      });
      
      setUsers(users.map(user =>
        user.Users_id === id ? { ...user, account_status: nextStatus } : user
      ));
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/user_delete/${deleteModal.userId}`);
      setUsers(users.filter(user => user.Users_id !== deleteModal.userId));
      setDeleteModal({ show: false, userId: null });
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // --- التعديل الجوهري هنا في منطق الفلتر ---
  const filteredUsers = users.filter(user => {
    const name = user.Full_Name || "";
    const phone = user.phone_number || "";
    const userStatus = user.account_status?.toLowerCase() || "";

    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          phone.includes(searchTerm);
    
    // ربط الاختيارات بالقيم الحقيقية في الداتابيز
    const matchesStatus = statusFilter === "ALL" || 
                          (statusFilter === "approved" && userStatus === "approved") ||
                          (statusFilter === "rejected" && userStatus === "rejected");

    return matchesSearch && matchesStatus;
  });

  const indexOfLastUser = currentPage * entriesPerPage;
  const indexOfFirstUser = indexOfLastUser - entriesPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);

  if (loading) return <div className="p-10 text-center font-bold text-[#102C57]">Loading Users...</div>;

  return (
    <div className="space-y-6 relative">
      <div className="p-4 rounded-xl shadow-sm flex justify-between items-center ">
        <h2 className="text-[#102C57] font-black tracking-tight uppercase">System Users Management</h2>
        <button
          onClick={() => navigate('/admin/users/add')}
          className="bg-[#102C57] text-white px-6 py-2 rounded-lg text-xs font-black shadow-lg hover:bg-[#1a3d75] transition-all uppercase tracking-widest"
        >
          + Add new system user
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#EADBC8] overflow-hidden shadow-sm">
        <div className="p-5 bg-white flex justify-end items-center border-b border-[#EADBC8] gap-4">
          
          {/* تم تعديل الـ Select ليعرض Active/Inactive */}
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="border border-[#DAC0A3] rounded-lg px-4 py-2 text-xs font-bold outline-none text-[#102C57] bg-[#FEFAF6]"
          >
            <option value="ALL">ALL STATUS</option>
            <option value="approved">Active </option>
            <option value="rejected">inActive </option>
          </select>

          <div className="relative">
             <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="border border-[#DAC0A3] rounded-lg px-4 py-2 pr-10 text-xs font-medium outline-none w-72 bg-[#FEFAF6]"
             />
             <FaSearch className="absolute right-3 top-2.5 text-[#DAC0A3]" size={12} />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-[#102C57] text-white uppercase text-[10px] tracking-[0.2em]">
            <tr>
              <th className="p-5 font-black">Full Name</th>
              <th className="p-5 font-black">Phone Number</th>
              <th className="p-5 font-black text-center">Status</th>
              <th className="p-5 font-black text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EADBC8]/20">
            {currentUsers.length > 0 ? currentUsers.map((user) => (
              <tr key={user.Users_id} className="hover:bg-[#FEFAF6]/50 transition-colors">
                <td className="p-5 text-[#102C57] font-bold text-sm">{user.Full_Name}</td>
                <td className="p-5 text-slate-500 font-medium text-sm">{user.phone_number || "No Number"}</td>
                <td className="p-5 text-center">
                  <div className="flex justify-center">
                    <button
                      onClick={() => toggleStatus(user.Users_id, user.account_status)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 border ${
                        user.account_status?.toLowerCase() === 'approved'
                          ? 'bg-[#102C57] border-[#102C57]'
                          : 'bg-[#FEFAF6] border-[#EADBC8]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full shadow-md transform transition-all duration-300 ${
                          user.account_status?.toLowerCase() === 'approved'
                            ? 'translate-x-6 bg-white'
                            : 'translate-x-0 bg-[#DAC0A3]'
                        }`}
                      ></div>
                    </button>
                  </div>
                </td>
                <td className="p-5 text-center">
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={() => navigate(`/admin/users/edit/${user.Users_id}`)}
                      className="text-[#DAC0A3] hover:text-[#102C57] flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter"
                    >
                      <FaEdit /> edit
                    </button>
                    <button
                      onClick={() => setDeleteModal({ show: true, userId: user.Users_id })}
                      className="text-red-300 hover:text-red-600 transition-all p-1"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="p-10 text-center text-slate-400">No users found matching your criteria.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="p-5 bg-white border-t border-[#EADBC8] flex justify-between items-center text-[12px] font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => { setEntriesPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border border-[#DAC0A3] rounded px-2 py-1 outline-none text-[#102C57]"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span>Entries</span>
          </div>
          <div className="flex items-center gap-3">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className="disabled:opacity-30"><FaChevronLeft/></button>
            <div className="bg-[#102C57] text-white w-8 h-8 rounded flex items-center justify-center shadow-md">{currentPage}</div>
            <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className="disabled:opacity-30"><FaChevronRight/></button>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-[#102C57]/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border border-[#EADBC8] text-center">
            <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
              <FaExclamationTriangle size={24} />
            </div>
            <h3 className="text-[#102C57] text-xl font-black mb-2">Are you sure?</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">This will permanently remove the user from your database.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteModal({ show: false, userId: null })} className="flex-1 py-3 rounded-xl bg-[#FEFAF6] text-[#102C57] font-black text-[10px] uppercase">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-black text-[10px] uppercase shadow-lg shadow-red-200">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;