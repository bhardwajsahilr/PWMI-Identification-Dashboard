import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { CaregiverBurdenData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Checkbox } from '../ui/Checkbox';
import { CheckCircle, Heart, AlertTriangle } from 'lucide-react';
export function CaregiverBurdenForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [caregiverName, setCaregiverName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [burdenLevel, setBurdenLevel] = useState('');
  const [assessmentDate, setAssessmentDate] = useState('');
  const [physicalHealth, setPhysicalHealth] = useState('');
  const [emotionalHealth, setEmotionalHealth] = useState('');
  const [financialImpact, setFinancialImpact] = useState('');
  const [supportNeeded, setSupportNeeded] = useState<string[]>([]);
  const [referralForCaregiver, setReferralForCaregiver] = useState('');
  useEffect(() => {
    if (patient?.caregiverBurdenData) {
      const data = patient.caregiverBurdenData;
      setCaregiverName(data.caregiverName || '');
      setRelationship(data.relationship || '');
      setBurdenLevel(data.burdenLevel || '');
      setAssessmentDate(data.assessmentDate || '');
      setPhysicalHealth(data.physicalHealth || '');
      setEmotionalHealth(data.emotionalHealth || '');
      setFinancialImpact(data.financialImpact || '');
      setSupportNeeded(data.supportNeeded || []);
      setReferralForCaregiver(data.referralForCaregiver || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSupportChange = (label: string, checked: boolean) => {
    if (checked) setSupportNeeded([...supportNeeded, label]);else
    setSupportNeeded(supportNeeded.filter((s) => s !== label));
  };
  const handleSave = () => {
    const data: CaregiverBurdenData = {
      caregiverName,
      relationship,
      burdenLevel,
      assessmentDate,
      physicalHealth,
      emotionalHealth,
      financialImpact,
      supportNeeded,
      referralForCaregiver,
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'caregiverBurdenData', data);
  };
  const supports = [
  'Respite care',
  'Counselling',
  'Financial assistance',
  'Peer support',
  'Information/education',
  'Other'];

  const isHighBurden = burdenLevel === 'High' || burdenLevel === 'Severe';
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
        title="Caregiver Assessment"
        icon={<Heart className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Caregiver Name"
              value={caregiverName}
              onChange={(e) => setCaregiverName(e.target.value)} />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Relationship
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}>

                <option value="">Select Relationship</option>
                <option value="Spouse">Spouse</option>
                <option value="Parent">Parent</option>
                <option value="Child">Child</option>
                <option value="Sibling">Sibling</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Burden Level
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={burdenLevel}
                onChange={(e) => setBurdenLevel(e.target.value)}>

                <option value="">Select Level</option>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Severe">Severe</option>
              </select>
            </div>
            <Input
              type="date"
              label="Assessment Date"
              value={assessmentDate}
              onChange={(e) => setAssessmentDate(e.target.value)} />

          </div>

          {isHighBurden &&
          <div className="bg-coral/10 border border-coral p-4 rounded-lg flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-coral" />
              <p className="text-coral font-bold">
                High caregiver burden detected. Consider immediate support or
                respite care.
              </p>
            </div>
          }

          <TextArea
            label="Physical Health Impact"
            rows={2}
            value={physicalHealth}
            onChange={(e) => setPhysicalHealth(e.target.value)} />

          <TextArea
            label="Emotional Health Impact"
            rows={2}
            value={emotionalHealth}
            onChange={(e) => setEmotionalHealth(e.target.value)} />

          <TextArea
            label="Financial Impact"
            rows={2}
            value={financialImpact}
            onChange={(e) => setFinancialImpact(e.target.value)} />


          <div>
            <label className="block text-sm font-medium text-neutral-secondary mb-2">
              Support Needed
            </label>
            <div className="grid grid-cols-2 gap-2">
              {supports.map((s) =>
              <Checkbox
                key={s}
                label={s}
                checked={supportNeeded.includes(s)}
                onChange={(e) => handleSupportChange(s, e.target.checked)} />

              )}
            </div>
          </div>
          <Input
            label="Referral for Caregiver"
            value={referralForCaregiver}
            onChange={(e) => setReferralForCaregiver(e.target.value)} />

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