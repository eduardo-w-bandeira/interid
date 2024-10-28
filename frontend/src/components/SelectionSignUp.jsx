import React from 'react';
import { Link } from 'react-router-dom';

import '@/styles/SelectionSignUp.css';

const SelectionSignUp = () => {
    return (
        <div className="SelectionSignUp">
            <h1>Select User Type</h1>
            <div className="options">
                <Link to="/individual-signup">
                    <button className="btn option-btn">Individual</button>
                </Link>
                <Link to="/legal-entity-signup">
                    <button className="btn option-btn">Legal Entity</button>
                </Link>
            </div>
        </div>
    );
};

export default SelectionSignUp;