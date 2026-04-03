import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Send, MapPin, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react';

const Contact = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('product') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: productId ? `I would like to inquire about product ID: ${productId}` : '',
    productId: productId || null
  });

  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      await axios.post('/api/inquiries', formData);
      setStatus({ type: 'success', msg: 'Your message has been sent successfully! Our team will contact you soon.' });
      setFormData({ name: '', email: '', phone: '', message: '', productId: null });
    } catch (error) {
      setStatus({ 
        type: 'error', 
        msg: error.response?.data?.message || 'An error occurred while sending your message. Please try again.' 
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500 tracking-tight">Contact Us</h1>
        <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-cyan-400 mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
        <p className="mt-8 text-lg font-medium text-slate-500 max-w-2xl mx-auto">
          Have a question about our products or want to place a bulk order? We are here to help propel your next project.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Contact Information */}
        <div className="bg-gradient-to-br from-primary via-indigo-900 to-slate-900 rounded-[24px] p-10 sm:p-12 text-white shadow-[0_20px_50px_rgba(67,56,202,0.3)] flex flex-col justify-between relative overflow-hidden">
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/40 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-6 tracking-tight">Get In Touch</h2>
            <p className="text-indigo-100/90 mb-12 text-[17px] leading-relaxed">
              Padmavati Enterprises is your premium supplier for electronic components. Reach out to us for direct quotations, component sourcing, or technical queries.
            </p>
            
            <div className="space-y-10">
              <div className="flex items-start group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 glass-dark flex items-center justify-center mr-5 group-hover:bg-cyan-500/20 transition-colors border border-white/5 shadow-inner">
                  <MapPin className="text-cyan-300" size={26} />
                </div>
                <div className="pt-1">
                  <h4 className="text-xl font-bold mb-1 tracking-tight text-white">Our Address</h4>
                  <p className="text-indigo-100/80 leading-snug">PADMAVATI ENTERPRISE. 1156, OPP., AMBAJI MATA'S CHOWK, DHANA SUTHAR POLE, RELIEF ROAD, AHMADABAD, India 380001</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 glass-dark flex items-center justify-center mr-5 group-hover:bg-cyan-500/20 transition-colors border border-white/5 shadow-inner">
                  <Phone className="text-cyan-300" size={26} />
                </div>
                <div className="pt-1">
                  <h4 className="text-xl font-bold mb-1 tracking-tight text-white">Phone Number</h4>
                  <p className="text-indigo-100/80 text-lg">+91 93270 23172</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <div className="w-14 h-14 rounded-2xl bg-white/10 glass-dark flex items-center justify-center mr-5 group-hover:bg-cyan-500/20 transition-colors border border-white/5 shadow-inner">
                  <Mail className="text-cyan-300" size={26} />
                </div>
                <div className="pt-1">
                  <h4 className="text-xl font-bold mb-1 tracking-tight text-white">Email Address</h4>
                  <p className="text-indigo-100/80 text-lg">sales@padmavatienterprises.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 sm:p-12 flex flex-col justify-center">
          <h3 className="text-2xl font-extrabold text-slate-800 mb-8 border-b border-slate-100 pb-5 tracking-tight">Send a Direct Message</h3>
          
          {status.msg && (
            <div className={`mb-8 p-5 rounded-2xl flex items-center shadow-sm border ${status.type === 'success' ? 'bg-green-50/50 border-green-100 text-green-800' : 'bg-red-50/50 border-red-100 text-red-800'}`}>
              {status.type === 'success' ? <CheckCircle className="mr-3" size={22} /> : <div className="font-bold mr-3 text-xl">!</div>}
              <span className="font-medium text-[15px]">{status.msg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label htmlFor="name" className="block text-[15px] font-semibold text-slate-700 mb-2">Full Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required 
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all duration-300 font-medium text-slate-800"
                placeholder="Ex: Rajesh Patel"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
              <div>
                <label htmlFor="email" className="block text-[15px] font-semibold text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all duration-300 font-medium text-slate-800"
                  placeholder="rajesh@company.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-[15px] font-semibold text-slate-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  id="phone" 
                  required 
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all duration-300 font-medium text-slate-800"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-[15px] font-semibold text-slate-700 mb-2">Your Inquiry</label>
              <textarea 
                name="message" 
                id="message" 
                rows="4" 
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all duration-300 font-medium text-slate-800 resize-none"
                placeholder="Include component IDs, bulk quantities, or technical questions here..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-cyan-500 hover:from-[#3730a3] hover:to-cyan-600 text-white font-bold py-4 px-8 rounded-xl transition duration-300 flex items-center justify-center shadow-[0_8px_20px_rgba(67,56,202,0.25)] hover:shadow-[0_12px_25px_rgba(67,56,202,0.4)] mt-4 transform hover:-translate-y-0.5 tracking-wide text-lg"
            >
              {loading ? <Loader2 className="animate-spin text-white mr-3" size={24} /> : <Send size={22} className="mr-3" />}
              {loading ? 'Transmitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
