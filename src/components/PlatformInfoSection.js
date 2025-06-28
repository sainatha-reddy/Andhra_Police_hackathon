import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Edit3, Save, X, Monitor, MapPin, Smartphone, User, Calendar, Wifi } from 'lucide-react';

const PlatformContainer = styled(motion.div)`
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

const PlatformHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const PlatformTitle = styled.h2`
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

const PlatformGrid = styled.div`
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

const PlatformInfoSection = ({ data }) => {
  const infoCards = [
    {
      title: "Platform Details",
      icon: <Monitor size={20} />,
      fields: [
        { label: "Platform", value: data.platform, field: "platform" },
        { label: "Profile URL", value: data.handle_profile_url, field: "handle_profile_url" },
        { label: "Mobile Number", value: data.mobile_number_registered, field: "mobile_number_registered" }
      ]
    },
    {
      title: "Access Information",
      icon: <Wifi size={20} />,
      fields: [
        { label: "Last Access Date", value: data.date_of_access_or_login, field: "date_of_access_or_login" },
        { label: "IP Address", value: data.ip_address, field: "ip_address" },
        { label: "Device Type", value: data.device_type, field: "device_type" }
      ]
    },
    {
      title: "Location Details",
      icon: <MapPin size={20} />,
      fields: [
        { label: "City", value: data.login_location?.city, field: "city", isLocation: true },
        { label: "State", value: data.login_location?.state, field: "state", isLocation: true },
        { label: "Registered Address", value: data.registered_address, field: "registered_address" }
      ]
    },
    {
      title: "SIM Information",
      icon: <Smartphone size={20} />,
      fields: [
        { label: "SIM Holder Name", value: data.sim_holder_name, field: "sim_holder_name" },
        { label: "Service Provider", value: data.service_provider_name, field: "service_provider_name" },
        { label: "Activation Date", value: data.date_of_activation, field: "date_of_activation" }
      ]
    },
    {
      title: "Retailer Information",
      icon: <User size={20} />,
      fields: [
        { label: "Retailer Name", value: data.sim_retailer?.name, field: "name", isRetailer: true },
        { label: "Outlet Address", value: data.sim_retailer?.outlet_address, field: "outlet_address", isRetailer: true },
        { label: "ID Proof", value: data.id_proof_submitted_during_activation, field: "id_proof_submitted_during_activation" }
      ]
    }
  ];

  return (
    <PlatformContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PlatformHeader>
        <PlatformTitle>
          <Monitor size={24} />
          Platform Information
        </PlatformTitle>
      </PlatformHeader>

      <PlatformGrid>
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
      </PlatformGrid>
    </PlatformContainer>
  );
};

export default PlatformInfoSection; 