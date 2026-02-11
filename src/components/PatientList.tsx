import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Patient, FilterState, ModuleTab } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Input } from './ui/Input';
interface PatientListProps {
  patients: Patient[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddNew: () => void;
  filter: FilterState;
  onFilterChange: (filter: FilterState) => void;
  activeTab: ModuleTab;
}
export function PatientList({
  patients,
  selectedId,
  onSelect,
  onAddNew,
  filter,
  onFilterChange,
  activeTab
}: PatientListProps) {
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
    p.name.toLowerCase().includes(filter.search.toLowerCase()) ||
    p.phone.includes(filter.search) ||
    p.village.toLowerCase().includes(filter.search.toLowerCase());
    let matchesStatus = true;
    if (activeTab === 'identification') {
      matchesStatus =
      filter.status === 'All' ?
      true :
      filter.status === 'High Risk' ?
      p.riskLevel === 'High' :
      p.status === filter.status;
    } else {
      // Registration filters
      if (filter.status === 'All') matchesStatus = true;else
      if (filter.status === 'Active')
      matchesStatus = !!p.identificationData && p.status !== 'Completed';else
      if (filter.status === 'High Risk')
      matchesStatus = p.riskLevel === 'High';else
      if (filter.status === 'Follow-up Due')
      matchesStatus = !!p.registrationData?.referralDate; // Simplified check
      else if (filter.status === 'Completed')
      matchesStatus = p.status === 'Completed';
    }
    return matchesSearch && matchesStatus;
  });
  const identificationFilters = [
  'All',
  'Pending',
  'Referred',
  'Completed',
  'High Risk'];

  const registrationFilters = [
  'All',
  'Active',
  'High Risk',
  'Follow-up Due',
  'Completed'];

  const currentFilters =
  activeTab === 'identification' ? identificationFilters : registrationFilters;
  return (
    <div className="h-full flex flex-col bg-neutral-bg border-r border-gray-200">
      {/* Header Section */}
      <div className="p-4 space-y-4 bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, phone, village..."
            className="pl-10"
            value={filter.search}
            onChange={(e) =>
            onFilterChange({
              ...filter,
              search: e.target.value
            })
            } />

        </div>

        <Button
          onClick={onAddNew}
          className="w-full"
          leftIcon={<Plus className="h-4 w-4" />}>

          {activeTab === 'identification' ?
          'Register / Add New Client' :
          'Enroll Client'}
        </Button>

        <div className="flex flex-wrap gap-2">
          {currentFilters.map((option) =>
          <button
            key={option}
            onClick={() =>
            onFilterChange({
              ...filter,
              status: option
            })
            }
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${filter.status === option ? option === 'High Risk' ? 'bg-coral text-white border-coral' : 'bg-skyBlue text-white border-skyBlue' : option === 'High Risk' ? 'bg-white text-coral border-coral hover:bg-coral/5' : 'bg-white text-skyBlue border-skyBlue hover:bg-skyBlue/5'}`}>

              {option}
            </button>
          )}
        </div>
      </div>

      {/* List Section */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredPatients.length === 0 ?
        <div className="text-center py-10 text-neutral-secondary">
            <p>No patients found matching your criteria.</p>
          </div> :

        filteredPatients.map((patient) =>
        <Card
          key={patient.id}
          onClick={() => onSelect(patient.id)}
          accent="left"
          accentColor="softPink"
          className={`p-4 transition-all ${selectedId === patient.id ? 'ring-2 ring-teal ring-offset-2' : 'hover:translate-x-1'}`}>

              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-neutral-text">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-neutral-secondary">
                    {patient.age} Y | {patient.gender}
                  </p>
                </div>
                <Badge
              variant={patient.status === 'Completed' ? 'teal' : 'gray'}>

                  {patient.status}
                </Badge>
              </div>

              <div className="flex justify-between items-end">
                <p className="text-xs text-neutral-secondary font-medium">
                  {patient.village}
                </p>
                <Badge
              variant={
              patient.riskLevel === 'High' ?
              'coral' :
              patient.riskLevel === 'Moderate' ?
              'softPink' :
              'teal'
              }>

                  {patient.riskLevel} Risk
                </Badge>
              </div>
            </Card>
        )
        }
      </div>
    </div>);

}