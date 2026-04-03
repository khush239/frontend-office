import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.02 }}
      className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col group transition-all duration-300"
    >
      <div className="relative pt-[100%] overflow-hidden bg-slate-50 border-b border-gray-50">
        <img 
          src={product.images && product.images[0] ? product.images[0] : 'https://images.unsplash.com/photo-1544839803-0c45d3790518?w=500&auto=format&fit=crop&q=60'} 
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
        />
        <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {product.category?.name || 'Component'}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-bold text-dark text-[17px] mb-2 leading-tight tracking-tight line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="mt-auto">
          <Link 
            to={`/products/${product._id}`}
            className="block w-full text-center bg-gray-50 hover:bg-primary hover:text-white text-slate-700 py-3 rounded-xl transition-all duration-300 font-semibold text-sm shadow-sm"
          >
            View Specs
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
