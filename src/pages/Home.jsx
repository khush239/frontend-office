import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  const getImageForCategory = (name) => {
    const map = {
      'SMD Components': '/images/smd_resistor_reel.png',
      'LED & Display Solutions': '/images/led_display.png',
      'Connectors & Wiring': '/images/connectors.png',
      'Cables & Wiring Products': '/images/cable_harness.png',
      'Heat Management': '/images/heatshrink_tubing.png',
      'Tools & Accessories': '/images/electronic_tools.png',
      'Switches': '/images/switches_assorted.png',
      'Soldering Materials': '/images/solder_materials.png',
    };
    return map[name] || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80';
  };

  return (
    <div>
      {/* Premium Hero Section */}
      <section className="text-white relative overflow-hidden min-h-[600px] flex items-center">
        <div className="absolute inset-0 patterned-bg"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/20 glass-dark">
              <span className="text-sm font-semibold tracking-wide text-cyan-300 uppercase flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
                Premium B2B Supplier
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tighter leading-[1.1]">
              Power Your Innovations with <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 filter drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">Quality Components</span>
            </h1>
            <p className="text-lg md:text-xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Leading supplier of ICs, SMD components, premium connectors, and tools. We provide the robust building blocks for your next great invention.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/products" className="bg-white text-dark font-bold py-4 px-10 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1">
                Explore Catalog <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/contact" className="glass hover:bg-white/10 border-2 border-white/30 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 flex items-center justify-center transform hover:-translate-y-1">
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-[100px] opacity-40"></div>
        <div className="absolute top-1/4 -right-24 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
      </section>

      {/* Categories Preview */}
      <section className="py-24 bg-slate-50 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4 tracking-tight">Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Categories</span></h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-cyan-400 mx-auto mt-6 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
          </div>
          
          {loading ? (
            <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center py-20">
              <Loader2 className="animate-spin text-primary drop-shadow-md" size={56} />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((cat) => (
                <motion.div 
                  key={cat._id}
                  whileHover={{ y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(67,56,202,0.12)] border border-slate-100 hover:border-indigo-100 transition-all duration-300 flex flex-col cursor-pointer group"
                >
                  <Link to={`/products?category=${encodeURIComponent(cat.name)}`} className="flex flex-col h-full w-full">
                    <div className="h-52 w-full bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-8 border-b border-gray-50 overflow-hidden relative">
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <img src={cat.image || getImageForCategory(cat.name)} alt={cat.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out mix-blend-multiply drop-shadow-sm relative z-10" />
                    </div>
                    <div className="p-6 text-center flex-grow flex items-center justify-center bg-white">
                      <h3 className="text-[17px] font-bold text-slate-800 leading-snug tracking-tight group-hover:text-primary transition-colors">{cat.name}</h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-indigo-50/50 blur-3xl z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-6 tracking-tight">Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-600">Padmavati Enterprises?</span></h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-primary to-cyan-400 mx-auto rounded-full shadow-[0_0_10px_rgba(67,56,202,0.4)]"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            <div className="group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center text-3xl mb-6 shadow-sm border border-indigo-100 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(67,56,202,0.3)] transition-all duration-300 transform group-hover:-translate-y-2">🔧</div>
              <h3 className="text-[19px] font-extrabold text-slate-900 mb-3 tracking-tight">Wide Range of Components</h3>
              <p className="text-slate-500 text-sm leading-[1.7] font-medium">We offer a comprehensive selection of electronic components—from ICs and SMD parts to cables, connectors, and soldering materials—all under one roof.</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center text-3xl mb-6 shadow-sm border border-indigo-100 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(67,56,202,0.3)] transition-all duration-300 transform group-hover:-translate-y-2">✅</div>
              <h3 className="text-[19px] font-extrabold text-slate-900 mb-3 tracking-tight">Assured Quality Products</h3>
              <p className="text-slate-500 text-sm leading-[1.7] font-medium">Every product is sourced and supplied with a focus on reliability, durability, and industry standards, ensuring consistent performance.</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-cyan-600 flex items-center justify-center text-3xl mb-6 shadow-sm border border-cyan-100 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(6,182,212,0.3)] transition-all duration-300 transform group-hover:-translate-y-2">⚡</div>
              <h3 className="text-[19px] font-extrabold text-slate-900 mb-3 tracking-tight">Custom Solutions Available</h3>
              <p className="text-slate-500 text-sm leading-[1.7] font-medium">We specialize in custom cable harness solutions tailored to your exact requirements, helping you get precisely what your project needs.</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center text-3xl mb-6 shadow-sm border border-indigo-100 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(67,56,202,0.3)] transition-all duration-300 transform group-hover:-translate-y-2">🧰</div>
              <h3 className="text-[19px] font-extrabold text-slate-900 mb-3 tracking-tight">One-Stop Shop for Engineers</h3>
              <p className="text-slate-500 text-sm leading-[1.7] font-medium">Whether you're a student, hobbyist, or industrial buyer, we provide everything from basic components to specialized tools and accessories.</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center text-3xl mb-6 shadow-sm border border-indigo-100 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(67,56,202,0.3)] transition-all duration-300 transform group-hover:-translate-y-2">🚚</div>
              <h3 className="text-[19px] font-extrabold text-slate-900 mb-3 tracking-tight">Reliable & Timely Delivery</h3>
              <p className="text-slate-500 text-sm leading-[1.7] font-medium">We understand the importance of time in projects and manufacturing, ensuring quick processing and dependable delivery.</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-cyan-600 flex items-center justify-center text-3xl mb-6 shadow-sm border border-cyan-100 group-hover:bg-cyan-500 group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(6,182,212,0.3)] transition-all duration-300 transform group-hover:-translate-y-2">💰</div>
              <h3 className="text-[19px] font-extrabold text-slate-900 mb-3 tracking-tight">Competitive Pricing</h3>
              <p className="text-slate-500 text-sm leading-[1.7] font-medium">Get the best value for your money with affordable pricing across all categories without compromising on quality.</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center text-3xl mb-6 shadow-sm border border-indigo-100 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(67,56,202,0.3)] transition-all duration-300 transform group-hover:-translate-y-2">🤝</div>
              <h3 className="text-[19px] font-extrabold text-slate-900 mb-3 tracking-tight">Customer-Centric Approach</h3>
              <p className="text-slate-500 text-sm leading-[1.7] font-medium">Our priority is customer satisfaction. We provide guidance, support, and assistance to help you choose the right components.</p>
            </div>
            
            <div className="group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-primary flex items-center justify-center text-3xl mb-6 shadow-sm border border-indigo-100 group-hover:bg-primary group-hover:text-white group-hover:shadow-[0_10px_30px_rgba(67,56,202,0.3)] transition-all duration-300 transform group-hover:-translate-y-2">🔍</div>
              <h3 className="text-[19px] font-extrabold text-slate-900 mb-3 tracking-tight">Latest & Updated Inventory</h3>
              <p className="text-slate-500 text-sm leading-[1.7] font-medium">We keep our inventory updated with the latest electronic components and technologies to meet modern requirements.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
