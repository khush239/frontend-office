import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Cpu } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-10 pb-6 border-t-4 border-primary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Cpu size={28} className="text-primary" />
              <span className="font-bold text-xl tracking-wider text-white">Padmavati</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner and supplier for all electronics components, tools, and accessories. Quality and reliability guaranteed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/products" className="hover:text-primary transition">All Products</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Contact Us</Link></li>
              <li><Link to="/admin" className="hover:text-primary transition">Admin Panel</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Contact Info</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-primary mt-1 flex-shrink-0" />
                <span>PADMAVATI ENTERPRISE. 1156, OPP., AMBAJI MATA'S CHOWK, DHANA SUTHAR POLE, RELIEF ROAD, AHMADABAD, India 380001</span>
              </li>
              <li className="flex items-center mt-3">
                <Phone size={18} className="mr-2 text-primary" />
                +91 9327023172
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary" />
                sales@padmavatienterprises.com
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Padmavati Enterprises. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
