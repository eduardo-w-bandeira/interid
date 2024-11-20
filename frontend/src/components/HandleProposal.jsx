import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const HandleProposal = ({ onClose, onSend, user, accessToken }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [receiverId, setReceiverId] = useState('');
    const [receiverFullName, setReceiverFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const dialogRef = useRef(null);
    
    const handleSend = () => {
        onSend({ title, body, receiverId });
        onClose();
    };

    const handleClickOutside = (event) => {
        if (dialogRef.current && !dialogRef.current.contains(event.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Debounce the fetch function
        const fetchReceiver = async () => {
            if (receiverId) {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:8000/api/users/${receiverId}/`, {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        },
                    });
                    setReceiverFullName(response.data.full_name);
                } catch (error) {
                    console.error('Error fetching receiver name:', error);
                    setReceiverFullName(''); // Clear the name on error
                } finally {
                    setLoading(false);
                }
            } else {
                setReceiverFullName('');
            }
        };

        const debounceFetch = setTimeout(fetchReceiver, 300); // Debounce for 300ms

        return () => clearTimeout(debounceFetch);
    }, [receiverId, accessToken]);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div ref={dialogRef} className="bg-white p-6 rounded shadow-lg w-1/3 relative">
                <button onClick={onClose} className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 text-lg">
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Propose an Agreement</h2>
                <label className="block mb-2">From: {user.full_name} (ID: {user.id})</label>
                <label className="block mb-2">To:</label>
                <input
                    type="text"
                    placeholder="Receiver ID"
                    value={receiverId || ''}
                    onChange={(e) => setReceiverId(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                {loading ? (
                    <div className="w-full p-2 mb-4 text-gray-600">Loading...</div>
                ) : (
                    <input
                        type="text"
                        value={receiverFullName || ''}
                        readOnly
                        className="w-full p-2 mb-4 border rounded bg-gray-100"
                    />
                )}
                <input
                    type="text"
                    placeholder="Title"
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <textarea
                    placeholder="Body"
                    value={body || ''}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full p-2 mb-4 border rounded"
                />
                <div className="flex justify-end space-x-2">
                    <button onClick={handleSend} className="px-4 py-2 bg-blue-500 text-white rounded">Send Proposal</button>
                    <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default HandleProposal;