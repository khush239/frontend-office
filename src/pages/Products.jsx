import { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Loader2 } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setSelectedCategory(searchParams.get('category') || '');
  }, [location.search]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories');
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory && categories.length === 0) return;

    let isMounted = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `/api/products?`;
        if (keyword) url += `keyword=${keyword}&`;
        if (selectedCategory) {
          const cat = categories.find(c => c.name === selectedCategory);
          if (cat) {
            url += `category=${cat._id}`;
          } else {
            // Category isn't valid, don't show all products
            setProducts([]);
            setLoading(false);
            return;
          }
        }
        
        const { data } = await axios.get(url);
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.response?.data?.message || 'Error fetching products');
          setLoading(false);
        }
      }
    };
    fetchProducts();
    
    return () => { isMounted = false; };
  }, [keyword, selectedCategory, categories]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <h1 className="text-3xl font-bold text-dark mb-4 md:mb-0">Our Catalog</h1>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full md:w-1/2 justify-end">
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="relative w-full sm:w-48 text-dark">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-20">
          <Loader2 className="animate-spin text-primary" size={48} />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          {error}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg shadow-inner">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl text-gray-600 font-medium tracking-wide">No products found.</h2>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search keywords.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
