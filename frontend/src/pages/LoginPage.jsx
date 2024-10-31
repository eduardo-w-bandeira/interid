import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LoginPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 leading-relaxed">
      <Navbar />
      <section className="flex flex-col items-center justify-center py-24">
        <h2 className="text-4xl font-bold mb-6">Login to Your Account</h2>
        <form className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="border rounded w-full py-2 px-3 text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-600">
          Don't have an account? <a href="/signup" className="text-blue-500">Sign Up</a>
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default LoginPage;