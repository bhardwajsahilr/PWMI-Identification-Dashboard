import React from 'react';
import { usePatient } from '../../context/PatientContext';
import { RegistrationSubStage } from '../../types';
export function SubStageNav() {
  const { activeSubStage, setActiveSubStage } = usePatient();
  const stages: {
    id: RegistrationSubStage;
    label: string;
  }[] = [
  {
    id: 'screening-diagnosis',
    label: 'Screening & Diagnosis'
  },
  {
    id: 'follow-up',
    label: 'Follow-Up'
  },
  {
    id: 'counselling-log',
    label: 'Counselling Log'
  },
  {
    id: 'beneficiary-scheme',
    label: 'Beneficiary Scheme'
  },
  {
    id: 'self-employment',
    label: 'Self Employment'
  },
  {
    id: 'vocational-training',
    label: 'Vocational Training'
  },
  {
    id: 'caregiver-burden',
    label: 'Caregiver Burden'
  },
  {
    id: 'support-group',
    label: 'Support Group'
  },
  {
    id: 'psycho-social',
    label: 'Psycho-social Education'
  },
  {
    id: 'advocacy-meeting',
    label: 'Advocacy Meeting'
  }];

  return (
    <div className="bg-white border-b border-gray-200 overflow-x-auto scrollbar-hide">
      <div className="flex px-4 min-w-max">
        {stages.map((stage) =>
        <button
          key={stage.id}
          onClick={() => setActiveSubStage(stage.id)}
          className={`
              px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2
              ${activeSubStage === stage.id ? 'text-teal border-teal' : 'text-neutral-secondary border-transparent hover:text-teal hover:bg-teal/5'}
            `}>

            {stage.label}
          </button>
        )}
      </div>
    </div>);

}