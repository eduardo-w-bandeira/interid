import React from 'react';

const ActionPanel = ({ userData, handleDeclareClick, showMakeDeclarationButton }) => {
    const relatedUser = userData.related_user;
    return (
        <div className="md:w-1/4 p-5 bg-white rounded-lg shadow-lg">
            {relatedUser && (
                <>
                    {showMakeDeclarationButton && (
                        <button 
                            className="bg-blue-500 text-white py-2 px-4 rounded mb-4" 
                            onClick={handleDeclareClick}
                        >
                            Make a Public Declaration
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default ActionPanel;
