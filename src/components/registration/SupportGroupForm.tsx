import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { SupportGroupData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { CheckCircle, Users } from 'lucide-react';
export function SupportGroupForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingNumber, setMeetingNumber] = useState('');
  const [venue, setVenue] = useState('');
  const [facilitator, setFacilitator] = useState('');
  const [attendeesCount, setAttendeesCount] = useState('');
  const [topicsDiscussed, setTopicsDiscussed] = useState('');
  const [keyOutcomes, setKeyOutcomes] = useState('');
  const [nextMeetingDate, setNextMeetingDate] = useState('');
  useEffect(() => {
    if (patient?.supportGroupData) {
      const data = patient.supportGroupData;
      setMeetingDate(data.meetingDate || '');
      setMeetingNumber(data.meetingNumber || '');
      setVenue(data.venue || '');
      setFacilitator(data.facilitator || '');
      setAttendeesCount(data.attendeesCount || '');
      setTopicsDiscussed(data.topicsDiscussed || '');
      setKeyOutcomes(data.keyOutcomes || '');
      setNextMeetingDate(data.nextMeetingDate || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSave = () => {
    const data: SupportGroupData = {
      meetingDate,
      meetingNumber,
      venue,
      facilitator,
      attendeesCount,
      topicsDiscussed,
      keyOutcomes,
      nextMeetingDate,
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'supportGroupData', data);
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

      <Accordion title="Meeting Details" icon={<Users className="h-5 w-5" />}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Meeting Date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)} />

            <Input
              label="Meeting Number"
              value={meetingNumber}
              onChange={(e) => setMeetingNumber(e.target.value)} />

            <Input
              label="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)} />

            <Input
              label="Facilitator"
              value={facilitator}
              onChange={(e) => setFacilitator(e.target.value)} />

            <Input
              label="Number of Attendees"
              value={attendeesCount}
              onChange={(e) => setAttendeesCount(e.target.value)} />

          </div>
          <TextArea
            label="Topics Discussed"
            rows={2}
            value={topicsDiscussed}
            onChange={(e) => setTopicsDiscussed(e.target.value)} />

          <TextArea
            label="Key Outcomes"
            rows={2}
            value={keyOutcomes}
            onChange={(e) => setKeyOutcomes(e.target.value)} />

          <div className="w-full md:w-1/2">
            <Input
              type="date"
              label="Next Meeting Date"
              value={nextMeetingDate}
              onChange={(e) => setNextMeetingDate(e.target.value)} />

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