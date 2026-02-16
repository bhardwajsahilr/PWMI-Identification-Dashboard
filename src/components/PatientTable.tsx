import React from 'react';
import { Search, Plus, ArrowUpDown } from 'lucide-react';
import { Patient, FilterState, ModuleTab } from '../types';
import { Button } from './ui/Button';
function getConsentStatus(patient: Patient): {
  label: string;
  color: string;
} {
  const consent = patient.identificationData?.consentGiven;
  if (consent === 'Yes')
  return {
    label: 'Consent Given',
    color: 'bg-teal/10 text-teal'
  };
  if (consent === 'No')
  return {
    label: 'Consent Not Given',
    color: 'bg-coral/10 text-coral'
  };
  return {
    label: 'Consent Pending',
    color: 'bg-gray-100 text-gray-500'
  };
}
interface PatientTableProps {
  patients: Patient[];
  onSelectPatient: (id: string) => void;
  onAddNew: () => void;
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  activeTab: ModuleTab;
}
export function PatientTable({
  patients,
  onSelectPatient,
  onAddNew,
  filter,
  onFilterChange,
  activeTab
}: PatientTableProps) {
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
    p.name.toLowerCase().includes(filter.search.toLowerCase()) ||
    p.phone.includes(filter.search) ||
    p.village.toLowerCase().includes(filter.search.toLowerCase());
    // For registration tab, only show patients with consent given
    if (activeTab === 'registration') {
      return matchesSearch && p.identificationData?.consentGiven === 'Yes';
    }
    return matchesSearch;
  });
  const stageLabel =
  activeTab === 'identification' ?
  '1. PWMI Identification' :
  '2. PWMI Registration & Services';
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white gap-4">
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded border border-gray-200 text-sm font-medium text-gray-700 flex-shrink-0">
          <span className="text-gray-500">📄</span>
          {stageLabel}
        </div>

        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, village..."
            value={filter.search}
            onChange={(e) =>
            onFilterChange({
              ...filter,
              search: e.target.value
            })
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal focus:border-teal" />

        </div>

        {activeTab === 'identification' &&
        <Button
          onClick={onAddNew}
          leftIcon={<Plus className="h-4 w-4" />}
          className="flex-shrink-0">

            Register
          </Button>
        }
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark w-1/3">

                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Name of the individual
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">

                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Gender
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">

                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Age
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">

                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Date of Birth
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">

                <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                  <ArrowUpDown className="h-3 w-3" /> Education
                </div>
              </th>
              {activeTab === 'identification' &&
              <th
                scope="col"
                className="px-6 py-3 border-b border-gray-200 font-bold text-skyBlue-dark">

                  <div className="flex items-center gap-1 cursor-pointer hover:text-skyBlue">
                    <ArrowUpDown className="h-3 w-3" /> Consent Status
                  </div>
                </th>
              }
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length === 0 ?
            <tr>
                <td
                colSpan={activeTab === 'identification' ? 6 : 5}
                className="px-6 py-10 text-center text-gray-500">

                  No patients found matching your criteria.
                </td>
              </tr> :

            filteredPatients.map((patient) => {
              const consent = getConsentStatus(patient);
              return (
                <tr
                  key={patient.id}
                  onClick={() => onSelectPatient(patient.id)}
                  className="bg-white border-b border-gray-100 hover:bg-teal/5 cursor-pointer transition-colors">

                    <td className="px-6 py-3 font-medium text-gray-900 border-r border-gray-100">
                      {patient.name}
                    </td>
                    <td className="px-6 py-3 text-gray-600 border-r border-gray-100">
                      {patient.gender}
                    </td>
                    <td className="px-6 py-3 text-gray-600 border-r border-gray-100">
                      {patient.age}
                    </td>
                    <td className="px-6 py-3 text-gray-600 border-r border-gray-100">
                      {patient.dateOfBirth || '-'}
                    </td>
                    <td
                    className={`px-6 py-3 text-gray-600${activeTab === 'identification' ? ' border-r border-gray-100' : ''}`}>

                      {patient.education || '-'}
                    </td>
                    {activeTab === 'identification' &&
                  <td className="px-6 py-3">
                        <span
                      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full ${consent.color}`}>

                          {consent.label}
                        </span>
                      </td>
                  }
                  </tr>);

            })
            }
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-2 border-t border-gray-200 bg-gray-50 flex items-center justify-between text-xs text-gray-600">
        <div></div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span>Number of rows per page:</span>
            <select className="border border-gray-300 rounded px-1 py-0.5 bg-white">
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span>Jump to page:</span>
            <input
              type="text"
              defaultValue="1"
              className="w-8 border border-gray-300 rounded px-1 py-0.5 text-center" />

          </div>
          <div className="flex gap-1">
            <button className="px-1 hover:text-black">«</button>
            <button className="px-1 hover:text-black">‹</button>
            <span className="font-medium text-black">1</span>
            <button className="px-1 hover:text-black">›</button>
            <button className="px-1 hover:text-black">»</button>
          </div>
        </div>
      </div>
    </div>);

}