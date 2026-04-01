import React, { useState } from 'react';
import { Dashboard } from './pages/Dashboard';
import { LoginPage } from './pages/LoginPage';
import { OrgUnitSelectionPage } from './pages/OrgUnitSelectionPage';
import { ProgramSelectionPage } from './pages/ProgramSelectionPage';
import { PatientProvider } from './context/PatientContext';
type AppState = 'login' | 'org-selection' | 'program-selection' | 'dashboard';
export type ProgramType = 'clinical' | 'community';
export function App() {
  const [appState, setAppState] = useState<AppState>('login');
  const [selectedProgram, setSelectedProgram] = useState<ProgramType | null>(
    null
  );
  if (appState === 'login') {
    return <LoginPage onLogin={() => setAppState('org-selection')} />;
  }
  if (appState === 'org-selection') {
    return (
      <OrgUnitSelectionPage onSelect={() => setAppState('program-selection')} />);

  }
  if (appState === 'program-selection') {
    return (
      <ProgramSelectionPage
        onSelectProgram={(program) => {
          setSelectedProgram(program);
          setAppState('dashboard');
        }} />);


  }
  return (
    <PatientProvider>
      <Dashboard program={selectedProgram} />
    </PatientProvider>);

}