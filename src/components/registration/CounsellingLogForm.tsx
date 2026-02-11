import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { CounsellingLogData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { FileText, CheckCircle } from 'lucide-react';
export function CounsellingLogForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [sessionDate, setSessionDate] = useState('');
  const [sessionNumber, setSessionNumber] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [keyIssuesDiscussed, setKeyIssuesDiscussed] = useState('');
  const [interventionsUsed, setInterventionsUsed] = useState<string[]>([]);
  const [clientResponse, setClientResponse] = useState('');
  const [nextSessionDate, setNextSessionDate] = useState('');
  const [counsellorName, setCounsellorName] = useState('');
  useEffect(() => {
    if (patient?.counsellingLogData) {
      const data = patient.counsellingLogData;
      setSessionDate(data.sessionDate || '');
      setSessionNumber(data.sessionNumber || '');
      setSessionType(data.sessionType || '');
      setKeyIssuesDiscussed(data.keyIssuesDiscussed || '');
      setInterventionsUsed(data.interventionsUsed || []);
      setClientResponse(data.clientResponse || '');
      setNextSessionDate(data.nextSessionDate || '');
      setCounsellorName(data.counsellorName || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleInterventionChange = (label: string, checked: boolean) => {
    if (checked) setInterventionsUsed([...interventionsUsed, label]);else
    setInterventionsUsed(interventionsUsed.filter((i) => i !== label));
  };
  const handleSave = () => {
    const data: CounsellingLogData = {
      sessionDate,
      sessionNumber,
      sessionType,
      keyIssuesDiscussed,
      interventionsUsed,
      clientResponse,
      nextSessionDate,
      counsellorName,
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'counsellingLogData', data);
  };
  const interventions = [
  'CBT',
  'Supportive therapy',
  'Psychoeducation',
  'Relaxation techniques',
  'Crisis intervention',
  'Other'];

  return (
    <>
      <Card accent="top" accentColor="softPink" className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="h-16 w-16 rounded-full bg-softPink/30 flex items-center justify-center text-coral font-bold text-xl">
              {patient.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-text">
                {patient.name}
              </h2>
              <div className="flex items-center gap-3 text-neutral-secondary mt-1">
                <span>{patient.age} Years</span>
                <span>•</span>
                <span>{patient.gender}</span>
              </div>
            </div>
          </div>
          <Badge variant="teal">{patient.riskLevel} Risk</Badge>
        </div>
      </Card>

      <Accordion
        title="Counselling Session"
        icon={<FileText className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="date"
              label="Session Date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)} />

            <Input
              label="Session Number"
              value={sessionNumber}
              onChange={(e) => setSessionNumber(e.target.value)} />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Session Type
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}>

                <option value="">Select Type</option>
                <option value="Individual">Individual</option>
                <option value="Family">Family</option>
                <option value="Group">Group</option>
              </select>
            </div>
          </div>
          <TextArea
            label="Key Issues Discussed"
            rows={3}
            value={keyIssuesDiscussed}
            onChange={(e) => setKeyIssuesDiscussed(e.target.value)} />

          <div>
            <label className="block text-sm font-medium text-neutral-secondary mb-2">
              Interventions Used
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interventions.map((i) =>
              <Checkbox
                key={i}
                label={i}
                checked={interventionsUsed.includes(i)}
                onChange={(e) =>
                handleInterventionChange(i, e.target.checked)
                } />

              )}
            </div>
          </div>
          <TextArea
            label="Client Response"
            rows={2}
            value={clientResponse}
            onChange={(e) => setClientResponse(e.target.value)} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Next Session Date"
              value={nextSessionDate}
              onChange={(e) => setNextSessionDate(e.target.value)} />

            <Input
              label="Counsellor Name"
              value={counsellorName}
              onChange={(e) => setCounsellorName(e.target.value)} />

          </div>
        </div>
      </Accordion>

      <div className="h-20"></div>
      <div className="bg-white border-t border-softPink p-4 shadow-lg flex justify-between items-center z-20">
        <Button variant="ghost">Reset</Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSave}>
            Save Draft
          </Button>
          <Button
            variant="primary"
            leftIcon={<CheckCircle className="h-4 w-4" />}
            onClick={handleSave}>

            Save & Complete
          </Button>
        </div>
      </div>
    </>);

}