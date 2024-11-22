import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewProposal = ({ proposalId, accessToken, onClose }) => {
    const [proposal, setProposal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProposal = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/agreements/${proposalId}/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                setProposal(response.data);
            } catch (error) {
                console.error('Error fetching proposal:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProposal();
    }, [proposalId, accessToken]);

    const handleDecision = async (hasApproved) => {
        try {
            const data = {
                "has_approved": hasApproved
            }
            await axios.post(`http://localhost:8000/api/update-agreement-decision/${proposalId}/`, data, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            onClose();
        } catch (error) {
            console.error('Error approving proposal:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
                <button onClick={onClose} className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 text-lg">
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Review Agreement Proposal #{proposal.id}</h2>
                <div className="mb-4">
                    <h4 className="text-base font-semibold">Sender</h4>
                    <p>{proposal.sender_full_name} (ID: {proposal.sender_id})</p>
                </div>
                <div className="mb-4">
                    <h4 className="text-base font-semibold">Receiver</h4>
                    <p>{proposal.receiver_full_name} (ID: {proposal.receiver_id})</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Title</h3>
                    <p>{proposal.title}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Body</h3>
                    <p>{proposal.body}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Status</h3>
                    <p>
                        {proposal.has_approved === null && "Pending of decision"}
                        {proposal.has_approved === true && "Approved and in effect"}
                        {proposal.has_approved === false && "Rejected"}
                    </p>
                </div>
                <div className="flex justify-end space-x-2">
                    {proposal.has_approved === null && (
                        <>
                            <button onClick={() => handleDecision(true)} className="px-4 py-2 bg-green-500 text-white rounded">Approve</button>
                            <button onClick={() => handleDecision(false)} className="px-4 py-2 bg-red-500 text-white rounded">Reject</button>
                        </>
                    )}
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">Dismiss</button>
                </div>
            </div>
        </div>
    );
};

export default ReviewProposal;
