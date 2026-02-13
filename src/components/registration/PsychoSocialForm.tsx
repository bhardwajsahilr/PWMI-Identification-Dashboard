import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { PsychoSocialEntry } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Plus, CheckCircle, BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';
export function PsychoSocialForm() {
  const { selectedPatient: patient, addSubStageEntry } = usePatient();
  const [showNewForm, setShowNewForm] = useState(false);
  // Form State
  const [attended, setAttended] = useState('');
  const [topicName, setTopicName] = useState('');
  const [sessionDate, setSessionDate] = useState('');
  const [facilitatorName, setFacilitatorName] = useState('');
  if (!patient) return null;
  const entries = patient.psychoSocialEntries || [];
  const handleSave = () => {
    const newEntry: PsychoSocialEntry = {
      id: Date.now().toString(),
      attended,
      topicName,
      sessionDate,
      facilitatorName,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'psychoSocialEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setAttended('');
    setTopicName('');
    setSessionDate('');
    setFacilitatorName('');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-neutral-text">
          Psycho-social Education
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
          <h4 className="font-bold text-teal mb-4">New Session</h4>

          <Accordion
          title="A. Psycho-social Education Sessions"
          icon={<BookOpen className="h-5 w-5" />}>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Sessions Attended
                  </label>
                  <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={attended}
                  onChange={(e) => setAttended(e.target.value)}>

                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <Input
                type="date"
                label="Date of Session"
                value={sessionDate}
                onChange={(e) => setSessionDate(e.target.value)} />

                <Input
                label="Name of Topic"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)} />

                <Input
                label="Facilitator Name"
                value={facilitatorName}
                onChange={(e) => setFacilitatorName(e.target.value)} />

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

              Save Session
            </Button>
          </div>
        </div>
      }

      <div className="space-y-4">
        {entries.length === 0 ?
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            No sessions recorded yet.
          </div> :

        entries.map((entry) =>
        <Card key={entry.id} className="p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg text-neutral-text">
                    {entry.topicName}
                  </div>
                  <div className="text-sm text-neutral-secondary mt-1">
                    Date: {entry.sessionDate} • Facilitator:{' '}
                    {entry.facilitatorName}
                  </div>
                </div>
                <div className="text-sm font-medium text-teal">
                  Attended: {entry.attended}
                </div>
              </div>
            </Card>
        )
        }
      </div>
    </div>);

}