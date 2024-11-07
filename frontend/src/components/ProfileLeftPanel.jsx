import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userImage from '@/assets/generic-user.png';

const ProfileLeftPanel = () => {
    const [userData, setUserData] = useState(null);

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
                alert("Error fetching user data", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="md:w-1/3 p-5 bg-white rounded-lg shadow-lg">
            {userData && (
                <>
                    <img
                        src={userImage}
                        alt="User Profile"
                        className="rounded-full mb-4 w-32 object-cover"
                    />
                    <h2 className="text-xl font-bold">{userData.first_name} {userData.last_name}</h2>
                    <p className="text-gray-600">ID: {userData.user}</p>
                </>
            )}
        </div>
    );
};

export default ProfileLeftPanel;