import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

const SignupPage = () => {
return (
    <div className="bg-gray-100 text-gray-800 leading-relaxed min-h-screen flex flex-col">
        <Navbar />
        <section className="flex flex-col items-center justify-center flex-grow py-24">
            <h2 className="text-4xl font-bold mb-6">Create Your Account</h2>
            <p className="mb-10 text-lg text-gray-600">Choose your account type to get started:</p>
            <div className="flex flex-col space-y-4">
                <Link to="/individual-signup">
                    <button className="bg-blue-500 text-white py-3 px-6 rounded shadow-md w-64 hover:bg-blue-600 transition duration-200">
                        Sign Up as Individual
                    </button>
                </Link>
                <Link to="/legal-entity-signup">
                    <button className="bg-orange-500 text-white py-3 px-6 rounded shadow-md w-64 hover:bg-orange-600 transition duration-200">
                        Sign Up as a Legal Entity
                    </button>
                </Link>
            </div>
        </section>
        <Footer />
    </div>
);
};

export default SignupPage;