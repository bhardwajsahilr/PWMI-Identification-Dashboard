import React, { useEffect, useState } from 'react';
import { usePatient } from '../context/PatientContext';
import { IdentificationFormData, RiskLevel } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Accordion } from './ui/Accordion';
import { Checkbox } from './ui/Checkbox';
import { Input, TextArea } from './ui/Input';
import {
  Activity,
  AlertTriangle,
  ClipboardCheck,
  Printer,
  Trash2,
  CheckCircle,
  Building2,
  ShieldCheck,
  Brain,
  Stethoscope } from
'lucide-react';
export function PatientForm() {
  const {
    selectedPatient: patient,
    saveIdentificationData,
    deletePatient
  } = usePatient();
  // Form State
  const [screeningDate, setScreeningDate] = useState('');
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [otherSymptoms, setOtherSymptoms] = useState('');
  const [functionalImpacts, setFunctionalImpacts] = useState<string[]>([]);
  const [otherImpacts, setOtherImpacts] = useState('');
  const [suicidalThoughts, setSuicidalThoughts] = useState(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('Low');
  const [riskNotes, setRiskNotes] = useState('');
  // Referral fields
  const [pwmiReferred, setPwmiReferred] = useState('');
  const [dateOfReferral, setDateOfReferral] = useState('');
  const [referralFacility, setReferralFacility] = useState('');
  const [mentalHealthFacilityName, setMentalHealthFacilityName] = useState('');
  // Mental Disorder & Disability
  const [mentalDisorderType, setMentalDisorderType] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  // Mental Illness Diagnosis
  const [mentalIllnessType, setMentalIllnessType] = useState('');
  const [severityOfIllness, setSeverityOfIllness] = useState('');
  const [severityRating, setSeverityRating] = useState('');
  // Consent
  const [consentGiven, setConsentGiven] = useState('');
  // Load patient data when selected patient changes
  useEffect(() => {
    if (patient) {
      const data = patient.identificationData;
      setScreeningDate(
        data?.screeningDate || new Date().toISOString().split('T')[0]
      );
      setSymptoms(data?.symptoms || []);
      setOtherSymptoms(data?.otherSymptoms || '');
      setFunctionalImpacts(data?.functionalImpacts || []);
      setOtherImpacts(data?.otherImpacts || '');
      setSuicidalThoughts(data?.suicidalThoughts || false);
      setRiskLevel(data?.riskLevel || patient.riskLevel || 'Low');
      setRiskNotes(data?.riskNotes || '');
      setPwmiReferred(data?.pwmiReferred || '');
      setDateOfReferral(data?.dateOfReferral || '');
      setReferralFacility(data?.referralFacility || '');
      setMentalHealthFacilityName(data?.mentalHealthFacilityName || '');
      setMentalDisorderType(data?.mentalDisorderType || '');
      setDisabilityType(data?.disabilityType || '');
      setMentalIllnessType(data?.mentalIllnessType || '');
      setSeverityOfIllness(data?.severityOfIllness || '');
      setSeverityRating(data?.severityRating || '');
      setConsentGiven(data?.consentGiven || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSymptomChange = (label: string, checked: boolean) => {
    if (checked) setSymptoms([...symptoms, label]);else
    setSymptoms(symptoms.filter((s) => s !== label));
  };
  const handleImpactChange = (label: string, checked: boolean) => {
    if (checked) setFunctionalImpacts([...functionalImpacts, label]);else
    setFunctionalImpacts(functionalImpacts.filter((i) => i !== label));
  };
  const handleSave = (markCompleted = false) => {
    const formData: IdentificationFormData = {
      screeningDate,
      symptoms,
      otherSymptoms,
      functionalImpacts,
      otherImpacts,
      suicidalThoughts,
      riskLevel,
      riskNotes,
      pwmiReferred,
      dateOfReferral,
      referralFacility,
      mentalHealthFacilityName,
      mentalDisorderType,
      disabilityType,
      mentalIllnessType,
      severityOfIllness,
      severityRating,
      consentGiven,
      completedAt: markCompleted ? new Date().toISOString() : undefined
    };
    saveIdentificationData(patient.id, formData, markCompleted);
  };
  const symptomList = [
  'Withdrawal from people or activities',
  'Talking to self or hearing voices (hallucinations)',
  'Aggression or violent behaviour',
  'Not maintaining hygiene (not bathing, dirty clothes)',
  'Strange beliefs or delusions (e.g. someone is watching me)',
  'Crying often or appearing very sad',
  'Suspiciousness or fear of others',
  'Very quiet or not talking',
  'Poor sleep or food intake',
  'Wandering without reason'];

  const impactList = [
  'Unable to work or do usual tasks',
  'Needs help for bathing, dressing, etc.',
  'Caregiver feels burdened or tired',
  'Kept away or avoided by the community'];

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto w-full">
        {/* Patient Header Card */}
        <Card accent="top" accentColor="softPink" className="p-6">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="h-16 w-16 rounded-full bg-softPink/30 flex items-center justify-center text-coral font-bold text-xl">
                {patient.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-neutral-text">
                  {patient.name}
                </h2>
                <div className="flex items-center gap-3 text-neutral-secondary mt-1">
                  <span>{patient.age} Years</span>
                  <span>•</span>
                  <span>{patient.gender}</span>
                  <span>•</span>
                  <span className="font-mono tracking-wider">
                    {patient.phone.replace(
                      /(\d{2})(\d{4})(\d{4})/,
                      '+91 $1 $2 $3'
                    )}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <Badge variant="gray">{patient.village}</Badge>
                  <Badge
                    variant={
                    patient.status === 'Completed' ? 'teal' : 'softPink'
                    }>
                    
                    {patient.status}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Printer className="h-4 w-4" />}>
                
                Print
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                leftIcon={<Trash2 className="h-4 w-4" />}
                onClick={() => deletePatient(patient.id)}>
                
                Delete
              </Button>
            </div>
          </div>
        </Card>

        {/* Profile Summary - Compact */}
        <Card className="p-6 bg-white border border-gray-100">
          <h3 className="text-sm font-bold text-neutral-secondary uppercase tracking-wider mb-4 border-b pb-2">
            Client Details
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="block text-gray-500 text-xs">Education</span>
              <span className="font-medium">
                {patient.education || 'Not recorded'}
              </span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs">
                Marital Status
              </span>
              <span className="font-medium">
                {patient.maritalStatus || 'Not recorded'}
              </span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs">Field Worker</span>
              <span className="font-medium">
                {patient.fieldWorker || 'Unassigned'}
              </span>
            </div>
            <div>
              <span className="block text-gray-500 text-xs">
                Date Identified
              </span>
              <span className="font-medium">
                {patient.dateIdentified || 'Pending'}
              </span>
            </div>
          </div>
        </Card>

        {/* Accordion 1: Symptoms Screening */}
        <Accordion
          title="Symptoms Screening (Tick all that apply)"
          icon={<Activity className="h-5 w-5" />}>
          
          <div className="space-y-4">
            <div className="w-full md:w-1/3">
              <Input
                type="date"
                label="Date of Screening"
                value={screeningDate}
                onChange={(e) => setScreeningDate(e.target.value)} />
              
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {symptomList.map((symptom) =>
              <Checkbox
                key={symptom}
                label={symptom}
                checked={symptoms.includes(symptom)}
                onChange={(e) =>
                handleSymptomChange(symptom, e.target.checked)
                } />

              )}
            </div>
            <div className="mt-4">
              <TextArea
                label="Other Symptoms"
                rows={2}
                placeholder="No other symptoms"
                value={otherSymptoms}
                onChange={(e) => setOtherSymptoms(e.target.value)} />
              
            </div>
          </div>
        </Accordion>

        {/* Accordion 2: Functional Impact Classification */}
        <Accordion
          title="Functional Impact Classification (Tick all that apply)"
          icon={<ClipboardCheck className="h-5 w-5" />}>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {impactList.map((impact) =>
              <Checkbox
                key={impact}
                label={impact}
                checked={functionalImpacts.includes(impact)}
                onChange={(e) => handleImpactChange(impact, e.target.checked)} />

              )}
              <Checkbox
                label="Has tried to harm self or has suicidal thoughts"
                checked={suicidalThoughts}
                onChange={(e) => setSuicidalThoughts(e.target.checked)} />
              
            </div>
            {suicidalThoughts &&
            <div className="bg-softPink/20 border border-softPink text-neutral-text p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertTriangle className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-coral">High Risk Alert</p>
                  <p className="text-sm">
                    Client indicates self-harm or suicidal tendencies. Immediate
                    attention required.
                  </p>
                </div>
              </div>
            }
            <div className="mt-2">
              <Input
                label="Other (Specify)"
                placeholder="No other"
                value={otherImpacts}
                onChange={(e) => setOtherImpacts(e.target.value)} />
              
            </div>
          </div>
        </Accordion>

        {/* Accordion 3: Risk Level Classification */}
        <Accordion
          title="Risk Level Classification"
          icon={<AlertTriangle className="h-5 w-5" />}>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Risk Level
              </label>
              <select
                className="w-full md:w-1/2 rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={riskLevel}
                onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}>
                
                <option value="Low">
                  Low - Can be managed at community level
                </option>
                <option value="Moderate">
                  Moderate - Needs clinical consultation soon
                </option>
                <option value="High">
                  High - Needs immediate clinical attention
                </option>
              </select>
            </div>
            {riskLevel === 'High' &&
            <div className="space-y-4 animate-in fade-in">
                <div className="bg-coral/10 border border-coral p-4 rounded-lg">
                  <p className="text-coral font-bold flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> Urgent Action Required
                  </p>
                </div>
                <TextArea
                label="Immediate action taken / referral notes (Required)"
                rows={4}
                className="border-coral focus:border-coral focus:ring-coral"
                placeholder="Describe the immediate intervention steps taken..."
                value={riskNotes}
                onChange={(e) => setRiskNotes(e.target.value)} />
              
              </div>
            }
          </div>
        </Accordion>

        {/* Accordion 4: Referral */}
        <Accordion
          title="Referral Details"
          icon={<Building2 className="h-5 w-5" />}>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  PWMI referred?
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={pwmiReferred}
                  onChange={(e) => setPwmiReferred(e.target.value)}>
                  
                  <option value="">Select or search from the list</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <Input
                type="date"
                label="Date of Referral"
                value={dateOfReferral}
                onChange={(e) => setDateOfReferral(e.target.value)} />
              
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Referral facility
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={referralFacility}
                  onChange={(e) => setReferralFacility(e.target.value)}>
                  
                  <option value="">Select or search from the list</option>
                  <option value="District Hospital">District Hospital</option>
                  <option value="PHC">PHC</option>
                  <option value="CHC">CHC</option>
                  <option value="Private Clinic">Private Clinic</option>
                  <option value="NGO Partner">NGO Partner</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Input
                label="Name of Mental health facility"
                value={mentalHealthFacilityName}
                onChange={(e) => setMentalHealthFacilityName(e.target.value)} />
              
            </div>
          </div>
        </Accordion>

        {/* Accordion 5: Mental Disorder and Disability Details */}
        <Accordion
          title="Mental Disorder and Disability Details"
          icon={<Brain className="h-5 w-5" />}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Type of mental disorder
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={mentalDisorderType}
                onChange={(e) => setMentalDisorderType(e.target.value)}>
                
                <option value="">Select or search from the list</option>
                <option value="Depression">Depression</option>
                <option value="Anxiety Disorder">Anxiety Disorder</option>
                <option value="Bipolar Disorder">Bipolar Disorder</option>
                <option value="Schizophrenia">Schizophrenia</option>
                <option value="Substance Use Disorder">
                  Substance Use Disorder
                </option>
                <option value="Intellectual Disability">
                  Intellectual Disability
                </option>
                <option value="Epilepsy">Epilepsy</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Type of disability
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={disabilityType}
                onChange={(e) => setDisabilityType(e.target.value)}>
                
                <option value="">Select or search from the list</option>
                <option value="Mental Illness">Mental Illness</option>
                <option value="Intellectual Disability">
                  Intellectual Disability
                </option>
                <option value="Multiple Disabilities">
                  Multiple Disabilities
                </option>
                <option value="None Identified">None Identified</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </Accordion>

        {/* Accordion 6: Mental Illness Diagnosis */}
        <Accordion
          title="Mental Illness Diagnosis"
          icon={<Stethoscope className="h-5 w-5" />}>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Type of mental illness
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={mentalIllnessType}
                  onChange={(e) => setMentalIllnessType(e.target.value)}>
                  
                  <option value="">Select or search from the list</option>
                  <option value="Mild Depression">Mild Depression</option>
                  <option value="Moderate Depression">
                    Moderate Depression
                  </option>
                  <option value="Severe Depression">Severe Depression</option>
                  <option value="Generalized Anxiety">
                    Generalized Anxiety
                  </option>
                  <option value="PTSD">PTSD</option>
                  <option value="Schizophrenia">Schizophrenia</option>
                  <option value="Bipolar I">Bipolar I</option>
                  <option value="Bipolar II">Bipolar II</option>
                  <option value="Substance Dependence">
                    Substance Dependence
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Severity of mental illness
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={severityOfIllness}
                  onChange={(e) => setSeverityOfIllness(e.target.value)}>
                  
                  <option value="">Select or search from the list</option>
                  <option value="Mild">Mild</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Severe">Severe</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Severity rating
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={severityRating}
                  onChange={(e) => setSeverityRating(e.target.value)}>
                  
                  <option value="">Select or search from the list</option>
                  <option value="1 - Minimal">1 - Minimal</option>
                  <option value="2 - Mild">2 - Mild</option>
                  <option value="3 - Moderate">3 - Moderate</option>
                  <option value="4 - Moderately Severe">
                    4 - Moderately Severe
                  </option>
                  <option value="5 - Severe">5 - Severe</option>
                </select>
              </div>
            </div>
          </div>
        </Accordion>

        {/* Accordion 7: Consent for Registration in CHMP Program */}
        <Accordion
          title="Consent for Registration in CHMP Program"
          icon={<ShieldCheck className="h-5 w-5" />}>
          
          <div className="space-y-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Consent given for enrolling in the program?
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={consentGiven}
                onChange={(e) => setConsentGiven(e.target.value)}>
                
                <option value="">Select or search from the list</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>
        </Accordion>

        {/* Spacer for bottom bar */}
        <div className="h-20"></div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-white border-t border-softPink p-4 shadow-lg flex justify-between items-center z-20">
        <Button variant="ghost">Reset Form</Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleSave(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            leftIcon={<CheckCircle className="h-4 w-4" />}
            onClick={() => handleSave(true)}>
            
            Save
          </Button>
        </div>
      </div>
    </div>);

}