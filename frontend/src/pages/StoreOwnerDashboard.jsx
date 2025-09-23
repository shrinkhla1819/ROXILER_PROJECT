import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { useAuth } from '../auth/AuthProvider';

export default function StoreOwnerDashboard(){
  const { user } = useAuth();
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  useEffect(() => {
    const load = async () => {
      // fetch all stores and filter by owner? backend has admin list; for owner we'll call stores and filter.
      const res = await API.get('/stores', { params: { limit: 100 } });
      const owned = (res.data.rows || []).filter(s => s.owner_user_id === user?.id || s.owner?.id === user?.id);
      setStores(owned);
      // fetch ratings per store
      const rmap = {};
      await Promise.all(owned.map(async s => {
        const rr = await API.get(`/stores/${s.id}/ratings`);
        rmap[s.id] = rr.data.ratings || [];
      }));
      setRatings(rmap);
    };
    if (user) load();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">My Stores</h2>
      {stores.map(s => (
        <div key={s.id} className="bg-white p-4 rounded shadow">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold">{s.name}</h3>
              <div className="text-sm text-gray-600">{s.address}</div>
            </div>
            <div className="text-right">
              <div>Avg: <strong>{s.avg_rating ?? 'N/A'}</strong></div>
            </div>
          </div>
          <div className="mt-3">
            <h4 className="font-medium">Ratings</h4>
            <ul>
              {(ratings[s.id] || []).map(r => (
                <li key={r.id} className="border-t py-2">
                  <div><strong>{r.User?.name || r.user_id}</strong> — {r.rating} </div>
                  <div className="text-sm text-gray-700">{r.comment}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
