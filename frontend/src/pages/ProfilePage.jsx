import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActionPanel from '@/components/ActionPanel';
import UserProfile from '@/components/UserProfile';

const ProfilePage = () => {
    const { userId } = useParams();
    const userDataStr = localStorage.getItem('user_data');
    let userData = null;
    if (userDataStr) {
        userData = JSON.parse(userDataStr);
    } else {
        console.error("User data not found in local storage");
    }
    const accessToken = localStorage.getItem('access_token');
    const [userDeclarations, setUserDeclarations] = useState([]);

    useEffect(() => {
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

        fetchUserDeclarations();
    }, [userId, accessToken]);

    const postAndShow = async (declarationData) => {
        const completeData = {
            ...declarationData,
            user: userData.id,
        };
        try {
            const response = await axios.post('http://localhost:8000/api/declarations/', completeData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            setUserDeclarations((prevDeclarations) => [...prevDeclarations, response.data]);
        } catch (error) {
            console.error("Error posting declaration", error);
        }
    };

    return (
        <div className="bg-gray-100 text-gray-800 leading-relaxed">
            <Navbar />
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row p-5">
                <ActionPanel 
                    userData={userData}
                    postAndShow={postAndShow}
                />
                <UserProfile 
                    userData={userData}
                    userDeclarations={userDeclarations}
                />
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;