import React, { useState } from 'react';

const ExclusiveMemberships: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('info');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const membership = {
    name: 'Elite',
    price: '$99.99/month',
    benefits: [
      'VIP event invitations',
      '25% discount on all products',
      'Monthly luxury gift box',
      'Exclusive personal stylist consultation',
    ],
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you can handle the form submission logic
  };

  // Handler to switch to the login tab
  const switchToLogin = () => {
    setActiveTab('signup');
  };

  return (
    <div className="container mx-auto p-8 bg-pink-50 font-sans">
      <h1 className="text-4xl text-pink-600 font-bold text-center mb-8">Exclusive Membership</h1>

      <div className="flex justify-center mb-8 space-x-4">
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'info' ? 'bg-pink-500 text-gray-100' : 'bg-pink-300 text-gray-700'
          } rounded`}
          onClick={() => setActiveTab('info')}
        >
          Membership Info
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'signup' ? 'bg-pink-500 text-gray-100' : 'bg-pink-300 text-gray-700'
          } rounded`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            activeTab === 'login' ? 'bg-pink-500 text-gray-100' : 'bg-pink-300 text-gray-700'
          } rounded`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
      </div>

      {activeTab === 'info' && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-stone-900">
          <h2 className="text-2xl text-pink-600 font-bold mb-4">{membership.name} Membership</h2>
          <p className="text-lg text-pink-500 font-semibold mb-2">{membership.price}</p>
          <ul className="list-disc list-inside text-gray-800">
            {membership.benefits.map((benefit, index) => (
              <li key={index} className="mb-2">{benefit}</li>
            ))}
          </ul>
          <button
            className="mt-4 bg-pink-600 text-gray-100 hover:bg-pink-700 py-2 px-4 rounded"
            onClick={switchToLogin} // Switch to the login tab on click
          >
            Join Now
          </button>
        </div>
      )}

      {activeTab === 'signup' && (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 text-stone-900">
          <h2 className="text-2xl text-pink-600 font-bold mb-4">Sign Up for Exclusive Membership</h2>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-pink-600 font-semibold mb-2">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-pink-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-pink-600 font-semibold mb-2">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-pink-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-pink-600 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-pink-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-pink-600 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-pink-300 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-pink-600 text-gray-100 hover:bg-pink-700 py-2 rounded">
            Sign Up
          </button>
        </form>
      )}

      {activeTab === 'login' && (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 text-stone-900">
          <h2 className="text-2xl text-pink-600 font-bold mb-4">Login to Your Account</h2>
          <div className="mb-4">
            <label htmlFor="loginEmail" className="block text-pink-600 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="loginEmail"
              name="loginEmail"
              required
              className="w-full p-2 border border-pink-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="loginPassword" className="block text-pink-600 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="loginPassword"
              name="loginPassword"
              required
              className="w-full p-2 border border-pink-300 rounded"
            />
          </div>
          <button type="submit" className="w-full bg-pink-600 text-gray-100 hover:bg-pink-700 py-2 rounded">
            Login
          </button>
          <a href="#" className="block text-center mt-4 text-pink-500">Forgot password?</a>
        </form>
      )}
    </div>
  );
};

export default ExclusiveMemberships;
