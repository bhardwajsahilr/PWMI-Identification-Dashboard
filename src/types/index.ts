export type RiskLevel = 'Low' | 'Moderate' | 'High';
export type Status = 'Pending' | 'Referred' | 'Completed';
export type ModuleTab = 'identification' | 'registration' | 'monthly-monitoring';

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
  // Referral fields
  pwmiReferred: string;
  dateOfReferral: string;
  referralFacility: string;
  mentalHealthFacilityName: string;
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
  followUpDate: string;
  mode: string; // In-person / Phone / Home visit
  availedCounselling: boolean;
  medicationAdherence: string; // Good / Fair / Poor / Stopped
  currentTreatmentStatus: string; // Active / Discontinued / Changed / Referred
  nextFollowUpDate: string;
  // Conditional: non-adherence reasons
  nonAdherenceReasons: string[];
  otherNonAdherenceReason: string;
  // Conditional: side effects
  sideEffectsReported: boolean;
  daysSinceSideEffects: string;
  sideEffectTypes: string[];
  // Caregiver observations
  caregiverBehaviour: string;
  caregiverFeedback: string;
  changesObserved: string;
  completedAt?: string;
}

export interface CounsellingLogEntry {
  id: string;
  sessionDate: string;
  caseHistorySummary: string;
  severityRating: string; // 1-5
  counsellingType: string; // Individual / Family / Group / Crisis
  actionPlan: string;
  nextSessionDate: string;
  completedAt?: string;
}

export interface BeneficiarySchemeEntry {
  id: string;
  schemeApplied: string;
  applicationDate: string;
  currentStatus: string; // Applied / Approved / Rejected / In progress
  benefitsReceived: string;
  completedAt?: string;
}

export interface SelfEmploymentData {
  annualHouseholdIncome: string;
  monthlyHouseholdIncome: string;
  natureOfEmployment: string;
  otherNatureSpecify: string;
  dateStarted: string;
  completedAt?: string;
}

export interface VocationalTrainingEntry {
  id: string;
  provider: string;
  trainingApplied: string;
  enrolmentDate: string;
  completionStatus: string; // Enrolled / Ongoing / Completed / Dropped
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
  attended: string; // Yes/No or count
  topicDiscussed: string;
  meetingDate: string;
  completedAt?: string;
}

export interface PsychoSocialEntry {
  id: string;
  attended: string; // Yes/No or count
  topicName: string;
  sessionDate: string;
  facilitatorName: string;
  completedAt?: string;
}

export interface AdvocacyMeetingEntry {
  id: string;
  attended: string; // Yes/No or count
  meetingType: string;
  institutionName: string;
  meetingDate: string;
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
  familyMembers?: number;
  dateIdentified?: string;
  informantName?: string;
  informantRelation?: string;
  fieldWorker?: string;
  dateOfBirth?: string;

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