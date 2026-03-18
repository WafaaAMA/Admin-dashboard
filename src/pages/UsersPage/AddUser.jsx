import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditMode = Boolean(id); 
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    userType: '', 
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
    status: 'active',
    address: '',
    description: ''
    
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode && id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/users/get_user/${id}`);
          if (response.data.success) {
            const user = response.data.user;
            setFormData({
              name: user.Full_Name || '',
              username: user.Full_Name || '', 
              userType: user.role_id === 1 ? 'Admin' : 'Admin_user',
              email: user.Email || '',
              password: '', 
              confirmPassword: '',
              contactNumber: user.phone_number || '',
              
              status: user.account_status?.toLowerCase() === 'approved' ? 'active' : 'inactive',
              address: user.Address || '',
              description: user.Description || ''
            });
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'contactNumber') {
      const onlyNums = value.replace(/[^0-9]/g, ''); 
      if (onlyNums.length <= 11) {
        setFormData({ ...formData, [name]: onlyNums });
        if (onlyNums.length > 0 && onlyNums.length < 11) {
          setErrors(prev => ({ ...prev, contactNumber: "Must be 11 digits" }));
        } else {
          setErrors(prev => ({ ...prev, contactNumber: "" }));
        }
      }
      return;
    }

    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    if (name === 'password') {
      if (value.length > 0 && value.length < 6) {
        setErrors(prev => ({ ...prev, password: "Too short! Min 6 characters" }));
      } else {
        setErrors(prev => ({ ...prev, password: "" }));
      }
      if (updatedData.confirmPassword && value !== updatedData.confirmPassword) {
        setErrors(prev => ({ ...prev, confirmPassword: "Does not match" }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }

    if (name === 'confirmPassword') {
      if (value && value !== updatedData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: "Does not match" }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: "" }));
      }
    }

    if (!['password', 'confirmPassword', 'contactNumber'].includes(name)) {
      if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (formData.contactNumber.length !== 11) newErrors.contactNumber = "Phone must be 11 digits";
    if (!isEditMode || formData.password) {
      if (formData.password.length < 6) newErrors.password = "Too short";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Mismatch";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const dataToSend = {
        Full_Name: formData.name,      
        Email: formData.email,         
        Password: formData.password,  
        Role: formData.userType,       
        phone_number: formData.contactNumber, 
        Address: formData.address || "Assiut", 
        City: "Assiut",             
        account_status: formData.status === 'active' ? 'approved' : 'rejected'    
      };

      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/users/user_update/${id}`, dataToSend);
      } else {
        await axios.post('http://localhost:5000/api/users/user_signup', dataToSend);
      }
      navigate('/admin/users/list');
    } catch (error) {
     const serverMessage = error.response?.data?.message || "Error saving user data";
    setErrors(prev => ({ ...prev, server: serverMessage }));
    
    
   toast.error(serverMessage);
    }
  };

 
  const labelClass = "block text-[11px] font-black text-[#102C57] mb-1.5 uppercase tracking-tight";
 
  const inputBaseClass = "w-full px-5 py-2.5 border border-[#DAC0A3] rounded-lg focus:ring-2 focus:ring-[#102C57]/10 outline-none text-xs transition-all bg-white";
  const errorTextClass = "text-red-500 text-[10px] mt-1 font-bold animate-pulse";

  return (
    <div className="max-w-[1200px] mx-auto space-y-3 h-full max-h-[calc(100vh-140px)] overflow-hidden flex flex-col p-4">
      <h2 className="text-[#102C57] text-xl font-black uppercase tracking-tight">
        {isEditMode ? 'Edit system user' : 'Add new system user'}
      </h2>

      <div className="bg-white p-6 rounded-3xl border border-[#EADBC8] shadow-sm flex-1 overflow-auto">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-4">
            
            <div className="space-y-0.5">
              <label className={labelClass}>Name *</label>
              <input type="text" name="name" className={inputBaseClass} value={formData.name} onChange={handleChange} required />
            </div>

            <div className="space-y-0.5">
              <label className={labelClass}>Username *</label>
              <input type="text" name="username" className={inputBaseClass} value={formData.username} onChange={handleChange} required />
            </div>

            <div className="space-y-0.5">
              <label className={labelClass}>Status *</label>
              <div className="flex bg-[#FEFAF6] rounded-lg p-1 w-full max-w-[200px] ">
                {['active', 'inactive'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setFormData({...formData, status: s})}
                    className={`flex-1 py-1.5 text-[10px] font-black rounded-md transition-all uppercase ${
                      formData.status === s ? 'bg-[#102C57] text-white' : 'text-[#102C57]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-0.5">
              <label className={labelClass}>User Type *</label>
              <select name="userType" className={inputBaseClass} value={formData.userType} onChange={handleChange} required>
                <option value="">Select Type</option>
                <option value="Admin">Admin</option>
                <option value="Admin_user">Admin_user</option>
              </select>
            </div>

            <div className="space-y-0.5">
              <label className={labelClass}>Email *</label>
              <input type="email" name="email" className={inputBaseClass} value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-0.5">
              <label className={labelClass}>Contact Number *</label>
              <input 
                type="text" 
                name="contactNumber" 
                className={`${inputBaseClass} ${errors.contactNumber ? 'border-red-500' : ''}`} 
                value={formData.contactNumber} 
                onChange={handleChange} 
                required 
              />
              {errors.contactNumber && <p className={errorTextClass}>{errors.contactNumber}</p>}
            </div>

            <div className="space-y-0.5">
              <label className={labelClass}>Password {isEditMode ? '' : '*'}</label>
              <input 
                type="password" 
                name="password" 
                className={`${inputBaseClass} ${errors.password ? 'border-red-500 bg-red-50' : ''}`} 
                value={formData.password} 
                onChange={handleChange} 
                required={!isEditMode} 
              />
              {errors.password && <p className={errorTextClass}>{errors.password}</p>}
            </div>

       
            <div className="space-y-0.5">
              <label className={labelClass}>Confirm Password *</label>
              <input 
                type="password" 
                name="confirmPassword" 
                className={`${inputBaseClass} ${errors.confirmPassword ? 'border-red-500 bg-red-50' : ''}`} 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                required={!isEditMode || formData.password} 
              />
              {errors.confirmPassword && <p className={errorTextClass}>{errors.confirmPassword}</p>}
            </div>
            
            <div className="space-y-0.5">
              <label className={labelClass}>Address *</label>
              <input type="text" name="address" className={inputBaseClass} value={formData.address} onChange={handleChange} required />
            </div>

            <div className="col-span-1 md:col-span-3 space-y-0.5">
              <label className={labelClass}>Description</label>
              <textarea name="description" rows="3" className={`${inputBaseClass} resize-none`} placeholder="Add details..." value={formData.description} onChange={handleChange}></textarea>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button type="submit" className="bg-[#102C57] text-white px-16 py-3 rounded-lg font-black text-xs hover:bg-[#1a3d75] transition-all uppercase tracking-widest shadow-lg">
              {isEditMode ? 'Update User' : 'Save User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;