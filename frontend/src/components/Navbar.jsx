import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const user_data = JSON.parse(localStorage.getItem('user_data'));
    const isLoggedIn = user_data !== null;

    const handleSignOut = () => {
        localStorage.removeItem('user_data');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
    };

    return (
        <header>
            <nav className="flex justify-between items-center p-5 bg-gray-950 text-lg">
                <div className="logo">
                    <h1 className="text-white text-2xl">InterId</h1>
                </div>
                <ul className="flex space-x-6 list-none">
                    <li><Link to="/" className="text-white no-underline">Home</Link></li>
                    <li><a href="#" className="text-white no-underline">Features</a></li>
                    <li><a href="#" className="text-white no-underline">About</a></li>
                    <li><a href="#" className="text-white no-underline">Contact</a></li>
                </ul>
                <div className="flex items-center">
                    {isLoggedIn ? (
                        <>
                            <span className="text-white mr-2">{user_data.full_name}</span>
                            <button onClick={handleSignOut} className="text-gray-400 hover:text-white py-2 px-4 cursor-pointer">(sign out)</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><button className="bg-blue-500 text-white py-2 px-4 rounded mr-2 cursor-pointer">Login</button></Link>
                            <Link to="/signup">
                                <button className="bg-orange-500 text-white py-2 px-4 rounded cursor-pointer">(Sign Up</button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;