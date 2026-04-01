import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { BeneficiarySchemeEntry } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input } from '../ui/Input';
import { Plus, CheckCircle, Building2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
export function BeneficiarySchemeForm() {
  const { selectedPatient: patient, addSubStageEntry } = usePatient();
  const [showNewForm, setShowNewForm] = useState(false);
  // Form State
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [dueDate, setDueDate] = useState('');
  const [schemeApplied, setSchemeApplied] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [benefitsReceived, setBenefitsReceived] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  if (!patient) return null;
  const entries = patient.beneficiarySchemeEntries || [];
  const handleSave = () => {
    const newEntry: BeneficiarySchemeEntry = {
      id: Date.now().toString(),
      reportDate,
      dueDate,
      schemeApplied,
      applicationDate,
      currentStatus,
      benefitsReceived,
      rejectionReason,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'beneficiarySchemeEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setReportDate(new Date().toISOString().split('T')[0]);
    setDueDate('');
    setSchemeApplied('');
    setApplicationDate('');
    setCurrentStatus('');
    setBenefitsReceived('');
    setRejectionReason('');
  };
  const getStatusVariant = (status: string): 'teal' | 'coral' | 'gray' => {
    if (status === 'Approved' || status === 'Enrolled') return 'teal';
    if (status === 'Rejected') return 'coral';
    return 'gray';
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-neutral-text">Schemes Linked</h3>
        <Button
          onClick={() => setShowNewForm(!showNewForm)}
          leftIcon={showNewForm ? undefined : <Plus className="h-4 w-4" />}
          variant={showNewForm ? 'ghost' : 'primary'}>
          
          {showNewForm ? 'Cancel' : 'Add Scheme Linkage'}
        </Button>
      </div>

      {showNewForm &&
      <div className="animate-in fade-in slide-in-from-top-4 space-y-6 border border-teal/20 rounded-xl p-6 bg-teal/5">
          <h4 className="font-bold text-teal mb-4">New Scheme Linkage</h4>

          {/* Report Date & Due Date — outside accordion */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
            type="date"
            label="Report Date *"
            value={reportDate}
            onChange={(e) => setReportDate(e.target.value)} />
          
            <Input
            type="date"
            label="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)} />
          
          </div>

          <Accordion
          title="Scheme Linkage"
          icon={<Building2 className="h-5 w-5" />}>
          
            <div className="space-y-4">
              <Input
              label="Scheme applied for"
              value={schemeApplied}
              onChange={(e) => setSchemeApplied(e.target.value)} />
            
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
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="In process">In process</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Select or search from the list
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Benefits received
                </label>
                <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={benefitsReceived}
                onChange={(e) => setBenefitsReceived(e.target.value)}>
                
                  <option value="">Select or search from the list</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  Select or search from the list
                </p>
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
                <p className="text-xs text-gray-400 mt-1">
                  Select or search from the list
                </p>
              </div>
            </div>
          </Accordion>

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
            No schemes linked yet.
          </div> :

        entries.map((entry) =>
        <Card key={entry.id} className="p-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      Report: {entry.reportDate}
                    </span>
                    {entry.dueDate &&
                <>
                        <span className="text-gray-300">•</span>
                        <span className="text-sm text-gray-500">
                          Due: {entry.dueDate}
                        </span>
                      </>
                }
                  </div>
                  <div className="font-bold text-neutral-text">
                    {entry.schemeApplied}
                  </div>
                  <div className="text-sm text-neutral-secondary">
                    Applied: {entry.applicationDate}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {entry.benefitsReceived &&
                <span
                  className={`inline-block text-xs px-2.5 py-1 rounded-full ${entry.benefitsReceived === 'Yes' ? 'bg-teal/10 text-teal' : 'bg-gray-100 text-gray-600'}`}>
                  
                        Benefits: {entry.benefitsReceived}
                      </span>
                }
                    {entry.rejectionReason &&
                <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-coral/10 text-coral">
                        {entry.rejectionReason}
                      </span>
                }
                  </div>
                </div>
                <Badge variant={getStatusVariant(entry.currentStatus)}>
                  {entry.currentStatus || 'Pending'}
                </Badge>
              </div>
            </Card>
        )
        }
      </div>
    </div>);

}