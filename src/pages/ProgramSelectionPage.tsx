import React from 'react';
import { Stethoscope, UsersRound } from 'lucide-react';
interface ProgramSelectionPageProps {
  onSelectProgram: (program: 'clinical' | 'community') => void;
}
export function ProgramSelectionPage({
  onSelectProgram
}: ProgramSelectionPageProps) {
  return (
    <div className="min-h-screen w-full bg-[#f4f6f8] flex flex-col items-center justify-center p-8 relative">
      <div className="max-w-4xl w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo */}
        <div className="mb-6 bg-white p-6 rounded-full shadow-sm border border-gray-100">
          <img
            src="/Untitled_design_(2).png"
            alt="TLLLF Logo"
            className="h-24 w-auto object-contain" />
          
        </div>

        {/* Titles */}
        <h1 className="text-2xl font-bold text-[#1a2b3c] mb-2 text-center">
          The Live Love Laugh Foundation
        </h1>
        <h2 className="text-lg font-medium text-gray-600 mb-8 text-center">
          Management Information System (MIS)
        </h2>

        {/* Selected Org */}
        <div className="text-center mb-10">
          <p className="text-sm text-gray-500 mb-1">Selected Organization:</p>
          <p className="text-xl font-bold text-teal">Atlapragada Konduru</p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
          {/* Card 1: Clinical */}
          <button
            onClick={() => onSelectProgram('clinical')}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:border-teal hover:shadow-md transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-1">
            
            <div className="h-16 w-16 rounded-full bg-skyBlue/10 flex items-center justify-center mb-6 group-hover:bg-teal/10 transition-colors">
              <Stethoscope className="h-8 w-8 text-skyBlue group-hover:text-teal transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              1. Clinical & Socio-Economic Interventions
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Identify and register persons with mental illness, manage
              screening, counselling, follow-ups, and socio-economic support
              services.
            </p>
          </button>

          {/* Card 2: Community */}
          <button
            onClick={() => onSelectProgram('community')}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:border-teal hover:shadow-md transition-all duration-300 group flex flex-col items-center text-center hover:-translate-y-1">
            
            <div className="h-16 w-16 rounded-full bg-skyBlue/10 flex items-center justify-center mb-6 group-hover:bg-teal/10 transition-colors">
              <UsersRound className="h-8 w-8 text-skyBlue group-hover:text-teal transition-colors" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              2. Community Participation & Program Monitoring
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Manage support group meetings, monthly monitoring, and
              community-level program activities.
            </p>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-xs text-gray-400">
        © 2026 The Live Love Laugh Foundation. All rights reserved.
      </div>
    </div>);

}