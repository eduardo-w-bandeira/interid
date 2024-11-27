import React, { useState, useEffect } from 'react';
import Api from "@/components/Api"; // Import the configured Axios instance
import ReviewProposal from "./ReviewProposal"; // Import ReviewProposal

const NotificationsPanel = () => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const [notifications, setNotifications] = useState([]);
    const [selectedProposalId, setSelectedProposalId] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await Api.get(`/get-notifications/${userData.id}/`);
                setNotifications(response.data.notifications);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, [userData]);

    const handleNotificationClick = async (notification) => {
        if (!notification.is_read) {
            try {
                await Api.post(`/mark-notification-as-read/${notification.id}/`);
                setNotifications((prevNotifications) =>
                    prevNotifications.map((n) =>
                        n.id === notification.id ? { ...n, is_read: true } : n
                    )
                );
            } catch (error) {
                console.error("Error marking notification as read:", error);
            }
        }

        if (notification.type === "proposal" || notification.type === "agreement decision") {
            setSelectedProposalId(notification.agreement);
        }
    };

    return (
        <div className="md:w-2/3 p-5 bg-white rounded-lg shadow-lg ml-0 md:ml-5">
            <h3 className="text-lg font-semibold mb-3 mt-10">NOTIFICATIONS</h3>
            <div>
                {notifications && notifications.map(notification => (
                    <div
                        key={notification.id}
                        className={`bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 mb-6 hover:shadow-lg transition-shadow duration-200 ${!notification.is_read ? "font-bold" : ""}`}
                    >
                        <div className="flex justify-between items-center pb-1 mb-2">
                            <button
                                className="w-full text-left"
                                onClick={() => handleNotificationClick(notification)}
                            >
                                {notification.body}
                            </button>
                            <p className="text-xs text-gray-500">{new Date(notification.created_at).toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedProposalId && (
                <ReviewProposal
                    proposalId={selectedProposalId}
                    onClose={() => setSelectedProposalId(null)}
                    userId={userData.id}
                />
            )}
        </div>
    );
};

export default NotificationsPanel;
