import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import UserProfile from './components/UserProfile';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <AppContainer>
      <UserProfile />
    </AppContainer>
  );
};

export default App; 