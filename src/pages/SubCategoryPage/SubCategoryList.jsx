import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const SubCategoryList = () => {
 
  const [subCategories, setSubCategories] = useState([
    { id: 1, name: 'Petra', discount: '20%', parentCategory: 'Programing', status: 'approved' },
    { id: 2, name: 'Petra', discount: '20%', parentCategory: 'Programing', status: 'approved' },
    { id: 3, name: 'Petra', discount: '20%', parentCategory: 'Programing', status: 'rejected' },
    { id: 4, name: 'Petra', discount: '20%', parentCategory: 'Programing', status: 'approved' },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);


  const filteredData = subCategories.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.parentCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

 
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentItems = filteredData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage);

  const toggleStatus = (id) => {
    setSubCategories(subCategories.map(item => 
      item.id === id ? { ...item, status: item.status === 'approved' ? 'rejected' : 'approved' } : item
    ));
  };

  return (
    <div className="p-8 bg-[#FDFCFB] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[#102C57] text-lg font-black tracking-tight uppercase">Sub Category Management</h2>
        <Link to="/admin/subcategory/add" className="bg-[#102C57] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 text-[11px] font-bold uppercase shadow-md hover:bg-[#1a3d75] transition-all">
          <Plus size={14} /> Add New Sub-Category
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-[#F2EBE4] overflow-hidden">
      
        <div className="p-8 flex justify-end items-center gap-4 bg-white">
          
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 border border-[#EADBC8] rounded-xl text-[11px] outline-none w-64 bg-white" 
            />
            <Search className="absolute right-3 top-2.5 text-[#DAC0A3]" size={14} />
          </div>
        </div>

       
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#102C57] text-white text-[10px] font-black uppercase tracking-[0.15em]">
              <th className="py-4 px-8">Name</th>
              <th className="py-4 px-8 text-center">Description </th>
              <th className="py-4 px-8 text-center uppercase">Select Category</th>
              <th className="py-4 px-8 text-center uppercase">Status</th>
              <th className="py-4 px-8 text-center uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2EBE4]">
            {currentItems.map((item) => (
              <tr key={item.id} className="hover:bg-[#FDFCFB]">
                <td className="py-5 px-8 text-[#102C57] text-xs font-black">{item.name}</td>
                <td className="py-5 px-8 text-slate-500 text-xs text-center font-bold">{item.discount}</td>
                <td className="py-5 px-8 text-slate-500 text-xs text-center font-bold">{item.parentCategory}</td>
                <td className="py-5 px-8">
                  <div className="flex justify-center">
                    <button 
                      onClick={() => toggleStatus(item.id)}
                      className={`w-11 h-5 flex items-center rounded-full p-1 transition-all duration-300 ${
                        item.status === 'approved' ? 'bg-[#102C57]' : 'bg-[#EADBC8]'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-all shadow-sm ${
                        item.status === 'approved' ? 'translate-x-5' : 'translate-x-0'
                      }`}></div>
                    </button>
                  </div>
                </td>
                <td className="py-5 px-8">
                  <div className="flex justify-center items-center gap-4">
                    <button className="flex items-center gap-1 text-[#DAC0A3] hover:text-[#102C57] text-[10px] font-black uppercase transition-colors">
                      <Edit2 size={12} strokeWidth={3} /> edit
                    </button>
                    <button className="text-red-200 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="p-6 flex justify-between items-center bg-white border-t border-[#F2EBE4]">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase">
            <span>Show</span>
            <select 
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="px-2 py-1 border border-[#EADBC8] rounded bg-white text-[#102C57] outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            <span>Entries</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="text-slate-300 hover:text-[#102C57]"><ChevronLeft size={16} /></button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-7 h-7 rounded-md text-[11px] font-black ${
                  currentPage === i + 1 ? 'bg-[#102C57] text-white' : 'text-slate-400'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="text-slate-300 hover:text-[#102C57]"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryList;