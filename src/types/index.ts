export type RiskLevel = 'Low' | 'Moderate' | 'High';
export type Status = 'Pending' | 'Referred' | 'Completed';
export type ModuleTab = 'identification' | 'registration' | 'monthly-monitoring';

export type RegistrationSubStage =
'identification-summary' |
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
  // Referral fields
  pwmiReferred: string;
  dateOfReferral: string;
  referralFacility: string;
  mentalHealthFacilityName: string;
  // Mental Disorder & Disability Details
  mentalDisorderType: string;
  disabilityType: string;
  // Mental Illness Diagnosis
  mentalIllnessType: string;
  severityOfIllness: string;
  severityRating: string;
  // Consent
  consentGiven: string;
  completedAt?: string;
}

export interface RegistrationFormData {
  symptoms: string[];
  otherSymptoms: string;
  functionalImpacts: string[];
  otherImpacts: string;
  suicidalThoughts: boolean;
  riskLevel: RiskLevel;
  riskNotes: string;
  referralFacility: string;
  mentalHealthFacility: string;
  referralDate: string;
  mentalDisorderType: string;
  disabilityType: string;
  mentalIllnessType: string;
  severityOfIllness: string;
  severityRating: string;
  consentGiven: boolean;
  enrollmentCompleted: boolean;
  completedAt?: string;
}

// === NEW REPEATABLE ENTRY TYPES ===

export interface FollowUpEntry {
  id: string;
  followUpDate: string; // required
  nextFollowUpDate: string;
  mode: string;
  availedCounselling: string; // Yes / No
  availedTherapy: string; // Yes / No
  medicationsTaken: string; // Yes / No
  // Non-adherence reasons (checkboxes)
  nonAdherenceReasons: string[];
  otherNonAdherenceReason: string;
  // Side effects
  sideEffectsReported: string; // Yes / No
  daysSinceOnset: string;
  sideEffectTypes: string;
  sideEffectSeverity: string;
  // Caregiver observations
  behaviourReported: string; // Aggression / Self-harm / Wandering / None
  caregiverSupport: string; // High / Moderate / Low
  functionalIndependence: string; // Independent / Partially Independent / Dependent
  severityRating: string; // Mild / Moderate / Severe
  completedAt?: string;
}

export interface CounsellingLogEntry {
  id: string;
  sessionDate: string; // Date of counselling (required)
  caseHistorySummary: string; // Summary of case history
  severityRating: string; // Mild / Moderate / Severe
  lastSessionDate: string; // Last counselling session date
  counsellingType: string; // Face-to-face / Video call / Phone call
  keyObservations: string; // Key clinical observations
  completedAt?: string;
}

export interface BeneficiarySchemeEntry {
  id: string;
  reportDate: string;
  dueDate: string;
  schemeApplied: string;
  applicationDate: string;
  currentStatus: string; // Submitted / Enrolled / In process / Rejected / Approved / Pending
  benefitsReceived: string; // Yes / No
  rejectionReason: string; // Missing Documents / Verification Pending / Ineligible
  completedAt?: string;
}

export interface SelfEmploymentData {
  reportDate: string;
  annualHouseholdIncome: string;
  monthlyHouseholdIncome: string;
  selfEmploymentInterest: string;
  amountDisbursed: string;
  disbursementDate: string;
  completedAt?: string;
}

export interface VocationalTrainingEntry {
  id: string;
  reportDate: string;
  trainingDate: string;
  provider: string; // Government Body / NGO
  trainingApplied: string; // Beautification / Plumbing / Computer
  applicationDate: string;
  applicationStatus: string; // Submitted / Enrolled / In process / Rejected / Approved / Pending
  rejectionReason: string; // Missing Documents / Verification Pending / Ineligible
  trainingStarted: string; // Yes / No
  trainingCompleted: string; // Yes / No
  employmentStatus: string; // Employed / Self-employed / Unemployed / Others (specify)
  otherEmploymentStatus: string;
  completedAt?: string;
}

export interface CaregiverBurdenData {
  // Zarit Burden Interview - 22 questions
  // Likert scale: 0=Never, 1=Rarely, 2=Sometimes, 3=Frequently, 4=Nearly Always
  responses: Record<string, number>;
  // Auto-calculated
  burdenScore: number;
  burdenLevel: string; // Low / Moderate / Moderate to Severe / Severe
  assessmentDate: string;
  completedAt?: string;
}

export interface SupportGroupEntry {
  id: string;
  reportDate: string;
  attended: string; // Yes / No
  topicName1: string;
  topicName2: string;
  topicName3: string;
  topicName4: string;
  topicName5: string;
  completedAt?: string;
}

export interface PsychoSocialEntry {
  id: string;
  reportDate: string;
  dueDate: string;
  attended: string; // Yes / No
  topicName1: string;
  topicName2: string;
  topicName3: string;
  topicName4: string;
  topicName5: string;
  completedAt?: string;
}

export interface AdvocacyMeetingEntry {
  id: string;
  reportDate: string;
  dueDate: string;
  attended: string; // Yes / No
  meetingType: string;
  otherMeetingType: string;
  topicName1: string;
  topicName2: string;
  topicName3: string;
  topicName4: string;
  topicName5: string;
  completedAt?: string;
}

export interface MonthlyMonitoringData {
  id: string;
  monitoringDate: string;
  monitoringMonth: string;
  blockSupervisorName: string;
  fieldCoordinatorName: string;
  activitiesDone: string[];
  activityComments: string;
  issuesFound: string[];
  otherIssues: string;
  actionsTaken: string[];
  additionalActions: string;
  overallRating: string;
  nextReviewDate: string;
  supervisorRemarks: string;
  completedAt?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  village: string;
  status: Status;
  riskLevel: RiskLevel;
  education?: string;
  maritalStatus?: string;
  caste?: string;
  socioEconomic?: string;
  address?: string;
  panchayat?: string;
  familyMembers?: number;
  dateIdentified?: string;
  informantName?: string;
  informantRelation?: string;
  fieldWorker?: string;
  dateOfBirth?: string;
  enrollmentDate?: string;
  incidentDate?: string;
  enrollingOrgUnit?: string;
  referredBySomeone?: string;
  referrerContact?: string;
  referrerName?: string;
  primaryCaregiver?: string;
  sourceOfInformation?: string;

  // Form Data Persistence
  identificationData?: IdentificationFormData;
  registrationData?: RegistrationFormData;

  // Sub-stage data persistence (Repeatable Arrays)
  followUpEntries?: FollowUpEntry[];
  counsellingLogEntries?: CounsellingLogEntry[];
  beneficiarySchemeEntries?: BeneficiarySchemeEntry[];
  selfEmploymentData?: SelfEmploymentData; // Single
  vocationalTrainingEntries?: VocationalTrainingEntry[];
  caregiverBurdenData?: CaregiverBurdenData; // Single
  supportGroupEntries?: SupportGroupEntry[];
  psychoSocialEntries?: PsychoSocialEntry[];
  advocacyMeetingEntries?: AdvocacyMeetingEntry[];
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
  status: string;
}