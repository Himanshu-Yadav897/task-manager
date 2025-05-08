//pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
  const { login, status, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState({});
  const navigate = useNavigate();

  // Simple validators
  const validate = () => {
    const errs = {};
    if (!email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Invalid email address';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be ≥6 characters';
    return errs;
  };

  // Re-validate on each field change
  useEffect(() => {
    setFormError(validate());
  }, [email, password]);

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setFormError(errs);
      return;
    }
    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch {
      // login error is shown via context.error
    }
  };

  const isValid = Object.keys(formError).length === 0;

  return (
    <div className="p-6 max-w-md mx-auto mt-12 border rounded-lg shadow-sm">
      <h2 className="text-3xl font-semibold mb-6 text-center">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={`w-full p-2 border rounded ${formError.email ? 'border-red-500' : ''}`}
          />
          {formError.email && <p className="text-red-500 text-xs mt-1">{formError.email}</p>}
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full p-2 border rounded ${formError.password ? 'border-red-500' : ''}`}
          />
          {formError.password && <p className="text-red-500 text-xs mt-1">{formError.password}</p>}
        </div>

        <button
          type="submit"
          disabled={!isValid || status === 'loading'}
          className="w-full py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {status === 'loading' ? 'Logging in…' : 'Log In'}
        </button>
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
      </form>
      <p className="mt-4 text-center text-sm">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}

