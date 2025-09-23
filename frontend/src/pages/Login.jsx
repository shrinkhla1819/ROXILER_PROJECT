import React from 'react';
import { useForm } from 'react-hook-form';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Login(){
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await API.post('/auth/login', data);
      login(res.data.token, res.data.user);
      if (res.data.user.role === 'ADMIN') nav('/admin'); 
      else if (res.data.user.role === 'STORE_OWNER') nav('/owner');
      else nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register('email')} placeholder="Email" className="input" />
        <input {...register('password')} type="password" placeholder="Password" className="input" />
        <div className="flex justify-between items-center">
          <button className="btn-primary" type="submit">Login</button>
          <a href="/signup" className="text-indigo-600">Sign up</a>
        </div>
      </form>
    </div>
  );
}
