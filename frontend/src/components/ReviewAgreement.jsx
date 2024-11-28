import React, { useState, useEffect } from "react";
import Api from "@/components/Api";

const ReviewAgreement = ({ agreementId, onClose, userId }) => {
  const [agreement, setAgreement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasApproved, setHasApproved] = useState("");

  useEffect(() => {
    const fetchAgreement = async () => {
      try {
        const response = await Api.get(`/agreements/${agreementId}/`);
        setAgreement(response.data);
        setHasApproved(response.data.has_approved);
      } catch (error) {
        console.error("Error fetching agreement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgreement();
  }, [agreementId]);

  const handleDecision = async (hasApprovedArg) => {
    try {
      const data = {
        has_approved: hasApprovedArg,
      };
      await Api.post(`/update-agreement-decision/${agreementId}/`, data);
      setHasApproved(hasApprovedArg);
    } catch (error) {
      console.error("Error approving agreement:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 text-lg"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">
          Review Agreement Proposal #{agreement.id}
        </h2>
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
          <p>
            {hasApproved === null && "Pending of decision"}
            {hasApproved === true && "Approved and in effect"}
            {hasApproved === false && "Rejected"}
          </p>
        </div>
        <div className="flex justify-end space-x-2">
          {hasApproved === null && agreement.sender_id !== userId && (
            <>
              <button
                onClick={() => handleDecision(true)}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Approve
              </button>
              <button
                onClick={() => handleDecision(false)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Reject
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAgreement;
