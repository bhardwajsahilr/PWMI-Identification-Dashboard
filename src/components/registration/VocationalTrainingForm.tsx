import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { VocationalTrainingEntry } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input } from '../ui/Input';
import { Plus, CheckCircle, GraduationCap } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
export function VocationalTrainingForm() {
  const { selectedPatient: patient, addSubStageEntry } = usePatient();
  const [showNewForm, setShowNewForm] = useState(false);
  // Form State
  const [provider, setProvider] = useState('');
  const [trainingApplied, setTrainingApplied] = useState('');
  const [enrolmentDate, setEnrolmentDate] = useState('');
  const [completionStatus, setCompletionStatus] = useState('');
  if (!patient) return null;
  const entries = patient.vocationalTrainingEntries || [];
  const handleSave = () => {
    const newEntry: VocationalTrainingEntry = {
      id: Date.now().toString(),
      provider,
      trainingApplied,
      enrolmentDate,
      completionStatus,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'vocationalTrainingEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setProvider('');
    setTrainingApplied('');
    setEnrolmentDate('');
    setCompletionStatus('');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-neutral-text">
          Vocational Training History
        </h3>
        <Button
          onClick={() => setShowNewForm(!showNewForm)}
          leftIcon={showNewForm ? undefined : <Plus className="h-4 w-4" />}
          variant={showNewForm ? 'ghost' : 'primary'}>

          {showNewForm ? 'Cancel' : 'Add Training'}
        </Button>
      </div>

      {showNewForm &&
      <div className="animate-in fade-in slide-in-from-top-4 space-y-6 border border-teal/20 rounded-xl p-6 bg-teal/5">
          <h4 className="font-bold text-teal mb-4">New Vocational Training</h4>

          <Accordion
          title="A. Vocational Training"
          icon={<GraduationCap className="h-5 w-5" />}>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                label="Provider of Training"
                value={provider}
                onChange={(e) => setProvider(e.target.value)} />

                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Training Applied
                  </label>
                  <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={trainingApplied}
                  onChange={(e) => setTrainingApplied(e.target.value)}>

                    <option value="">Select Training</option>
                    <option value="Computer skills">Computer skills</option>
                    <option value="Tailoring">Tailoring</option>
                    <option value="Handicrafts">Handicrafts</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <Input
                type="date"
                label="Date of Enrolment"
                value={enrolmentDate}
                onChange={(e) => setEnrolmentDate(e.target.value)} />

                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Completion Status
                  </label>
                  <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={completionStatus}
                  onChange={(e) => setCompletionStatus(e.target.value)}>

                    <option value="">Select Status</option>
                    <option value="Enrolled">Enrolled</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Dropped">Dropped</option>
                  </select>
                </div>
              </div>
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

              Save Training
            </Button>
          </div>
        </div>
      }

      <div className="space-y-4">
        {entries.length === 0 ?
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            No vocational training recorded yet.
          </div> :

        entries.map((entry) =>
        <Card key={entry.id} className="p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg text-neutral-text">
                    {entry.trainingApplied}
                  </div>
                  <div className="text-sm text-neutral-secondary mt-1">
                    Provider: {entry.provider} • Enrolled: {entry.enrolmentDate}
                  </div>
                </div>
                <Badge
              variant={
              entry.completionStatus === 'Completed' ?
              'teal' :
              entry.completionStatus === 'Dropped' ?
              'coral' :
              'gray'
              }>

                  {entry.completionStatus}
                </Badge>
              </div>
            </Card>
        )
        }
      </div>
    </div>);

}