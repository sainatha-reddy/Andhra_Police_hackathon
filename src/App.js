import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import LandingPage from './LandingPage';
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
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
};

export default App; 