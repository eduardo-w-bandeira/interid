import React, { useState } from 'react';
import Api from "@/components/Api";

const SearchPanel = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await Api.get(`/search-users-by-name/${searchTerm}/`);
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error searching:", error);
        }
    };

    const handleUserClick = (userId) => {
        window.location.href = `/${userId}`;
    };

    return (
        <div className="md:w-2/3 p-5 bg-white rounded-lg shadow-lg ml-0 md:ml-5">
            <h3 className="text-lg font-semibold mb-3 mt-10">SEARCH</h3>
            <div className="mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Name of the individual or legal entity"
                />
                <button
                    onClick={handleSearch}
                    className="mt-2 p-2 bg-blue-500 text-white rounded"
                >
                    Search
                </button>
            </div>
            <div>
                {users && users.map(user => (
                    <div
                        key={user.id}
                        onClick={() => handleUserClick(user.id)}
                        className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 mb-6 cursor-pointer"
                    >
                        <p>Name: {user.full_name}</p>
                        <p>ID: {user.id}</p>
                        <p>Type: {user.user_type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPanel;
