import React from 'react';
import { usePatient } from '../context/PatientContext';
import { SubStageNav } from './registration/SubStageNav';
import { IdentificationSummary } from './registration/IdentificationSummary';
import { FollowUpForm } from './registration/FollowUpForm';
import { CounsellingLogForm } from './registration/CounsellingLogForm';
import { BeneficiarySchemeForm } from './registration/BeneficiarySchemeForm';
import { SelfEmploymentForm } from './registration/SelfEmploymentForm';
import { VocationalTrainingForm } from './registration/VocationalTrainingForm';
import { CaregiverBurdenForm } from './registration/CaregiverBurdenForm';
import { SupportGroupForm } from './registration/SupportGroupForm';
import { PsychoSocialForm } from './registration/PsychoSocialForm';
import { AdvocacyMeetingForm } from './registration/AdvocacyMeetingForm';
import { Badge } from './ui/Badge';
export function RegistrationForm() {
  const { selectedPatient: patient, activeSubStage } = usePatient();
  if (!patient) return null;
  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Fixed Patient Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-softPink/30 flex items-center justify-center text-coral font-bold text-lg flex-shrink-0">
            {patient.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-neutral-text truncate">
                {patient.name}
              </h2>
              <Badge
                variant={patient.status === 'Completed' ? 'teal' : 'softPink'}>
                
                {patient.status}
              </Badge>
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
            <div className="flex items-center gap-3 text-sm text-neutral-secondary mt-0.5">
              <span>{patient.age} Years</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <span>{patient.village}</span>
              <span>•</span>
              <span className="font-mono text-xs tracking-wider">
                {patient.phone.replace(/(\d{2})(\d{4})(\d{4})/, '+91 $1 $2 $3')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content: Vertical Sidebar + Form */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Vertical Sub-Stage Navigation */}
        <SubStageNav />

        {/* Right: Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 min-w-0">
          <div className="max-w-4xl mx-auto w-full">
            {activeSubStage === 'identification-summary' &&
            <IdentificationSummary />
            }
            {activeSubStage === 'follow-up' && <FollowUpForm />}
            {activeSubStage === 'counselling-log' && <CounsellingLogForm />}
            {activeSubStage === 'beneficiary-scheme' &&
            <BeneficiarySchemeForm />
            }
            {activeSubStage === 'self-employment' && <SelfEmploymentForm />}
            {activeSubStage === 'vocational-training' &&
            <VocationalTrainingForm />
            }
            {activeSubStage === 'caregiver-burden' && <CaregiverBurdenForm />}
            {activeSubStage === 'support-group' && <SupportGroupForm />}
            {activeSubStage === 'psycho-social' && <PsychoSocialForm />}
            {activeSubStage === 'advocacy-meeting' && <AdvocacyMeetingForm />}
          </div>
        </div>
      </div>
    </div>);

}