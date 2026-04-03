import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Package, Tags, MessageSquare, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { admin } = useContext(AuthContext);
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    inquiries: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${admin.token}` }
        };
        
        const [prodRes, catRes, inqRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/categories'),
          axios.get('/api/inquiries', config)
        ]);

        setStats({
          products: prodRes.data.length,
          categories: catRes.data.length,
          inquiries: inqRes.data.length
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [admin.token]);

  const statCards = [
    { title: 'Total Products', value: stats.products, icon: <Package size={32} />, color: 'bg-blue-500' },
    { title: 'Categories', value: stats.categories, icon: <Tags size={32} />, color: 'bg-indigo-500' },
    { title: 'Recent Inquiries', value: stats.inquiries, icon: <MessageSquare size={32} />, color: 'bg-green-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      
      {loading ? (
        <div className="animate-pulse flex space-x-4 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 bg-gray-200 h-32 rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
              <div className={`${stat.color} text-white p-4 rounded-lg shadow-inner mr-6`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Welcome to Control Panel</h2>
          <TrendingUp className="text-green-500" />
        </div>
        <p className="text-gray-600 mb-4">
          Select an option from the sidebar to manage products, categories, or to view customer inquiries.
        </p>
        <div className="bg-blue-50 text-blue-800 p-4 rounded-lg flex items-center">
          <span className="font-semibold mr-2">Tip:</span> Regularly update your stock numbers to keep the catalog accurate.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
