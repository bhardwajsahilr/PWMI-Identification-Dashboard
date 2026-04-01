import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { FollowUpEntry } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import {
  Calendar,
  Plus,
  CheckCircle,
  AlertTriangle,
  Eye,
  Pill } from
'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
const NON_ADHERENCE_REASONS = [
'Forgot to take medication',
'Feels better / thinks not needed',
'Fear of side effects',
'Medication not available/stockout',
'Cannot afford medication',
'Lack of family/caregiver support',
'Alcohol or substance use',
'Refusal'];

export function FollowUpForm() {
  const { selectedPatient: patient, addSubStageEntry } = usePatient();
  const [showNewForm, setShowNewForm] = useState(false);
  // Top dates
  const [followUpDate, setFollowUpDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [nextFollowUpDate, setNextFollowUpDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  // Follow-Up Details
  const [mode, setMode] = useState('');
  const [availedCounselling, setAvailedCounselling] = useState('');
  const [availedTherapy, setAvailedTherapy] = useState('');
  const [medicationsTaken, setMedicationsTaken] = useState('');
  // Non-adherence
  const [nonAdherenceReasons, setNonAdherenceReasons] = useState<string[]>([]);
  const [otherNonAdherenceReason, setOtherNonAdherenceReason] = useState('');
  // Side effects
  const [sideEffectsReported, setSideEffectsReported] = useState('');
  const [daysSinceOnset, setDaysSinceOnset] = useState('');
  const [sideEffectTypes, setSideEffectTypes] = useState('');
  const [sideEffectSeverity, setSideEffectSeverity] = useState('');
  // Caregiver observations
  const [behaviourReported, setBehaviourReported] = useState('');
  const [caregiverSupport, setCaregiverSupport] = useState('');
  const [functionalIndependence, setFunctionalIndependence] = useState('');
  const [severityRating, setSeverityRating] = useState('');
  // Validation
  const [dateError, setDateError] = useState('');
  if (!patient) return null;
  const entries = patient.followUpEntries || [];
  const handleNonAdherenceReasonChange = (reason: string, checked: boolean) => {
    if (checked) setNonAdherenceReasons([...nonAdherenceReasons, reason]);else
    setNonAdherenceReasons(nonAdherenceReasons.filter((r) => r !== reason));
  };
  const handleSave = () => {
    if (!followUpDate) {
      setDateError('Date of follow-up is required.');
      return;
    }
    setDateError('');
    const newEntry: FollowUpEntry = {
      id: Date.now().toString(),
      followUpDate,
      nextFollowUpDate,
      mode,
      availedCounselling,
      availedTherapy,
      medicationsTaken,
      nonAdherenceReasons,
      otherNonAdherenceReason,
      sideEffectsReported,
      daysSinceOnset,
      sideEffectTypes,
      sideEffectSeverity,
      behaviourReported,
      caregiverSupport,
      functionalIndependence,
      severityRating,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'followUpEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setFollowUpDate(new Date().toISOString().split('T')[0]);
    setNextFollowUpDate(new Date().toISOString().split('T')[0]);
    setMode('');
    setAvailedCounselling('');
    setAvailedTherapy('');
    setMedicationsTaken('');
    setNonAdherenceReasons([]);
    setOtherNonAdherenceReason('');
    setSideEffectsReported('');
    setDaysSinceOnset('');
    setSideEffectTypes('');
    setSideEffectSeverity('');
    setBehaviourReported('');
    setCaregiverSupport('');
    setFunctionalIndependence('');
    setSeverityRating('');
    setDateError('');
  };
  const RadioGroup = ({
    label,
    value,
    onChange




  }: {label: string;value: string;onChange: (val: string) => void;}) =>
  <div className="flex items-center justify-between py-3 px-4 bg-white border-b border-gray-100 last:border-b-0">
      <span className="text-sm font-medium text-neutral-secondary">
        {label}
      </span>
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
          type="radio"
          name={label}
          checked={value === 'Yes'}
          onChange={() => onChange('Yes')}
          className="w-4 h-4 text-teal border-gray-300 focus:ring-teal" />
        
          <span className="text-sm">Yes</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
          type="radio"
          name={label}
          checked={value === 'No'}
          onChange={() => onChange('No')}
          className="w-4 h-4 text-teal border-gray-300 focus:ring-teal" />
        
          <span className="text-sm">No</span>
        </label>
      </div>
    </div>;

  const getSeverityShort = (rating: string) => {
    if (rating.startsWith('Mild')) return 'Mild';
    if (rating.startsWith('Moderate')) return 'Moderate';
    if (rating.startsWith('Severe')) return 'Severe';
    return rating;
  };
  const getSeverityVariant = (rating: string): 'teal' | 'coral' | 'gray' => {
    if (rating.startsWith('Mild')) return 'teal';
    if (rating.startsWith('Moderate')) return 'gray';
    if (rating.startsWith('Severe')) return 'coral';
    return 'gray';
  };
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

          {/* Top: Date of follow-up & Date of next follow-up */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
              type="date"
              label="Date of follow-up *"
              value={followUpDate}
              onChange={(e) => {
                setFollowUpDate(e.target.value);
                if (e.target.value) setDateError('');
              }} />
            
              {dateError &&
            <p className="text-sm text-coral mt-1.5 font-medium">
                  {dateError}
                </p>
            }
            </div>
            <Input
            type="date"
            label="Date of next follow-up"
            value={nextFollowUpDate}
            onChange={(e) => setNextFollowUpDate(e.target.value)} />
          
          </div>

          {/* Section 1: Follow-Up Details */}
          <Accordion
          title="Follow-Up Details"
          icon={<Calendar className="h-5 w-5" />}>
          
            <div className="space-y-0 rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between py-3 px-4 bg-white border-b border-gray-100">
                <span className="text-sm font-medium text-neutral-secondary">
                  Mode of Follow-up
                </span>
                <input
                type="text"
                className="w-1/2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-teal focus:ring-teal"
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                placeholder="Enter mode" />
              
              </div>
              <RadioGroup
              label="PWMI availed counselling?"
              value={availedCounselling}
              onChange={setAvailedCounselling} />
            
              <RadioGroup
              label="PWMI availed therapy?"
              value={availedTherapy}
              onChange={setAvailedTherapy} />
            
              <RadioGroup
              label="Medications taken?"
              value={medicationsTaken}
              onChange={setMedicationsTaken} />
            
            </div>
          </Accordion>

          {/* Section 2: Reason for Non-adherence to Medications */}
          <Accordion
          title="Reason for Non-adherence to Medications"
          icon={<Pill className="h-5 w-5" />}>
          
            <div className="space-y-0 rounded-lg border border-gray-200 overflow-hidden">
              {NON_ADHERENCE_REASONS.map((reason, i) =>
            <div
              key={reason}
              className={`flex items-center gap-3 py-3 px-4 ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'} border-b border-gray-100 last:border-b-0`}>
              
                  <Checkbox
                label={reason}
                checked={nonAdherenceReasons.includes(reason)}
                onChange={(e) =>
                handleNonAdherenceReasonChange(reason, e.target.checked)
                } />
              
                </div>
            )}
              <div className="flex items-center gap-3 py-3 px-4 bg-gray-50/50 border-t border-gray-100">
                <span className="text-sm font-medium text-neutral-secondary whitespace-nowrap">
                  Other reasons (specify)
                </span>
                <input
                type="text"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-teal focus:ring-teal"
                value={otherNonAdherenceReason}
                onChange={(e) => setOtherNonAdherenceReason(e.target.value)}
                placeholder="" />
              
              </div>
            </div>
          </Accordion>

          {/* Section 3: Side-Effects Details */}
          <Accordion
          title="Side-Effects Details"
          icon={<AlertTriangle className="h-5 w-5" />}>
          
            <div className="space-y-0 rounded-lg border border-gray-200 overflow-hidden">
              <RadioGroup
              label="Side-effects reported?"
              value={sideEffectsReported}
              onChange={setSideEffectsReported} />
            
              <div className="flex items-center justify-between py-3 px-4 bg-white border-b border-gray-100">
                <span className="text-sm font-medium text-neutral-secondary">
                  Days since symptoms onset
                </span>
                <input
                type="text"
                className="w-1/2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-teal focus:ring-teal"
                value={daysSinceOnset}
                onChange={(e) => setDaysSinceOnset(e.target.value)}
                placeholder="" />
              
              </div>
              <div className="flex items-center justify-between py-3 px-4 bg-gray-50/50 border-b border-gray-100">
                <span className="text-sm font-medium text-neutral-secondary">
                  Type of side-effects
                </span>
                <input
                type="text"
                className="w-1/2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-teal focus:ring-teal"
                value={sideEffectTypes}
                onChange={(e) => setSideEffectTypes(e.target.value)}
                placeholder="" />
              
              </div>
              <div className="flex items-center justify-between py-3 px-4 bg-white">
                <span className="text-sm font-medium text-neutral-secondary">
                  Severity of side effects
                </span>
                <input
                type="text"
                className="w-1/2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-teal focus:ring-teal"
                value={sideEffectSeverity}
                onChange={(e) => setSideEffectSeverity(e.target.value)}
                placeholder="" />
              
              </div>
            </div>
          </Accordion>

          {/* Section 4: Caregiver's Observations */}
          <Accordion
          title="Caregiver's Observations"
          icon={<Eye className="h-5 w-5" />}>
          
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Behaviour as reported by caregivers
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={behaviourReported}
                onChange={(e) => setBehaviourReported(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Aggression">Aggression</option>
                  <option value="Self-harm">Self-harm</option>
                  <option value="Wandering">Wandering</option>
                  <option value="None">None</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Select or search from the list
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Caregiver support required
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={caregiverSupport}
                onChange={(e) => setCaregiverSupport(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="High – Caregiver assists in nearly all daily activities (bathing, eating, meds, supervision)">
                    High – Caregiver assists in nearly all daily activities
                    (bathing, eating, meds, supervision)
                  </option>
                  <option value="Moderate – Caregiver provides regular help (med reminders, check-ins) but PWMI can self-manage some tasks">
                    Moderate – Caregiver provides regular help (med reminders,
                    check-ins) but PWMI can self-manage some tasks
                  </option>
                  <option value="Low – PWMI is largely independent; caregiver support is occasional">
                    Low – PWMI is largely independent; caregiver support is
                    occasional
                  </option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Select or search from the list
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Functional independence of PWMI
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={functionalIndependence}
                onChange={(e) => setFunctionalIndependence(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Independent – Manages self-care, work, and daily tasks without help">
                    Independent – Manages self-care, work, and daily tasks
                    without help
                  </option>
                  <option value="Partially Independent – Needs reminders or occasional assistance">
                    Partially Independent – Needs reminders or occasional
                    assistance
                  </option>
                  <option value="Dependent – Requires full assistance for most activities">
                    Dependent – Requires full assistance for most activities
                  </option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Select or search from the list
                </p>
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
                  <option value="Mild – Symptoms manageable; PWMI largely functional">
                    Mild – Symptoms manageable; PWMI largely functional
                  </option>
                  <option value="Moderate – Some functional impairment; needs regular support; no recent high-risk behavior">
                    Moderate – Some functional impairment; needs regular
                    support; no recent high-risk behavior
                  </option>
                  <option value="Severe – History of aggression/self-harm/wandering; total/near-total dependency; family/work severely disrupted">
                    Severe – History of aggression/self-harm/wandering;
                    total/near-total dependency; family/work severely disrupted
                  </option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Select or search from the list
                </p>
              </div>
            </div>
          </Accordion>

          {/* Action bar */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="outline" onClick={() => setShowNewForm(false)}>
              Cancel
            </Button>
            <Button
            variant="primary"
            onClick={handleSave}
            leftIcon={<CheckCircle className="h-4 w-4" />}>
            
              Save
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
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-text">
                      {entry.followUpDate}
                    </span>
                    {entry.mode &&
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full">
                        {entry.mode}
                      </span>
                }
                  </div>
                  {entry.nextFollowUpDate &&
              <div className="text-sm text-gray-500">
                      Next: {entry.nextFollowUpDate}
                    </div>
              }
                  <div className="flex flex-wrap gap-1.5">
                    {entry.availedCounselling &&
                <span
                  className={`inline-block text-xs px-2.5 py-1 rounded-full ${entry.availedCounselling === 'Yes' ? 'bg-teal/10 text-teal' : 'bg-gray-100 text-gray-600'}`}>
                  
                        Counselling: {entry.availedCounselling}
                      </span>
                }
                    {entry.medicationsTaken &&
                <span
                  className={`inline-block text-xs px-2.5 py-1 rounded-full ${entry.medicationsTaken === 'Yes' ? 'bg-teal/10 text-teal' : 'bg-gray-100 text-gray-600'}`}>
                  
                        Meds: {entry.medicationsTaken}
                      </span>
                }
                    {entry.behaviourReported &&
                entry.behaviourReported !== 'None' &&
                <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-coral/10 text-coral">
                          {entry.behaviourReported}
                        </span>
                }
                  </div>
                </div>
                {entry.severityRating &&
            <Badge variant={getSeverityVariant(entry.severityRating)}>
                    {getSeverityShort(entry.severityRating)}
                  </Badge>
            }
              </div>
            </Card>
        )
        }
      </div>
    </div>);

}