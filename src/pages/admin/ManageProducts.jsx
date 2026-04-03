import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Edit, Plus, Loader2 } from 'lucide-react';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const { admin } = useContext(AuthContext);
  const config = { headers: { Authorization: `Bearer ${admin?.token}` } };

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        axios.get('/api/products'),
        axios.get('/api/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('category', category);
    
    if (image instanceof File) {
      formData.append('image', image);
    }

    const configData = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${admin?.token}`
      }
    };

    try {
      if (editId) {
        await axios.put(`/api/products/${editId}`, formData, configData);
      } else {
        await axios.post('/api/products', formData, configData);
      }
      resetForm();
      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || 'Error occurred');
    }
  };

  const handleEdit = (product) => {
    setName(product.name);
    setDescription(product.description);
    setCategory(product.category?._id || '');
    setImage(''); // Reset image input on edit to optionally provide new file
    setEditId(product._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`, config);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || 'Error occurred');
      }
    }
  };

  const resetForm = () => {
    setName(''); setDescription(''); setCategory(''); setImage('');
    setEditId(null); setShowForm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col min-h-[500px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Manage Products</h2>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)} 
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center"
          >
            <Plus size={16} className="mr-2" /> Add Product
          </button>
        )}
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-4 text-gray-700">{editId ? 'Edit Product' : 'Add New Product'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="w-full px-4 py-2 border rounded-md bg-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 border rounded-md bg-white">
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows="3" className="w-full px-4 py-2 border rounded-md resize-none" />
            </div>
          </div>
          <div className="flex space-x-3">
            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
              {editId ? 'Update Product' : 'Save Product'}
            </button>
            <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="flex justify-center my-10"><Loader2 className="animate-spin text-primary" size={32} /></div>
      ) : (
        <div className="overflow-x-auto flex-grow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded border">
                        <img className="h-10 w-10 object-cover" src={p.images[0] || 'https://via.placeholder.com/40'} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{p.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{p.category?.name || 'Unknown'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(p)} className="text-indigo-600 hover:text-indigo-900 mx-2"><Edit size={18} /></button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-900 mx-2"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan="3" className="text-center py-4 text-gray-500">No products found</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
