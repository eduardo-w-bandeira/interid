import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/NotFound.module.css';


const NotFoundPage = () => {

    return (
        <div className="not-found-page">
            <Navbar />
            <h1>404: Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <Footer />
        </div>
    );
};

export default NotFoundPage;