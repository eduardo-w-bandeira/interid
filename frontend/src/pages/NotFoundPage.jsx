import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow flex flex-col items-center justify-center text-center">
                <h1 className="text-4xl font-bold mb-4">404: Page Not Found</h1>
                <p className="text-lg">Sorry, the page you're looking for doesn't exist.</p>
            </div>
            <Footer />
        </div>
    );
};

export default NotFoundPage;