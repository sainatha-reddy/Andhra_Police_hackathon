import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import LandingPage from './LandingPage';
import IntermediatePage from './IntermediatePage';
import ChatbotPage from './ChatbotPage';
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
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<UserProfile />} />
          <Route path="/intermediate" element={<IntermediatePage />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
};

export default App; 