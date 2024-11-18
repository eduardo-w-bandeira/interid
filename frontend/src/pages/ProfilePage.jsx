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
            if (thirdId === userData.id) {
                setThirdData(userData);
            } else {
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
        };

        const fetchDeclarations = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/declarations/?user=${thirdId}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setDeclarations(response.data);
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        if (accessToken) {
            fetchThirdData();
            fetchDeclarations();
        };
    }, [thirdId, accessToken, userData]);

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/token-refresh/', {
                refresh: refreshToken,
            });
            const newAccessToken = response.data.access;
            setAccessToken(newAccessToken);
            localStorage.setItem('access_token', newAccessToken);
        } catch (error) {
            console.error("Error refreshing token", error);
            navigate('/login'); // Redirect to login if refresh fails
        }
    };

    // Axios interceptor for handling token refresh
    axios.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                await refreshAccessToken(); // Refresh the token
                return axios(originalRequest); // Retry the original request
            }
            return Promise.reject(error);
        }
    );


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
            if (thirdId !== userData.id) {
                navigate(`/${userData.id}`);
            }
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
                    Declarations={Declarations}
                />
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;