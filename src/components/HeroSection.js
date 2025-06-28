import React from 'react';
import { motion } from 'framer-motion';
import { User, Phone, AlertTriangle } from 'lucide-react';

const HeroSection = ({ profileData, onDownloadPDF }) => {
  // Collect all phone numbers from the profile
  const phoneNumbers = [
    profileData?.merchant_info?.mobile_number_registered,
    profileData?.platform_info?.mobile_number_registered,
    profileData?.account_info?.mobile_number_linked
  ].filter(Boolean);
  const uniquePhones = Array.from(new Set(phoneNumbers));
  const severityScore = uniquePhones.length;

  let riskLabel = 'Low Risk';
  let riskColor = 'text-green-600';
  if (severityScore === 2) {
    riskLabel = 'High Risk';
    riskColor = 'text-orange-600';
  } else if (severityScore >= 3) {
    riskLabel = 'Very High Risk';
    riskColor = 'text-red-700';
  }

  return (
    <motion.div 
      className="glass p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ 
        rotateX: 1, 
        rotateY: 1, 
        translateZ: 5,
        transition: { duration: 0.3 }
      }}
    >
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-red-400 to-purple-500 rounded-full opacity-20"
          animate={{ y: [0, -20, 0], rotateZ: [0, 180, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformStyle: 'preserve-3d' }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-20"
          animate={{ y: [0, 15, 0], rotateZ: [0, -180, -360], scale: [1, 0.9, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ transformStyle: 'preserve-3d' }}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-red-700 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-7 h-7 text-red-500" />
            Cyber Crime Perpetrator Profile
          </h1>
          {onDownloadPDF && (
            <button
              className="ml-4 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
              onClick={onDownloadPDF}
            >
              Download PDF
            </button>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="relative mx-auto mb-4"
              animate={{ y: [0, -10, 0], rotateY: [0, 5, 0], rotateX: [0, 2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-32 h-32 mx-auto relative">
                <motion.div
                  className="w-full h-full bg-gradient-to-br from-red-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl"
                  whileHover={{ scale: 1.1, rotateY: 15, rotateX: 5, transition: { duration: 0.3 } }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <User className="w-16 h-16" />
                </motion.div>
              </div>
            </motion.div>
            {/* Name below the icon */}
            <div className="mt-2 text-xl font-bold text-gray-900 text-center">
              {profileData?.account_info?.account_holder_full_name?.trim() ||
               profileData?.merchant_info?.registered_merchant_name?.trim() ||
               'Unknown Name'}
            </div>
          </motion.div>

          {/* Phone Numbers & Severity Score */}
          <motion.div
            className="md:col-span-2 flex flex-col justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="w-full flex flex-col items-center">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-6 h-6 text-blue-500" />
                <span className="text-lg font-semibold text-gray-800">Phone Numbers</span>
              </div>
              <ul className="mb-6 w-full max-w-xs">
                {uniquePhones.length > 0 ? uniquePhones.map((num, idx) => (
                  <li key={idx} className="bg-white/70 rounded-lg px-4 py-2 mb-2 text-center text-gray-700 shadow">
                    {num}
                  </li>
                )) : <li className="text-gray-400">No phone numbers found</li>}
              </ul>
              {/* Address Section (moved here) */}
              {(() => {
                const address =
                  profileData?.platform_info?.registered_address?.trim() ||
                  profileData?.account_info?.registered_address_as_per_kyc?.trim() ||
                  profileData?.merchant_info?.registered_merchant_name?.trim();
                if (address) {
                  return (
                    <div className="mt-2 w-full max-w-xs glass p-4 rounded-xl flex items-center gap-3 shadow">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full">
                        {/* MapPin icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.373-8-10A8 8 0 0112 3a8 8 0 018 8c0 4.627-3.582 10-8 10zm0-7a3 3 0 100-6 3 3 0 000 6z" /></svg>
                      </span>
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase">Address</span>
                        <div className="text-base font-bold text-gray-800 break-words">{address}</div>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
              {/* Severity Section (now last) */}
              <div className="flex items-center gap-3 mt-6">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <span className={`text-lg font-bold ${riskColor}`}>Severity: {riskLabel}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">(Number of unique phone numbers: {severityScore})</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection; 