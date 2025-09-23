import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const schema = yup.object().shape({
  name: yup.string().min(20, 'Min 20 characters').max(60).required(),
  email: yup.string().email().required(),
  address: yup.string().max(400).nullable(),
  password: yup.string().matches(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/, '8-16 chars, 1 uppercase, 1 special').required()
});

export default function Signup(){
  const { register, handleSubmit, formState:{ errors } } = useForm({ resolver: yupResolver(schema) });
  const nav = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await API.post('/auth/signup', data);
      login(res.data.token, res.data.user);
      nav('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <input {...register('name')} placeholder="Full name" className="input" />
          <div className="text-red-600 text-sm">{errors.name?.message}</div>
        </div>
        <div>
          <input {...register('email')} placeholder="Email" className="input" />
          <div className="text-red-600 text-sm">{errors.email?.message}</div>
        </div>
        <div>
          <textarea {...register('address')} placeholder="Address" className="input" />
          <div className="text-red-600 text-sm">{errors.address?.message}</div>
        </div>
        <div>
          <input {...register('password')} type="password" placeholder="Password" className="input" />
          <div className="text-red-600 text-sm">{errors.password?.message}</div>
        </div>
        <button type="submit" className="btn-primary">Sign up</button>
      </form>
    </div>
  );
}
