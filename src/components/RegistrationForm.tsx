import React from 'react';
import { usePatient } from '../context/PatientContext';
import { SubStageNav } from './registration/SubStageNav';
import { ScreeningDiagnosisForm } from './registration/ScreeningDiagnosisForm';
import { FollowUpForm } from './registration/FollowUpForm';
import { CounsellingLogForm } from './registration/CounsellingLogForm';
import { BeneficiarySchemeForm } from './registration/BeneficiarySchemeForm';
import { SelfEmploymentForm } from './registration/SelfEmploymentForm';
import { VocationalTrainingForm } from './registration/VocationalTrainingForm';
import { CaregiverBurdenForm } from './registration/CaregiverBurdenForm';
import { SupportGroupForm } from './registration/SupportGroupForm';
import { PsychoSocialForm } from './registration/PsychoSocialForm';
import { AdvocacyMeetingForm } from './registration/AdvocacyMeetingForm';
import { User } from 'lucide-react';
export function RegistrationForm() {
  const { selectedPatient: patient, activeSubStage } = usePatient();
  if (!patient) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 text-neutral-secondary">
        <div className="text-center">
          <User className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">Select a client from the list.</p>
        </div>
      </div>);

  }
  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      <SubStageNav />

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeSubStage === 'screening-diagnosis' && <ScreeningDiagnosisForm />}
        {activeSubStage === 'follow-up' && <FollowUpForm />}
        {activeSubStage === 'counselling-log' && <CounsellingLogForm />}
        {activeSubStage === 'beneficiary-scheme' && <BeneficiarySchemeForm />}
        {activeSubStage === 'self-employment' && <SelfEmploymentForm />}
        {activeSubStage === 'vocational-training' && <VocationalTrainingForm />}
        {activeSubStage === 'caregiver-burden' && <CaregiverBurdenForm />}
        {activeSubStage === 'support-group' && <SupportGroupForm />}
        {activeSubStage === 'psycho-social' && <PsychoSocialForm />}
        {activeSubStage === 'advocacy-meeting' && <AdvocacyMeetingForm />}
      </div>
    </div>);

}