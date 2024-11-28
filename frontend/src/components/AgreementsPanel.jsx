import React, { useState, useEffect } from 'react';
import Api from "@/components/Api";

const AgreementsPanel = () => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const [agreements, setAgreements] = useState([]);

    useEffect(() => {
        const fetchAgreements = async () => {
            try {
                const response = await Api.get(`/get-approved-agreements-by-user/${userData.id}/`);
                setAgreements(response.data.agreements);
            } catch (error) {
                console.error("Error fetching agreements:", error);
            }
        };

        fetchAgreements();
    }, [userData]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="md:w-2/3 p-5 bg-white rounded-lg shadow-lg ml-0 md:ml-5">
            <h3 className="text-lg font-semibold mb-3 mt-10">APPROVED AGREEMENTS</h3>
            <div>
                {agreements && agreements.map(agreement => (
                    <div
                        key={agreement.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-200"
                    >
                        <div className="mb-4">
                            <h4 className="text-base font-semibold">Sender</h4>
                            <p>{agreement.sender_full_name} (ID: {agreement.sender_id})</p>
                        </div>
                        <div className="mb-4">
                            <h4 className="text-base font-semibold">Receiver</h4>
                            <p>{agreement.receiver_full_name} (ID: {agreement.receiver_id})</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Title</h3>
                            <p>{agreement.title}</p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Body</h3>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: agreement.body.replace(/\n/g, "<br />"),
                                }}
                            ></p>
                        </div>
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">Status</h3>
                            <p>Approved and in effect at {formatDate(agreement.approved_at)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgreementsPanel;
