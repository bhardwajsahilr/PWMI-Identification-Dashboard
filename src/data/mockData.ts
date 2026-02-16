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
    mentalDisorderType: 'Depression',
    disabilityType: 'Mental Illness',
    mentalIllnessType: 'Moderate Depression',
    severityOfIllness: 'Moderate',
    severityRating: '3 - Moderate',
    consentGiven: 'Yes'
  },
  // Demo sub-stage entries for Kavitha
  followUpEntries: [
  {
    id: 'fu-k1',
    followUpDate: '2023-11-10',
    nextFollowUpDate: '2023-12-10',
    mode: 'Home visit',
    availedCounselling: 'Yes',
    availedTherapy: 'No',
    medicationsTaken: 'Yes',
    nonAdherenceReasons: ['Forgot to take medication'],
    otherNonAdherenceReason: '',
    sideEffectsReported: 'No',
    daysSinceOnset: '',
    sideEffectTypes: '',
    sideEffectSeverity: '',
    behaviourReported: 'None',
    caregiverSupport:
    'Moderate – Caregiver provides regular help (med reminders, check-ins) but PWMI can self-manage some tasks',
    functionalIndependence:
    'Partially Independent – Needs reminders or occasional assistance',
    severityRating:
    'Moderate – Some functional impairment; needs regular support; no recent high-risk behavior',
    completedAt: '2023-11-10T14:30:00Z'
  }],

  counsellingLogEntries: [
  {
    id: 'cl-k1',
    sessionDate: '2023-10-20',
    caseHistorySummary:
    'Kavitha lost her husband 8 months ago. She has been experiencing persistent sadness, loss of interest in daily activities, and poor sleep. Lives with her daughter who is the primary caregiver.',
    severityRating:
    'Moderate - Some functional impairment; needs regular support; no recent high-risk behavior',
    lastSessionDate: '',
    counsellingType: 'Face-to-face',
    keyObservations:
    'Persistent grief, sleep disturbance, reduced appetite. No suicidal ideation. Daughter is supportive but showing signs of caregiver fatigue.',
    completedAt: '2023-10-20T11:00:00Z'
  }],

  supportGroupEntries: [
  {
    id: 'sg-k1',
    reportDate: '2023-11-05',
    attended: 'Yes',
    topicName1: 'Coping with grief and loss — sharing personal experiences',
    topicName2: '',
    topicName3: '',
    topicName4: '',
    topicName5: '',
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
    mentalDisorderType: 'Schizophrenia',
    disabilityType: 'Mental Illness',
    mentalIllnessType: 'Schizophrenia',
    severityOfIllness: 'Severe',
    severityRating: '5 - Severe',
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
    mentalDisorderType: 'Depression',
    disabilityType: 'Mental Illness',
    mentalIllnessType: 'Mild Depression',
    severityOfIllness: 'Mild',
    severityRating: '2 - Mild',
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
    nextFollowUpDate: '2023-11-22',
    mode: 'In-person',
    availedCounselling: 'Yes',
    availedTherapy: 'No',
    medicationsTaken: 'Yes',
    nonAdherenceReasons: [],
    otherNonAdherenceReason: '',
    sideEffectsReported: 'No',
    daysSinceOnset: '',
    sideEffectTypes: '',
    sideEffectSeverity: '',
    behaviourReported: 'None',
    caregiverSupport:
    'Low – PWMI is largely independent; caregiver support is occasional',
    functionalIndependence:
    'Partially Independent – Needs reminders or occasional assistance',
    severityRating: 'Mild – Symptoms manageable; PWMI largely functional',
    completedAt: '2023-10-22T10:30:00Z'
  },
  {
    id: 'fu-d2',
    followUpDate: '2023-11-22',
    nextFollowUpDate: '2023-12-22',
    mode: 'Home visit',
    availedCounselling: 'Yes',
    availedTherapy: 'No',
    medicationsTaken: 'Yes',
    nonAdherenceReasons: [],
    otherNonAdherenceReason: '',
    sideEffectsReported: 'No',
    daysSinceOnset: '',
    sideEffectTypes: '',
    sideEffectSeverity: '',
    behaviourReported: 'None',
    caregiverSupport:
    'Low – PWMI is largely independent; caregiver support is occasional',
    functionalIndependence:
    'Independent – Manages self-care, work, and daily tasks without help',
    severityRating: 'Mild – Symptoms manageable; PWMI largely functional',
    completedAt: '2023-11-22T11:00:00Z'
  }],

  counsellingLogEntries: [
  {
    id: 'cl-d1',
    sessionDate: '2023-10-05',
    caseHistorySummary:
    'Deepa experienced social withdrawal after failing college entrance exams. She stopped talking to family and friends, stayed in her room for weeks. No suicidal ideation. Supportive family environment.',
    severityRating: 'Mild - Symptoms manageable; PWMI largely functional',
    lastSessionDate: '',
    counsellingType: 'Face-to-face',
    keyObservations:
    'Social withdrawal, low self-esteem, feelings of failure. Responsive to conversation. Expressed interest in learning new skills.',
    completedAt: '2023-10-05T14:00:00Z'
  },
  {
    id: 'cl-d2',
    sessionDate: '2023-10-12',
    caseHistorySummary:
    'Second session. Deepa opened up about feeling like a failure. Discussed cognitive reframing techniques. She expressed interest in learning tailoring.',
    severityRating: 'Mild - Symptoms manageable; PWMI largely functional',
    lastSessionDate: '2023-10-05',
    counsellingType: 'Face-to-face',
    keyObservations:
    'Improved engagement. Beginning to reframe negative thoughts. Motivated by vocational training prospect.',
    completedAt: '2023-10-12T15:00:00Z'
  },
  {
    id: 'cl-d3',
    sessionDate: '2023-10-26',
    caseHistorySummary:
    'Third session. Deepa attended her first support group meeting and found it helpful. She has enrolled in tailoring training. Mood is noticeably better.',
    severityRating: 'Mild - Symptoms manageable; PWMI largely functional',
    lastSessionDate: '2023-10-12',
    counsellingType: 'Phone call',
    keyObservations:
    'Significant improvement in social interaction. Started talking to neighbours again. Enrolled in vocational training.',
    completedAt: '2023-10-26T14:30:00Z'
  }],

  beneficiarySchemeEntries: [
  {
    id: 'bs-d1',
    reportDate: '2023-10-15',
    dueDate: '2023-11-15',
    schemeApplied: 'BPL card',
    applicationDate: '2023-10-10',
    currentStatus: 'Approved',
    benefitsReceived: 'Yes',
    rejectionReason: '',
    completedAt: '2023-10-15T09:00:00Z'
  },
  {
    id: 'bs-d2',
    reportDate: '2023-11-20',
    dueDate: '2023-12-20',
    schemeApplied: 'Health insurance',
    applicationDate: '2023-11-18',
    currentStatus: 'In process',
    benefitsReceived: 'No',
    rejectionReason: 'Verification Pending',
    completedAt: '2023-11-20T11:00:00Z'
  }],

  selfEmploymentData: {
    reportDate: '2023-11-01',
    annualHouseholdIncome: '72000',
    monthlyHouseholdIncome: '6000',
    selfEmploymentInterest: 'Tailoring and garment stitching',
    amountDisbursed: '15000',
    disbursementDate: '2023-11-10',
    completedAt: '2023-11-01T10:00:00Z'
  },
  vocationalTrainingEntries: [
  {
    id: 'vt-d1',
    reportDate: '2023-10-20',
    trainingDate: '2023-10-25',
    provider: 'NGO',
    trainingApplied: 'Beautification',
    applicationDate: '2023-10-18',
    applicationStatus: 'Approved',
    rejectionReason: '',
    trainingStarted: 'Yes',
    trainingCompleted: 'Yes',
    employmentStatus: 'Self-employed',
    otherEmploymentStatus: '',
    completedAt: '2023-10-20T10:00:00Z'
  },
  {
    id: 'vt-d2',
    reportDate: '2023-12-01',
    trainingDate: '2023-12-05',
    provider: 'Government Body',
    trainingApplied: 'Computer',
    applicationDate: '2023-11-28',
    applicationStatus: 'Enrolled',
    rejectionReason: '',
    trainingStarted: 'Yes',
    trainingCompleted: 'No',
    employmentStatus: '',
    otherEmploymentStatus: '',
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
    reportDate: '2023-10-18',
    attended: 'Yes',
    topicName1:
    'Understanding depression — signs, symptoms, and recovery journey',
    topicName2: 'Sharing personal experiences and coping strategies',
    topicName3: '',
    topicName4: '',
    topicName5: '',
    completedAt: '2023-10-18T16:30:00Z'
  },
  {
    id: 'sg-d2',
    reportDate: '2023-11-15',
    attended: 'Yes',
    topicName1: 'Building self-confidence and setting small daily goals',
    topicName2: 'Peer support and encouragement techniques',
    topicName3: '',
    topicName4: '',
    topicName5: '',
    completedAt: '2023-11-15T16:30:00Z'
  },
  {
    id: 'sg-d3',
    reportDate: '2023-12-13',
    attended: 'No',
    topicName1: 'Medication awareness and adherence',
    topicName2: '',
    topicName3: '',
    topicName4: '',
    topicName5: '',
    completedAt: '2023-12-13T16:30:00Z'
  }],

  psychoSocialEntries: [
  {
    id: 'ps-d1',
    reportDate: '2023-10-22',
    dueDate: '2023-10-29',
    attended: 'Yes',
    topicName1: 'Stress management and relaxation techniques',
    topicName2: 'Identifying triggers and coping strategies',
    topicName3: '',
    topicName4: '',
    topicName5: '',
    completedAt: '2023-10-22T14:00:00Z'
  },
  {
    id: 'ps-d2',
    reportDate: '2023-11-19',
    dueDate: '2023-11-26',
    attended: 'Yes',
    topicName1: 'Family communication and conflict resolution',
    topicName2: 'Building healthy daily routines',
    topicName3: 'Self-esteem and positive self-talk',
    topicName4: '',
    topicName5: '',
    completedAt: '2023-11-19T14:00:00Z'
  }],

  advocacyMeetingEntries: [
  {
    id: 'am-d1',
    reportDate: '2023-11-05',
    dueDate: '2023-11-12',
    attended: 'Yes',
    meetingType: 'Program Awareness and Sensitization',
    otherMeetingType: '',
    topicName1: 'Mental health awareness in the community',
    topicName2: 'Reducing stigma around mental illness',
    topicName3: '',
    topicName4: '',
    topicName5: '',
    completedAt: '2023-11-05T11:00:00Z'
  },
  {
    id: 'am-d2',
    reportDate: '2023-12-10',
    dueDate: '2023-12-17',
    attended: 'Yes',
    meetingType: 'PWMI/Caregiver Rights and Support',
    otherMeetingType: '',
    topicName1: 'Rights of persons with mental illness',
    topicName2: 'Government schemes and entitlements',
    topicName3: 'Caregiver support resources',
    topicName4: '',
    topicName5: '',
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