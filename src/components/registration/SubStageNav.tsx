import React from 'react';
import { usePatient } from '../../context/PatientContext';
import { RegistrationSubStage } from '../../types';
import {
  ClipboardList,
  CalendarCheck,
  MessageSquare,
  Gift,
  Briefcase,
  GraduationCap,
  Heart,
  Users,
  Brain,
  Megaphone } from
'lucide-react';
export function SubStageNav() {
  const { activeSubStage, setActiveSubStage } = usePatient();
  const stages: {
    id: RegistrationSubStage;
    label: string;
    icon: React.ReactNode;
  }[] = [
  {
    id: 'identification-summary',
    label: 'Identification Summary',
    icon: <ClipboardList className="h-4 w-4" />
  },
  {
    id: 'follow-up',
    label: 'Follow-Up',
    icon: <CalendarCheck className="h-4 w-4" />
  },
  {
    id: 'counselling-log',
    label: 'Counselling Log',
    icon: <MessageSquare className="h-4 w-4" />
  },
  {
    id: 'beneficiary-scheme',
    label: 'Beneficiary Schemes',
    icon: <Gift className="h-4 w-4" />
  },
  {
    id: 'self-employment',
    label: 'Self Employment',
    icon: <Briefcase className="h-4 w-4" />
  },
  {
    id: 'vocational-training',
    label: 'Vocational Training',
    icon: <GraduationCap className="h-4 w-4" />
  },
  {
    id: 'caregiver-burden',
    label: 'Caregiver Burden',
    icon: <Heart className="h-4 w-4" />
  },
  {
    id: 'support-group',
    label: 'Support Group',
    icon: <Users className="h-4 w-4" />
  },
  {
    id: 'psycho-social',
    label: 'Psycho-social Education',
    icon: <Brain className="h-4 w-4" />
  },
  {
    id: 'advocacy-meeting',
    label: 'Advocacy Meeting',
    icon: <Megaphone className="h-4 w-4" />
  }];

  return (
    <div className="w-[220px] flex-shrink-0 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 pt-4 pb-2">
        Sub-Stages
      </div>
      <nav className="flex flex-col py-1">
        {stages.map((stage) => {
          const isActive = activeSubStage === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveSubStage(stage.id)}
              className={`
                flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-left transition-colors w-full
                ${isActive ? 'bg-teal/10 text-teal border-l-3 border-teal' : 'text-gray-600 border-l-3 border-transparent hover:bg-gray-50 hover:text-gray-900'}
              `}>
              
              <span
                className={`flex-shrink-0 ${isActive ? 'text-teal' : 'text-gray-400'}`}>
                
                {stage.icon}
              </span>
              <span className="truncate">{stage.label}</span>
            </button>);

        })}
      </nav>
    </div>);

}