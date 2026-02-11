export type RiskLevel = 'Low' | 'Moderate' | 'High';
export type Status = 'Pending' | 'Referred' | 'Completed';
export type ModuleTab = 'identification' | 'registration' | 'reports';

export type RegistrationSubStage =
'screening-diagnosis' |
'follow-up' |
'counselling-log' |
'beneficiary-scheme' |
'self-employment' |
'vocational-training' |
'caregiver-burden' |
'support-group' |
'psycho-social' |
'advocacy-meeting';

export interface IdentificationFormData {
  screeningDate: string;
  symptoms: string[];
  otherSymptoms: string;
  functionalImpacts: string[];
  otherImpacts: string;
  suicidalThoughts: boolean;
  riskLevel: RiskLevel;
  riskNotes: string;
  completedAt?: string;
}

export interface RegistrationFormData {
  // Carry-forward from identification (editable in registration)
  symptoms: string[];
  otherSymptoms: string;
  functionalImpacts: string[];
  otherImpacts: string;
  suicidalThoughts: boolean;
  riskLevel: RiskLevel;
  riskNotes: string;

  // Accordion 4: Referral Facility
  referralFacility: string;
  mentalHealthFacility: string;
  referralDate: string;

  // Accordion 5: Mental Disorder & Disability
  mentalDisorderType: string;
  disabilityType: string;

  // Accordion 6: Diagnosis
  mentalIllnessType: string;
  severityOfIllness: string;
  severityRating: string;

  // Accordion 7: Consent
  consentGiven: boolean;
  enrollmentCompleted: boolean;

  // Meta
  completedAt?: string;
}

export interface FollowUpFormData {
  followUpDate: string;
  followUpNotes: string;
  medicationAdherence: string;
  symptomChanges: string;
  referralStatus: string;
  nextFollowUpDate: string;
  completedAt?: string;
}

export interface CounsellingLogData {
  sessionDate: string;
  sessionNumber: string;
  sessionType: string;
  keyIssuesDiscussed: string;
  interventionsUsed: string[];
  clientResponse: string;
  nextSessionDate: string;
  counsellorName: string;
  completedAt?: string;
}

export interface BeneficiarySchemeData {
  schemeName: string;
  schemeType: string;
  applicationDate: string;
  applicationStatus: string;
  benefitReceived: string;
  amount: string;
  remarks: string;
  completedAt?: string;
}

export interface SelfEmploymentData {
  activityType: string;
  startDate: string;
  skillsIdentified: string;
  trainingProvided: string;
  financialSupport: string;
  currentStatus: string;
  incomeGenerated: string;
  remarks: string;
  completedAt?: string;
}

export interface VocationalTrainingData {
  trainingType: string;
  trainingProvider: string;
  startDate: string;
  endDate: string;
  skillsLearned: string;
  certificationReceived: boolean;
  employmentStatus: string;
  remarks: string;
  completedAt?: string;
}

export interface CaregiverBurdenData {
  caregiverName: string;
  relationship: string;
  burdenLevel: string;
  assessmentDate: string;
  physicalHealth: string;
  emotionalHealth: string;
  financialImpact: string;
  supportNeeded: string[];
  referralForCaregiver: string;
  completedAt?: string;
}

export interface SupportGroupData {
  meetingDate: string;
  meetingNumber: string;
  venue: string;
  facilitator: string;
  attendeesCount: string;
  topicsDiscussed: string;
  keyOutcomes: string;
  nextMeetingDate: string;
  completedAt?: string;
}

export interface PsychoSocialData {
  sessionDate: string;
  sessionTopic: string;
  targetGroup: string;
  facilitator: string;
  attendeesCount: string;
  keyMessages: string;
  participantFeedback: string;
  nextSessionDate: string;
  completedAt?: string;
}

export interface AdvocacyMeetingData {
  meetingDate: string;
  meetingType: string;
  venue: string;
  organizer: string;
  stakeholders: string;
  agendaTopics: string;
  decisionsOutcomes: string;
  actionItems: string;
  nextMeetingDate: string;
  completedAt?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  village: string; // Panchayat
  status: Status;
  riskLevel: RiskLevel;
  education?: string;
  maritalStatus?: string;
  caste?: string;
  socioEconomic?: string;
  address?: string;
  familyMembers?: number;
  dateIdentified?: string;
  informantName?: string;
  informantRelation?: string;
  fieldWorker?: string;

  // Form Data Persistence
  identificationData?: IdentificationFormData;
  registrationData?: RegistrationFormData;

  // Sub-stage data persistence
  followUpData?: FollowUpFormData;
  counsellingLogData?: CounsellingLogData;
  beneficiarySchemeData?: BeneficiarySchemeData;
  selfEmploymentData?: SelfEmploymentData;
  vocationalTrainingData?: VocationalTrainingData;
  caregiverBurdenData?: CaregiverBurdenData;
  supportGroupData?: SupportGroupData;
  psychoSocialData?: PsychoSocialData;
  advocacyMeetingData?: AdvocacyMeetingData;
}

export type IdentificationFilter =
'All' |
'Pending' |
'Referred' |
'Completed' |
'High Risk';
export type RegistrationFilter =
'All' |
'Active' |
'High Risk' |
'Follow-up Due' |
'Completed';

export interface FilterState {
  search: string;
  status: string; // Keep as string to support both filter types
}