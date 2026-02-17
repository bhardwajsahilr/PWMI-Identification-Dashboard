import React from 'react';
import { usePatient } from '../context/PatientContext';
import { TopNavigation } from '../components/TopNavigation';
import { OrgUnitTree } from '../components/OrgUnitTree';
import { PatientTable } from '../components/PatientTable';
import { PatientForm } from '../components/PatientForm';
import { RegistrationForm } from '../components/RegistrationForm';
import { MonthlyMonitoringForm } from '../components/MonthlyMonitoringForm';
import { MonitoringTable } from '../components/MonitoringTable';
import { NewPatientForm } from '../components/NewPatientForm';
import { SupportGroupMeetingTable } from '../components/SupportGroupMeetingTable';
import { SupportGroupMeetingForm } from '../components/SupportGroupMeetingForm';
export function Dashboard() {
  const {
    patients,
    selectedPatientId,
    selectPatient,
    addNewPatient,
    filter,
    setFilter,
    activeTab,
    monitoringRecords,
    selectedMonitoringId,
    isNewMonitoring,
    isNewPatientForm,
    selectMonitoring,
    setIsNewMonitoring,
    // Support Group
    supportGroupMeetings,
    selectedSupportGroupMeetingId,
    isNewSupportGroupMeeting,
    selectSupportGroupMeeting,
    setIsNewSupportGroupMeeting
  } = usePatient();
  // === SUPPORT GROUP MEETING VIEWS ===
  if (activeTab === 'support-group-meeting') {
    // View existing record
    if (selectedSupportGroupMeetingId) {
      const record =
      supportGroupMeetings.find(
        (r) => r.id === selectedSupportGroupMeetingId
      ) || null;
      return (
        <div className="flex flex-col h-screen w-full bg-neutral-bg overflow-hidden font-sans">
          <TopNavigation />
          <main className="flex-1 overflow-hidden">
            <SupportGroupMeetingForm viewRecord={record} />
          </main>
        </div>);

    }
    // New meeting form
    if (isNewSupportGroupMeeting) {
      return (
        <div className="flex flex-col h-screen w-full bg-neutral-bg overflow-hidden font-sans">
          <TopNavigation />
          <main className="flex-1 overflow-hidden">
            <SupportGroupMeetingForm />
          </main>
        </div>);

    }
    // List view
    return (
      <div className="flex flex-col h-screen w-full bg-neutral-bg overflow-hidden font-sans">
        <TopNavigation />
        <main className="flex-1 flex overflow-hidden">
          <OrgUnitTree />
          <div className="flex-1 h-full min-w-0 shadow-xl z-10">
            <SupportGroupMeetingTable
              records={supportGroupMeetings}
              onSelectRecord={(id) => selectSupportGroupMeeting(id)}
              onNewMeeting={() => setIsNewSupportGroupMeeting(true)} />

          </div>
        </main>
      </div>);

  }
  // === MONTHLY MONITORING VIEWS ===
  if (activeTab === 'monthly-monitoring') {
    // View existing record (read-only)
    if (selectedMonitoringId) {
      const record =
      monitoringRecords.find((r) => r.id === selectedMonitoringId) || null;
      return (
        <div className="flex flex-col h-screen w-full bg-neutral-bg overflow-hidden font-sans">
          <TopNavigation />
          <main className="flex-1 overflow-hidden">
            <MonthlyMonitoringForm viewRecord={record} />
          </main>
        </div>);

    }
    // New monitoring form
    if (isNewMonitoring) {
      return (
        <div className="flex flex-col h-screen w-full bg-neutral-bg overflow-hidden font-sans">
          <TopNavigation />
          <main className="flex-1 overflow-hidden">
            <MonthlyMonitoringForm />
          </main>
        </div>);

    }
    // Monitoring list view
    return (
      <div className="flex flex-col h-screen w-full bg-neutral-bg overflow-hidden font-sans">
        <TopNavigation />
        <main className="flex-1 flex overflow-hidden">
          <OrgUnitTree />
          <div className="flex-1 h-full min-w-0 shadow-xl z-10">
            <MonitoringTable
              records={monitoringRecords}
              onSelectRecord={(id) => selectMonitoring(id)}
              onNewMonitoring={() => setIsNewMonitoring(true)} />

          </div>
        </main>
      </div>);

  }
  // === NEW PATIENT REGISTRATION FORM ===
  if (isNewPatientForm) {
    return (
      <div className="flex flex-col h-screen w-full bg-neutral-bg overflow-hidden font-sans">
        <TopNavigation />
        <main className="flex-1 overflow-hidden">
          <NewPatientForm />
        </main>
      </div>);

  }
  // === PATIENT FORM VIEW (Full Width, Patient Selected) ===
  if (selectedPatientId) {
    return (
      <div className="flex flex-col h-screen w-full bg-neutral-bg overflow-hidden font-sans">
        <TopNavigation />
        <main className="flex-1 overflow-hidden">
          {activeTab === 'identification' && <PatientForm />}
          {activeTab === 'registration' && <RegistrationForm />}
        </main>
      </div>);

  }
  // === DEFAULT LIST VIEW (Two Panel: Tree + Table) ===
  return (
    <div className="flex flex-col h-screen w-full bg-neutral-bg overflow-hidden font-sans">
      <TopNavigation />
      <main className="flex-1 flex overflow-hidden">
        <OrgUnitTree />
        <div className="flex-1 h-full min-w-0 shadow-xl z-10">
          <PatientTable
            patients={patients}
            onSelectPatient={selectPatient}
            onAddNew={addNewPatient}
            filter={filter}
            onFilterChange={setFilter}
            activeTab={activeTab} />

        </div>
      </main>
    </div>);

}