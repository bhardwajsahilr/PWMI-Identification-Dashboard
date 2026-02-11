import React from 'react';
import { Dashboard } from './pages/Dashboard';
import { PatientProvider } from './context/PatientContext';
export function App() {
  return (
    <PatientProvider>
      <Dashboard />
    </PatientProvider>);

}