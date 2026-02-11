import React, { useState, createContext, useContext } from 'react';
import {
  Patient,
  FilterState,
  ModuleTab,
  RegistrationSubStage,
  IdentificationFormData,
  RegistrationFormData } from
'../types';
import { mockPatients } from '../data/mockData';
interface PatientContextType {
  patients: Patient[];
  selectedPatientId: string | null;
  selectedPatient: Patient | null;
  activeTab: ModuleTab;
  activeSubStage: RegistrationSubStage;
  filter: FilterState;
  // Actions
  selectPatient: (id: string | null) => void;
  setActiveTab: (tab: ModuleTab) => void;
  setActiveSubStage: (stage: RegistrationSubStage) => void;
  setFilter: (filter: FilterState) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  saveIdentificationData: (
  id: string,
  data: IdentificationFormData,
  markCompleted?: boolean)
  => void;
  saveRegistrationData: (
  id: string,
  data: RegistrationFormData,
  markCompleted?: boolean)
  => void;
  saveSubStageData: (id: string, stageKey: keyof Patient, data: any) => void;
  addNewPatient: () => void;
  deletePatient: (id: string) => void;
}
const PatientContext = createContext<PatientContextType | undefined>(undefined);
export function PatientProvider({ children }: {children: ReactNode;}) {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    mockPatients[0].id
  );
  const [activeTab, setActiveTab] = useState<ModuleTab>('identification');
  const [activeSubStage, setActiveSubStage] = useState<RegistrationSubStage>(
    'screening-diagnosis'
  );
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    status: 'All'
  });
  const selectedPatient =
  patients.find((p) => p.id === selectedPatientId) || null;
  const selectPatient = (id: string | null) => {
    setSelectedPatientId(id);
  };
  const updatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients((prev) =>
    prev.map((p) =>
    p.id === id ?
    {
      ...p,
      ...updates
    } :
    p
    )
    );
  };
  const saveIdentificationData = (
  id: string,
  data: IdentificationFormData,
  markCompleted = false) =>
  {
    setPatients((prev) =>
    prev.map((p) => {
      if (p.id !== id) return p;
      return {
        ...p,
        identificationData: data,
        riskLevel: data.riskLevel,
        status: markCompleted ? 'Pending' : p.status // Move to pending registration if completed
      };
    })
    );
    if (markCompleted) {
      setActiveTab('registration');
      setActiveSubStage('screening-diagnosis');
    }
  };
  const saveRegistrationData = (
  id: string,
  data: RegistrationFormData,
  markCompleted = false) =>
  {
    setPatients((prev) =>
    prev.map((p) => {
      if (p.id !== id) return p;
      return {
        ...p,
        registrationData: data,
        status: markCompleted ? 'Completed' : 'Referred'
      };
    })
    );
  };
  const saveSubStageData = (id: string, stageKey: keyof Patient, data: any) => {
    setPatients((prev) =>
    prev.map((p) => {
      if (p.id !== id) return p;
      return {
        ...p,
        [stageKey]: data
      };
    })
    );
  };
  const addNewPatient = () => {
    // In a real app, generate a proper ID
    alert('Add New Client functionality would open a blank form.');
    setSelectedPatientId(null);
  };
  const deletePatient = (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      setPatients((prev) => prev.filter((p) => p.id !== id));
      if (selectedPatientId === id) {
        setSelectedPatientId(null);
      }
    }
  };
  return (
    <PatientContext.Provider
      value={{
        patients,
        selectedPatientId,
        selectedPatient,
        activeTab,
        activeSubStage,
        filter,
        selectPatient,
        setActiveTab,
        setActiveSubStage,
        setFilter,
        updatePatient,
        saveIdentificationData,
        saveRegistrationData,
        saveSubStageData,
        addNewPatient,
        deletePatient
      }}>

      {children}
    </PatientContext.Provider>);

}
export function usePatient() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
}