import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { SelfEmploymentData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { CheckCircle, Briefcase } from 'lucide-react';
export function SelfEmploymentForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [activityType, setActivityType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [skillsIdentified, setSkillsIdentified] = useState('');
  const [trainingProvided, setTrainingProvided] = useState('');
  const [financialSupport, setFinancialSupport] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [incomeGenerated, setIncomeGenerated] = useState('');
  const [remarks, setRemarks] = useState('');
  useEffect(() => {
    if (patient?.selfEmploymentData) {
      const data = patient.selfEmploymentData;
      setActivityType(data.activityType || '');
      setStartDate(data.startDate || '');
      setSkillsIdentified(data.skillsIdentified || '');
      setTrainingProvided(data.trainingProvided || '');
      setFinancialSupport(data.financialSupport || '');
      setCurrentStatus(data.currentStatus || '');
      setIncomeGenerated(data.incomeGenerated || '');
      setRemarks(data.remarks || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSave = () => {
    const data: SelfEmploymentData = {
      activityType,
      startDate,
      skillsIdentified,
      trainingProvided,
      financialSupport,
      currentStatus,
      incomeGenerated,
      remarks,
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'selfEmploymentData', data);
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
        title="Self Employment Details"
        icon={<Briefcase className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Activity Type"
              value={activityType}
              onChange={(e) => setActivityType(e.target.value)} />

            <Input
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)} />

          </div>
          <TextArea
            label="Skills Identified"
            rows={2}
            value={skillsIdentified}
            onChange={(e) => setSkillsIdentified(e.target.value)} />

          <TextArea
            label="Training Provided"
            rows={2}
            value={trainingProvided}
            onChange={(e) => setTrainingProvided(e.target.value)} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Financial Support"
              value={financialSupport}
              onChange={(e) => setFinancialSupport(e.target.value)} />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Current Status
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value)}>

                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <Input
              label="Income Generated"
              value={incomeGenerated}
              onChange={(e) => setIncomeGenerated(e.target.value)} />

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