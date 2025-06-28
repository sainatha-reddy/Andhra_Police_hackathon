import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './HeroSection';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

const ProfileContainer = styled(motion.div)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const ContentArea = styled(motion.div)`
  margin-top: 20px;
`;

const ProfileGrid = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 2rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: thin;
  scrollbar-color: #667eea #e0e7ff;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #e0e7ff;
  }
`;

const profileCardGradients = [
  'linear-gradient(135deg, #f5d0fe 0%, #c7d2fe 100%)', // pink-purple
  'linear-gradient(135deg, #bbf7d0 0%, #a5b4fc 100%)', // green-blue
  'linear-gradient(135deg, #fef9c3 0%, #fca5a5 100%)', // yellow-red
  'linear-gradient(135deg, #bae6fd 0%, #f0abfc 100%)', // blue-pink
];

const ProfileCard = styled(motion.div)`
  min-width: 320px;
  max-width: 340px;
  flex: 0 0 320px;
  background: rgba(255, 255, 255, 0.95);
  color: #9f1239; /* Deeper rose for visibility */
  border-radius: 20px;
  padding: 1.5rem;
  border: none;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(16px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  }

  &.selected {
    box-shadow: 0 0 20px rgba(190, 24, 93, 0.4);
    outline: 2px solid #be185d;
  }

  &::before {
    content: "";
    position: absolute;
    width: 140px;
    height: 140px;
    background: radial-gradient(circle at center, #e879f9 0%, #8b5cf6 100%);
    border-radius: 50%;
    top: -40px;
    right: -40px;
    opacity: 0.15;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px;
    background: radial-gradient(circle at center, #fca5a5 0%, #f59e0b 100%);
    border-radius: 50%;
    bottom: -30px;
    left: -30px;
    opacity: 0.1;
    pointer-events: none;
  }

  h1, h2, h3, .heading {
    color: #dc2626; /* Vibrant red-pink for headings */
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ProfileId = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-weight: bold;
  font-size: 0.8rem;
  align-self: flex-start;
`;

const ProfileName = styled.h3`
  color: black;
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
`;

const ProfileInfo = styled.div`
  color: black;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  
  div {
    margin-bottom: 0.3rem;
  }
`;

const StatusDots = styled.div`
  display: flex;
  gap: 0.3rem;
  margin-top: auto;
  justify-content: center;
`;

const StatusDot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => {
    if (props.sent && props.reply) return '#10b981'; // green
    if (props.sent && !props.reply) return '#f59e0b'; // orange
    return '#ef4444'; // red
  }};
`;

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('dot');
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // New tabs for DOT, BANK, META, PAYMENT
  const tabs = [
    { id: 'dot', label: 'DOT' },
    { id: 'bank', label: 'BANK' },
    { id: 'meta', label: 'META' },
    { id: 'payment', label: 'PAYMENT' }
  ];

  useEffect(() => {
    const fetchAllProfiles = async () => {
      try {
        const profileFiles = [
          '/scammer_profile.json',
          '/scammer_profile_2.json',
          '/scammer_profile_3.json',
          '/scammer_profile_4.json'
        ];

        const profilePromises = profileFiles.map(file => 
          fetch(file).then(response => response.json())
        );

        const profileData = await Promise.all(profilePromises);
        setProfiles(profileData);
        setSelectedProfile(profileData[0]); // Select first profile by default
        setLoading(false);
      } catch (error) {
        console.error('Error loading profile data:', error);
        setLoading(false);
      }
    };

    fetchAllProfiles();
  }, []);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setActiveTab('dot'); // Reset to first tab when switching profiles
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Helper to get section data for each tab
  const getSectionData = (tab) => {
    if (!selectedProfile) return null;
    switch (tab) {
      case 'dot':
        return {
          sent: selectedProfile.sent_to_dot,
          info: selectedProfile.platform_info
        };
      case 'bank':
        return {
          sent: selectedProfile.sent_to_bank,
          info: selectedProfile.merchant_info
        };
      case 'meta':
        return {
          sent: selectedProfile.sent_to_meta,
          info: selectedProfile.platform_info
        };
      case 'payment':
        return {
          sent: selectedProfile.sent_to_payment,
          info: selectedProfile.account_info
        };
      default:
        return null;
    }
  };

  const downloadAllSectionsPDF = (profile) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Profile #${profile.id} - All Sections`, 14, 18);
    doc.setFontSize(12);

    const sections = [
      { label: 'DOT', sent: profile.sent_to_dot, reply: profile.reply_from_dot, info: profile.platform_info },
      { label: 'BANK', sent: profile.sent_to_bank, reply: profile.reply_from_bank, info: profile.merchant_info },
      { label: 'META', sent: profile.sent_to_meta, reply: profile.reply_from_meta, info: profile.platform_info },
      { label: 'PAYMENT', sent: profile.sent_to_payment, reply: profile.reply_from_payment, info: profile.account_info },
    ];

    let y = 28;
    sections.forEach(section => {
      doc.setFontSize(14);
      doc.text(`${section.label} Section`, 14, y);
      y += 6;
      doc.setFontSize(10);
      if (!section.sent) {
        doc.text('Mail has not been sent to concern authority', 14, y);
        y += 8;
        return;
      }
      if (section.sent && section.reply === false) {
        doc.text('Mail has been sent, waiting for reply', 14, y);
        y += 8;
        return;
      }
      // If both sent and reply, show all fields
      const fields = Object.entries(section.info || {}).map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : typeof v === 'object' && v !== null ? JSON.stringify(v) : v || 'N/A']);
      if (fields.length > 0) {
        autoTable(doc, {
          startY: y,
          head: [['Field', 'Value']],
          body: fields,
          styles: { cellPadding: 2, fontSize: 9 },
          headStyles: { fillColor: [41, 128, 185] },
          margin: { left: 14, right: 14 },
        });
        y = doc.lastAutoTable.finalY + 8;
      } else {
        doc.text('No data available', 14, y);
        y += 8;
      }
    });
    doc.save(`profile_${profile.id}_all_sections.pdf`);
  };

  const downloadExcelForTab = (profile, activeTab) => {
    let sectionData = null;
    let sectionName = '';
    switch (activeTab) {
      case 'dot':
        sectionData = profile.platform_info;
        sectionName = 'DOT';
        break;
      case 'bank':
        sectionData = profile.merchant_info;
        sectionName = 'BANK';
        break;
      case 'meta':
        sectionData = profile.platform_info;
        sectionName = 'META';
        break;
      case 'payment':
        sectionData = profile.account_info;
        sectionName = 'PAYMENT';
        break;
      default:
        sectionData = {};
        sectionName = 'Section';
    }
    if (!sectionData) return;
    // Convert object to array of { Field, Value }
    const dataArr = Object.entries(sectionData).map(([k, v]) => ({
      Field: k,
      Value: Array.isArray(v) ? v.join(', ') : typeof v === 'object' && v !== null ? JSON.stringify(v) : v || 'N/A'
    }));
    const ws = XLSX.utils.json_to_sheet(dataArr);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sectionName);
    XLSX.writeFile(wb, `profile_${profile.id}_${sectionName}_attachments.xlsx`);
  };

  const renderTabContent = () => {
    const section = getSectionData(activeTab);
    if (!section) return <div>Loading...</div>;
    const info = section.info;
    // Get reply_from value for the current tab
    const replyFromMap = {
      dot: selectedProfile.reply_from_dot,
      bank: selectedProfile.reply_from_bank,
      meta: selectedProfile.reply_from_meta,
      payment: selectedProfile.reply_from_payment
    };
    const replyFrom = replyFromMap[activeTab];
    // Determine dot color
    let dotColor = 'bg-red-500';
    if (section.sent && replyFrom === false) {
      dotColor = 'bg-orange-400';
    } else if (section.sent && replyFrom !== false) {
      dotColor = 'bg-green-500';
    }
    const notSentMsg = (
      <div className="font-bold text-red-700 text-center py-8 text-lg">
        Mail has not been sent to concern authority
      </div>
    );
    const waitingMsg = (
      <div className="font-bold text-orange-600 text-center py-8 text-lg">
        Mail has been sent, waiting for reply
      </div>
    );
    // Helper to render a field in a card
    const renderFieldCard = (label, value) => (
      <div className="glass p-4 rounded-xl shadow mb-3 flex flex-col items-start">
        <span className="text-xs font-semibold text-gray-500 uppercase mb-1">{label}</span>
        <span className="text-lg font-bold text-gray-800 break-all">{value || <span className='text-gray-400'>N/A</span>}</span>
      </div>
    );

    // Helper to get fields for each section
    const getFields = () => {
      if (activeTab === 'dot' || activeTab === 'meta') {
        return [
          ['Mobile Number', info.mobile_number_registered],
          ['Platform', info.platform],
          ['Profile URL', info.handle_profile_url],
          ['Date of Access/Login', info.date_of_access_or_login],
          ['IP Address', info.ip_address],
          ['Device Type', info.device_type],
          ['Login Location', `${info.login_location?.city || ''} ${info.login_location?.state || ''}`],
          ['SIM Holder Name', info.sim_holder_name],
          ['ID Proof (Activation)', info.id_proof_submitted_during_activation],
          ['Registered Address', info.registered_address],
          ['Date of Activation', info.date_of_activation],
          ['Service Provider', info.service_provider_name],
          ['SIM Retailer', `${info.sim_retailer?.name || ''} ${info.sim_retailer?.outlet_address || ''}`],
        ];
      } else if (activeTab === 'bank') {
        return [
          ['Merchant ID', info.merchant_id],
          ['IFSC Code', info.ifsc_code],
          ['Bank Name', info.bank_name],
          ['Account Number 1', info.account_number_1],
          ['Account Number 2', info.account_number_2],
          ['Mobile Number', info.mobile_number_registered],
          ['Email', info.email_id_registered],
          ['Date of Account Creation', info.date_of_account_creation],
          ['Linked Bank Accounts', Array.isArray(info.linked_bank_accounts) ? info.linked_bank_accounts.join(', ') : ''],
          ['KYC Documents', Array.isArray(info.kyc_documents_submitted) ? info.kyc_documents_submitted.join(', ') : ''],
        ];
      } else if (activeTab === 'payment') {
        return [
          ['Account Holder Name', info.account_holder_full_name],
          ["Father's Name", info.fathers_name],
          ['Registered Address (KYC)', info.registered_address_as_per_kyc],
          ['Mobile Number', info.mobile_number_linked],
          ['Email', info.email_id_linked],
          ['Date of Account Opening', info.date_of_account_opening],
          ['Mode of Account Opening', info.mode_of_account_opening],
          ['KYC Documents', Array.isArray(info.kyc_documents_submitted) ? info.kyc_documents_submitted.join(', ') : ''],
          ['Last 10 Transactions', Array.isArray(info.last_10_transactions) ? info.last_10_transactions.join(', ') : ''],
        ];
      }
      return [];
    };

    return (
      <div>
        <div className="mb-4 flex items-center gap-3">
          <span className={`inline-block w-3 h-3 rounded-full ${dotColor}`}></span>
          <span className="font-semibold text-gray-700">{section.sent ? 'Data Sent' : 'Not Sent'}</span>
        </div>
        {/* DOT Section: show only Platform Info if sent, else show message */}
        {activeTab === 'dot' && (
          !section.sent ? notSentMsg :
          (section.sent && replyFrom === false) ? waitingMsg : (
            <>
              {selectedProfile?.dot_attachment && (
                <a
                  href={`/${selectedProfile.dot_attachment}`}
                  download
                  className="mb-4 inline-block px-6 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
                >
                  Download DOT Attachment
                </a>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getFields().map(([label, value]) => renderFieldCard(label, value))}
              </div>
            </>
          )
        )}
        {/* BANK Section: merchant_info only if sent, else show message */}
        {activeTab === 'bank' && (
          !section.sent ? notSentMsg :
          (section.sent && replyFrom === false) ? waitingMsg : (
            <>
              {selectedProfile?.bank_attachment && (
                <a
                  href={`/${selectedProfile.bank_attachment}`}
                  download
                  className="mb-4 inline-block px-6 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
                >
                  Download Bank Attachment
                </a>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getFields().map(([label, value]) => renderFieldCard(label, value))}
              </div>
            </>
          )
        )}
        {/* META Section: platform_info only if sent, else show message */}
        {activeTab === 'meta' && (
          !section.sent ? notSentMsg :
          (section.sent && replyFrom === false) ? waitingMsg : (
            <>
              {selectedProfile?.meta_attachment && (
                <a
                  href={`/${selectedProfile.meta_attachment}`}
                  download
                  className="mb-4 inline-block px-6 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
                >
                  Download Meta Attachment
                </a>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getFields().map(([label, value]) => renderFieldCard(label, value))}
              </div>
            </>
          )
        )}
        {/* PAYMENT Section: account_info only if sent, else show message */}
        {activeTab === 'payment' && (
          !section.sent ? notSentMsg :
          (section.sent && replyFrom === false) ? waitingMsg : (
            <>
              {selectedProfile?.payment_attachment && (
                <a
                  href={`/${selectedProfile.payment_attachment}`}
                  download
                  className="mb-4 inline-block px-6 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
                >
                  Download Payment Attachment
                </a>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getFields().map(([label, value]) => renderFieldCard(label, value))}
              </div>
            </>
          )
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="glass p-8 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Floating Particles Background */}
      <div className="particles-3d">
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
        <div className="particle-3d"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-red-700 mb-10 drop-shadow-lg tracking-tight">
          Suspected Scammers User Profile
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto"
        >
          {/* Profile Selection Grid */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center drop-shadow-md">
              Select Profile
            </h2>
            <ProfileGrid>
              {profiles.map((profile, index) => (
                <ProfileCard
                  key={profile.id}
                  className={selectedProfile?.id === profile.id ? 'selected' : ''}
                  onClick={() => handleProfileSelect(profile)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ProfileHeader>
                    <ProfileId>#{profile.id}</ProfileId>
                    <ProfileName>
                      {profile.account_info?.account_holder_full_name || 
                       profile.merchant_info?.registered_merchant_name || 
                       `Profile ${profile.id}`}
                    </ProfileName>
                  </ProfileHeader>
                  
                  <ProfileInfo>
                    <div><strong>Platform:</strong> {profile.platform_info?.platform || 'N/A'}</div>
                    <div><strong>Bank:</strong> {profile.merchant_info?.bank_name?.toUpperCase() || 'N/A'}</div>
                    <div><strong>Location:</strong> {profile.platform_info?.login_location?.city || 'N/A'}</div>
                  </ProfileInfo>

                  <StatusDots>
                    <StatusDot 
                      sent={profile.sent_to_dot} 
                      reply={profile.reply_from_dot} 
                      title="DOT"
                    />
                    <StatusDot 
                      sent={profile.sent_to_bank} 
                      reply={profile.reply_from_bank} 
                      title="BANK"
                    />
                    <StatusDot 
                      sent={profile.sent_to_meta} 
                      reply={profile.reply_from_meta} 
                      title="META"
                    />
                    <StatusDot 
                      sent={profile.sent_to_payment} 
                      reply={profile.reply_from_payment} 
                      title="PAYMENT"
                    />
                  </StatusDots>
                </ProfileCard>
              ))}
            </ProfileGrid>
          </motion.div>

          {/* Hero Section with 3D effects */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, rotateX: -15, translateZ: -100 }}
            animate={{ opacity: 1, rotateX: 0, translateZ: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <HeroSection profileData={selectedProfile} onDownloadPDF={() => downloadAllSectionsPDF(selectedProfile)} />
          </motion.div>

          {/* Tab Navigation with 3D hover effects */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, rotateY: -15, translateZ: -50 }}
            animate={{ opacity: 1, rotateY: 0, translateZ: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="flex gap-4 justify-center items-center">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id ? 'bg-blue-500 text-white shadow-lg' : 'bg-white/60 text-gray-700 hover:bg-blue-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content Sections with 3D animations */}
          <motion.div
            className="glass p-8"
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ transformStyle: 'preserve-3d' }}
            whileHover={{ 
              rotateX: 2, 
              rotateY: 2, 
              translateZ: 10,
              transition: { duration: 0.3 }
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 50, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -50, rotateY: 15 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {renderTabContent()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile; 