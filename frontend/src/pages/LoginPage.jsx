import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username,
                password,
            });
            const data = response.data;
            // if (data.user.user_type === "individual") {
            //     data.user["full_name"] = data.user.related_user.first_name + " " + data.user.related_user.last_name;
            // } else {
            //     data.user["full_name"] = data.user.related_user.business_name || data.user.related_user.legal_name;
            // }
            // alert(JSON.stringify(data.user, null, 2));
            if (data.refresh && data.access) {
                // Set tokens and user info in local storage
                localStorage.setItem('refresh_token', data.refresh);
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('user_data', JSON.stringify(data.user));
                setUserId(data.user.id);
                setIsLoggedIn(true);
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.detail || "INVALID USERNAME OR PASSWORD.");
            } else {
                setError("INVALID USERNAME OR PASSWORD.");
            }
        }
    };

    if (isLoggedIn) {
        window.location.href = `/${userId}`;
    }

    return (
        <div className="bg-gray-100 text-gray-800 leading-relaxed">
            <Navbar />
            <section className="flex flex-col items-center justify-center py-24">
                <h2 className="text-4xl font-bold mb-6">Login to Your Account</h2>
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="username">Email</label>
                        <input
                            type="email"
                            id="username"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="border rounded w-full py-2 px-3 text-gray-700"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
                        Login
                    </button>
                    {error && <div className="text-red-600 mt-3">{error}</div>}
                    <div className="mt-4 text-center">
                        <span className="text-gray-700">Don't have an account? </span>
                        <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                    </div>
                </form>
            </section>
            <Footer />
        </div>
    );
};

export default LoginPage;