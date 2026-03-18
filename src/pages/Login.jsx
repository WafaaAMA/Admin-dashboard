import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaLock, FaArrowRight } from 'react-icons/fa';
import axios from 'axios'; 
import Logo from '../assets/Logo.jpeg'; 

const LoginPage = () => {
  const navigate = useNavigate();
  
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
     
      const response = await axios.post('http://localhost:5000/api/users/user_login', {
        Email: formData.email, 
        Password: formData.password
      });

    
      const { user, accessToken, success } = response.data;

      if (success) {
      
        if (user.role_id !== 1) {
          setError('Access denied. Only admins can login here.');
          setLoading(false);
          return;
        }

      
        localStorage.setItem('token', accessToken);
        localStorage.setItem('adminInfo', JSON.stringify(user));

    
        navigate('/admin');
      }

    } catch (err) {
      
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFAF6] flex items-center justify-center p-6 font-sans antialiased">
      {/* Background  */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#EADBC8] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#DAC0A3] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative w-full max-w-[450px]">
        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(16,44,87,0.1)] overflow-hidden p-10 md:p-14 border border-[#EADBC8]/50 text-center">
          
          <div className="mb-10">
            <div className="inline-block mb-6">
              <img 
                src={Logo} 
                alt="Logo" 
                className="h-24 w-auto object-contain rounded-2xl shadow-sm border border-[#FEFAF6]" 
              />
            </div>
            <h1 className="text-3xl font-bold text-[#102C57] tracking-tight">Welcome</h1>
            <p className="text-slate-400 text-sm mt-2 font-medium tracking-wide">Admin Portal Access</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold rounded">
              {error}
            </div>
          )}
      
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group text-left">
              <label className="block text-[11px] font-bold text-[#DAC0A3] uppercase tracking-[0.2em] ml-1 mb-2 group-focus-within:text-[#102C57] transition-colors">
                Email Address
              </label>
              <div className="relative flex items-center">
                <FaUserCircle className="absolute left-4 text-[#DAC0A3] group-focus-within:text-[#102C57] transition-colors" />
                <input 
                  name="email"
                  type="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  className="w-full bg-[#FEFAF6] border border-[#EADBC8] rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all focus:ring-4 focus:ring-[#EADBC8]/30 focus:border-[#DAC0A3] text-[#102C57]"
                />
              </div>
            </div>

            <div className="group text-left">
              <label className="block text-[11px] font-bold text-[#DAC0A3] uppercase tracking-[0.2em] ml-1 mb-2 group-focus-within:text-[#102C57] transition-colors">
                Password
              </label>
              <div className="relative flex items-center">
                <FaLock className="absolute left-4 text-[#DAC0A3] group-focus-within:text-[#102C57] transition-colors" />
                <input 
                  name="password"
                  type="password" 
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#FEFAF6] border border-[#EADBC8] rounded-2xl py-4 pl-12 pr-4 text-sm outline-none transition-all focus:ring-4 focus:ring-[#EADBC8]/30 focus:border-[#DAC0A3] text-[#102C57]"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className={`w-full bg-[#102C57] text-white rounded-2xl py-4 font-bold text-sm shadow-xl shadow-[#102C57]/20 flex items-center justify-center gap-3 group hover:bg-[#1a3d75] transition-all active:scale-[0.98] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Authenticating...' : 'Login'}
              {!loading && <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
};

export default LoginPage;