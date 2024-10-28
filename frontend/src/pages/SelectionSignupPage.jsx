import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SelectionSignup from '@/components/SelectionSignup';

const SelectionSignupPage = () => {
    return (
        <div>
            <Navbar />
            <SelectionSignup />
            <Footer />
        </div>
    );
};

export default SelectionSignupPage;