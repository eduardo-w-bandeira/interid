import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SelectionSignUp from '../components/SelectionSignUp';

import '@/styles/Global.css';

const SelectionSignUpPage = () => {
    return (
        <div className="SelectionSignUpPage">
            <Navbar />
            <SelectionSignUp />
            <Footer />
        </div>
    );
};

export default SelectionSignUpPage;