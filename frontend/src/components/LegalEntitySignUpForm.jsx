import React, { useState } from 'react';
import axios from 'axios';
import "@/styles/LegalEntitySignUpForm.module.css";

const IndividualSignUpForm = () => {
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
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            birth_date: birthDate,
            gov_id: govId,
            gov_id_type: govIdType,
            issuing_authority: issuingAuthority,
            country: country
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
        <div className="SignUpForm">
            <form onSubmit={handleSubmit}>
                <h1>Legal Entity Sign Up</h1>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthDate">Birth Date:</label>
                    <input
                        type="date"
                        id="birthDate"
                        value={birthDate}
                        onChange={(event) => setBirthDate(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="govId">Government ID:</label>
                    <input
                        type="text"
                        id="govId"
                        value={govId}
                        onChange={(event) => setGovId(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="govIdType">Government ID Type:</label>
                    <select
                        id="govIdType"
                        value={govIdType}
                        onChange={(event) => setGovIdType(event.target.value)}
                        required
                    >
                        <option value="driver's license">Driver's License</option>
                        <option value="provincial id">Provincial ID</option>
                        <option value="state id">State ID</option>
                        <option value="passport">Passport</option>
                        {/* Add more government ID types as needed */}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="issuingAuthority">Issuing Authority:</label>
                    <input
                        type="text"
                        id="issuingAuthority"
                        value={issuingAuthority}
                        onChange={(event) => setIssuingAuthority(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="country">Country:</label>
                    <select
                        id="country"
                        value={country}
                        onChange={(event) => setCountry(event.target.value)}
                        required
                    >
                        <option value="Canada">Canada</option>
                        <option value="USA">USA</option>
                        {/* Add more countries as needed */}
                    </select>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default IndividualSignUpForm;