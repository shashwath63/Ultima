import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/login', {
                email,
                password
            });
            if (res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                navigate('/home');
            }
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
                <div>
                    New user? <Link to='/register'>Register</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;