import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { SelfEmploymentData } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { Input } from '../ui/Input';
import { CheckCircle, Briefcase } from 'lucide-react';
export function SelfEmploymentForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [reportDate, setReportDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [annualHouseholdIncome, setAnnualHouseholdIncome] = useState('');
  const [monthlyHouseholdIncome, setMonthlyHouseholdIncome] = useState('');
  const [selfEmploymentInterest, setSelfEmploymentInterest] = useState('');
  const [amountDisbursed, setAmountDisbursed] = useState('');
  const [disbursementDate, setDisbursementDate] = useState('');
  useEffect(() => {
    if (patient?.selfEmploymentData) {
      const data = patient.selfEmploymentData;
      setReportDate(data.reportDate || new Date().toISOString().split('T')[0]);
      setAnnualHouseholdIncome(data.annualHouseholdIncome || '');
      setMonthlyHouseholdIncome(data.monthlyHouseholdIncome || '');
      setSelfEmploymentInterest(data.selfEmploymentInterest || '');
      setAmountDisbursed(data.amountDisbursed || '');
      setDisbursementDate(data.disbursementDate || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSave = () => {
    const data: SelfEmploymentData = {
      reportDate,
      annualHouseholdIncome,
      monthlyHouseholdIncome,
      selfEmploymentInterest,
      amountDisbursed,
      disbursementDate,
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

      {/* Report Date — outside accordion */}
      <div className="w-full md:w-1/2">
        <Input
          type="date"
          label="Report Date *"
          value={reportDate}
          onChange={(e) => setReportDate(e.target.value)} />
        
      </div>

      <Accordion
        title="Self Employment Details"
        icon={<Briefcase className="h-5 w-5" />}>
        
        <div className="space-y-4">
          <Input
            label="Annual household income"
            value={annualHouseholdIncome}
            onChange={(e) => setAnnualHouseholdIncome(e.target.value)} />
          
          <Input
            label="Monthly household income"
            value={monthlyHouseholdIncome}
            onChange={(e) => setMonthlyHouseholdIncome(e.target.value)} />
          
          <Input
            label="Self-Employment interest"
            value={selfEmploymentInterest}
            onChange={(e) => setSelfEmploymentInterest(e.target.value)} />
          
          <Input
            label="Amount disbursed"
            value={amountDisbursed}
            onChange={(e) => setAmountDisbursed(e.target.value)} />
          
          <Input
            type="date"
            label="Date of disbursement"
            value={disbursementDate}
            onChange={(e) => setDisbursementDate(e.target.value)} />
          
        </div>
      </Accordion>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={() => {
            if (patient?.selfEmploymentData) {
              const data = patient.selfEmploymentData;
              setReportDate(
                data.reportDate || new Date().toISOString().split('T')[0]
              );
              setAnnualHouseholdIncome(data.annualHouseholdIncome || '');
              setMonthlyHouseholdIncome(data.monthlyHouseholdIncome || '');
              setSelfEmploymentInterest(data.selfEmploymentInterest || '');
              setAmountDisbursed(data.amountDisbursed || '');
              setDisbursementDate(data.disbursementDate || '');
            }
          }}>
          
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          leftIcon={<CheckCircle className="h-4 w-4" />}>
          
          Save
        </Button>
      </div>
    </div>);

}