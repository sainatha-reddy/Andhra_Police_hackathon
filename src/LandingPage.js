import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center font-sans pt-12">
      {/* Hero Section */}
      <div className="w-full max-w-3xl mx-auto text-center px-6">
        <img
          src="/Police_logo.png"
          alt="Police Logo"
          className="h-72 w-auto mx-auto -mb-180"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-700 mb-2 tracking-tight drop-shadow-lg">Combat Cyber Threats — <span className="text-blue-700">Report. Investigate. Prevent.</span></h1>
        <p className="text-lg md:text-xl text-gray-700 mb-8">Empowering law enforcement to fight cyber crime with intelligence, technology, and secure collaboration.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">

          <button
            onClick={() => navigate('/dashboard')}
            className="inline-block px-8 py-4 rounded-xl bg-white hover:bg-gray-100 text-blue-700 font-bold text-lg shadow transition border border-blue-700"
          >
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate('/intermediate')}
            className="inline-block px-8 py-4 rounded-xl bg-white hover:bg-gray-100 text-green-700 font-bold text-lg shadow transition border border-green-700"
          >
            Go to Intermediate Page
          </button>
        </div>
      </div>

      {/* Security Badges & Info */}
      <div className="flex flex-wrap justify-center gap-8 mt-12 mb-4">
        <div className="flex flex-col items-center">
          <Lock className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-gray-700 font-semibold">SSL Secured</span>
        </div>
        <div className="flex flex-col items-center">
          <ShieldCheck className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-gray-700 font-semibold">Data Encryption</span>
        </div>
        <div className="flex flex-col items-center">
          <Lock className="w-8 h-8 text-blue-600 mb-2" />
          <span className="text-gray-700 font-semibold">Privacy Policy</span>
        </div>
      </div>
      <footer className="text-center text-gray-400 text-xs py-4">© {new Date().getFullYear()} Police Cyber Crime Intelligence Portal. All rights reserved.</footer>
    </div>
  );
};

export default LandingPage; 