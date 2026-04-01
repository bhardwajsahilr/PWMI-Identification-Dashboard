import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { SupportGroupEntry } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input } from '../ui/Input';
import { Plus, CheckCircle, Users } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
export function SupportGroupForm() {
  const { selectedPatient: patient, addSubStageEntry } = usePatient();
  const [showNewForm, setShowNewForm] = useState(false);
  // Form State
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [attended, setAttended] = useState('');
  const [topicName1, setTopicName1] = useState('');
  const [topicName2, setTopicName2] = useState('');
  const [topicName3, setTopicName3] = useState('');
  const [topicName4, setTopicName4] = useState('');
  const [topicName5, setTopicName5] = useState('');
  if (!patient) return null;
  const entries = patient.supportGroupEntries || [];
  const handleSave = () => {
    const newEntry: SupportGroupEntry = {
      id: Date.now().toString(),
      reportDate,
      attended,
      topicName1,
      topicName2,
      topicName3,
      topicName4,
      topicName5,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'supportGroupEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setReportDate(new Date().toISOString().split('T')[0]);
    setAttended('');
    setTopicName1('');
    setTopicName2('');
    setTopicName3('');
    setTopicName4('');
    setTopicName5('');
  };
  const getTopics = (entry: SupportGroupEntry) => {
    return [
    entry.topicName1,
    entry.topicName2,
    entry.topicName3,
    entry.topicName4,
    entry.topicName5].
    filter(Boolean);
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

          {/* Report Date — outside accordion */}
          <div className="w-full md:w-1/2">
            <Input
            type="date"
            label="Report Date *"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)} />
          
          </div>

          <Accordion
          title="Support Group Meeting Detail"
          icon={<Users className="h-5 w-5" />}>
          
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Support group meetings attended?
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={attended}
                onChange={(e) => setAttended(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <Input
              label="Name of topic (1)"
              value={topicName1}
              onChange={(e) => setTopicName1(e.target.value)} />
            
              <Input
              label="Name of topic (2)"
              value={topicName2}
              onChange={(e) => setTopicName2(e.target.value)} />
            
              <Input
              label="Name of topic (3)"
              value={topicName3}
              onChange={(e) => setTopicName3(e.target.value)} />
            
              <Input
              label="Name of topic (4)"
              value={topicName4}
              onChange={(e) => setTopicName4(e.target.value)} />
            
              <Input
              label="Name of topic (5)"
              value={topicName5}
              onChange={(e) => setTopicName5(e.target.value)} />
            
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

        entries.map((entry) => {
          const topics = getTopics(entry);
          return (
            <Card key={entry.id} className="p-4 border border-gray-200">
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5">
                    <span className="text-sm text-gray-500">
                      Report: {entry.reportDate}
                    </span>
                    {topics.length > 0 &&
                  <div className="flex flex-wrap gap-1.5 mt-1">
                        {topics.map((topic, i) =>
                    <span
                      key={i}
                      className="inline-block bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">
                      
                            {topic}
                          </span>
                    )}
                      </div>
                  }
                  </div>
                  <Badge variant={entry.attended === 'Yes' ? 'teal' : 'coral'}>
                    {entry.attended === 'Yes' ? 'Attended' : 'Not Attended'}
                  </Badge>
                </div>
              </Card>);

        })
        }
      </div>
    </div>);

}