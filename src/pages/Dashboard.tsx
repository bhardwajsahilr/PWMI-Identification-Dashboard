import React from 'react';
import { usePatient } from '../context/PatientContext';
import { TopNavigation } from '../components/TopNavigation';
import { PatientList } from '../components/PatientList';
import { PatientForm } from '../components/PatientForm';
import { RegistrationForm } from '../components/RegistrationForm';
export function Dashboard() {
  const {
    patients,
    selectedPatientId,
    selectPatient,
    addNewPatient,
    filter,
    setFilter,
    activeTab
  } = usePatient();
  return (
    <div className="flex flex-col h-screen w-full bg-neutral-bg overflow-hidden font-sans">
      <TopNavigation />

      <main className="flex-1 flex overflow-hidden">
        {/* Left Panel - Patient List (40%) */}
        <div className="w-full md:w-[40%] lg:w-[35%] h-full flex-shrink-0 z-10 shadow-xl">
          <PatientList
            patients={patients}
            selectedId={selectedPatientId}
            onSelect={selectPatient}
            onAddNew={addNewPatient}
            filter={filter}
            onFilterChange={setFilter}
            activeTab={activeTab} />

        </div>

        {/* Right Panel - Form (60%) */}
        <div className="flex-1 h-full min-w-0">
          {activeTab === 'identification' && <PatientForm />}
          {activeTab === 'registration' && <RegistrationForm />}
          {activeTab === 'reports' &&
          <div className="h-full flex items-center justify-center text-neutral-secondary">
              Reports module coming soon.
            </div>
          }
        </div>
      </main>
    </div>);

}