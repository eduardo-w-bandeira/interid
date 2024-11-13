import React from 'react';
import userImage from '@/assets/generic-user.png';

const UserProfile = ({ userData }) => {
    const relatedUser = userData.related_user;
    let fullName;
    if (userData.user_type === "individual") {
        fullName = `${relatedUser.first_name} ${relatedUser.last_name}`;
    } else {
        fullName = `${relatedUser.business_name}`;
    }
    return (
        <div className="md:w-1/3 p-5 bg-white rounded-lg shadow-lg">
            {relatedUser && (
                <>
                    <img
                        src={userImage}
                        alt="User Profile"
                        className="rounded-full mb-4 w-32 object-cover"
                    />
                    <h2 className="text-xl font-bold">{fullName}</h2>
                    <p className="text-gray-600">ID: {userData.id}</p>
                </>
            )}
        </div>
    );
};

export default UserProfile;
