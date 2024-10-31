import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProfilePage = () => {
  const userDeclarations = [
    { id: 1, title: 'My First Declaration', body: 'This is my first public declaration! \nWait for me, world!' },
    { id: 2, title: 'My Second Declaration', body: 'I love using InterId for my formal actions.' },
    { id: 3, title: 'My Third Declaration', body: 'Just completed a public declaration!' },
  ];

return (
    <div className="bg-gray-100 text-gray-800 leading-relaxed">
        <Navbar />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row p-5">
            <div className="md:w-1/3 p-5 bg-white rounded-lg shadow-lg">
                <img 
                    src="https://via.placeholder.com/150" 
                    alt="User Profile" 
                    className="rounded-full mb-4" 
                />
                <h2 className="text-xl font-bold">User Name</h2>
                <p className="text-gray-600">ID: 123456789</p>
            </div>
            <div className="md:w-2/3 p-5 bg-white rounded-lg shadow-lg ml-0 md:ml-5">
                <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
                    Make a Public Declaration
                </button>
                <h3 className="text-lg font-semibold mb-3">Your Declarations</h3>
                <div>
                    {userDeclarations.map(declaration => (
                        <div key={declaration.id} className="bg-gray-50 p-4 rounded-lg mb-5 shadow">
                            <h4 className="font-bold">{declaration.title}</h4>
                            <p>{declaration.body}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <Footer />
    </div>
);
};

export default ProfilePage;