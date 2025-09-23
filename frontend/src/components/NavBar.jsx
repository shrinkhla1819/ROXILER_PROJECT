import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function NavBar(){
  const { user, logout } = useAuth();
  return (
    <nav className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-indigo-600 font-semibold">StoreRatings</Link>
        </div>
        <div className="flex items-center gap-3">
          {!user && <>
            <Link to="/login" className="text-gray-700">Login</Link>
            <Link to="/signup" className="text-indigo-600">SignUp</Link>
          </>}
          {user && <>
            <span className="text-gray-700">Hi, {user.name.split(' ')[0]}</span>
            {user.role === 'ADMIN' && <Link to="/admin" className="text-gray-700">Admin</Link>}
            {user.role === 'STORE_OWNER' && <Link to="/owner" className="text-gray-700">Owner</Link>}
            <button onClick={logout} className="text-red-600">Logout</button>
          </>}
        </div>
      </div>
    </nav>
  );
}
