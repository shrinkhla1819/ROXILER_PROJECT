import React, { useEffect, useState } from 'react';
import API from '../api/axios';

export default function AdminDashboard(){
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const fetchDashboard = async () => {
    const res = await API.get('/admin/dashboard');
    setStats(res.data);
  };
  const fetchUsers = async () => {
    const res = await API.get('/admin/users');
    setUsers(res.data.rows || []);
  };
  useEffect(() => { fetchDashboard(); fetchUsers(); }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold">Admin dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">Total users: <strong>{stats?.totalUsers}</strong></div>
        <div className="p-4 bg-white rounded shadow">Total stores: <strong>{stats?.totalStores}</strong></div>
        <div className="p-4 bg-white rounded shadow">Total ratings: <strong>{stats?.totalRatings}</strong></div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Users</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="table-header">Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Address</th>
              <th className="table-header">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t">
                <td className="py-2">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
