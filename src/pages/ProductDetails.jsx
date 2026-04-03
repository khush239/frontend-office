import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Mail } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Error fetching product');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-primary" size={64} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
        <Link to="/products" className="text-primary hover:underline mt-4 inline-block">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition">
        <ArrowLeft size={20} className="mr-2" /> Back to Catalog
      </Link>
      
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="bg-gray-50 flex items-center justify-center p-8">
            <img 
              src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/500'} 
              alt={product.name} 
              className="max-w-full h-auto object-contain max-h-[500px] rounded shadow-sm border border-gray-200"
            />
          </div>
          
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="uppercase tracking-wide text-sm text-primary font-semibold border border-blue-200 bg-blue-50 px-3 py-1 rounded inline-block w-max mb-6">
               {product.category?.name || 'Component'}
            </div>
            <h1 className="text-3xl font-extrabold text-dark mb-4">{product.name}</h1>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
            


            <div className="mt-auto">
              {/* Note: This routes to the contact form, optionally passing the product ID via state */}
              <Link 
                to={`/contact?product=${product._id}`}
                className="w-full flex items-center justify-center bg-primary hover:bg-blue-800 text-white py-4 px-6 rounded-lg text-lg font-medium shadow-md hover:shadow-lg transition duration-300"
              >
                <Mail size={24} className="mr-3" /> Inquire About Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
