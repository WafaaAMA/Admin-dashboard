import React from 'react';
import { FaBell, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import Logo from '../assets/Logo.jpeg'; 
import { useNavigate } from 'react-router-dom'; 

const Navbar = () => {
  const navigate = useNavigate()

   const handleLogout = () => {
 
    navigate('/login');
  };

  return (
   
    <div className="w-full h-16 bg-white border-b border-[#EADBC8] flex items-center justify-between px-8 shadow-sm sticky top-0 z-[100]">
      
   
      <div className="flex items-center">
        <img 
                src={Logo} 
                alt="Joker Logo" 
                className="h-14 w-auto object-contain rounded-2xl shadow-sm border border-[#FEFAF6]" 
              />
      </div>

     
      <div className="flex items-center gap-6">
        
     
        <div className="relative cursor-pointer group">
          <FaBell className="text-[#DAC0A3] group-hover:text-[#102C57] transition-colors" size={18} />
          <span className="absolute -top-1 -right-1 bg-red-500 w-2 h-2 rounded-full border border-white"></span>
        </div>

       
        <div className="flex items-center gap-3 border-l pl-6 border-[#EADBC8]">
          <div className="text-right hidden sm:block">
            <p className="text-[11px] font-black text-[#102C57] leading-none uppercase">Admin</p>
            <p className="text-[9px] text-[#DAC0A3] font-bold mt-1 uppercase tracking-tighter">System Admin</p>
          </div>
          <FaUserCircle size={35} className="text-[#102C57]" />
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 bg-[#FEFAF6] hover:bg-red-50 text-[#DAC0A3] hover:text-red-500 px-4 py-2 rounded-lg border border-[#EADBC8] transition-all duration-300 group"
        >
          <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">Logout</span>
          <FaSignOutAlt size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
    </div>
  );
};

export default Navbar;