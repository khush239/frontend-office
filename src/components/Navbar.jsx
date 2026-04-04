import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, Cpu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-dark text-white sticky top-0 z-50 border-b border-white/10 shadow-2xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-white flex items-center justify-center h-12 w-12 rounded-xl shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300 overflow-hidden">
                <img src="/logo.jpg" alt="Logo" className="h-full w-full object-contain p-1" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Padmavati Enterprises</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-accent transition">Home</Link>
            <Link to="/products" className="hover:text-accent transition">Products</Link>
            <Link to="/contact" className="hover:text-accent transition">Contact Us</Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-accent focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary pb-4 px-4 shadow-inner">
          <div className="flex flex-col space-y-3 pt-2">
            <Link to="/" className="hover:bg-blue-800 px-3 py-2 rounded" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/products" className="hover:bg-blue-800 px-3 py-2 rounded" onClick={() => setIsOpen(false)}>Products</Link>
            <Link to="/contact" className="hover:bg-blue-800 px-3 py-2 rounded" onClick={() => setIsOpen(false)}>Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
