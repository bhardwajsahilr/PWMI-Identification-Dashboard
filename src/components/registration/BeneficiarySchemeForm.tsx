import React, { useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { BeneficiarySchemeEntry } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Plus, CheckCircle, Building2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
export function BeneficiarySchemeForm() {
  const { selectedPatient: patient, addSubStageEntry } = usePatient();
  const [showNewForm, setShowNewForm] = useState(false);
  // Form State
  const [schemeApplied, setSchemeApplied] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [benefitsReceived, setBenefitsReceived] = useState('');
  if (!patient) return null;
  const entries = patient.beneficiarySchemeEntries || [];
  const handleSave = () => {
    const newEntry: BeneficiarySchemeEntry = {
      id: Date.now().toString(),
      schemeApplied,
      applicationDate,
      currentStatus,
      benefitsReceived,
      completedAt: new Date().toISOString()
    };
    addSubStageEntry(patient.id, 'beneficiarySchemeEntries', newEntry);
    setShowNewForm(false);
    resetForm();
  };
  const resetForm = () => {
    setSchemeApplied('');
    setApplicationDate('');
    setCurrentStatus('');
    setBenefitsReceived('');
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

          <Accordion
          title="A. Scheme Linkage"
          icon={<Building2 className="h-5 w-5" />}>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Scheme Applied
                  </label>
                  <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={schemeApplied}
                  onChange={(e) => setSchemeApplied(e.target.value)}>

                    <option value="">Select Scheme</option>
                    <option value="Disability pension">
                      Disability pension
                    </option>
                    <option value="MGNREGA">MGNREGA</option>
                    <option value="BPL card">BPL card</option>
                    <option value="Health insurance">Health insurance</option>
                    <option value="Housing scheme">Housing scheme</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <Input
                type="date"
                label="Date of Application"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)} />

                <div>
                  <label className="block text-sm font-medium text-neutral-secondary mb-2">
                    Current Status
                  </label>
                  <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}>

                    <option value="">Select Status</option>
                    <option value="Applied">Applied</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="In progress">In progress</option>
                  </select>
                </div>
              </div>
              <TextArea
              label="Benefits Received"
              rows={2}
              value={benefitsReceived}
              onChange={(e) => setBenefitsReceived(e.target.value)} />

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

              Save Scheme
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
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold text-lg text-neutral-text">
                    {entry.schemeApplied}
                  </div>
                  <div className="text-sm text-neutral-secondary mt-1">
                    Applied: {entry.applicationDate}
                  </div>
                  {entry.benefitsReceived &&
              <div className="text-sm text-gray-600 mt-1">
                      Benefits: {entry.benefitsReceived}
                    </div>
              }
                </div>
                <Badge
              variant={
              entry.currentStatus === 'Approved' ?
              'teal' :
              entry.currentStatus === 'Rejected' ?
              'coral' :
              'gray'
              }>

                  {entry.currentStatus}
                </Badge>
              </div>
            </Card>
        )
        }
      </div>
    </div>);

}