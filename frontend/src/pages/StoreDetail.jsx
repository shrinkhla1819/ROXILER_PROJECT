import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import RatingStars from '../components/RatingStars';
import { useAuth } from '../auth/AuthProvider';

export default function StoreDetail(){
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [avg, setAvg] = useState(null);
  const [myRating, setMyRating] = useState(null);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  const fetch = async () => {
    const res = await API.get(`/stores/${id}`);
    setStore(res.data.store);
    setAvg(res.data.avg_rating);
    setMyRating(res.data.userRating);
  };

  useEffect(() => { fetch(); }, [id]);

  const submitRating = async (rating) => {
    if (!user) return alert('Please login to submit rating');
    try {
      await API.post('/ratings', { store_id: id, rating, comment });
      alert('Saved');
      fetch();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed');
    }
  };

  if (!store) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">{store.name}</h2>
      <div className="text-gray-600 mb-3">{store.address}</div>
      <div className="mb-4">Average rating: <strong>{avg ?? 'N/A'}</strong></div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Your Rating</label>
        <RatingStars value={myRating || 0} onChange={val => setMyRating(val)} />
      </div>

      <div className="mb-3">
        <textarea placeholder="Optional comment" value={comment} onChange={e => setComment(e.target.value)} className="input" />
      </div>

      <div className="flex gap-2">
        <button className="btn-primary" onClick={() => submitRating(myRating || 1)}>Submit / Update</button>
      </div>
    </div>
  );
}
