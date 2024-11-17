import React, { useState } from 'react';

const MakeADeclaration = ({ onClose, onPublish }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handlePublish = () => {
        onPublish({ title, body });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
                <button onClick={onClose} className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 text-lg">
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Make a Declaration</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={handlePublish} className="px-4 py-2 bg-blue-500 text-white rounded">Publish Declaration</button>
                    <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default MakeADeclaration;