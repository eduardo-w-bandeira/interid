import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserProfile from '@/components/UserProfile';
import Posts from '@/components/Posts'; // Import the new Posts component

const SelfProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const [userDeclarations, setUserDeclarations] = useState([]);
    const [isDeclaring, setIsDeclaring] = useState(false);
    const [newDeclaration, setNewDeclaration] = useState({ title: '', body: '' });
    const userId = localStorage.getItem('user_id');
    const userType = localStorage.getItem('user_type');
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchUserData = async () => {
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
        try {
            const response = await axios.post('http://localhost:8000/api/declarations/', {
                ...newDeclaration,
                user: userId,
            }, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
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
                <UserProfile userData={userData} />
                <Posts 
                    userDeclarations={userDeclarations}
                    isDeclaring={isDeclaring}
                    newDeclaration={newDeclaration}
                    handleDeclareClick={handleDeclareClick}
                    handleInputChange={handleInputChange}
                    handlePublishDeclaration={handlePublishDeclaration}
                    showMakeDeclarationButton={true}
                />
            </div>
            <Footer />
        </div>
    );
};

export default SelfProfilePage;