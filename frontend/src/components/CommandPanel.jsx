import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Api from '@/components/Api';
import DeclarationDialog from './DeclarationDialog';
import ProposalDialog from './ProposalDialog';

const CommandPanel = ({ postAndShowDeclaration, postProposal, setShowNotificationsPanel, setShowSearchPanel, setShowDeclarationsPanel, setShowAgreementsPanel }) => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const [showDeclarationDialog, setShowDeclarationDialog] = useState(false);
    const [showProposalDialog, setShowProposalDialog] = useState(false);
    const [unreadNotifications, setUnreadNotifications] = useState(0);

    useEffect(() => {
        const fetchUnreadNotifications = async () => {
            try {
                const response = await Api.get(`count-unread-notifications/${userData.id}/`);
                setUnreadNotifications(response.data.unread_count);
            } catch (error) {
                console.error('Error fetching unread notifications:', error);
            }
        };

        if (userData) {
            fetchUnreadNotifications();
        }
    });

    return (
        <div className="bg-white rounded-lg shadow-lg p-7 inline-block">
            <div className="flex items-center mb-4">
                <img src="/logo.png" alt="InterId Logo" className="h-8 w-8 mr-2" />
                <span className="font-bold text-gray-800 text-lg">InterId</span>
            </div>
            <nav className="space-y-5">
                {userData && (<button className="flex items-center text-gray-600 hover:text-gray-800" onClick={() => { setShowDeclarationsPanel(true); setShowNotificationsPanel(false); setShowSearchPanel(false); }}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>My Profile</span>
                </button>)}
                <button className="flex items-center text-gray-600 hover:text-gray-800" onClick={() => setShowSearchPanel(true)}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-800" onClick={() => { setShowNotificationsPanel(false); setShowSearchPanel(false); setShowDeclarationsPanel(false); setShowAgreementsPanel(true);}}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>My Agreements</span>
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-800" onClick={() => setShowNotificationsPanel(true)}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <span>Notifications</span>
                    {unreadNotifications > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {unreadNotifications}
                        </span>
                    )}
                </button>
                <button className="flex items-center text-gray-600 hover:text-gray-800" onClick={() => setShowProposalDialog(true)}>
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span>Propose an Agreement</span>
                </button>
                <button
                    id="DeclarationButton"
                    className="flex items-center text-gray-600 hover:text-gray-800"
                    onClick={() => setShowDeclarationDialog(true)}
                >
                    <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Make a Declaration</span>
                </button>
            </nav>
            {showDeclarationDialog && (
                <DeclarationDialog
                    onClose={() => setShowDeclarationDialog(false)}
                    onPublish={postAndShowDeclaration}
                />
            )}
            {showProposalDialog && (
                <ProposalDialog
                    onClose={() => setShowProposalDialog(false)}
                    onSend={postProposal} // Pass postProposal to ProposalDialog
                />
            )}
        </div>
    );
};

export default CommandPanel;
