import React, { useState } from 'react';
import { ChevronDown, Plus, ArrowLeft } from 'lucide-react';
interface OrgUnitSelectionPageProps {
  onSelect: () => void;
}
export function OrgUnitSelectionPage({ onSelect }: OrgUnitSelectionPageProps) {
  const [expanded, setExpanded] = useState({
    india: true,
    ap: true,
    ntr: true
  });
  const toggleExpand = (key: keyof typeof expanded) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  return (
    <div className="flex h-screen w-full bg-[#f4f6f8]">
      {/* Sidebar */}
      <div className="w-[300px] bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-wider">
            Organisation Unit
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 text-[14px] select-none">
          {/* India */}
          <div
            className="flex items-center gap-1.5 py-1 cursor-pointer hover:bg-gray-50 rounded px-1"
            onClick={() => toggleExpand('india')}>
            
            {expanded.india ?
            <ChevronDown className="h-4 w-4 text-gray-500" /> :

            <Plus className="h-4 w-4 text-gray-500" />
            }
            <span className="font-semibold text-gray-800">India</span>
          </div>

          {expanded.india &&
          <div className="ml-5 border-l border-gray-200 pl-2 mt-1">
              {/* Andhra Pradesh */}
              <div
              className="flex items-center gap-1.5 py-1 cursor-pointer hover:bg-gray-50 rounded px-1"
              onClick={() => toggleExpand('ap')}>
              
                {expanded.ap ?
              <ChevronDown className="h-4 w-4 text-gray-500" /> :

              <Plus className="h-4 w-4 text-gray-500" />
              }
                <span className="font-semibold text-gray-800">
                  Andhra Pradesh
                </span>
              </div>

              {expanded.ap &&
            <div className="ml-5 border-l border-gray-200 pl-2 mt-1">
                  {/* NTR */}
                  <div
                className="flex items-center gap-1.5 py-1 cursor-pointer hover:bg-gray-50 rounded px-1"
                onClick={() => toggleExpand('ntr')}>
                
                    {expanded.ntr ?
                <ChevronDown className="h-4 w-4 text-gray-500" /> :

                <Plus className="h-4 w-4 text-gray-500" />
                }
                    <span className="font-medium text-gray-800">NTR</span>
                  </div>

                  {expanded.ntr &&
              <div className="ml-5 border-l border-gray-200 pl-2 mt-1 space-y-1">
                      {/* Atlapragada Konduru — Clickable */}
                      <div
                  className="flex items-center gap-1.5 py-1.5 cursor-pointer hover:bg-teal/10 rounded px-2 group transition-colors"
                  onClick={onSelect}>
                  
                        <ChevronDown className="h-4 w-4 text-teal group-hover:text-teal-dark" />
                        <span className="font-bold text-teal group-hover:text-teal-dark">
                          Atlapragada Konduru
                        </span>
                      </div>

                      {/* Other Mandals — Not functional */}
                      <div className="flex items-center gap-1.5 py-1 cursor-not-allowed px-2 text-gray-500 opacity-70">
                        <Plus className="h-4 w-4" />
                        <span className="font-medium">Chandarlapadu</span>
                      </div>

                      <div className="flex items-center gap-1.5 py-1 cursor-not-allowed px-2 text-gray-500 opacity-70">
                        <Plus className="h-4 w-4" />
                        <span className="font-medium">Gaddamanugu Konduru</span>
                      </div>
                    </div>
              }
                </div>
            }
            </div>
          }
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <div className="max-w-md w-full flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Logo */}
          <div className="mb-6 bg-white p-6 rounded-full shadow-sm border border-gray-100">
            <img
              src="/Untitled_design_(2).png"
              alt="TLLLF Logo"
              className="h-24 w-auto object-contain" />
            
          </div>

          {/* Titles */}
          <h1 className="text-2xl font-bold text-[#1a2b3c] mb-2">
            The Live Love Laugh Foundation
          </h1>
          <h2 className="text-lg font-medium text-gray-600 mb-12">
            Management Information System (MIS)
          </h2>

          {/* Selection Prompt Box */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 w-full flex items-center gap-4 text-left">
            <div className="bg-skyBlue/10 p-2 rounded-lg">
              <ArrowLeft className="h-5 w-5 text-skyBlue" />
            </div>
            <p className="text-gray-600 font-medium">
              Select an Organization from the left sidebar to get started
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-6 text-xs text-gray-400">
          © 2026 The Live Love Laugh Foundation. All rights reserved.
        </div>
      </div>
    </div>);

}