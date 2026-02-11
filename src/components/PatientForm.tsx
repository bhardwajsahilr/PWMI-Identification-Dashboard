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
  User,
  Activity,
  AlertTriangle,
  ClipboardCheck,
  Printer,
  Trash2,
  CheckCircle,
  Save } from
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
    }
  }, [patient]);
  if (!patient) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 text-neutral-secondary">
        <div className="text-center">
          <User className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg">
            Select a client from the list or add a new one.
          </p>
        </div>
      </div>);

  }
  const handleSymptomChange = (label: string, checked: boolean) => {
    if (checked) {
      setSymptoms([...symptoms, label]);
    } else {
      setSymptoms(symptoms.filter((s) => s !== label));
    }
  };
  const handleImpactChange = (label: string, checked: boolean) => {
    if (checked) {
      setFunctionalImpacts([...functionalImpacts, label]);
    } else {
      setFunctionalImpacts(functionalImpacts.filter((i) => i !== label));
    }
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
      completedAt: markCompleted ? new Date().toISOString() : undefined
    };
    saveIdentificationData(patient.id, formData, markCompleted);
  };
  const symptomList = [
  'Withdrawal from people or activities',
  'Talking to self or hearing voices',
  'Aggression or violent behaviour',
  'Not maintaining hygiene',
  'Strange beliefs or delusions',
  'Crying often or appearing sad',
  'Suspiciousness or fear',
  'Very quiet or not talking',
  'Poor sleep or food intake',
  'Wandering without reason'];

  const impactList = [
  'Unable to work or perform daily tasks',
  'Needs help for bathing/dressing',
  'Caregiver feels burdened',
  'Kept away by community/stigma'];

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
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

        {/* Accordion 1: Symptoms */}
        <Accordion
          title="Symptoms Screening"
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
                label="Other Symptoms (Optional)"
                rows={2}
                placeholder="Describe any other observed symptoms..."
                value={otherSymptoms}
                onChange={(e) => setOtherSymptoms(e.target.value)} />

            </div>
          </div>
        </Accordion>

        {/* Accordion 2: Functional Impact */}
        <Accordion
          title="Functional Impact Classification"
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
                label="Has tried to harm self / suicidal thoughts"
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
                label="Other Functional Impacts (Specify)"
                placeholder="e.g. Financial dependency..."
                value={otherImpacts}
                onChange={(e) => setOtherImpacts(e.target.value)} />

            </div>
          </div>
        </Accordion>

        {/* Accordion 3: Risk Level */}
        <Accordion
          title="Risk Level Classification"
          icon={<AlertTriangle className="h-5 w-5" />}>

          <div className="space-y-6">
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
                    <AlertTriangle className="h-5 w-5" />
                    Urgent Action Required
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

        {/* Spacer for bottom bar */}
        <div className="h-20"></div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-white border-t border-softPink p-4 shadow-lg flex justify-between items-center z-20">
        <Button variant="ghost">Reset Form</Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => handleSave(false)}>
            Save Draft
          </Button>
          <Button
            variant="primary"
            leftIcon={<CheckCircle className="h-4 w-4" />}
            onClick={() => handleSave(true)}>

            Save & Proceed to Registration
          </Button>
        </div>
      </div>
    </div>);

}