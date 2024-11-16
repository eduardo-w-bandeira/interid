import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ActionPanel from '@/components/ActionPanel';
import UserProfile from '@/components/UserProfile';
import { getCredentials } from '@/utils/Utils';

const ProfilePage = () => {
    const { userId: thirdId } = useParams();
    const navigate = useNavigate();
    const { isLoggedIn, accessToken, userData } = getCredentials();
    console.log("isLoggedIn", isLoggedIn, "accessToken", accessToken, "userData", userData);
    let thirdData = userData;
    const [Declarations, setDeclarations] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

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