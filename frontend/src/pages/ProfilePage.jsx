import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Api from '@/components/Api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CommandPanel from '@/components/CommandPanel';
import DeclarationsPanel from '@/components/DeclarationsPanel';

const ProfilePage = () => {
    const navigate = useNavigate();
    const { userId: thirdIdStr } = useParams();
    const [thirdId, setThirdId] = useState(parseInt(thirdIdStr));
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user_data')));
    const [thirdData, setThirdData] = useState(null);
    const [declarations, setDeclarations] = useState(null);

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
                    const response = await Api.get(`users/${thirdId}/`);
                    setThirdData(response.data);
                } catch (error) {
                    console.error("Error fetching third party data", error);
                }
            }
        };

        const fetchDeclarations = async () => {
            try {
                const response = await Api.get(`declarations/?user=${thirdId}`);
                setDeclarations(response.data);
            } catch (error) {
                console.error("Error fetching user declarations", error);
            }
        };

        if (accessToken && userData) {
            fetchThirdData();
            fetchDeclarations();
        }
    }, [thirdId, accessToken, userData]);

    const postAndShowDeclaration = async (declarationData) => {
        const completeData = {
            ...declarationData,
            user: userData.id,
        };
        try {
            const response = await Api.post('declarations/', completeData);
            if (thirdId !== userData.id) {
                navigate(`/${userData.id}`);
            }
            setDeclarations((prevDeclarations) => [...prevDeclarations, response.data]);
        } catch (error) {
            console.error("Error posting declaration", error);
        }
    };

    const postProposal = async (proposalData) => {
        try {
            const response = await Api.post('agreements/', proposalData);
        } catch (err) {
            console.error("Error posting proposal", err);
        }
    };

    return (
        <div className="bg-gray-100 text-gray-800 leading-relaxed">
            <Navbar />
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row p-5">
                <CommandPanel
                    userData={userData}
                    postAndShowDeclaration={postAndShowDeclaration}
                    accessToken={accessToken} // Pass accessToken as a prop
                    postProposal={postProposal} // Pass postProposal as a prop
                />
                <DeclarationsPanel
                    userData={thirdData}
                    declarations={declarations}
                />
            </div>
            <Footer />
        </div>
    );
};

export default ProfilePage;
