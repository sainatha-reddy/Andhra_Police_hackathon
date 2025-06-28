import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Edit3, Save, X } from 'lucide-react';

const BioContainer = styled(motion.div)`
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 20px;
  }
`;

const BioHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BioTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const EditButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const Icon = styled.div`
  color: white;
  width: 18px;
  height: 18px;

  @media (max-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const BioContent = styled.div`
  position: relative;
`;

const BioText = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  white-space: pre-wrap;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const BioTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  color: white;
  font-size: 1.1rem;
  line-height: 1.6;
  font-family: inherit;
  resize: vertical;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: rgba(102, 126, 234, 0.8);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 12px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
  justify-content: flex-end;
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
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
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

const BioSection = ({ data }) => {
  return (
    <BioContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BioHeader>
        <BioTitle>About Me</BioTitle>
      </BioHeader>
      <BioContent>
        <BioText>{data}</BioText>
      </BioContent>
    </BioContainer>
  );
};

export default BioSection; 