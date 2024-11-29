import React, { useState } from 'react';
import Api from './Api';

const LegalEntitySignupForm = () => {
    const userType = 'legal entity';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [legalName, setLegalName] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [regDate, setRegDate] = useState('');
    const [govId, setGovId] = useState('');
    const [govIdType, setGovIdType] = useState("Business Number");
    const [issuingAuthority, setIssuingAuthority] = useState('');
    const [country, setCountry] = useState('Canada');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            user_type: userType,
            email: email,
            password: password,
            legal_name: legalName,
            business_name: businessName,
            reg_date: regDate,
            gov_id: govId,
            gov_id_type: govIdType,
            issuing_authority: issuingAuthority,
            country: country
        };
        Api.post('legal-entitys/', data)
            .then((response) => {
                window.location.href = '/login';
            })
            .catch((error) => {
                alert(JSON.stringify(error.response.data));
            });
    };

    return (
        <div className="bg-gray-100">
            <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl mb-6 text-center text-gray-800">Legal Entity Sign Up</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1 font-bold text-gray-700">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block mb-1 font-bold text-gray-700">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="legalName" className="block mb-1 font-bold text-gray-700">Legal Name:</label>
                            <input
                                type="text"
                                id="legalName"
                                value={legalName}
                                onChange={(event) => setLegalName(event.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="BusinessName" className="block mb-1 font-bold text-gray-700">Business Name:</label>
                            <input
                                type="text"
                                id="BusinessName"
                                value={businessName}
                                onChange={(event) => setBusinessName(event.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="RegDate" className="block mb-1 font-bold text-gray-700">Registration Date:</label>
                            <input
                                type="date"
                                id="RegDate"
                                value={regDate}
                                onChange={(event) => setRegDate(event.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="govId" className="block mb-1 font-bold text-gray-700">Government ID:</label>
                            <input
                                type="text"
                                id="govId"
                                value={govId}
                                onChange={(event) => setGovId(event.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="govIdType" className="block mb-1 font-bold text-gray-700">Government ID Type:</label>
                            <select
                                id="govIdType"
                                value={govIdType}
                                onChange={(event) => setGovIdType(event.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none">
                                <option value="business number">Business Number</option>
                                <option value="state registration number">State Registration Number</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="issuingAuthority" className="block mb-1 font-bold text-gray-700">Issuing Authority:</label>
                            <input
                                type="text"
                                id="issuingAuthority"
                                value={issuingAuthority}
                                onChange={(event) => setIssuingAuthority(event.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="country" className="block mb-1 font-bold text-gray-700">Country:</label>
                            <select
                                id="country"
                                value={country}
                                onChange={(event) => setCountry(event.target.value)}
                                required
                                className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none">
                                <option value="Canada">Canada</option>
                                <option value="USA">USA</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LegalEntitySignupForm;