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
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [trainingDate, setTrainingDate] = useState('');
  const [provider, setProvider] = useState('');
  const [trainingApplied, setTrainingApplied] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [trainingStarted, setTrainingStarted] = useState('');
  const [trainingCompleted, setTrainingCompleted] = useState('');
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [otherEmploymentStatus, setOtherEmploymentStatus] = useState('');
  if (!patient) return null;
  const entries = patient.vocationalTrainingEntries || [];
  const handleSave = () => {
    const newEntry: VocationalTrainingEntry = {
      id: Date.now().toString(),
      reportDate,
      trainingDate,
      provider,
      trainingApplied,
      applicationDate,
      applicationStatus,
      rejectionReason,
      trainingStarted,
      trainingCompleted,
      employmentStatus,
      otherEmploymentStatus,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'vocationalTrainingEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setReportDate(new Date().toISOString().split('T')[0]);
    setTrainingDate('');
    setProvider('');
    setTrainingApplied('');
    setApplicationDate('');
    setApplicationStatus('');
    setRejectionReason('');
    setTrainingStarted('');
    setTrainingCompleted('');
    setEmploymentStatus('');
    setOtherEmploymentStatus('');
  };
  const getStatusVariant = (status: string) => {
    if (status === 'Approved' || status === 'Enrolled') return 'teal';
    if (status === 'Rejected') return 'coral';
    return 'gray';
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-neutral-text">
          Vocational Training
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

          {/* Report Date — outside accordion */}
          <div className="w-full md:w-1/2">
            <Input
            type="date"
            label="Report Date *"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)} />
          
          </div>

          <Accordion
          title="Vocational Training"
          icon={<GraduationCap className="h-5 w-5" />}>
          
            <div className="space-y-4">
              <Input
              type="date"
              label="Date of the training"
              value={trainingDate}
              onChange={(e) => setTrainingDate(e.target.value)} />
            
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Provider of the training
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Government Body">Government Body</option>
                  <option value="NGO">NGO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Training applied
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={trainingApplied}
                onChange={(e) => setTrainingApplied(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Beautification">Beautification</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Computer">Computer</option>
                </select>
              </div>
              <Input
              type="date"
              label="Date of application"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)} />
            
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Current status of application
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={applicationStatus}
                onChange={(e) => setApplicationStatus(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="In process">In process</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Reason for delay / rejection (if any)
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Missing Documents">Missing Documents</option>
                  <option value="Verification Pending">
                    Verification Pending
                  </option>
                  <option value="Ineligible">Ineligible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Training started?
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={trainingStarted}
                onChange={(e) => setTrainingStarted(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Training completed
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={trainingCompleted}
                onChange={(e) => setTrainingCompleted(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Post-training employment status
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={employmentStatus}
                onChange={(e) => {
                  setEmploymentStatus(e.target.value);
                  if (e.target.value !== 'Others (specify)') {
                    setOtherEmploymentStatus('');
                  }
                }}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Employed">Employed</option>
                  <option value="Self-employed">Self-employed</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Others (specify)">Others (specify)</option>
                </select>
              </div>
              {employmentStatus === 'Others (specify)' &&
            <Input
              label="Please specify employment status"
              value={otherEmploymentStatus}
              onChange={(e) => setOtherEmploymentStatus(e.target.value)}
              placeholder="Enter employment status" />

            }
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
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Report: {entry.reportDate}
                    </span>
                    {entry.trainingDate &&
                <>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">
                          Training: {entry.trainingDate}
                        </span>
                      </>
                }
                  </div>
                  <div className="font-bold text-neutral-text">
                    {entry.trainingApplied}
                  </div>
                  <div className="text-sm text-neutral-secondary">
                    Provider: {entry.provider}
                    {entry.employmentStatus &&
                <>
                        {' '}
                        • Employment:{' '}
                        {entry.employmentStatus === 'Others (specify)' ?
                  entry.otherEmploymentStatus || 'Others' :
                  entry.employmentStatus}
                      </>
                }
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {entry.trainingStarted &&
                <span
                  className={`inline-block text-xs px-2.5 py-1 rounded-full ${entry.trainingStarted === 'Yes' ? 'bg-teal/10 text-teal' : 'bg-gray-100 text-gray-600'}`}>
                  
                        Started: {entry.trainingStarted}
                      </span>
                }
                    {entry.trainingCompleted &&
                <span
                  className={`inline-block text-xs px-2.5 py-1 rounded-full ${entry.trainingCompleted === 'Yes' ? 'bg-teal/10 text-teal' : 'bg-gray-100 text-gray-600'}`}>
                  
                        Completed: {entry.trainingCompleted}
                      </span>
                }
                  </div>
                </div>
                <Badge variant={getStatusVariant(entry.applicationStatus)}>
                  {entry.applicationStatus || 'Pending'}
                </Badge>
              </div>
            </Card>
        )
        }
      </div>
    </div>);

}