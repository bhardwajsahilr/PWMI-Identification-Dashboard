import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { BeneficiarySchemeData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { Building2, CheckCircle } from 'lucide-react';
export function BeneficiarySchemeForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [schemeName, setSchemeName] = useState('');
  const [schemeType, setSchemeType] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('');
  const [benefitReceived, setBenefitReceived] = useState('');
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  useEffect(() => {
    if (patient?.beneficiarySchemeData) {
      const data = patient.beneficiarySchemeData;
      setSchemeName(data.schemeName || '');
      setSchemeType(data.schemeType || '');
      setApplicationDate(data.applicationDate || '');
      setApplicationStatus(data.applicationStatus || '');
      setBenefitReceived(data.benefitReceived || '');
      setAmount(data.amount || '');
      setRemarks(data.remarks || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSave = () => {
    const data: BeneficiarySchemeData = {
      schemeName,
      schemeType,
      applicationDate,
      applicationStatus,
      benefitReceived,
      amount,
      remarks,
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'beneficiarySchemeData', data);
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
        title="Scheme Details"
        icon={<Building2 className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Scheme Name"
              value={schemeName}
              onChange={(e) => setSchemeName(e.target.value)} />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Scheme Type
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={schemeType}
                onChange={(e) => setSchemeType(e.target.value)}>

                <option value="">Select Type</option>
                <option value="Disability pension">Disability pension</option>
                <option value="MGNREGA">MGNREGA</option>
                <option value="BPL card">BPL card</option>
                <option value="Health insurance">Health insurance</option>
                <option value="Housing scheme">Housing scheme</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input
              type="date"
              label="Application Date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)} />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Application Status
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={applicationStatus}
                onChange={(e) => setApplicationStatus(e.target.value)}>

                <option value="">Select Status</option>
                <option value="Applied">Applied</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <Input
              label="Benefit Received"
              value={benefitReceived}
              onChange={(e) => setBenefitReceived(e.target.value)} />

            <Input
              label="Amount (if applicable)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)} />

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