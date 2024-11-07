import React from 'react';
import userImage from '@/assets/generic-user.png';

const UserProfile = ({ userData }) => {
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

export default UserProfile;
