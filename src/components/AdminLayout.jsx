import { useContext } from 'react';
import { Navigate, Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Package, Tags, MessageSquare, LogOut, Cpu } from 'lucide-react';

const AdminLayout = () => {
  const { admin, logout } = useContext(AuthContext);
  const location = useLocation();

  if (!admin) {
    return <Navigate to="/admin/login" />;
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Categories', path: '/admin/categories', icon: <Tags size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
    { name: 'Inquiries', path: '/admin/inquiries', icon: <MessageSquare size={20} /> },
  ];

  const isActive = (path) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex flex-col w-64 bg-dark text-white shadow-xl">
        <div className="p-6 border-b border-gray-800 flex items-center space-x-2">
          <Cpu className="text-primary" size={24} />
          <span className="text-xl font-bold tracking-wider">Admin Panel</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`${
                  isActive(item.path) 
                    ? 'bg-primary text-white shadow-md rounded-lg' 
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg'
                } group flex items-center px-4 py-3 text-sm font-medium transition-colors`}
              >
                <div className="mr-3">{item.icon}</div>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-800">
          <div className="mb-4 px-2 text-sm text-gray-400 truncate">
            {admin.email}
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition shadow-sm"
          >
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b md:hidden flex justify-between items-center p-4">
          <div className="font-bold text-lg text-dark">Admin Panel</div>
          <button onClick={logout} className="text-red-600 p-2"><LogOut size={20} /></button>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
