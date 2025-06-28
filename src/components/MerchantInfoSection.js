import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, CreditCard, Phone, Mail, Calendar, FileText } from 'lucide-react';

const MerchantInfoSection = ({ data }) => {
  const renderField = (label, value, field, Icon, type = 'text') => {
    return (
      <motion.div
        className="glass p-6 hover-3d"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ 
          scale: 1.02, 
          rotateY: 2, 
          translateZ: 5,
          transition: { duration: 0.2 }
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="flex items-start gap-3 mb-4">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            animate={{ 
              rotateZ: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
          <h3 className="text-lg font-semibold text-gray-800">{label}</h3>
        </div>
        <motion.p
          className="text-gray-700 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value || 'Not provided'}
        </motion.p>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-2"
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Merchant Information
        </motion.h2>
        <p className="text-gray-600">Manage your merchant account details</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderField('Merchant ID', data.merchant_id, 'merchant_id', Building2)}
        {renderField('IFSC Code', data.ifsc_code, 'ifsc_code', CreditCard)}
        {renderField('Bank Name', data.bank_name, 'bank_name', Building2)}
        {renderField('Account Number 1', data.account_number_1, 'account_number_1', CreditCard)}
        {renderField('Account Number 2', data.account_number_2, 'account_number_2', CreditCard)}
        {renderField('Registered Merchant Name', data.registered_merchant_name, 'registered_merchant_name', Building2)}
        {renderField('Business Description', data.merchant_business_name_description, 'merchant_business_name_description', FileText)}
        {renderField('Mobile Number', data.mobile_number_registered, 'mobile_number_registered', Phone)}
        {renderField('Email ID', data.email_id_registered, 'email_id_registered', Mail)}
        {renderField('Account Creation Date', data.date_of_account_creation, 'date_of_account_creation', Calendar, 'date')}
      </div>

      {/* Linked Bank Accounts Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <motion.div
            className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center"
            animate={{ 
              rotateZ: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <CreditCard className="w-3 h-3 text-white" />
          </motion.div>
          Linked Bank Accounts
        </h3>
        <div className="glass p-6">
          {data.linked_bank_accounts && data.linked_bank_accounts.length > 0 ? (
            <div className="space-y-3">
              {data.linked_bank_accounts.map((account, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02, 
                    translateX: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <span className="text-gray-700">{account}</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No linked bank accounts</p>
          )}
        </div>
      </motion.div>

      {/* KYC Documents Section */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <motion.div
            className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center"
            animate={{ 
              rotateZ: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
          >
            <FileText className="w-3 h-3 text-white" />
          </motion.div>
          KYC Documents Submitted
        </h3>
        <div className="glass p-6">
          {data.kyc_documents_submitted && data.kyc_documents_submitted.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.kyc_documents_submitted.map((doc, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/50 rounded-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    transition: { duration: 0.2 }
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <FileText className="w-5 h-5 text-blue-500" />
                  <span className="text-gray-700">{doc}</span>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No KYC documents submitted</p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MerchantInfoSection; 