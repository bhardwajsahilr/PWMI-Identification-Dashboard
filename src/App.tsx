import React, { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { PatientProvider } from './context/PatientContext';
export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }
  return (
    <PatientProvider>
      <Dashboard />
    </PatientProvider>);

}