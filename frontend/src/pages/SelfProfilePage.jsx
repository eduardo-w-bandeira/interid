import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileLeftPanel from '@/components/ProfileLeftPanel';

const SelfProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [userDeclarations, setUserDeclarations] = useState([]);
    const [isDeclaring, setIsDeclaring] = useState(false);
    const [newDeclaration, setNewDeclaration] = useState({ title: '', body: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('user_id');
            const userType = localStorage.getItem('user_type');
            const accessToken = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`http://localhost:8000/api/${userType}s/${userId}/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        const fetchUserDeclarations = async () => {
            const userId = localStorage.getItem('user_id');
            const accessToken = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`http://localhost:8000/api/declarations/?user=${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setUserDeclarations(response.data);
            } catch (error) {
                console.error("Error fetching user declarations", error);
            }
        };

        fetchUserData();
        fetchUserDeclarations();
    }, []);

    const handleDeclareClick = () => {
        setIsDeclaring(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDeclaration(prev => ({ ...prev, [name]: value }));
    };

    const handlePublishDeclaration = async () => {
        const userId = localStorage.getItem('user_id');
        try {
            const response = await axios.post('http://localhost:8000/api/declarations/', {
                ...newDeclaration,
                user: userId,
            });
            setUserDeclarations(prev => [...prev, response.data]);
            setNewDeclaration({ title: '', body: '' });
            setIsDeclaring(false);
        } catch (error) {
            console.error("Error publishing declaration", error);
        }
    };

    return (
        <div className="bg-gray-100 text-gray-800 leading-relaxed">
            <Navbar />
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row p-5">
                <ProfileLeftPanel />
                <div className="md:w-2/3 p-5 bg-white rounded-lg shadow-lg ml-0 md:ml-5">
                    <button 
                        className="bg-blue-500 text-white py-2 px-4 rounded mb-4" 
                        onClick={handleDeclareClick}
                    >
                        Make a Public Declaration
                    </button>

                    {isDeclaring && (
                        <div className="mb-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={newDeclaration.title}
                                onChange={handleInputChange}
                                className="border rounded w-full p-2 mb-2"
                            />
                            <textarea
                                name="body"
                                placeholder="Body"
                                value={newDeclaration.body}
                                onChange={handleInputChange}
                                className="border rounded w-full p-2 mb-2"
                                rows="4"
                            />
                            <button 
                                className="bg-green-500 text-white py-2 px-4 rounded" 
                                onClick={handlePublishDeclaration}
                            >
                                Publish Declaration
                            </button>
                        </div>
                    )}

                    <h3 className="text-lg font-semibold mb-3">Your Declarations</h3>
                    <div>
                        {userDeclarations.map(declaration => (
                            <div key={declaration.id} className="bg-gray-50 p-4 rounded-lg mb-5 shadow">
                                <h4 className="font-bold">{declaration.title}</h4>
                                <p>{declaration.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SelfProfilePage;