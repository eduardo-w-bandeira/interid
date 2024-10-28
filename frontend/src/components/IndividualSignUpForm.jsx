import React, { useState } from 'react';
import axios from 'axios';

const IndividualSignupForm = () => {
    const userType = 'individual';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [govId, setGovId] = useState('');
    const [govIdType, setGovIdType] = useState("driver's license");
    const [issuingAuthority, setIssuingAuthority] = useState('');
    const [country, setCountry] = useState('Canada');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            user_type: userType,
            email,
            password,
            first_name: firstName,
            last_name: lastName,
            birth_date: birthDate,
            gov_id: govId,
            gov_id_type: govIdType,
            issuing_authority: issuingAuthority,
            country
        };
        axios.post('http://localhost:8000/api/individuals/', data)
            .then((response) => {
                alert(JSON.stringify(response.data));
            })
            .catch((error) => {
                alert(JSON.stringify(error.response.data));
            });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                <h1 className="text-2xl mb-6 text-center text-gray-800">Individual Sign Up</h1>
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
                    <label htmlFor="firstName" className="block mb-1 font-bold text-gray-700">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="lastName" className="block mb-1 font-bold text-gray-700">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="birthDate" className="block mb-1 font-bold text-gray-700">Birth Date:</label>
                    <input
                        type="date"
                        id="birthDate"
                        value={birthDate}
                        onChange={(event) => setBirthDate(event.target.value)}
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
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    >
                        <option value="driver's license">Driver's License</option>
                        <option value="provincial id">Provincial ID</option>
                        <option value="state id">State ID</option>
                        <option value="passport">Passport</option>
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
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                    >
                        <option value="Canada">Canada</option>
                        <option value="USA">USA</option>
                    </select>
                </div>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default IndividualSignupForm;