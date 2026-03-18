import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaUserCircle, FaList, FaThLarge, FaBriefcase, 
  FaCalendarAlt, FaHandshake, FaMoneyBillWave, 
  FaUsers, FaGift, FaChevronDown, FaChevronUp
} from 'react-icons/fa';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({ 
    systemUsers: false, 
    categories: true 
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };


  
 
  const itemClass = "flex items-center justify-between p-3.5 text-[#FEFAF6] hover:bg-[#FEFAF6] hover:text-[#102C57] transition-all duration-300 text-[14px] font-bold border-b border-[#FEFAF6]/5 cursor-pointer group";
  
 
  const subItemClass = ({ isActive }) => 
    `flex items-center pl-10 py-2.5 text-[13px] transition-all duration-300 ${
      isActive 
      ? 'bg-[#EADBC8] text-[#102C57] font-black border-r-4 border-[#102C57]' 
      : 'text-[#FEFAF6]/70 hover:bg-[#FEFAF6] hover:text-[#102C57]'
    }`;

  return (
    <aside className="w-64 bg-[#102C57] border-r border-[#102C57] flex flex-col sticky top-16 h-[calc(100vh-64px)] overflow-y-auto shadow-2xl">
      
      {/* Header Profile */}
      <div className="p-4 border-b border-[#FEFAF6]/10 flex items-center gap-3 bg-[#0d254a]">
         <FaUserCircle size={28} className="text-[#DAC0A3]" />
         <div className="overflow-hidden">
           <p className="text-[10px] font-bold text-[#FEFAF6] truncate">admin@admin.com</p>
           <p className="text-[9px] text-[#DAC0A3] font-medium tracking-widest uppercase">System Admin</p>
         </div>
      </div>

      <nav className="flex-1 py-2">
        {/* Main Dashboard */}
        <div className={itemClass}>
          <div className="flex items-center gap-3"><FaThLarge size={16}/> Main Dashboard</div>
        </div>

        {/* Category Management Dropdown */}
        <div className="border-b border-[#FEFAF6]/5">
          <div onClick={() => toggleMenu('categories')} className={itemClass}>
            <div className="flex items-center gap-3">
              <FaList size={16}/> Category Management
            </div>
            {openMenus.categories ? <FaChevronUp size={10}/> : <FaChevronDown size={10} className="opacity-40"/>}
          </div>
          
          {openMenus.categories && (
            <div className="flex flex-col bg-[#0d254a]/30 pb-2">
              <NavLink to="/admin/category/list" className={subItemClass}>
                • Categories List
              </NavLink>
              <NavLink to="/admin/subcategory/list" className={subItemClass}>
                • Sub Categories
              </NavLink>
            </div>
          )}
        </div>

        {[
          { name: 'Service Management', icon: <FaBriefcase size={16}/> },
          { name: 'Booking Management', icon: <FaCalendarAlt size={16}/> },
          { name: 'Providers Management', icon: <FaHandshake size={16}/> },
          { name: 'Payout Management', icon: <FaMoneyBillWave size={16}/> },
          { name: 'Customer Management', icon: <FaUsers size={16}/> }
        ].map((item, index) => (
          <div key={index} className={itemClass}>
            <div className="flex items-center gap-3">{item.icon} {item.name}</div>
            <FaChevronDown size={10} className="opacity-20"/>
          </div>
        ))}

        {/* System Users Dropdown */}
        <div className="border-b border-[#FEFAF6]/5">
          <div onClick={() => toggleMenu('systemUsers')} className={itemClass}>
            <div className="flex items-center gap-3">
              <FaUsers size={16}/> System Users
            </div>
            {openMenus.systemUsers ? <FaChevronUp size={10}/> : <FaChevronDown size={10} className="opacity-40"/>}
          </div>
          
          {openMenus.systemUsers && (
            <div className="flex flex-col bg-[#0d254a]/30 pb-2">
              <NavLink to="/admin/users/list" className={subItemClass}>• Users List</NavLink>
              <NavLink to="/admin/users/add" className={subItemClass}>• New User</NavLink>
            </div>
          )}
        </div>

        <div className={itemClass}>
          <div className="flex items-center gap-3"><FaGift size={16}/> Marketing & Points</div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;