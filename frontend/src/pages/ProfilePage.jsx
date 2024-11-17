import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActionPanel from '@/components/ActionPanel';
import UserProfile from '@/components/UserProfile';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userId: thirdIdStr } = useParams();
    const [thirdId, setThirdId] = useState(parseInt(thirdIdStr));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));
    const userDataStr = localStorage.getItem('user_data');
    const [userData, setUserData] = useState(userDataStr ? JSON.parse(userDataStr) : null);
    const [thirdData, setThirdData] = useState(null);
    const [Declarations, setDeclarations] = useState(null);

    useEffect(() => {
        if (!accessToken) {
            navigate('/login');
        }
    }, [accessToken, navigate]);  

    useEffect(() => {
        const fetchThirdData = async () => {
            if (accessToken) {
                if (thirdId === userData.id) {
                    setThirdData(userData);
                } else {
                    alert(`thirdId: ${thirdId}, typeof thirdId: ${typeof thirdId}`);
                    try {
                        const response = await axios.get(`http://localhost:8000/api/users/${thirdId}/`, {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        });
                        setThirdData(response.data);
                    } catch (error) {
                        console.error("Error fetching third party data", error);
                    }
                }
            }
        };

        fetchThirdData();
    }, [thirdId, accessToken, userData]);

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
            setDeclarations((prevDeclarations) => [...prevDeclarations, response.data]);
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
                    thirdData={thirdData}
                    userDeclarations={Declarations}
                />
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;