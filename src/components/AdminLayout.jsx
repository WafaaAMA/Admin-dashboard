import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AdminLayout = () => {
  return (
  
    <div className="flex flex-col min-h-screen bg-[#FEFAF6]">
      
    
      <Navbar />

      <div className="flex flex-1">
      
        <Sidebar />

      
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;