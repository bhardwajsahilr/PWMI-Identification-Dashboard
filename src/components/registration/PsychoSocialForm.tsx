import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { PsychoSocialData } from '../../types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Accordion } from '../ui/Accordion';
import { Input, TextArea } from '../ui/Input';
import { CheckCircle, BookOpen } from 'lucide-react';
export function PsychoSocialForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [sessionDate, setSessionDate] = useState('');
  const [sessionTopic, setSessionTopic] = useState('');
  const [targetGroup, setTargetGroup] = useState('');
  const [facilitator, setFacilitator] = useState('');
  const [attendeesCount, setAttendeesCount] = useState('');
  const [keyMessages, setKeyMessages] = useState('');
  const [participantFeedback, setParticipantFeedback] = useState('');
  const [nextSessionDate, setNextSessionDate] = useState('');
  useEffect(() => {
    if (patient?.psychoSocialData) {
      const data = patient.psychoSocialData;
      setSessionDate(data.sessionDate || '');
      setSessionTopic(data.sessionTopic || '');
      setTargetGroup(data.targetGroup || '');
      setFacilitator(data.facilitator || '');
      setAttendeesCount(data.attendeesCount || '');
      setKeyMessages(data.keyMessages || '');
      setParticipantFeedback(data.participantFeedback || '');
      setNextSessionDate(data.nextSessionDate || '');
    }
  }, [patient]);
  if (!patient) return null;
  const handleSave = () => {
    const data: PsychoSocialData = {
      sessionDate,
      sessionTopic,
      targetGroup,
      facilitator,
      attendeesCount,
      keyMessages,
      participantFeedback,
      nextSessionDate,
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'psychoSocialData', data);
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
        title="Session Details"
        icon={<BookOpen className="h-5 w-5" />}>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Session Date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)} />

            <Input
              label="Session Topic"
              value={sessionTopic}
              onChange={(e) => setSessionTopic(e.target.value)} />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Target Group
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={targetGroup}
                onChange={(e) => setTargetGroup(e.target.value)}>

                <option value="">Select Group</option>
                <option value="PWMI">PWMI</option>
                <option value="Caregivers">Caregivers</option>
                <option value="Community">Community</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
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
            label="Key Messages"
            rows={2}
            value={keyMessages}
            onChange={(e) => setKeyMessages(e.target.value)} />

          <TextArea
            label="Participant Feedback"
            rows={2}
            value={participantFeedback}
            onChange={(e) => setParticipantFeedback(e.target.value)} />

          <div className="w-full md:w-1/2">
            <Input
              type="date"
              label="Next Session Date"
              value={nextSessionDate}
              onChange={(e) => setNextSessionDate(e.target.value)} />

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