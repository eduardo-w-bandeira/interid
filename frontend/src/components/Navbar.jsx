import React from 'react';
import { Link } from 'react-router-dom';
import '@/styles/Navbar.css';

const Navbar = () => {
    return (
        <header>
            <nav className="navbar">
                <div className="logo">
                    <h1>InterId</h1>
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#">Features</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <div className="auth-buttons">
                    <button className="btn login">Login</button>
                    <Link to="/selection_sign_up">
                        <button className="btn signup">Sign Up</button>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
