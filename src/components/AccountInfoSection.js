import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Edit3, Save, X, User, Phone, Mail, MapPin, Calendar, FileText, CreditCard } from 'lucide-react';

const AccountContainer = styled(motion.div)`
  padding: 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 20px;
  }
`;

const AccountHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const AccountTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const EditButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const Icon = styled.div`
  color: #667eea;
  width: 18px;
  height: 18px;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const AccountGrid = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const InfoCard = styled(motion.div)`
  padding: 25px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(102, 126, 234, 0.1);
  border-radius: 20px;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 15px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
`;

const CardIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    border-radius: 10px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InfoLabel = styled.span`
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: #333;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormInput = styled.input`
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 10px;
  color: #333;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: rgba(102, 126, 234, 0.8);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 15px;
`;

const ActionButton = styled(motion.button)`
  padding: 8px 16px;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &.save {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
  }

  &.cancel {
    background: rgba(255, 255, 255, 0.8);
    color: #333;
    border: 1px solid rgba(102, 126, 234, 0.2);
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const AccountInfoSection = ({ data }) => {
  const infoCards = [
    {
      title: "Personal Information",
      icon: <User size={20} />,
      fields: [
        { label: "Account Holder Name", value: data.account_holder_full_name, field: "account_holder_full_name" },
        { label: "Father's Name", value: data.fathers_name, field: "fathers_name" },
        { label: "Registered Address", value: data.registered_address_as_per_kyc, field: "registered_address_as_per_kyc" }
      ]
    },
    {
      title: "Contact Details",
      icon: <Phone size={20} />,
      fields: [
        { label: "Mobile Number", value: data.mobile_number_linked, field: "mobile_number_linked" },
        { label: "Email ID", value: data.email_id_linked, field: "email_id_linked" }
      ]
    },
    {
      title: "Account Details",
      icon: <CreditCard size={20} />,
      fields: [
        { label: "Account Opening Date", value: data.date_of_account_opening, field: "date_of_account_opening" },
        { label: "Mode of Opening", value: data.mode_of_account_opening, field: "mode_of_account_opening" }
      ]
    },
    {
      title: "KYC & Documents",
      icon: <FileText size={20} />,
      fields: [
        { label: "KYC Documents", value: data.kyc_documents_submitted?.length || 0, field: "kyc_documents_submitted" },
        { label: "Last Transactions", value: data.last_10_transactions?.length || 0, field: "last_10_transactions" }
      ]
    }
  ];

  return (
    <AccountContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AccountHeader>
        <AccountTitle>
          <User size={24} />
          Account Information
        </AccountTitle>
      </AccountHeader>

      <AccountGrid>
        {infoCards.map((card, index) => (
          <InfoCard
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <CardHeader>
              <CardIcon>{card.icon}</CardIcon>
              <CardTitle>{card.title}</CardTitle>
            </CardHeader>

            <InfoGrid>
              {card.fields.map((field) => (
                <InfoItem key={field.field}>
                  <InfoLabel>{field.label}</InfoLabel>
                  <InfoValue>{field.value || 'Not provided'}</InfoValue>
                </InfoItem>
              ))}
            </InfoGrid>
          </InfoCard>
        ))}
      </AccountGrid>
    </AccountContainer>
  );
};

export default AccountInfoSection; 