import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import LandingPage from './LandingPage';
import IntermediatePage from './IntermediatePage';
import ChatbotPage from './ChatbotPage';
import './App.css';

// Create context for processing state
const ProcessingContext = createContext();

export const useProcessing = () => {
  const context = useContext(ProcessingContext);
  if (!context) {
    throw new Error('useProcessing must be used within a ProcessingProvider');
  }
  return context;
};

const AppContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isProcessed } = useProcessing();
  
  if (!isProcessed) {
    return <Navigate to="/intermediate" replace />;
  }
  
  return children;
};

const App = () => {
  const [isProcessed, setIsProcessed] = useState(false);

  return (
    <ProcessingContext.Provider value={{ isProcessed, setIsProcessed }}>
      <BrowserRouter>
        <AppContainer>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<UserProfile />} />
            <Route path="/intermediate" element={<IntermediatePage />} />
            <Route 
              path="/chatbot" 
              element={
                <ProtectedRoute>
                  <ChatbotPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </AppContainer>
      </BrowserRouter>
    </ProcessingContext.Provider>
  );
};

export default App; 