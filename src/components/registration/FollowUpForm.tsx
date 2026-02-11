import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { FollowUpFormData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Calendar, CheckCircle, Printer, Trash2 } from 'lucide-react';
export function FollowUpForm() {
  const {
    selectedPatient: patient,
    saveSubStageData,
    deletePatient
  } = usePatient();
  const [followUpDate, setFollowUpDate] = useState('');
  const [medicationAdherence, setMedicationAdherence] = useState('');
  const [symptomChanges, setSymptomChanges] = useState('');
  const [referralStatus, setReferralStatus] = useState('');
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState('');
  useEffect(() => {
    if (patient?.followUpData) {
      const data = patient.followUpData;
      setFollowUpDate(data.followUpDate || '');
      setMedicationAdherence(data.medicationAdherence || '');
      setSymptomChanges(data.symptomChanges || '');
      setReferralStatus(data.referralStatus || '');
      setFollowUpNotes(data.followUpNotes || '');
      setNextFollowUpDate(data.nextFollowUpDate || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSave = () => {
    const data: FollowUpFormData = {
      followUpDate,
      medicationAdherence,
      symptomChanges,
      referralStatus,
      followUpNotes,
      nextFollowUpDate,
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'followUpData', data);
  };
  return (
    <>
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
              </div>
            </div>
          </div>
          <Badge variant="teal">{patient.riskLevel} Risk</Badge>
        </div>
      </Card>

      <Accordion
        title="Follow-Up Details"
        icon={<Calendar className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Follow-up Date"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)} />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Medication Adherence
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={medicationAdherence}
                onChange={(e) => setMedicationAdherence(e.target.value)}>

                <option value="">Select Status</option>
                <option value="Regular">Regular</option>
                <option value="Irregular">Irregular</option>
                <option value="Stopped">Stopped</option>
                <option value="Not applicable">Not applicable</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Symptom Changes
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={symptomChanges}
                onChange={(e) => setSymptomChanges(e.target.value)}>

                <option value="">Select Change</option>
                <option value="Improved">Improved</option>
                <option value="No change">No change</option>
                <option value="Worsened">Worsened</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Referral Status
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={referralStatus}
                onChange={(e) => setReferralStatus(e.target.value)}>

                <option value="">Select Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Not required">Not required</option>
              </select>
            </div>
          </div>
          <TextArea
            label="Follow-up Notes"
            rows={3}
            value={followUpNotes}
            onChange={(e) => setFollowUpNotes(e.target.value)} />

          <div className="w-full md:w-1/2">
            <Input
              type="date"
              label="Next Follow-up Date"
              value={nextFollowUpDate}
              onChange={(e) => setNextFollowUpDate(e.target.value)} />

          </div>
        </div>
      </Accordion>

      <div className="h-20"></div>
      <div className="bg-white border-t border-softPink p-4 shadow-lg flex justify-between items-center z-20">
        <Button variant="ghost">Reset</Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSave}>
            Save Draft
          </Button>
          <Button
            variant="primary"
            leftIcon={<CheckCircle className="h-4 w-4" />}
            onClick={handleSave}>

            Save & Complete
          </Button>
        </div>
      </div>
    </>);

}