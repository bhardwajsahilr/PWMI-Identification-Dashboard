import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { SelfEmploymentData } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input } from '../ui/Input';
import { CheckCircle, Briefcase } from 'lucide-react';
export function SelfEmploymentForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [annualHouseholdIncome, setAnnualHouseholdIncome] = useState('');
  const [monthlyHouseholdIncome, setMonthlyHouseholdIncome] = useState('');
  const [natureOfEmployment, setNatureOfEmployment] = useState('');
  const [otherNatureSpecify, setOtherNatureSpecify] = useState('');
  const [dateStarted, setDateStarted] = useState('');
  useEffect(() => {
    if (patient?.selfEmploymentData) {
      const data = patient.selfEmploymentData;
      setAnnualHouseholdIncome(data.annualHouseholdIncome || '');
      setMonthlyHouseholdIncome(data.monthlyHouseholdIncome || '');
      setNatureOfEmployment(data.natureOfEmployment || '');
      setOtherNatureSpecify(data.otherNatureSpecify || '');
      setDateStarted(data.dateStarted || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSave = () => {
    const data: SelfEmploymentData = {
      annualHouseholdIncome,
      monthlyHouseholdIncome,
      natureOfEmployment,
      otherNatureSpecify,
      dateStarted,
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'selfEmploymentData', data);
    alert('Self Employment details saved!');
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-neutral-text">Self Employment</h3>
      </div>

      <Accordion
        title="A. Self Employment Details"
        icon={<Briefcase className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Annual Household Income (₹)"
              type="number"
              value={annualHouseholdIncome}
              onChange={(e) => setAnnualHouseholdIncome(e.target.value)} />

            <Input
              label="Monthly Household Income (₹)"
              type="number"
              value={monthlyHouseholdIncome}
              onChange={(e) => setMonthlyHouseholdIncome(e.target.value)} />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Nature of Self-employment
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={natureOfEmployment}
                onChange={(e) => setNatureOfEmployment(e.target.value)}>

                <option value="">Select Nature</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Petty shop">Petty shop</option>
                <option value="Tailoring">Tailoring</option>
                <option value="Animal husbandry">Animal husbandry</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {natureOfEmployment === 'Other' &&
            <Input
              label="Specify Other"
              value={otherNatureSpecify}
              onChange={(e) => setOtherNatureSpecify(e.target.value)} />

            }
            <Input
              type="date"
              label="Date Started"
              value={dateStarted}
              onChange={(e) => setDateStarted(e.target.value)} />

          </div>
        </div>
      </Accordion>

      <div className="flex justify-end pt-4">
        <Button
          variant="primary"
          onClick={handleSave}
          leftIcon={<CheckCircle className="h-4 w-4" />}>

          Save Details
        </Button>
      </div>
    </div>);

}