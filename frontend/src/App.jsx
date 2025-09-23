import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StoresList from './pages/StoresList';
import StoreDetail from './pages/StoreDetail';
import AdminDashboard from './pages/AdminDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import NavBar from './components/NavBar';
import { AuthProvider, useAuth } from './auth/AuthProvider';

function Protected({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <div className="p-6">Access denied</div>;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        <NavBar />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<StoresList />} />
            <Route path="/store/:id" element={<StoreDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={
              <Protected roles={['ADMIN']}><AdminDashboard /></Protected>
            } />
            <Route path="/owner" element={
              <Protected roles={['STORE_OWNER']}><StoreOwnerDashboard /></Protected>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}
