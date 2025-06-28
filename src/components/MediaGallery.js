import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Plus, Trash2, Save, X, Play, Image as ImageIcon } from 'lucide-react';

const GalleryContainer = styled(motion.div)`
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;

  @media (max-width: 768px) {
    padding: 20px;
    border-radius: 20px;
  }
`;

const GalleryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const GalleryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled(motion.button)`
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

const GalleryGrid = styled.div`
  display: grid;
  gap: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`;

const MediaCard = styled(motion.div)`
  position: relative;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    border-radius: 15px;
  }
`;

const MediaContent = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${MediaCard}:hover & {
    transform: scale(1.05);
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MediaCard}:hover & {
    opacity: 1;
  }
`;

const PlayIcon = styled(Play)`
  color: white;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  padding: 10px;
`;

const MediaInfo = styled.div`
  padding: 20px;
`;

const MediaTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0 0 10px 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const MediaType = styled.span`
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    padding: 3px 10px;
  }
`;

const CardActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MediaCard}:hover & {
    opacity: 1;
  }
`;

const CardButton = styled(motion.button)`
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

const EditForm = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormInput = styled.input`
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
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
    padding: 10px 12px;
    font-size: 0.9rem;
  }
`;

const FormSelect = styled.select`
  padding: 12px 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    border-color: rgba(102, 126, 234, 0.8);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  option {
    background: #2a2a2a;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
    font-size: 0.9rem;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const FormButton = styled(motion.button)`
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

  &.delete {
    background: rgba(239, 68, 68, 0.8);
    color: white;
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

const MediaGallery = ({ data }) => {
  // Remove editing state and handlers
  // ... render static media only ...
};

export default MediaGallery; 