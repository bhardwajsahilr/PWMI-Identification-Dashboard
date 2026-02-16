import React, { useState, createContext, useContext } from 'react';
import {
  Patient,
  FilterState,
  ModuleTab,
  RegistrationSubStage,
  IdentificationFormData,
  RegistrationFormData,
  MonthlyMonitoringData } from
'../types';
import { mockPatients, mockMonitoringRecords } from '../data/mockData';
interface PatientContextType {
  patients: Patient[];
  selectedPatientId: string | null;
  selectedPatient: Patient | null;
  activeTab: ModuleTab;
  activeSubStage: RegistrationSubStage;
  filter: FilterState;
  monitoringRecords: MonthlyMonitoringData[];
  selectedMonitoringId: string | null;
  isNewMonitoring: boolean;
  isNewPatientForm: boolean;
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
  addSubStageEntry: (id: string, fieldKey: keyof Patient, entry: any) => void;
  saveMonitoringData: (data: MonthlyMonitoringData) => void;
  selectMonitoring: (id: string | null) => void;
  setIsNewMonitoring: (val: boolean) => void;
  addNewPatient: () => void;
  createPatient: (patient: Omit<Patient, 'id' | 'status' | 'riskLevel'>) => void;
  cancelNewPatient: () => void;
  deletePatient: (id: string) => void;
}
const PatientContext = createContext<PatientContextType | undefined>(undefined);
export function PatientProvider({ children }: {children: ReactNode;}) {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );
  const [activeTab, setActiveTabState] = useState<ModuleTab>('identification');
  const [activeSubStage, setActiveSubStage] = useState<RegistrationSubStage>(
    'identification-summary'
  );
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    status: 'All'
  });
  const [monitoringRecords, setMonitoringRecords] = useState<
    MonthlyMonitoringData[]>(
    mockMonitoringRecords);
  const [selectedMonitoringId, setSelectedMonitoringId] = useState<
    string | null>(
    null);
  const [isNewMonitoring, setIsNewMonitoring] = useState(false);
  const [isNewPatientForm, setIsNewPatientForm] = useState(false);
  const selectedPatient =
  patients.find((p) => p.id === selectedPatientId) || null;
  const selectPatient = (id: string | null) => {
    setSelectedPatientId(id);
  };
  const setActiveTab = (tab: ModuleTab) => {
    setActiveTabState(tab);
    setSelectedMonitoringId(null);
    setIsNewMonitoring(false);
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
      // Determine status based on consent
      let newStatus = p.status;
      if (markCompleted) {
        if (data.consentGiven === 'Yes') {
          newStatus = 'Referred';
        } else if (data.consentGiven === 'No') {
          newStatus = 'Pending';
        } else {
          newStatus = 'Pending';
        }
      }
      return {
        ...p,
        identificationData: data,
        riskLevel: data.riskLevel,
        status: newStatus
      };
    })
    );
    // Stay on identification — no auto-navigation
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
  // For single object updates (SelfEmployment, CaregiverBurden)
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
  // For repeatable array updates (FollowUp, CounsellingLog, etc.)
  const addSubStageEntry = (
  id: string,
  fieldKey: keyof Patient,
  entry: any) =>
  {
    setPatients((prev) =>
    prev.map((p) => {
      if (p.id !== id) return p;
      const existingEntries = p[fieldKey] as any[] || [];
      return {
        ...p,
        [fieldKey]: [entry, ...existingEntries]
      }; // Add new entry to start
    })
    );
  };
  const saveMonitoringData = (data: MonthlyMonitoringData) => {
    setMonitoringRecords((prev) => [...prev, data]);
    setIsNewMonitoring(false);
  };
  const selectMonitoring = (id: string | null) => {
    setSelectedMonitoringId(id);
    setIsNewMonitoring(false);
  };
  const addNewPatient = () => {
    setIsNewPatientForm(true);
    setSelectedPatientId(null);
  };
  const createPatient = (
  patientData: Omit<Patient, 'id' | 'status' | 'riskLevel'>) =>
  {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      status: 'Pending',
      riskLevel: 'Low'
    };
    setPatients((prev) => [newPatient, ...prev]);
    setIsNewPatientForm(false);
    setSelectedPatientId(newPatient.id);
  };
  const cancelNewPatient = () => {
    setIsNewPatientForm(false);
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
        monitoringRecords,
        selectedMonitoringId,
        isNewMonitoring,
        isNewPatientForm,
        selectPatient,
        setActiveTab,
        setActiveSubStage,
        setFilter,
        updatePatient,
        saveIdentificationData,
        saveRegistrationData,
        saveSubStageData,
        addSubStageEntry,
        saveMonitoringData,
        selectMonitoring,
        setIsNewMonitoring,
        addNewPatient,
        createPatient,
        cancelNewPatient,
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