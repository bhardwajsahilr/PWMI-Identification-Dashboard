import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { AdvocacyMeetingData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { CheckCircle, Megaphone } from 'lucide-react';
export function AdvocacyMeetingForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingType, setMeetingType] = useState('');
  const [venue, setVenue] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [stakeholders, setStakeholders] = useState('');
  const [agendaTopics, setAgendaTopics] = useState('');
  const [decisionsOutcomes, setDecisionsOutcomes] = useState('');
  const [actionItems, setActionItems] = useState('');
  const [nextMeetingDate, setNextMeetingDate] = useState('');
  useEffect(() => {
    if (patient?.advocacyMeetingData) {
      const data = patient.advocacyMeetingData;
      setMeetingDate(data.meetingDate || '');
      setMeetingType(data.meetingType || '');
      setVenue(data.venue || '');
      setOrganizer(data.organizer || '');
      setStakeholders(data.stakeholders || '');
      setAgendaTopics(data.agendaTopics || '');
      setDecisionsOutcomes(data.decisionsOutcomes || '');
      setActionItems(data.actionItems || '');
      setNextMeetingDate(data.nextMeetingDate || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSave = () => {
    const data: AdvocacyMeetingData = {
      meetingDate,
      meetingType,
      venue,
      organizer,
      stakeholders,
      agendaTopics,
      decisionsOutcomes,
      actionItems,
      nextMeetingDate,
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'advocacyMeetingData', data);
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
        title="Meeting Details"
        icon={<Megaphone className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Meeting Date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)} />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Meeting Type
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value)}>

                <option value="">Select Type</option>
                <option value="Panchayat meeting">Panchayat meeting</option>
                <option value="Community awareness">Community awareness</option>
                <option value="Stakeholder meeting">Stakeholder meeting</option>
                <option value="Policy advocacy">Policy advocacy</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <Input
              label="Venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)} />

            <Input
              label="Organizer"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)} />

          </div>
          <TextArea
            label="Stakeholders Present"
            rows={2}
            value={stakeholders}
            onChange={(e) => setStakeholders(e.target.value)} />

          <TextArea
            label="Agenda Topics"
            rows={2}
            value={agendaTopics}
            onChange={(e) => setAgendaTopics(e.target.value)} />

          <TextArea
            label="Decisions/Outcomes"
            rows={2}
            value={decisionsOutcomes}
            onChange={(e) => setDecisionsOutcomes(e.target.value)} />

          <TextArea
            label="Action Items"
            rows={2}
            value={actionItems}
            onChange={(e) => setActionItems(e.target.value)} />

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