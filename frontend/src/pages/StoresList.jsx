import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Link } from 'react-router-dom';
import RatingStars from '../components/RatingStars';
import { useAuth } from '../auth/AuthProvider';

export default function StoresList(){
  const [stores, setStores] = useState([]);
  const [qName, setQName] = useState('');
  const [qAddress, setQAddress] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('ASC');
  const { user } = useAuth();

  const fetchStores = async () => {
    const res = await API.get('/stores', { params: { searchName: qName, searchAddress: qAddress, sortBy, order } });
    setStores(res.data.rows || []);
  };

  useEffect(() => { fetchStores(); }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex gap-3 mb-4">
        <input value={qName} onChange={e => setQName(e.target.value)} placeholder="Search name" className="input" />
        <input value={qAddress} onChange={e => setQAddress(e.target.value)} placeholder="Search address" className="input" />
        <button onClick={fetchStores} className="btn-primary">Search</button>
      </div>

      <div className="bg-white rounded shadow divide-y">
        {stores.map(s => (
          <div key={s.id} className="p-4 flex items-center justify-between">
            <div>
              <Link to={`/store/${s.id}`} className="text-lg font-semibold text-indigo-700">{s.name}</Link>
              <div className="text-sm text-gray-600">{s.address}</div>
            </div>
            <div className="text-right">
              <div>Avg: <strong>{s.avg_rating ?? 'N/A'}</strong></div>
              <div>My rating: <RatingStars readOnly value={s.userRating || 0} /></div>
              <Link to={`/store/${s.id}`} className="mt-2 inline-block text-sm text-indigo-600">View / Rate</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
