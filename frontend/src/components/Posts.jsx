import React from 'react';

const Posts = ({ 
    userDeclarations, 
    isDeclaring, 
    newDeclaration, 
    handleDeclareClick, 
    handleInputChange, 
    handlePublishDeclaration,
    showMakeDeclarationButton}
) => {
    return (
        <div className="md:w-2/3 p-5 bg-white rounded-lg shadow-lg ml-0 md:ml-5">
            {showMakeDeclarationButton && (<button 
                className="bg-blue-500 text-white py-2 px-4 rounded mb-4" 
                onClick={handleDeclareClick}
            >
                Make a Public Declaration
            </button>)}

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
                {userDeclarations.map(declaration => (
                    <div key={declaration.id} className="bg-gray-50 p-4 rounded-lg mb-5 shadow">
                        <h4 className="font-bold">{declaration.title}</h4>
                        <p>{declaration.body}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;
