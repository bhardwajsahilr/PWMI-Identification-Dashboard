import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { RegistrationFormData, RiskLevel } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import {
  User,
  Printer,
  Trash2,
  Activity,
  ClipboardCheck,
  AlertTriangle,
  Building2,
  Brain,
  Stethoscope,
  ShieldCheck,
  CheckCircle } from
'lucide-react';
export function ScreeningDiagnosisForm() {
  const {
    selectedPatient: patient,
    saveRegistrationData,
    deletePatient
  } = usePatient();
  // Form State
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [otherSymptoms, setOtherSymptoms] = useState('');
  const [functionalImpacts, setFunctionalImpacts] = useState<string[]>([]);
  const [otherImpacts, setOtherImpacts] = useState('');
  const [suicidalThoughts, setSuicidalThoughts] = useState(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('Low');
  const [riskNotes, setRiskNotes] = useState('');
  const [referralFacility, setReferralFacility] = useState('');
  const [mentalHealthFacility, setMentalHealthFacility] = useState('');
  const [referralDate, setReferralDate] = useState('');
  const [mentalDisorderType, setMentalDisorderType] = useState('');
  const [disabilityType, setDisabilityType] = useState('');
  const [mentalIllnessType, setMentalIllnessType] = useState('');
  const [severityOfIllness, setSeverityOfIllness] = useState('');
  const [severityRating, setSeverityRating] = useState('');
  const [consentGiven, setConsentGiven] = useState(false);
  const [enrollmentCompleted, setEnrollmentCompleted] = useState(false);
  useEffect(() => {
    if (patient) {
      const regData = patient.registrationData;
      const identData = patient.identificationData;
      // Carry forward or load existing
      setSymptoms(regData?.symptoms || identData?.symptoms || []);
      setOtherSymptoms(regData?.otherSymptoms || identData?.otherSymptoms || '');
      setFunctionalImpacts(
        regData?.functionalImpacts || identData?.functionalImpacts || []
      );
      setOtherImpacts(regData?.otherImpacts || identData?.otherImpacts || '');
      setSuicidalThoughts(
        regData?.suicidalThoughts ?? identData?.suicidalThoughts ?? false
      );
      setRiskLevel(
        regData?.riskLevel ||
        identData?.riskLevel ||
        patient.riskLevel ||
        'Low'
      );
      setRiskNotes(regData?.riskNotes || identData?.riskNotes || '');
      setReferralFacility(regData?.referralFacility || '');
      setMentalHealthFacility(regData?.mentalHealthFacility || '');
      setReferralDate(regData?.referralDate || '');
      setMentalDisorderType(regData?.mentalDisorderType || '');
      setDisabilityType(regData?.disabilityType || '');
      setMentalIllnessType(regData?.mentalIllnessType || '');
      setSeverityOfIllness(regData?.severityOfIllness || '');
      setSeverityRating(regData?.severityRating || '');
      setConsentGiven(regData?.consentGiven || false);
      setEnrollmentCompleted(regData?.enrollmentCompleted || false);
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
    const formData: RegistrationFormData = {
      symptoms,
      otherSymptoms,
      functionalImpacts,
      otherImpacts,
      suicidalThoughts,
      riskLevel,
      riskNotes,
      referralFacility,
      mentalHealthFacility,
      referralDate,
      mentalDisorderType,
      disabilityType,
      mentalIllnessType,
      severityOfIllness,
      severityRating,
      consentGiven,
      enrollmentCompleted,
      completedAt: markCompleted ? new Date().toISOString() : undefined
    };
    saveRegistrationData(patient.id, formData, markCompleted);
  };
  const symptomList = [
  'Withdrawal from people or activities',
  'Talking to self / hallucinations',
  'Aggression or violent behaviour',
  'Not maintaining hygiene',
  'Delusions',
  'Crying often',
  'Suspiciousness',
  'Very quiet',
  'Poor sleep or food intake',
  'Wandering'];

  const impactList = [
  'Unable to work',
  'Needs help for bathing/dressing',
  'Caregiver burdened',
  'Avoided by community'];

  const isHighSeverity =
  severityOfIllness === 'Severe' ||
  severityRating === '4 - Moderately Severe' ||
  severityRating === '5 - Severe';
  return (
    <>
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
              <div className="mt-2 text-sm text-neutral-secondary">
                Primary Caregiver:{' '}
                <span className="font-medium text-neutral-text">
                  {patient.fieldWorker || 'Not assigned'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge
              variant={
              riskLevel === 'High' ?
              'coral' :
              riskLevel === 'Moderate' ?
              'softPink' :
              'teal'
              }>

              {riskLevel} Risk
            </Badge>
            <div className="flex gap-2 mt-2">
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
        </div>
      </Card>

      {/* Timeline Strip */}
      <div className="flex items-center justify-between px-8 py-4 bg-white rounded-lg shadow-sm border border-gray-100">
        {[
        {
          label: 'Screening',
          status: patient.identificationData ? 'completed' : 'pending'
        },
        {
          label: 'Registration',
          status: 'active'
        },
        {
          label: 'Services',
          status: 'pending'
        },
        {
          label: 'Follow-up',
          status: 'pending'
        }].
        map((stage, index, arr) =>
        <div
          key={stage.label}
          className="flex items-center flex-1 last:flex-none">

            <div className="flex flex-col items-center relative z-10">
              <div
              className={`w-4 h-4 rounded-full border-2 ${stage.status === 'completed' ? 'bg-teal border-teal' : stage.status === 'active' ? 'bg-coral border-coral animate-pulse' : 'bg-white border-gray-300'}`} />

              <span
              className={`text-xs mt-2 font-medium ${stage.status === 'active' ? 'text-coral' : stage.status === 'completed' ? 'text-teal' : 'text-gray-400'}`}>

                {stage.label}
              </span>
            </div>
            {index < arr.length - 1 &&
          <div
            className={`h-0.5 flex-1 mx-2 -mt-6 ${stage.status === 'completed' ? 'bg-teal' : 'bg-gray-200'}`} />

          }
          </div>
        )}
      </div>

      {/* Accordion 1: Symptoms Screening */}
      <Accordion
        title="Symptoms Screening"
        icon={<Activity className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="bg-softPink/20 p-3 rounded-md text-sm text-neutral-text">
            Carried forward from PWMI Identification. You may update if symptoms
            have changed.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {symptomList.map((symptom) =>
            <Checkbox
              key={symptom}
              label={symptom}
              checked={symptoms.includes(symptom)}
              onChange={(e) => handleSymptomChange(symptom, e.target.checked)} />

            )}
          </div>
          <TextArea
            label="Other Symptoms"
            rows={2}
            value={otherSymptoms}
            onChange={(e) => setOtherSymptoms(e.target.value)} />

        </div>
      </Accordion>

      {/* Accordion 2: Functional Impact */}
      <Accordion
        title="Functional Impact Classification"
        icon={<ClipboardCheck className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="bg-softPink/20 p-3 rounded-md text-sm text-neutral-text">
            Carried forward from PWMI Identification. You may update if impacts
            have changed.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {impactList.map((impact) =>
            <Checkbox
              key={impact}
              label={impact}
              checked={functionalImpacts.includes(impact)}
              onChange={(e) => handleImpactChange(impact, e.target.checked)} />

            )}
            <Checkbox
              label="Self-harm attempt or suicidal thoughts"
              checked={suicidalThoughts}
              onChange={(e) => setSuicidalThoughts(e.target.checked)} />

          </div>
          {suicidalThoughts &&
          <div className="bg-softPink/20 border border-softPink text-neutral-text p-4 rounded-lg flex items-start gap-3 animate-in fade-in">
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
          <Input
            label="Other (Specify)"
            value={otherImpacts}
            onChange={(e) => setOtherImpacts(e.target.value)} />

        </div>
      </Accordion>

      {/* Accordion 3: Risk Level */}
      <Accordion
        title="Risk Level Classification"
        icon={<AlertTriangle className="h-5 w-5" />}>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-secondary mb-2">
              Assessed Risk Level
            </label>
            <select
              className="w-full md:w-1/2 rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
              value={riskLevel}
              onChange={(e) => setRiskLevel(e.target.value as RiskLevel)}>

              <option value="Low">Low – Monitor</option>
              <option value="Moderate">Moderate – Needs consultation</option>
              <option value="High">High – Urgent attention</option>
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
              label="Immediate Action Taken (Required)"
              rows={3}
              className="border-coral focus:border-coral focus:ring-coral"
              value={riskNotes}
              onChange={(e) => setRiskNotes(e.target.value)} />

            </div>
          }
        </div>
      </Accordion>

      {/* Accordion 4: Referral Facility */}
      <Accordion
        title="Referral Facility"
        icon={<Building2 className="h-5 w-5" />}>

        <div className="bg-softPink/10 p-4 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Referral Facility
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={referralFacility}
                onChange={(e) => setReferralFacility(e.target.value)}>

                <option value="">Select Facility</option>
                <option value="District Hospital">District Hospital</option>
                <option value="PHC">PHC</option>
                <option value="CHC">CHC</option>
                <option value="Private Clinic">Private Clinic</option>
                <option value="NGO Partner">NGO Partner</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Mental Health Facility
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={mentalHealthFacility}
                onChange={(e) => setMentalHealthFacility(e.target.value)}>

                <option value="">Select Facility</option>
                <option value="DMHP Center">DMHP Center</option>
                <option value="Psychiatric Hospital">
                  Psychiatric Hospital
                </option>
                <option value="De-addiction Center">De-addiction Center</option>
                <option value="Rehabilitation Center">
                  Rehabilitation Center
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input
              type="date"
              label="Referral Date"
              value={referralDate}
              onChange={(e) => setReferralDate(e.target.value)} />

          </div>
        </div>
      </Accordion>

      {/* Accordion 5: Mental Disorder & Disability Type */}
      <Accordion
        title="Mental Disorder & Disability Type"
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

              <option value="">Select Type</option>
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

              <option value="">Select Type</option>
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

      {/* Accordion 6: Diagnosis of Mental Illness */}
      <Accordion
        title="Diagnosis of Mental Illness"
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

                <option value="">Select Illness</option>
                <option value="Mild Depression">Mild Depression</option>
                <option value="Moderate Depression">Moderate Depression</option>
                <option value="Severe Depression">Severe Depression</option>
                <option value="Generalized Anxiety">Generalized Anxiety</option>
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

                <option value="">Select Severity</option>
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

                <option value="">Select Rating</option>
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
          {isHighSeverity &&
          <div className="bg-teal/10 border border-teal p-4 rounded-lg text-teal-dark">
              <p className="font-bold">Guidance</p>
              <p className="text-sm">
                High severity identified. Consider specialist referral and close
                follow-up monitoring. Ensure caregiver support is in place.
              </p>
            </div>
          }
        </div>
      </Accordion>

      {/* Accordion 7: Consent */}
      <Accordion
        title="Consent & Enrollment"
        icon={<ShieldCheck className="h-5 w-5" />}>

        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-neutral-text">Consent Given?</h4>
              <p className="text-sm text-neutral-secondary">
                Has the client/family agreed to enrollment?
              </p>
            </div>
            <button
              onClick={() => setConsentGiven(!consentGiven)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${consentGiven ? 'bg-teal' : 'bg-gray-300'}`}>

              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${consentGiven ? 'translate-x-6' : 'translate-x-1'}`} />

            </button>
          </div>

          <div
            className={`transition-opacity ${consentGiven ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>

            <Checkbox
              label="Enrollment completed"
              checked={enrollmentCompleted}
              onChange={(e) => setEnrollmentCompleted(e.target.checked)}
              disabled={!consentGiven} />

          </div>

          {!consentGiven &&
          <div className="bg-softPink/20 border border-softPink text-neutral-text p-4 rounded-lg">
              <p className="text-sm">
                Consent is required to complete enrollment. Please discuss with
                the client and their family about the benefits of enrollment.
              </p>
            </div>
          }
        </div>
      </Accordion>

      <div className="h-20"></div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-white border-t border-softPink p-4 shadow-lg flex justify-between items-center z-20">
        <Button variant="ghost">Reset Form</Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleSave(false)}>
            Save Draft
          </Button>
          <Button variant="outline" onClick={() => handleSave(false)}>
            Save & Continue
          </Button>
          <div className="relative group">
            <Button
              variant="primary"
              leftIcon={<CheckCircle className="h-4 w-4" />}
              onClick={() => handleSave(true)}
              disabled={!consentGiven}>

              Complete Enrollment
            </Button>
            {!consentGiven &&
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Requires client consent
              </div>
            }
          </div>
        </div>
      </div>
    </>);

}