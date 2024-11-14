import React from 'react';
import userImage from '@/assets/generic-user.png';

const UserProfile = ({ 
    userDeclarations, 
    isDeclaring, 
    newDeclaration, 
    handleDeclareClick, 
    handleInputChange, 
    handlePublishDeclaration,
    showMakeDeclarationButton,
    userData
}) => {
    const relatedUser = userData.related_user;
    let fullName;
    if (userData.user_type === "individual") {
        fullName = `${relatedUser.first_name} ${relatedUser.last_name}`;
    } else {
        fullName = `${relatedUser.business_name}`;
    }
    const reversedDeclarations = [...userDeclarations].reverse();
    return (
        <div className="md:w-2/3 p-5 bg-white rounded-lg shadow-lg ml-0 md:ml-5">
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
            {isDeclaring && (
                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={newDeclaration.title}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2 mb-2"
                    />
                    <textarea
                        name="body"
                        placeholder="Body"
                        value={newDeclaration.body}
                        onChange={handleInputChange}
                        className="border rounded w-full p-2 mb-2"
                        rows="4"
                    />
                    <button 
                        className="bg-green-500 text-white py-2 px-4 rounded" 
                        onClick={handlePublishDeclaration}
                    >
                        Publish Declaration
                    </button>
                </div>
            )}

            <h3 className="text-lg font-semibold mb-3">Your Declarations</h3>
            <div>
                {reversedDeclarations.map(declaration => (
                    <div key={declaration.id} className="bg-gray-50 p-4 rounded-lg mb-5 shadow">
                        <h4 className="font-bold">{declaration.title}</h4>
                        <p>{declaration.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfile;
