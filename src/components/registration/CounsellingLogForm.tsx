import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { CounsellingLogEntry } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Plus, CheckCircle, FileText, ClipboardList } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
export function CounsellingLogForm() {
  const { selectedPatient: patient, addSubStageEntry } = usePatient();
  const [showNewForm, setShowNewForm] = useState(false);
  // Form State
  const [sessionDate, setSessionDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [caseHistorySummary, setCaseHistorySummary] = useState('');
  const [severityRating, setSeverityRating] = useState('');
  const [lastSessionDate, setLastSessionDate] = useState('');
  const [counsellingType, setCounsellingType] = useState('');
  const [keyObservations, setKeyObservations] = useState('');
  // Validation
  const [dateError, setDateError] = useState('');
  if (!patient) return null;
  const entries = patient.counsellingLogEntries || [];
  const handleSave = () => {
    // Validate required field
    if (!sessionDate) {
      setDateError('Date of counselling is required.');
      return;
    }
    setDateError('');
    const newEntry: CounsellingLogEntry = {
      id: Date.now().toString(),
      sessionDate,
      caseHistorySummary,
      severityRating,
      lastSessionDate,
      counsellingType,
      keyObservations,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'counsellingLogEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setSessionDate(new Date().toISOString().split('T')[0]);
    setCaseHistorySummary('');
    setSeverityRating('');
    setLastSessionDate('');
    setCounsellingType('');
    setKeyObservations('');
    setDateError('');
  };
  const getSeverityLabel = (rating: string) => {
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
        <h3 className="text-lg font-bold text-neutral-text">Counselling</h3>
        <Button
          onClick={() => setShowNewForm(!showNewForm)}
          leftIcon={showNewForm ? undefined : <Plus className="h-4 w-4" />}
          variant={showNewForm ? 'ghost' : 'primary'}>

          {showNewForm ? 'Cancel' : 'Add Session'}
        </Button>
      </div>

      {showNewForm &&
      <div className="animate-in fade-in slide-in-from-top-4 space-y-6 border border-teal/20 rounded-xl p-6 bg-teal/5">
          <h4 className="font-bold text-teal mb-4">New Counselling Session</h4>

          {/* Section 1: Counselling Information */}
          <Accordion
          title="Counselling Information"
          icon={<FileText className="h-5 w-5" />}>

            <div className="space-y-4">
              <div>
                <Input
                type="date"
                label="Date of counselling *"
                value={sessionDate}
                onChange={(e) => {
                  setSessionDate(e.target.value);
                  if (e.target.value) setDateError('');
                }} />

                {dateError &&
              <p className="text-sm text-coral mt-1.5 font-medium">
                    {dateError}
                  </p>
              }
              </div>
            </div>
          </Accordion>

          {/* Section 2: Counselling Details */}
          <Accordion
          title="Counselling Details"
          icon={<ClipboardList className="h-5 w-5" />}>

            <div className="space-y-4">
              <TextArea
              label="Summary of the case history"
              rows={3}
              value={caseHistorySummary}
              onChange={(e) => setCaseHistorySummary(e.target.value)}
              placeholder="Write a brief summary…" />

              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Severity rating
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={severityRating}
                onChange={(e) => setSeverityRating(e.target.value)}>

                  <option value="">Select or search from the list</option>
                  <option value="Mild - Symptoms manageable; PWMI largely functional">
                    Mild - Symptoms manageable; PWMI largely functional
                  </option>
                  <option value="Moderate - Some functional impairment; needs regular support; no recent high-risk behavior">
                    Moderate - Some functional impairment; needs regular
                    support; no recent high-risk behavior
                  </option>
                  <option value="Severe - History of aggression/self-harm/wandering; total/near-total dependency; family/work severely disrupted">
                    Severe - History of aggression/self-harm/wandering;
                    total/near-total dependency; family/work severely disrupted
                  </option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Select or search from the list
                </p>
              </div>
              <Input
              type="date"
              label="Last counselling session date"
              value={lastSessionDate}
              onChange={(e) => setLastSessionDate(e.target.value)} />

              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Counseling type
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={counsellingType}
                onChange={(e) => setCounsellingType(e.target.value)}>

                  <option value="">Select or search from the list</option>
                  <option value="Face-to-face">Face-to-face</option>
                  <option value="Video call">Video call</option>
                  <option value="Phone call">Phone call</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Select or search from the list
                </p>
              </div>
              <TextArea
              label="Key clinical observations"
              rows={3}
              value={keyObservations}
              onChange={(e) => setKeyObservations(e.target.value)}
              placeholder="Key symptoms, behaviours, risks, progress…" />

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

      <div className="space-y-4">
        {entries.length === 0 ?
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            No counselling sessions recorded yet.
          </div> :

        entries.map((entry) =>
        <Card key={entry.id} className="p-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-text">
                      {entry.sessionDate}
                    </span>
                    {entry.counsellingType &&
                <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full">
                        {entry.counsellingType}
                      </span>
                }
                  </div>
                  {entry.lastSessionDate &&
              <div className="text-sm text-gray-500">
                      Last session: {entry.lastSessionDate}
                    </div>
              }
                  {entry.caseHistorySummary &&
              <p className="text-sm text-gray-600 line-clamp-2">
                      {entry.caseHistorySummary}
                    </p>
              }
                  {entry.keyObservations &&
              <p className="text-sm text-gray-500 italic line-clamp-2">
                      {entry.keyObservations}
                    </p>
              }
                </div>
                {entry.severityRating &&
            <Badge variant={getSeverityVariant(entry.severityRating)}>
                    {getSeverityLabel(entry.severityRating)}
                  </Badge>
            }
              </div>
            </Card>
        )
        }
      </div>
    </div>);

}