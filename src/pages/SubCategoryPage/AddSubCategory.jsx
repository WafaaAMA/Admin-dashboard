import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { ArrowLeft } from 'lucide-react';

const AddSubCategory = () => {
  

  const [isActive, setIsActive] = useState(true);

  const labelClass = "block text-[11px] font-black text-[#102C57] mb-2 uppercase tracking-tight";
  const inputClass = "w-full px-4 py-3 border border-[#DAC0A3] rounded-xl focus:ring-2 focus:ring-[#102C57]/10 focus:border-[#102C57] outline-none text-xs transition-all bg-[#FEFAF6] placeholder:text-[#DAC0A3]/60";

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 min-h-screen bg-[#FEFAF6]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 px-6 rounded-2xl shadow-sm ">
        <h2 className="text-lg font-black text-[#102C57] uppercase">Add New  sub Category</h2>
      </div>

 
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-[#EADBC8]">
        <form className="space-y-6">
         
          <div>
            <label className={labelClass}>Sub Category Name *</label>
            <input type="text" placeholder="e.g. Programming" className={inputClass} required />
          </div>

            <div>
            <label className={labelClass}>Category Name *</label>
            <input type="text" placeholder="e.g. Programming" className={inputClass} required />
          </div>

       
         
          <div>
            <label className={labelClass}>Status *</label>
            <div className="flex bg-[#FEFAF6] rounded-xl p-1.5 w-full max-w-[240px]">
              <button
                type="button"
                onClick={() => setIsActive(true)}
                className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest ${
                  isActive ? 'bg-[#102C57] text-white shadow-md' : 'text-[#102C57] hover:bg-[#EADBC8]/30'
                }`}
              >
                Active
              </button>
              <button
                type="button"
                onClick={() => setIsActive(false)}
                className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all uppercase tracking-widest ${
                  !isActive ? 'bg-[#102C57] text-white shadow-md' : 'text-[#102C57] hover:bg-[#EADBC8]/30'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className={labelClass}>Description *</label>
            <textarea rows="4" placeholder="Briefly describe this category..." className={`${inputClass} resize-none`}></textarea>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-[#FEFAF6]">
            <button type="submit" className="bg-[#102C57] text-white px-12 py-3.5 rounded-xl font-black text-xs shadow-xl shadow-[#102C57]/20 hover:bg-[#1a3d75] transform active:scale-95 transition-all uppercase tracking-[0.2em]">
              Save 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubCategory;