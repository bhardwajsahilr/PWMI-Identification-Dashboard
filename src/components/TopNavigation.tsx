import React from 'react';
import { usePatient } from '../context/PatientContext';
import { ModuleTab } from '../types';
export function TopNavigation() {
  const { activeTab, setActiveTab } = usePatient();
  const tabs: {
    id: ModuleTab;
    label: string;
  }[] = [
  {
    id: 'identification',
    label: 'PWMI Identification'
  },
  {
    id: 'registration',
    label: 'PWMI Registration & Services'
  },
  {
    id: 'reports',
    label: 'Reports'
  }];

  return (
    <div className="bg-skyBlue text-white shadow-md z-30 relative">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 font-bold text-xl tracking-tight">
              TLLLF MIS
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                {tabs.map((tab) =>
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                      px-4 py-2 rounded-t-lg text-sm font-bold flex items-center h-16 mt-4 transition-all
                      ${activeTab === tab.id ? 'bg-skyBlue-light text-teal border-b-4 border-teal' : 'text-white hover:bg-skyBlue-dark opacity-80 hover:opacity-100 border-b-4 border-transparent'}
                    `}>

                    {tab.label}
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium opacity-90">
              Welcome, Field Worker
            </span>
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              FW
            </div>
          </div>
        </div>
      </div>
    </div>);

}