import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActionPanel from '@/components/ActionPanel';
import UserProfile from '@/components/UserProfile';

const SelfProfilePage = () => {
    const [userDeclarations, setUserDeclarations] = useState([]);
    const [isDeclaring, setIsDeclaring] = useState(false);
    const [newDeclaration, setNewDeclaration] = useState({ title: '', body: '' });
    const userDataStr = localStorage.getItem('user_data');
    let userData = null;
    if (userDataStr) {
        // Parse the string back to an object
        userData = JSON.parse(userDataStr);
        } else {
        console.error("User data not found in local storage");
    };
    const accessToken = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchUserDeclarations = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/declarations/?user=${userData.id}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setUserDeclarations(response.data);
            } catch (error) {
                console.error("Error fetching user declarations", error);
            }
        };

        // fetchUserData();
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
                user: userData.id,
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
                <ActionPanel 
                    userData={userData} 
                    handleDeclareClick={handleDeclareClick} 
                    showMakeDeclarationButton={true} 
                />
                <UserProfile 
                    userDeclarations={userDeclarations}
                    isDeclaring={isDeclaring}
                    newDeclaration={newDeclaration}
                    handleDeclareClick={handleDeclareClick}
                    handleInputChange={handleInputChange}
                    handlePublishDeclaration={handlePublishDeclaration}
                    showMakeDeclarationButton={false}
                    userData={userData}
                />
            </div>
            <Footer />
        </div>
    );
};

export default SelfProfilePage;