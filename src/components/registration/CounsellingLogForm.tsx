import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { CounsellingLogEntry } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Plus, CheckCircle, FileText } from 'lucide-react';
import { Card } from '../ui/Card';
export function CounsellingLogForm() {
  const { selectedPatient: patient, addSubStageEntry } = usePatient();
  const [showNewForm, setShowNewForm] = useState(false);
  // Form State
  const [sessionDate, setSessionDate] = useState('');
  const [caseHistorySummary, setCaseHistorySummary] = useState('');
  const [severityRating, setSeverityRating] = useState('');
  const [counsellingType, setCounsellingType] = useState('');
  const [actionPlan, setActionPlan] = useState('');
  const [nextSessionDate, setNextSessionDate] = useState('');
  if (!patient) return null;
  const entries = patient.counsellingLogEntries || [];
  const handleSave = () => {
    const newEntry: CounsellingLogEntry = {
      id: Date.now().toString(),
      sessionDate,
      caseHistorySummary,
      severityRating,
      counsellingType,
      actionPlan,
      nextSessionDate,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'counsellingLogEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setSessionDate('');
    setCaseHistorySummary('');
    setSeverityRating('');
    setCounsellingType('');
    setActionPlan('');
    setNextSessionDate('');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-neutral-text">
          Counselling History
        </h3>
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

          <Accordion
          title="A. Counselling Details"
          icon={<FileText className="h-5 w-5" />}>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                type="date"
                label="Session Date"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)} />

                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Severity Rating (1-5)
                  </label>
                  <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={severityRating}
                  onChange={(e) => setSeverityRating(e.target.value)}>

                    <option value="">Select Rating</option>
                    <option value="1">1 - Low</option>
                    <option value="2">2</option>
                    <option value="3">3 - Moderate</option>
                    <option value="4">4</option>
                    <option value="5">5 - High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Type of Counselling
                  </label>
                  <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={counsellingType}
                  onChange={(e) => setCounsellingType(e.target.value)}>

                    <option value="">Select Type</option>
                    <option value="Individual">Individual</option>
                    <option value="Family">Family</option>
                    <option value="Group">Group</option>
                    <option value="Crisis">Crisis</option>
                  </select>
                </div>
                <Input
                type="date"
                label="Next Session Date"
                value={nextSessionDate}
                onChange={(e) => setNextSessionDate(e.target.value)} />

              </div>
              <TextArea
              label="Summary of Case History"
              rows={3}
              value={caseHistorySummary}
              onChange={(e) => setCaseHistorySummary(e.target.value)} />

              <TextArea
              label="Action Plan"
              rows={3}
              value={actionPlan}
              onChange={(e) => setActionPlan(e.target.value)} />

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

              Save Session
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
                <div>
                  <div className="font-bold text-lg text-neutral-text">
                    {entry.sessionDate}
                  </div>
                  <div className="text-sm text-neutral-secondary mt-1">
                    Type: {entry.counsellingType} • Severity:{' '}
                    {entry.severityRating}/5
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {entry.caseHistorySummary}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  Next: {entry.nextSessionDate}
                </div>
              </div>
            </Card>
        )
        }
      </div>
    </div>);

}