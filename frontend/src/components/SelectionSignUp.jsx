import React from 'react';
import { Link } from 'react-router-dom';

const SelectionSignUp = () => {
    return (
        <div className="max-w-md mx-auto p-5 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl mb-8 text-center text-gray-800">Select User Type</h1> {/* Increased margin-bottom */}
            <div className="mb-6"> {/* Increased margin-bottom */}
                <Link to="/individual-signup">
                    <button className="w-full py-2 border border-blue-600 rounded bg-blue-600 text-white text-lg transition duration-300 ease-in-out hover:bg-blue-700 focus:bg-blue-700 mb-4"> {/* Increased margin-bottom */}
                        Individual
                    </button>
                </Link>
                <Link to="/legal-entity-signup">
                    <button className="w-full py-2 border border-blue-600 rounded bg-blue-600 text-white text-lg transition duration-300 ease-in-out hover:bg-blue-700 focus:bg-blue-700">
                        Legal Entity
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SelectionSignUp;