import { Patient, MonthlyMonitoringData } from '../types';

export const mockPatients: Patient[] = [
{
  id: '1',
  name: 'Kavitha Gowda',
  age: 42,
  dateOfBirth: '1981-03-15',
  gender: 'Female',
  phone: '9876543210',
  village: 'Mysuru',
  status: 'Pending',
  riskLevel: 'Moderate',
  education: 'Primary School',
  maritalStatus: 'Widowed',
  fieldWorker: 'Shwetha Rao',
  identificationData: {
    screeningDate: '2023-10-12',
    symptoms: ['Crying often or appearing sad', 'Poor sleep or food intake'],
    otherSymptoms: '',
    functionalImpacts: ['Unable to work or perform daily tasks'],
    otherImpacts: '',
    suicidalThoughts: false,
    riskLevel: 'Moderate',
    riskNotes: '',
    pwmiReferred: 'Yes',
    dateOfReferral: '2023-10-14',
    referralFacility: 'PHC',
    mentalHealthFacilityName: 'Mysuru DMHP Center',
    consentGiven: 'Yes'
  },
  // Demo sub-stage entries for Kavitha
  followUpEntries: [
  {
    id: 'fu-k1',
    followUpDate: '2023-11-10',
    mode: 'Home visit',
    availedCounselling: true,
    medicationAdherence: 'Fair',
    currentTreatmentStatus: 'Active',
    nextFollowUpDate: '2023-12-10',
    nonAdherenceReasons: ['Forgot to take medication'],
    otherNonAdherenceReason: '',
    sideEffectsReported: false,
    daysSinceSideEffects: '',
    sideEffectTypes: [],
    caregiverBehaviour:
    'Daughter reports mother is slightly more active but still withdrawn at times.',
    caregiverFeedback: 'Requests more frequent visits from field worker.',
    changesObserved: 'Slight improvement in appetite and sleep patterns.',
    completedAt: '2023-11-10T14:30:00Z'
  }],

  counsellingLogEntries: [
  {
    id: 'cl-k1',
    sessionDate: '2023-10-20',
    caseHistorySummary:
    'Kavitha lost her husband 8 months ago. She has been experiencing persistent sadness, loss of interest in daily activities, and poor sleep. Lives with her daughter who is the primary caregiver.',
    severityRating: '3',
    counsellingType: 'Individual',
    actionPlan:
    'Weekly supportive counselling sessions. Encourage participation in support group. Monitor sleep and appetite.',
    nextSessionDate: '2023-10-27',
    completedAt: '2023-10-20T11:00:00Z'
  }],

  supportGroupEntries: [
  {
    id: 'sg-k1',
    attended: 'Yes',
    topicDiscussed:
    'Coping with grief and loss — sharing personal experiences',
    meetingDate: '2023-11-05',
    completedAt: '2023-11-05T16:00:00Z'
  }]

},
{
  id: '2',
  name: 'Manjunath Shetty',
  age: 35,
  dateOfBirth: '1988-07-22',
  gender: 'Male',
  phone: '9898989898',
  village: 'Mangaluru',
  status: 'Referred',
  riskLevel: 'High',
  education: 'None',
  maritalStatus: 'Married',
  fieldWorker: 'Ganesh Bhat',
  identificationData: {
    screeningDate: '2023-10-15',
    symptoms: [
    'Aggression or violent behaviour',
    'Talking to self or hearing voices'],

    otherSymptoms: '',
    functionalImpacts: ['Has tried to harm self / suicidal thoughts'],
    otherImpacts: '',
    suicidalThoughts: true,
    riskLevel: 'High',
    riskNotes: 'Immediate referral to KIMS Hubballi initiated.',
    pwmiReferred: 'Yes',
    dateOfReferral: '2023-10-15',
    referralFacility: 'District Hospital',
    mentalHealthFacilityName: 'KIMS Hubballi',
    consentGiven: 'Yes'
  }
},
{
  id: '3',
  name: 'Deepa Hegde',
  age: 28,
  dateOfBirth: '1995-11-08',
  gender: 'Female',
  phone: '9123456789',
  village: 'Udupi',
  status: 'Completed',
  riskLevel: 'Low',
  education: 'High School',
  maritalStatus: 'Single',
  fieldWorker: 'Shwetha Rao',
  identificationData: {
    screeningDate: '2023-09-20',
    symptoms: ['Very quiet or not talking'],
    otherSymptoms: '',
    functionalImpacts: [],
    otherImpacts: '',
    suicidalThoughts: false,
    riskLevel: 'Low',
    riskNotes: '',
    pwmiReferred: 'Yes',
    dateOfReferral: '2023-09-22',
    referralFacility: 'PHC',
    mentalHealthFacilityName: 'DMHP Center',
    consentGiven: 'Yes',
    completedAt: '2023-09-20T10:00:00Z'
  },
  registrationData: {
    symptoms: ['Very quiet or not talking'],
    otherSymptoms: '',
    functionalImpacts: [],
    otherImpacts: '',
    suicidalThoughts: false,
    riskLevel: 'Low',
    riskNotes: '',
    referralFacility: 'PHC',
    mentalHealthFacility: 'DMHP Center',
    referralDate: '2023-09-22',
    mentalDisorderType: 'Depression',
    disabilityType: 'Mental Illness',
    mentalIllnessType: 'Mild Depression',
    severityOfIllness: 'Mild',
    severityRating: '2 - Mild',
    consentGiven: true,
    enrollmentCompleted: true,
    completedAt: '2023-09-22T14:00:00Z'
  },
  // === DEMO SUB-STAGE ENTRIES FOR DEEPA ===
  followUpEntries: [
  {
    id: 'fu-d1',
    followUpDate: '2023-10-22',
    mode: 'In-person',
    availedCounselling: true,
    medicationAdherence: 'Good',
    currentTreatmentStatus: 'Active',
    nextFollowUpDate: '2023-11-22',
    nonAdherenceReasons: [],
    otherNonAdherenceReason: '',
    sideEffectsReported: false,
    daysSinceSideEffects: '',
    sideEffectTypes: [],
    caregiverBehaviour:
    'Mother reports Deepa is more communicative and has started helping with household chores again.',
    caregiverFeedback:
    'Family is relieved to see improvement. Requests continued counselling support.',
    changesObserved:
    'Noticeable improvement in social interaction. Started talking to neighbours again.',
    completedAt: '2023-10-22T10:30:00Z'
  },
  {
    id: 'fu-d2',
    followUpDate: '2023-11-22',
    mode: 'Home visit',
    availedCounselling: true,
    medicationAdherence: 'Good',
    currentTreatmentStatus: 'Active',
    nextFollowUpDate: '2023-12-22',
    nonAdherenceReasons: [],
    otherNonAdherenceReason: '',
    sideEffectsReported: false,
    daysSinceSideEffects: '',
    sideEffectTypes: [],
    caregiverBehaviour:
    'Mother says Deepa has been attending the local tailoring class and seems motivated.',
    caregiverFeedback:
    'Very positive about the program. Wants Deepa to continue vocational training.',
    changesObserved:
    'Significant improvement. Deepa is engaging in daily activities independently.',
    completedAt: '2023-11-22T11:00:00Z'
  }],

  counsellingLogEntries: [
  {
    id: 'cl-d1',
    sessionDate: '2023-10-05',
    caseHistorySummary:
    'Deepa experienced social withdrawal after failing college entrance exams. She stopped talking to family and friends, stayed in her room for weeks. No suicidal ideation. Supportive family environment.',
    severityRating: '2',
    counsellingType: 'Individual',
    actionPlan:
    'Build rapport and trust. Introduce gradual social re-engagement activities. Explore vocational interests as alternative pathway.',
    nextSessionDate: '2023-10-12',
    completedAt: '2023-10-05T14:00:00Z'
  },
  {
    id: 'cl-d2',
    sessionDate: '2023-10-12',
    caseHistorySummary:
    'Second session. Deepa opened up about feeling like a failure. Discussed cognitive reframing techniques. She expressed interest in learning tailoring.',
    severityRating: '2',
    counsellingType: 'Individual',
    actionPlan:
    'Continue cognitive behavioural techniques. Connect with vocational training provider for tailoring course. Encourage support group attendance.',
    nextSessionDate: '2023-10-26',
    completedAt: '2023-10-12T15:00:00Z'
  },
  {
    id: 'cl-d3',
    sessionDate: '2023-10-26',
    caseHistorySummary:
    'Third session. Deepa attended her first support group meeting and found it helpful. She has enrolled in tailoring training. Mood is noticeably better.',
    severityRating: '1',
    counsellingType: 'Individual',
    actionPlan:
    'Reduce session frequency to bi-weekly. Monitor progress in vocational training. Continue support group participation.',
    nextSessionDate: '2023-11-09',
    completedAt: '2023-10-26T14:30:00Z'
  }],

  beneficiarySchemeEntries: [
  {
    id: 'bs-d1',
    schemeApplied: 'Disability pension',
    applicationDate: '2023-10-15',
    currentStatus: 'Approved',
    benefitsReceived:
    'Monthly pension of ₹1,500 approved and disbursement started from November 2023.',
    completedAt: '2023-10-15T12:00:00Z'
  },
  {
    id: 'bs-d2',
    schemeApplied: 'Health insurance',
    applicationDate: '2023-11-01',
    currentStatus: 'In progress',
    benefitsReceived: '',
    completedAt: '2023-11-01T10:00:00Z'
  }],

  selfEmploymentData: {
    annualHouseholdIncome: '72000',
    monthlyHouseholdIncome: '6000',
    natureOfEmployment: 'Tailoring',
    otherNatureSpecify: '',
    dateStarted: '2023-11-15',
    completedAt: '2023-11-15T09:00:00Z'
  },
  vocationalTrainingEntries: [
  {
    id: 'vt-d1',
    provider: "Udupi Women's Self Help Group",
    trainingApplied: 'Tailoring',
    enrolmentDate: '2023-10-20',
    completionStatus: 'Completed',
    completedAt: '2023-10-20T10:00:00Z'
  },
  {
    id: 'vt-d2',
    provider: 'District Skill Development Centre',
    trainingApplied: 'Computer skills',
    enrolmentDate: '2023-12-01',
    completionStatus: 'Ongoing',
    completedAt: '2023-12-01T09:00:00Z'
  }],

  caregiverBurdenData: {
    responses: {
      q0: 1,
      q1: 2,
      q2: 2,
      q3: 0,
      q4: 0,
      q5: 1,
      q6: 2,
      q7: 1,
      q8: 1,
      q9: 1,
      q10: 1,
      q11: 1,
      q12: 0,
      q13: 2,
      q14: 2,
      q15: 1,
      q16: 1,
      q17: 0,
      q18: 1,
      q19: 2,
      q20: 1,
      q21: 1
    },
    burdenScore: 22,
    burdenLevel: 'Moderate',
    assessmentDate: '2023-10-25',
    completedAt: '2023-10-25T15:00:00Z'
  },
  supportGroupEntries: [
  {
    id: 'sg-d1',
    attended: 'Yes',
    topicDiscussed:
    'Understanding depression — signs, symptoms, and recovery journey',
    meetingDate: '2023-10-18',
    completedAt: '2023-10-18T16:30:00Z'
  },
  {
    id: 'sg-d2',
    attended: 'Yes',
    topicDiscussed:
    'Building self-confidence and setting small daily goals',
    meetingDate: '2023-11-15',
    completedAt: '2023-11-15T16:30:00Z'
  },
  {
    id: 'sg-d3',
    attended: 'No',
    topicDiscussed: 'Medication awareness and adherence',
    meetingDate: '2023-12-13',
    completedAt: '2023-12-13T16:30:00Z'
  }],

  psychoSocialEntries: [
  {
    id: 'ps-d1',
    attended: 'Yes',
    topicName: 'Stress management and relaxation techniques',
    sessionDate: '2023-10-22',
    facilitatorName: 'Dr. Meera Nair',
    completedAt: '2023-10-22T14:00:00Z'
  },
  {
    id: 'ps-d2',
    attended: 'Yes',
    topicName: 'Family communication and conflict resolution',
    sessionDate: '2023-11-19',
    facilitatorName: 'Shwetha Rao',
    completedAt: '2023-11-19T14:00:00Z'
  }],

  advocacyMeetingEntries: [
  {
    id: 'am-d1',
    attended: 'Yes',
    meetingType: 'Panchayat meeting',
    institutionName: 'Udupi Gram Panchayat',
    meetingDate: '2023-11-05',
    completedAt: '2023-11-05T11:00:00Z'
  },
  {
    id: 'am-d2',
    attended: 'Yes',
    meetingType: 'Community awareness',
    institutionName: 'Udupi Community Hall — Mental Health Awareness Drive',
    meetingDate: '2023-12-10',
    completedAt: '2023-12-10T10:00:00Z'
  }]

},
{
  id: '4',
  name: 'Saraswathi Naik',
  age: 55,
  dateOfBirth: '1968-01-20',
  gender: 'Female',
  phone: '8888888888',
  village: 'Belagavi',
  status: 'Pending',
  riskLevel: 'High',
  education: 'None',
  maritalStatus: 'Married',
  fieldWorker: 'Naveen Gowda'
},
{
  id: '5',
  name: 'Ravi Patil',
  age: 48,
  dateOfBirth: '1975-05-30',
  gender: 'Male',
  phone: '7777777777',
  village: 'Dharwad',
  status: 'Pending',
  riskLevel: 'Low',
  education: 'Graduate',
  maritalStatus: 'Married',
  fieldWorker: 'Ganesh Bhat'
}];


