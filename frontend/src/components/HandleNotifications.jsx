import React, { useState, useEffect } from 'react';

const HandleNotifications = ({ userId, accessToken, onClose }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/get-notifications/${userId}/`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
                const data = await response.json();
                setNotifications(data.notifications);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };

        fetchNotifications();
    }, [userId, accessToken]);

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-1/3 relative">
                <button onClick={onClose} className="absolute top-2 right-2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 text-lg">
                    &times;
                </button>
                <h2 className="text-xl font-bold mb-4">Notifications</h2>
                <ul>
                    {notifications.map((notification, index) => (
                        <li key={index} className={`mb-2 p-2 border rounded ${!notification.is_read ? 'font-bold' : ''} hover:bg-gray-200`}>
                            {notification.body}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HandleNotifications;
