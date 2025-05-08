//pages/RegisterPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [formError, setFormError] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 8) errs.password = 'Password must be ≥8 characters';
    return errs;
  };

  useEffect(() => {
    setFormError(validate());
  }, [form]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFormError(errs);
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      navigate('/login');
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  const isValid = Object.keys(formError).length === 0;

  return (
    <div className="p-6 max-w-md mx-auto mt-12 border rounded-lg shadow-sm">
      <h2 className="text-3xl font-semibold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${formError.name ? 'border-red-500' : ''}`}
          />
          {formError.name && <p className="text-red-500 text-xs mt-1">{formError.name}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${formError.email ? 'border-red-500' : ''}`}
          />
          {formError.email && <p className="text-red-500 text-xs mt-1">{formError.email}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${formError.password ? 'border-red-500' : ''}`}
          />
          {formError.password && <p className="text-red-500 text-xs mt-1">{formError.password}</p>}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Register
        </button>
        {submitError && <p className="text-red-500 text-sm text-center mt-2">{submitError}</p>}
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
}
