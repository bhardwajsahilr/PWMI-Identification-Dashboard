import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { VocationalTrainingData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { CheckCircle, GraduationCap } from 'lucide-react';
export function VocationalTrainingForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [trainingType, setTrainingType] = useState('');
  const [trainingProvider, setTrainingProvider] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [skillsLearned, setSkillsLearned] = useState('');
  const [certificationReceived, setCertificationReceived] = useState(false);
  const [employmentStatus, setEmploymentStatus] = useState('');
  const [remarks, setRemarks] = useState('');
  useEffect(() => {
    if (patient?.vocationalTrainingData) {
      const data = patient.vocationalTrainingData;
      setTrainingType(data.trainingType || '');
      setTrainingProvider(data.trainingProvider || '');
      setStartDate(data.startDate || '');
      setEndDate(data.endDate || '');
      setSkillsLearned(data.skillsLearned || '');
      setCertificationReceived(data.certificationReceived || false);
      setEmploymentStatus(data.employmentStatus || '');
      setRemarks(data.remarks || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSave = () => {
    const data: VocationalTrainingData = {
      trainingType,
      trainingProvider,
      startDate,
      endDate,
      skillsLearned,
      certificationReceived,
      employmentStatus,
      remarks,
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'vocationalTrainingData', data);
  };
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
        title="Training Details"
        icon={<GraduationCap className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Training Type"
              value={trainingType}
              onChange={(e) => setTrainingType(e.target.value)} />

            <Input
              label="Training Provider"
              value={trainingProvider}
              onChange={(e) => setTrainingProvider(e.target.value)} />

            <Input
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)} />

            <Input
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)} />

          </div>
          <TextArea
            label="Skills Learned"
            rows={2}
            value={skillsLearned}
            onChange={(e) => setSkillsLearned(e.target.value)} />

          <div className="flex items-center gap-4">
            <Checkbox
              label="Certification Received"
              checked={certificationReceived}
              onChange={(e) => setCertificationReceived(e.target.checked)} />

          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-secondary mb-2">
              Employment Status
            </label>
            <select
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
              value={employmentStatus}
              onChange={(e) => setEmploymentStatus(e.target.value)}>

              <option value="">Select Status</option>
              <option value="Employed">Employed</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Seeking employment">Seeking employment</option>
              <option value="Not applicable">Not applicable</option>
            </select>
          </div>
          <TextArea
            label="Remarks"
            rows={2}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)} />

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