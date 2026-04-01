import React from 'react';
import { usePatient } from '../context/PatientContext';
import { ModuleTab } from '../types';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { ProgramType } from '../App';
interface TopNavigationProps {
  program?: ProgramType | null;
}
export function TopNavigation({ program }: TopNavigationProps) {
  const {
    activeTab,
    setActiveTab,
    selectPatient,
    selectedPatientId,
    selectedMonitoringId,
    isNewMonitoring,
    selectMonitoring,
    setIsNewMonitoring,
    selectedSupportGroupMeetingId,
    isNewSupportGroupMeeting,
    selectSupportGroupMeeting,
    setIsNewSupportGroupMeeting
  } = usePatient();
  const handleTabChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTab = e.target.value as ModuleTab;
    setActiveTab(newTab);
    selectPatient(null);
  };
  // Determine if we should show a back button
  const showPatientBack =
  (activeTab === 'identification' || activeTab === 'registration') &&
  !!selectedPatientId;
  const showMonitoringBack =
  activeTab === 'monthly-monitoring' && (
  !!selectedMonitoringId || isNewMonitoring);
  const showSupportGroupBack =
  activeTab === 'support-group-meeting' && (
  !!selectedSupportGroupMeetingId || isNewSupportGroupMeeting);
  const showBack = showPatientBack || showMonitoringBack || showSupportGroupBack;
  const handleBack = () => {
    if (showPatientBack) {
      selectPatient(null);
    } else if (showMonitoringBack) {
      if (selectedMonitoringId) selectMonitoring(null);else
      setIsNewMonitoring(false);
    } else if (showSupportGroupBack) {
      if (selectedSupportGroupMeetingId) selectSupportGroupMeeting(null);else
      setIsNewSupportGroupMeeting(false);
    }
  };
  const backLabel = showMonitoringBack ?
  'Back to Monitoring List' :
  showSupportGroupBack ?
  'Back to Meetings List' :
  'Back to Patient List';
  return (
    <div className="z-30 relative">
      {/* Primary Header — TLLLF Brand Bar */}
      <div className="bg-skyBlue text-white shadow-md">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex-shrink-0 font-bold text-xl tracking-tight">
              The Live Love Laugh Foundation MIS
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium opacity-90 hidden sm:block">
                Welcome, Field Worker
              </span>
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <span className="font-bold text-sm">FW</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Bar — Stage Dropdown + Back Button */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            <div className="relative">
              <select
                value={activeTab}
                onChange={handleTabChange}
                className="appearance-none bg-gray-50 border border-gray-300 text-gray-800 font-semibold text-sm py-1.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal cursor-pointer hover:bg-gray-100 transition-colors">
                
                {(!program || program === 'clinical') &&
                <>
                    <option value="identification">PWMI Identification</option>
                    <option value="registration">
                      PWMI Registration &amp; Services
                    </option>
                  </>
                }
                {(!program || program === 'community') &&
                <>
                    <option value="monthly-monitoring">
                      Monthly Monitoring
                    </option>
                    <option value="support-group-meeting">
                      Support Group Meeting
                    </option>
                  </>
                }
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>

            {showBack &&
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-teal transition-colors">
              
                <ArrowLeft className="h-4 w-4" />
                {backLabel}
              </button>
            }
          </div>
        </div>
      </div>
    </div>);

}