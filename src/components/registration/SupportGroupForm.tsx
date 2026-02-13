import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { SupportGroupEntry } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Plus, CheckCircle, Users } from 'lucide-react';
import { Card } from '../ui/Card';
export function SupportGroupForm() {
  const { selectedPatient: patient, addSubStageEntry } = usePatient();
  const [showNewForm, setShowNewForm] = useState(false);
  // Form State
  const [attended, setAttended] = useState('');
  const [topicDiscussed, setTopicDiscussed] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  if (!patient) return null;
  const entries = patient.supportGroupEntries || [];
  const handleSave = () => {
    const newEntry: SupportGroupEntry = {
      id: Date.now().toString(),
      attended,
      topicDiscussed,
      meetingDate,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'supportGroupEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setAttended('');
    setTopicDiscussed('');
    setMeetingDate('');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-neutral-text">
          Support Group Meetings
        </h3>
        <Button
          onClick={() => setShowNewForm(!showNewForm)}
          leftIcon={showNewForm ? undefined : <Plus className="h-4 w-4" />}
          variant={showNewForm ? 'ghost' : 'primary'}>

          {showNewForm ? 'Cancel' : 'Add Meeting'}
        </Button>
      </div>

      {showNewForm &&
      <div className="animate-in fade-in slide-in-from-top-4 space-y-6 border border-teal/20 rounded-xl p-6 bg-teal/5">
          <h4 className="font-bold text-teal mb-4">
            New Support Group Meeting
          </h4>

          <Accordion
          title="A. Support Group Meeting Detail"
          icon={<Users className="h-5 w-5" />}>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Meetings Attended
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
                label="Date of Meeting"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)} />

              </div>
              <TextArea
              label="Name of Topic Discussed"
              rows={2}
              value={topicDiscussed}
              onChange={(e) => setTopicDiscussed(e.target.value)} />

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

              Save Meeting
            </Button>
          </div>
        </div>
      }

      <div className="space-y-4">
        {entries.length === 0 ?
        <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            No support group meetings recorded yet.
          </div> :

        entries.map((entry) =>
        <Card key={entry.id} className="p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg text-neutral-text">
                    {entry.topicDiscussed}
                  </div>
                  <div className="text-sm text-neutral-secondary mt-1">
                    Date: {entry.meetingDate}
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