export const mockMonitoringRecords: MonthlyMonitoringData[] = [
{
  id: 'mon-1',
  monitoringDate: '2024-01-15',
  monitoringMonth: 'January',
  blockSupervisorName: 'Dr. Ramesh Kumar',
  fieldCoordinatorName: 'Shwetha Rao',
  activitiesDone: [
  'PWMI beneficiary details reviewed',
  'Follow-up activities conducted',
  'Medicine availability and linkage verified'],

  activityComments:
  'All beneficiaries visited. Medicine stock adequate at PHC.',
  issuesFound: ['Incomplete forms'],
  otherIssues: '',
  actionsTaken: ['Enhance documentation and monitoring'],
  additionalActions: 'Conducted brief training session on form completion.',
  overallRating: 'Good',
  nextReviewDate: '2024-02-15',
  supervisorRemarks:
  'Field coordinator performing well. Minor documentation gaps addressed on-site.',
  completedAt: '2024-01-15T16:30:00Z'
},
{
  id: 'mon-2',
  monitoringDate: '2024-02-12',
  monitoringMonth: 'February',
  blockSupervisorName: 'Dr. Ramesh Kumar',
  fieldCoordinatorName: 'Ganesh Bhat',
  activitiesDone: [
  'PWMI beneficiary details reviewed',
  'Follow-up activities conducted'],

  activityComments:
  'Two beneficiaries could not be reached due to migration.',
  issuesFound: [
  'Irregular group meetings',
  'Follow-ups not done',
  'Documentation gaps'],

  otherIssues: 'Two families relocated temporarily for agricultural work.',
  actionsTaken: [
  'Group meetings conducted',
  'Re-orient and sensitize staff',
  'Re-plan support group activities'],

  additionalActions:
  'Scheduled make-up visits for migrated families upon return.',
  overallRating: 'Needs Improvement',
  nextReviewDate: '2024-03-12',
  supervisorRemarks:
  'Multiple issues identified. Coordinator needs closer supervision and support. Follow-up scheduled in 2 weeks.',
  completedAt: '2024-02-12T17:00:00Z'
},
{
  id: 'mon-3',
  monitoringDate: '2024-03-10',
  monitoringMonth: 'March',
  blockSupervisorName: 'Dr. Priya Sharma',
  fieldCoordinatorName: 'Naveen Gowda',
  activitiesDone: ['PWMI beneficiary details reviewed'],
  activityComments:
  'Only partial review completed due to coordinator absence for 2 weeks.',
  issuesFound: [
  'Irregular group meetings',
  'Incomplete forms',
  'Follow-ups not done',
  'Documentation gaps'],

  otherIssues:
  'Coordinator was on medical leave for 10 days. No backup assigned.',
  actionsTaken: ['Re-orient and sensitize staff'],
  additionalActions:
  'Escalated to district program manager for backup staffing plan.',
  overallRating: 'Critical',
  nextReviewDate: '2024-03-17',
  supervisorRemarks:
  'Critical gaps in service delivery. Immediate intervention required. Emergency review scheduled within 7 days.',
  completedAt: '2024-03-10T15:45:00Z'
}];