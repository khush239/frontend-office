import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Loader2, Mail, Phone, Calendar } from 'lucide-react';

const ViewInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useContext(AuthContext);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${admin?.token}` } };
        const { data } = await axios.get('/api/inquiries', config);
        setInquiries(data);
        setLoading(false);
      } catch (error) {
        console.error('Error viewing inquiries', error);
        setLoading(false);
      }
    };
    fetchInquiries();
  }, [admin.token]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Inquiries</h2>
      
      {loading ? (
        <div className="flex justify-center my-20"><Loader2 className="animate-spin text-primary" size={48} /></div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 text-center">
          <p className="text-gray-500 text-lg">No inquiries received yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {inquiries.map((inq) => (
            <div key={inq._id} className="bg-white p-6 rounded-xl shadow border border-gray-200 flex flex-col">
              <div className="flex justify-between items-start mb-4 border-b pb-4">
                <div>
                  <h3 className="font-bold text-lg text-dark">{inq.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Mail size={14} className="mr-1" /> {inq.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Phone size={14} className="mr-1" /> {inq.phone}
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                   <Calendar size={12} className="mr-1" /> {new Date(inq.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex-grow">
                <p className="text-gray-700 italic border-l-4 border-primary pl-4 py-2 bg-gray-50 rounded-r">"{inq.message}"</p>
              </div>
              
              {inq.productId && (
                <div className="mt-4 pt-4 border-t text-sm font-medium text-primary">
                  Inquired Product: {inq.productId.name}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewInquiries;
