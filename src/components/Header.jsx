//components/Header.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-cyan-700 text-white shadow-lg p-4 flex justify-between items-center">
            {/* Logo/Title */}
            <Link to={currentUser ? '/dashboard' : '/'} className="text-2xl font-extrabold hover:text-pink-200 transition">
                Task Manager
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-4">
                {currentUser ? (
                    <>
                        <Link to="/dashboard" className="text-sm hover:underline">
                            Dashboard
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-sm px-3 py-1 border rounded hover:bg-red-100"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-sm px-3 py-1 border rounded hover:bg-blue-100">
                            Login
                        </Link>
                        <Link to="/register" className="text-sm px-3 py-1 border rounded hover:bg-green-100">
                            Register
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}
