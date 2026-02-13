import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { FollowUpEntry } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import {
  Calendar,
  Plus,
  ChevronDown,
  ChevronUp,
  CheckCircle } from
'lucide-react';
import { Card } from '../ui/Card';
export function FollowUpForm() {
  const { selectedPatient: patient, addSubStageEntry } = usePatient();
  const [showNewForm, setShowNewForm] = useState(false);
  // Form State
  const [followUpDate, setFollowUpDate] = useState('');
  const [mode, setMode] = useState('');
  const [availedCounselling, setAvailedCounselling] = useState(false);
  const [medicationAdherence, setMedicationAdherence] = useState('');
  const [currentTreatmentStatus, setCurrentTreatmentStatus] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState('');
  // Conditional: Non-adherence
  const [nonAdherenceReasons, setNonAdherenceReasons] = useState<string[]>([]);
  const [otherNonAdherenceReason, setOtherNonAdherenceReason] = useState('');
  // Conditional: Side effects
  const [sideEffectsReported, setSideEffectsReported] = useState(false);
  const [daysSinceSideEffects, setDaysSinceSideEffects] = useState('');
  const [sideEffectTypes, setSideEffectTypes] = useState<string[]>([]);
  // Caregiver Observations
  const [caregiverBehaviour, setCaregiverBehaviour] = useState('');
  const [caregiverFeedback, setCaregiverFeedback] = useState('');
  const [changesObserved, setChangesObserved] = useState('');
  if (!patient) return null;
  const entries = patient.followUpEntries || [];
  const handleNonAdherenceReasonChange = (reason: string, checked: boolean) => {
    if (checked) setNonAdherenceReasons([...nonAdherenceReasons, reason]);else
    setNonAdherenceReasons(nonAdherenceReasons.filter((r) => r !== reason));
  };
  const handleSideEffectTypeChange = (type: string, checked: boolean) => {
    if (checked) setSideEffectTypes([...sideEffectTypes, type]);else
    setSideEffectTypes(sideEffectTypes.filter((t) => t !== type));
  };
  const handleSave = () => {
    const newEntry: FollowUpEntry = {
      id: Date.now().toString(),
      followUpDate,
      mode,
      availedCounselling,
      medicationAdherence,
      currentTreatmentStatus,
      nextFollowUpDate,
      nonAdherenceReasons,
      otherNonAdherenceReason,
      sideEffectsReported,
      daysSinceSideEffects,
      sideEffectTypes,
      caregiverBehaviour,
      caregiverFeedback,
      changesObserved,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'followUpEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setFollowUpDate('');
    setMode('');
    setAvailedCounselling(false);
    setMedicationAdherence('');
    setCurrentTreatmentStatus('');
    setNextFollowUpDate('');
    setNonAdherenceReasons([]);
    setOtherNonAdherenceReason('');
    setSideEffectsReported(false);
    setDaysSinceSideEffects('');
    setSideEffectTypes([]);
    setCaregiverBehaviour('');
    setCaregiverFeedback('');
    setChangesObserved('');
  };
  const showNonAdherenceSection =
  medicationAdherence !== 'Good' && medicationAdherence !== '';
  const showSideEffectsSection = nonAdherenceReasons.includes('Side effects');
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-neutral-text">
          Follow-Up History
        </h3>
        <Button
          onClick={() => setShowNewForm(!showNewForm)}
          leftIcon={showNewForm ? undefined : <Plus className="h-4 w-4" />}
          variant={showNewForm ? 'ghost' : 'primary'}>

          {showNewForm ? 'Cancel' : 'Add Follow-Up'}
        </Button>
      </div>

      {showNewForm &&
      <div className="animate-in fade-in slide-in-from-top-4 space-y-6 border border-teal/20 rounded-xl p-6 bg-teal/5">
          <h4 className="font-bold text-teal mb-4">New Follow-Up Entry</h4>

          {/* Section A: Follow-Up Details */}
          <Accordion
          title="A. Follow-Up Details"
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
                    Mode of Follow-up
                  </label>
                  <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}>

                    <option value="">Select Mode</option>
                    <option value="In-person">In-person</option>
                    <option value="Phone">Phone</option>
                    <option value="Home visit">Home visit</option>
                  </select>
                </div>
                <div className="flex items-center pt-6">
                  <Checkbox
                  label="PwMI availed counselling?"
                  checked={availedCounselling}
                  onChange={(e) => setAvailedCounselling(e.target.checked)} />

                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Medication Adherence
                  </label>
                  <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={medicationAdherence}
                  onChange={(e) => setMedicationAdherence(e.target.value)}>

                    <option value="">Select Status</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                    <option value="Stopped">Stopped</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Current Treatment Status
                  </label>
                  <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={currentTreatmentStatus}
                  onChange={(e) => setCurrentTreatmentStatus(e.target.value)}>

                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Discontinued">Discontinued</option>
                    <option value="Changed">Changed</option>
                    <option value="Referred">Referred</option>
                  </select>
                </div>
                <Input
                type="date"
                label="Next Follow-up Date"
                value={nextFollowUpDate}
                onChange={(e) => setNextFollowUpDate(e.target.value)} />

              </div>
            </div>
          </Accordion>

          {/* Section B: Reason for Non-adherence */}
          {showNonAdherenceSection &&
        <Accordion
          title="B. Reason for Non-adherence"
          icon={<Calendar className="h-5 w-5" />}>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
              'Forgot to take medication',
              'Feels better / medication not needed',
              'Side effects',
              'Financial issues'].
              map((reason) =>
              <Checkbox
                key={reason}
                label={reason}
                checked={nonAdherenceReasons.includes(reason)}
                onChange={(e) =>
                handleNonAdherenceReasonChange(reason, e.target.checked)
                } />

              )}
                </div>
                <Input
              label="Other reason (Specify)"
              value={otherNonAdherenceReason}
              onChange={(e) => setOtherNonAdherenceReason(e.target.value)} />

              </div>
            </Accordion>
        }

          {/* Section C: Side-effects Details */}
          {showSideEffectsSection &&
        <Accordion
          title="C. Side-effects Details"
          icon={<Calendar className="h-5 w-5" />}>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Checkbox
                label="Side-effects reported?"
                checked={sideEffectsReported}
                onChange={(e) => setSideEffectsReported(e.target.checked)} />

                </div>
                <Input
              type="number"
              label="Days since symptoms observed"
              value={daysSinceSideEffects}
              onChange={(e) => setDaysSinceSideEffects(e.target.value)} />

                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Type of Side Effect
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                'Drowsiness',
                'Nausea',
                'Weight gain',
                'Tremors',
                'Dizziness',
                'Other'].
                map((type) =>
                <Checkbox
                  key={type}
                  label={type}
                  checked={sideEffectTypes.includes(type)}
                  onChange={(e) =>
                  handleSideEffectTypeChange(type, e.target.checked)
                  } />

                )}
                  </div>
                </div>
              </div>
            </Accordion>
        }

          {/* Section D: Caregiver's Observations */}
          <Accordion
          title="D. Caregiver's Observations"
          icon={<Calendar className="h-5 w-5" />}>

            <div className="space-y-4">
              <TextArea
              label="Behaviour as reported by caregivers"
              rows={3}
              value={caregiverBehaviour}
              onChange={(e) => setCaregiverBehaviour(e.target.value)} />

              <TextArea
              label="Caregiver feedback"
              rows={3}
              value={caregiverFeedback}
              onChange={(e) => setCaregiverFeedback(e.target.value)} />

              <TextArea
              label="Changes observed"
              rows={3}
              value={changesObserved}
              onChange={(e) => setChangesObserved(e.target.value)} />

            </div>
          </Accordion>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowNewForm(false)}>
              Cancel
            </Button>
            <Button
            variant="primary"
            onClick={handleSave}
            leftIcon={<CheckCircle className="h-4 w-4" />}>

              Save Entry
            </Button>
          </div>
        </div>
      }

      {/* List of Entries */}
      <div className="space-y-4">
        {entries.length === 0 ?
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            No follow-up entries yet. Click "Add Follow-Up" to create one.
          </div> :

        entries.map((entry) =>
        <Card key={entry.id} className="p-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-lg text-neutral-text">
                    {entry.followUpDate}
                  </div>
                  <div className="text-sm text-neutral-secondary mt-1">
                    Mode: {entry.mode} • Adherence: {entry.medicationAdherence}
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-medium text-teal">
                    {entry.currentTreatmentStatus}
                  </div>
                  <div className="text-gray-500">
                    Next: {entry.nextFollowUpDate}
                  </div>
                </div>
              </div>
            </Card>
        )
        }
      </div>
    </div>);

}