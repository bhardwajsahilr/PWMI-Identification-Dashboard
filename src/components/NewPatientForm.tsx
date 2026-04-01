import React, { useState } from 'react';
import { usePatient } from '../context/PatientContext';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { Accordion } from './ui/Accordion';
import { CheckCircle, UserPlus, Calendar, User } from 'lucide-react';
export function NewPatientForm() {
  const { createPatient, cancelNewPatient } = usePatient();
  // Enrollment Section State
  const [enrollingOrgUnit, setEnrollingOrgUnit] = useState('A.Konduru');
  const [enrollmentDate, setEnrollmentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [incidentDate, setIncidentDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  // Profile Section State
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [education, setEducation] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [caste, setCaste] = useState('');
  const [socioEconomic, setSocioEconomic] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [panchayat, setPanchayat] = useState('');
  const [familyMembers, setFamilyMembers] = useState('');
  const [dateIdentified, setDateIdentified] = useState('');
  const [informantName, setInformantName] = useState('');
  const [informantRelation, setInformantRelation] = useState('');
  const [referredBySomeone, setReferredBySomeone] = useState('No');
  const [referrerContact, setReferrerContact] = useState('');
  const [referrerName, setReferrerName] = useState('');
  const [primaryCaregiver, setPrimaryCaregiver] = useState('');
  const [sourceOfInformation, setSourceOfInformation] = useState('');
  const [fieldWorker, setFieldWorker] = useState('');
  const handleSave = () => {
    // Basic Validation
    if (!name || !gender || !phone) {
      alert('Please fill in required fields: Name, Gender, and Phone Number.');
      return;
    }
    const newPatientData = {
      name,
      gender: gender as 'Male' | 'Female' | 'Other',
      age: parseInt(age) || 0,
      dateOfBirth,
      education,
      maritalStatus,
      caste,
      socioEconomic,
      phone,
      address,
      panchayat,
      village: panchayat || address || 'Unknown',
      familyMembers: parseInt(familyMembers) || 0,
      dateIdentified,
      informantName,
      informantRelation,
      referredBySomeone,
      referrerContact,
      referrerName,
      primaryCaregiver,
      sourceOfInformation,
      fieldWorker,
      enrollmentDate,
      incidentDate,
      enrollingOrgUnit,
      // Initialize empty data structures
      identificationData: undefined,
      registrationData: undefined,
      followUpEntries: [],
      counsellingLogEntries: [],
      beneficiarySchemeEntries: [],
      vocationalTrainingEntries: [],
      supportGroupEntries: [],
      psychoSocialEntries: [],
      advocacyMeetingEntries: []
    };
    createPatient(newPatientData);
  };
  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-bold text-neutral-text">
              New Patient Registration
            </h2>
            <p className="text-neutral-secondary text-sm">
              Enter enrollment and profile details to register a new client.
            </p>
          </div>
        </div>

        {/* Section 1: Enrollment */}
        <Accordion
          title="Enrollment Details"
          icon={<Calendar className="h-5 w-5" />}
          defaultOpen={true}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Enrolling Organisation Unit"
              value={enrollingOrgUnit}
              onChange={(e) => setEnrollingOrgUnit(e.target.value)}
              placeholder="Enter organisation unit name"
              readOnly
              className="bg-gray-100 cursor-not-allowed" />
            
            <Input
              type="date"
              label="Enrollment Date"
              value={enrollmentDate}
              onChange={(e) => setEnrollmentDate(e.target.value)} />
            
            <Input
              type="date"
              label="Incident Date"
              value={incidentDate}
              onChange={(e) => setIncidentDate(e.target.value)} />
            
          </div>
        </Accordion>

        {/* Section 2: Profile */}
        <Accordion
          title="Profile Details"
          icon={<User className="h-5 w-5" />}
          defaultOpen={true}>
          
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Name of the individual *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name" />
              
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Gender *
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}>
                  
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Input
                type="number"
                label="Age"
                value={age}
                onChange={(e) => setAge(e.target.value)} />
              
              <Input
                type="date"
                label="Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)} />
              
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Education
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}>
                  
                  <option value="">Select Education</option>
                  <option value="Matric">Matric</option>
                  <option value="Illiterate">Illiterate</option>
                  <option value="Senior Secondary">Senior Secondary</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Primary">Primary</option>
                  <option value="Post Graduate">Post Graduate</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Marital Status
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}>
                  
                  <option value="">Select Status</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Separated">Separated</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Caste
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={caste}
                  onChange={(e) => setCaste(e.target.value)}>
                  
                  <option value="">Select Caste</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="MOBC">MOBC</option>
                  <option value="BC">BC</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Socio-economic Class
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={socioEconomic}
                  onChange={(e) => setSocioEconomic(e.target.value)}>
                  
                  <option value="">Select Class</option>
                  <option value="BPL">BPL</option>
                  <option value="APL">APL</option>
                  <option value="AAY">AAY (Antyodaya)</option>
                  <option value="L">L</option>
                </select>
              </div>
            </div>

            {/* Contact & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <Input
                label="Contact Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number" />
              
              <Input
                label="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)} />
              
              <Input
                label="Panchayat"
                value={panchayat}
                onChange={(e) => setPanchayat(e.target.value)} />
              
              <Input
                type="number"
                label="No. of family members"
                value={familyMembers}
                onChange={(e) => setFamilyMembers(e.target.value)} />
              
            </div>

            {/* Identification Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <Input
                type="date"
                label="Date of Identification"
                value={dateIdentified}
                onChange={(e) => setDateIdentified(e.target.value)} />
              
              <Input
                label="Informant Name"
                value={informantName}
                onChange={(e) => setInformantName(e.target.value)} />
              
              <Input
                label="Relationship to PWMI"
                value={informantRelation}
                onChange={(e) => setInformantRelation(e.target.value)} />
              
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Was the PWMI referred by someone?
                </label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="referred"
                      checked={referredBySomeone === 'Yes'}
                      onChange={() => setReferredBySomeone('Yes')}
                      className="text-teal focus:ring-teal" />
                    
                    <span className="text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="referred"
                      checked={referredBySomeone === 'No'}
                      onChange={() => setReferredBySomeone('No')}
                      className="text-teal focus:ring-teal" />
                    
                    <span className="text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
              {referredBySomeone === 'Yes' &&
              <>
                  <Input
                  label="Name of Referrer"
                  value={referrerName}
                  onChange={(e) => setReferrerName(e.target.value)} />
                
                  <Input
                  label="Contact of Referrer"
                  value={referrerContact}
                  onChange={(e) => setReferrerContact(e.target.value)} />
                
                </>
              }
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Primary Caregiver
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={primaryCaregiver}
                  onChange={(e) => setPrimaryCaregiver(e.target.value)}>
                  
                  <option value="">Select Caregiver</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Husband">Husband</option>
                  <option value="Son">Son</option>
                  <option value="Daughter">Daughter</option>
                  <option value="Brother">Brother</option>
                  <option value="Sister">Sister</option>
                  <option value="Wife">Wife</option>
                  <option value="Aunt">Aunt</option>
                  <option value="Parent">Parent</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Source of Information
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={sourceOfInformation}
                  onChange={(e) => setSourceOfInformation(e.target.value)}>
                  
                  <option value="">Select Source</option>
                  <option value="Source 1">Source 1</option>
                  <option value="Source 2">Source 2</option>
                  <option value="Source 3">Source 3</option>
                  <option value="Source 4">Source 4</option>
                  <option value="Source 5">Source 5</option>
                </select>
              </div>
              <Input
                label="Name of Field Worker"
                value={fieldWorker}
                onChange={(e) => setFieldWorker(e.target.value)} />
              
            </div>
          </div>
        </Accordion>

        {/* Spacer for bottom bar */}
        <div className="h-20"></div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-white border-t border-softPink p-4 shadow-lg flex justify-between items-center z-20">
        <Button variant="outline" onClick={cancelNewPatient}>
          Cancel
        </Button>
        <Button
          variant="primary"
          leftIcon={<UserPlus className="h-4 w-4" />}
          onClick={handleSave}>
          
          Register Patient
        </Button>
      </div>
    </div>);

}