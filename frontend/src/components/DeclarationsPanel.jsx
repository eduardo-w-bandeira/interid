import React, { useState, useEffect } from 'react';
import userImage from '@/assets/generic-user.png';

const DeclarationsPanel = ({ userData, declarations }) => {

    return (
        <div className="md:w-2/3 p-5 bg-white rounded-lg shadow-lg ml-0 md:ml-5">
            {userData && (
                <div className="flex items-center mb-4">
                    <img
                        src={userImage}
                        alt="User Profile"
                        className="rounded-full w-32 object-cover mr-4"
                    />
                    <div>
                        <h2 className="text-xl font-bold">{userData.full_name}</h2>
                        <p className="text-gray-600">ID: {userData.id}</p>
                    </div>
                </div>
            )}
            <h3 className="text-lg font-semibold mb-3 mt-10">PUBLIC DECLARATIONS</h3>
            <div>
                {declarations && declarations.map(declaration => (
                    <div
                        key={declaration.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="flex justify-between items-center pb-1 mb-2">
                            <h4 className="text-lg font-semibold text-gray-800">{declaration.title}</h4>
                            <p className="text-xs text-gray-500">{new Date(declaration.created_at).toLocaleString()}</p>
                        </div>
                        <p className="text-gray-700 text leading-relaxed" dangerouslySetInnerHTML={{
                            __html: declaration.body.replace(/\n/g, "<br />"),
                        }}
                        ></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeclarationsPanel;
