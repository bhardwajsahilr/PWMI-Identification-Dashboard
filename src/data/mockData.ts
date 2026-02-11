import { Patient } from '../types';

export const mockPatients: Patient[] = [
{
  id: '1',
  name: 'Kavitha Gowda',
  age: 42,
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
    riskNotes: ''
  }
},
{
  id: '2',
  name: 'Manjunath Shetty',
  age: 35,
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
    riskNotes: 'Immediate referral to KIMS Hubballi initiated.'
  }
},
{
  id: '3',
  name: 'Deepa Hegde',
  age: 28,
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
  }
},
{
  id: '4',
  name: 'Saraswathi Naik',
  age: 55,
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
  gender: 'Male',
  phone: '7777777777',
  village: 'Dharwad',
  status: 'Pending',
  riskLevel: 'Low',
  education: 'Graduate',
  maritalStatus: 'Married',
  fieldWorker: 'Ganesh Bhat'
}];