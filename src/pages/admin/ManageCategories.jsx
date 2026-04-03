import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Trash2, Edit, Plus, Loader2 } from 'lucide-react';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [editId, setEditId] = useState(null);
  
  const { admin } = useContext(AuthContext);
  const config = { headers: { Authorization: `Bearer ${admin?.token}` } };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories');
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    
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
        await axios.put(`/api/categories/${editId}`, formData, configData);
      } else {
        await axios.post('/api/categories', formData, configData);
      }
      setName('');
      setImage('');
      setEditId(null);
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || 'Error occurred');
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setImage('');
    setEditId(category._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this category?')) {
      try {
        await axios.delete(`/api/categories/${id}`, config);
        fetchCategories();
      } catch (error) {
        alert(error.response?.data?.message || 'Error occurred');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Categories</h2>
      
      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-semibold mb-4 text-gray-700">{editId ? 'Edit Category' : 'Add New Category'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
            <input 
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary outline-none bg-white" 
            />
          </div>
        </div>
        <div className="flex space-x-3">
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-800 transition flex items-center">
            {editId ? <Edit size={16} className="mr-2" /> : <Plus size={16} className="mr-2" />}
            {editId ? 'Update Category' : 'Add Category'}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setName(''); setImage(''); }} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center my-10"><Loader2 className="animate-spin text-primary" size={32} /></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded border">
                      <img className="h-10 w-10 object-cover" src={cat.image || 'https://via.placeholder.com/40'} alt="" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleEdit(cat)} className="text-indigo-600 hover:text-indigo-900 mx-2">
                       <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(cat._id)} className="text-red-600 hover:text-red-900 mx-2">
                       <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr><td colSpan="3" className="px-6 py-4 text-center text-gray-500">No categories found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
