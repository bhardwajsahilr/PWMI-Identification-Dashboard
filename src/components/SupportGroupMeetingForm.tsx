import React, { useEffect, useState } from 'react';
import { usePatient } from '../context/PatientContext';
import { SupportGroupMeetingData } from '../types';
import { Button } from './ui/Button';
import { Accordion } from './ui/Accordion';
import { Input, TextArea } from './ui/Input';
import { Checkbox } from './ui/Checkbox';
import {
  Users,
  Clock,
  MessageSquare,
  ListChecks,
  AlertCircle,
  FileText,
  UserCheck,
  CheckCircle,
  Lock } from
'lucide-react';
interface SupportGroupMeetingFormProps {
  viewRecord?: SupportGroupMeetingData | null;
}
export function SupportGroupMeetingForm({
  viewRecord
}: SupportGroupMeetingFormProps) {
  const { saveSupportGroupMeeting, patients } = usePatient();
  const isViewOnly = !!viewRecord;
  // State
  const [activityDate, setActivityDate] = useState('');
  const [organisationUnit, setOrganisationUnit] = useState('A.Konduru');
  const [time, setTime] = useState('');
  const [pwmisParticipated, setPwmisParticipated] = useState('');
  const [caregiversParticipated, setCaregiversParticipated] = useState('');
  const [otherParticipants, setOtherParticipants] = useState('');
  const [topic1, setTopic1] = useState('');
  const [topic2, setTopic2] = useState('');
  const [topic3, setTopic3] = useState('');
  const [topic4, setTopic4] = useState('');
  const [topic5, setTopic5] = useState('');
  const [activities, setActivities] = useState<string[]>([]);
  const [keyPointsDiscussed, setKeyPointsDiscussed] = useState('');
  const [actionItemsFollowUp, setActionItemsFollowUp] = useState('');
  const [challenges, setChallenges] = useState<string[]>([]);
  const [meetingNotesWrittenBy, setMeetingNotesWrittenBy] = useState('');
  const [facilitatorName, setFacilitatorName] = useState('');
  const [facilitatorRole, setFacilitatorRole] = useState('');
  const [completeEvent, setCompleteEvent] = useState(false);
  const [notes, setNotes] = useState('');
  const [attendeePatientIds, setAttendeePatientIds] = useState<string[]>([]);
  // Load data if viewing record
  useEffect(() => {
    if (viewRecord) {
      setActivityDate(viewRecord.activityDate);
      setOrganisationUnit(viewRecord.organisationUnit);
      setTime(viewRecord.time);
      setPwmisParticipated(viewRecord.pwmisParticipated);
      setCaregiversParticipated(viewRecord.caregiversParticipated);
      setOtherParticipants(viewRecord.otherParticipants);
      setTopic1(viewRecord.topic1);
      setTopic2(viewRecord.topic2);
      setTopic3(viewRecord.topic3);
      setTopic4(viewRecord.topic4);
      setTopic5(viewRecord.topic5);
      setActivities(viewRecord.activities);
      setKeyPointsDiscussed(viewRecord.keyPointsDiscussed);
      setActionItemsFollowUp(viewRecord.actionItemsFollowUp);
      setChallenges(viewRecord.challenges);
      setMeetingNotesWrittenBy(viewRecord.meetingNotesWrittenBy);
      setFacilitatorName(viewRecord.facilitatorName);
      setFacilitatorRole(viewRecord.facilitatorRole);
      setCompleteEvent(viewRecord.completeEvent);
      setNotes(viewRecord.notes);
      setAttendeePatientIds(viewRecord.attendeePatientIds || []);
    }
  }, [viewRecord]);
  // Handlers
  const handleActivityChange = (label: string, checked: boolean) => {
    if (isViewOnly) return;
    if (checked) setActivities([...activities, label]);else
    setActivities(activities.filter((a) => a !== label));
  };
  const handleChallengeChange = (label: string, checked: boolean) => {
    if (isViewOnly) return;
    if (checked) setChallenges([...challenges, label]);else
    setChallenges(challenges.filter((c) => c !== label));
  };
  const handleAttendeeChange = (id: string, checked: boolean) => {
    if (isViewOnly) return;
    if (checked) setAttendeePatientIds([...attendeePatientIds, id]);else
    setAttendeePatientIds(attendeePatientIds.filter((pid) => pid !== id));
  };
  const handleSave = () => {
    if (isViewOnly) return;
    if (!activityDate) {
      alert('Please select a date');
      return;
    }
    const data: SupportGroupMeetingData = {
      id: viewRecord?.id || Date.now().toString(),
      activityDate,
      organisationUnit,
      time,
      pwmisParticipated,
      caregiversParticipated,
      otherParticipants,
      topic1,
      topic2,
      topic3,
      topic4,
      topic5,
      activities,
      keyPointsDiscussed,
      actionItemsFollowUp,
      challenges,
      supportingDocuments: [],
      supportingPhotographs: [],
      meetingNotesWrittenBy,
      facilitatorName,
      facilitatorRole,
      completeEvent,
      notes,
      attendeePatientIds,
      completedAt: new Date().toISOString()
    };
    saveSupportGroupMeeting(data);
    alert('Support Group Meeting saved successfully!');
  };
  // Lists
  const activityOptions = [
  'Audios',
  'Charts',
  'Group discussions',
  'Posters',
  'Role play',
  'Videos'];

  const challengeOptions = [
  'Audio-visual or power issues',
  'Inadequate logistics',
  'Low turnout',
  'No major challenges',
  'Noise / interruptions at venue',
  'Weather-related disruptions'];

  // Filter patients eligible for attendance (must have consent given — same as Registration list)
  const eligiblePatients = patients.filter(
    (p) => p.identificationData?.consentGiven === 'Yes'
  );
  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto w-full">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-text">
              {isViewOnly ?
              'Support Group Meeting Details' :
              'New Support Group Meeting'}
            </h1>
            <p className="text-neutral-secondary">
              {isViewOnly ?
              'View meeting details' :
              'Record a new support group meeting'}
            </p>
          </div>
          {isViewOnly &&
          <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium">
              <Lock className="h-4 w-4" />
              Read Only
            </div>
          }
        </div>

        {/* 1. Basic Info */}
        <Accordion title="Basic Info" icon={<Clock className="h-5 w-5" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Support Group Formation activity date *"
              value={activityDate}
              onChange={(e) => setActivityDate(e.target.value)}
              disabled={isViewOnly}
              required />

            <Input
              label="Organisation unit *"
              value={organisationUnit}
              readOnly
              className="bg-gray-100 text-gray-500" />

          </div>
        </Accordion>

        {/* 2. Meeting Details */}
        <Accordion title="Meeting Details" icon={<Users className="h-5 w-5" />}>
          <div className="space-y-4">
            <Input
              type="time"
              label="Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              disabled={isViewOnly} />

            <Input
              type="number"
              label="PWMIs participated"
              value={pwmisParticipated}
              onChange={(e) => setPwmisParticipated(e.target.value)}
              disabled={isViewOnly} />

            <Input
              type="number"
              label="Caregivers participated"
              value={caregiversParticipated}
              onChange={(e) => setCaregiversParticipated(e.target.value)}
              disabled={isViewOnly} />

            <Input
              type="number"
              label="Other participants (volunteers, etc.)"
              value={otherParticipants}
              onChange={(e) => setOtherParticipants(e.target.value)}
              disabled={isViewOnly} />

          </div>
        </Accordion>

        {/* 3. Topics Covered */}
        <Accordion
          title="Topics Covered"
          icon={<MessageSquare className="h-5 w-5" />}>

          <div className="space-y-4">
            <Input
              label="Name of topic (1)"
              value={topic1}
              onChange={(e) => setTopic1(e.target.value)}
              disabled={isViewOnly} />

            <Input
              label="Name of topic (2)"
              value={topic2}
              onChange={(e) => setTopic2(e.target.value)}
              disabled={isViewOnly} />

            <Input
              label="Name of topic (3)"
              value={topic3}
              onChange={(e) => setTopic3(e.target.value)}
              disabled={isViewOnly} />

            <Input
              label="Name of topic (4)"
              value={topic4}
              onChange={(e) => setTopic4(e.target.value)}
              disabled={isViewOnly} />

            <Input
              label="Name of topic (5)"
              value={topic5}
              onChange={(e) => setTopic5(e.target.value)}
              disabled={isViewOnly} />

          </div>
        </Accordion>

        {/* 4. Type of Activities */}
        <Accordion
          title="Type of Activities"
          icon={<ListChecks className="h-5 w-5" />}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activityOptions.map((opt) =>
            <Checkbox
              key={opt}
              label={opt}
              checked={activities.includes(opt)}
              onChange={(e) => handleActivityChange(opt, e.target.checked)}
              disabled={isViewOnly} />

            )}
          </div>
        </Accordion>

        {/* 5. Key Points */}
        <Accordion title="Key Points" icon={<FileText className="h-5 w-5" />}>
          <TextArea
            label="Key points discussed"
            rows={4}
            value={keyPointsDiscussed}
            onChange={(e) => setKeyPointsDiscussed(e.target.value)}
            disabled={isViewOnly} />

        </Accordion>

        {/* 6. Action Items / Follow-Up */}
        <Accordion
          title="Action Items / Follow-Up"
          icon={<ListChecks className="h-5 w-5" />}>

          <TextArea
            label="Action items for follow-up"
            rows={4}
            value={actionItemsFollowUp}
            onChange={(e) => setActionItemsFollowUp(e.target.value)}
            disabled={isViewOnly} />

        </Accordion>

        {/* 7. Challenges */}
        <Accordion
          title="Challenges"
          icon={<AlertCircle className="h-5 w-5" />}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challengeOptions.map((opt) =>
            <Checkbox
              key={opt}
              label={opt}
              checked={challenges.includes(opt)}
              onChange={(e) => handleChallengeChange(opt, e.target.checked)}
              disabled={isViewOnly} />

            )}
          </div>
        </Accordion>

        {/* 8. Supporting Documents (Placeholder) */}
        <Accordion
          title="Supporting Documents"
          icon={<FileText className="h-5 w-5" />}>

          <div className="text-sm text-gray-500 italic p-2">
            File upload functionality is not available in this demo.
          </div>
        </Accordion>

        {/* 9. Meeting Facilitated by */}
        <Accordion
          title="Meeting Facilitated by"
          icon={<UserCheck className="h-5 w-5" />}>

          <div className="space-y-4">
            <Input
              label="Meeting notes written by"
              value={meetingNotesWrittenBy}
              onChange={(e) => setMeetingNotesWrittenBy(e.target.value)}
              disabled={isViewOnly} />

            <Input
              label="Facilitator's name"
              value={facilitatorName}
              onChange={(e) => setFacilitatorName(e.target.value)}
              disabled={isViewOnly} />

            <Input
              label="Facilitator's role"
              value={facilitatorRole}
              onChange={(e) => setFacilitatorRole(e.target.value)}
              disabled={isViewOnly} />

          </div>
        </Accordion>

        {/* 10. Status */}
        <Accordion title="Status" icon={<CheckCircle className="h-5 w-5" />}>
          <Checkbox
            label="Complete event"
            checked={completeEvent}
            onChange={(e) => setCompleteEvent(e.target.checked)}
            disabled={isViewOnly} />

        </Accordion>

        {/* 11. Notes */}
        <Accordion title="Notes" icon={<FileText className="h-5 w-5" />}>
          <TextArea
            label="Write note"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={isViewOnly} />

        </Accordion>

        {/* 12. Members Attended (NEW) */}
        <Accordion
          title="Members Attended (PWMI)"
          icon={<Users className="h-5 w-5" />}>

          <div className="space-y-2">
            <p className="text-sm text-neutral-secondary mb-2">
              Select patients who attended this meeting. This will add the
              meeting to their profile.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-2 border rounded-lg">
              {eligiblePatients.length === 0 ?
              <p className="text-sm text-gray-500 col-span-full">
                  No registered patients found.
                </p> :

              eligiblePatients.map((patient) =>
              <Checkbox
                key={patient.id}
                label={`${patient.name} (${patient.village})`}
                checked={attendeePatientIds.includes(patient.id)}
                onChange={(e) =>
                handleAttendeeChange(patient.id, e.target.checked)
                }
                disabled={isViewOnly} />

              )
              }
            </div>
          </div>
        </Accordion>

        <div className="h-20"></div>
      </div>

      {/* Sticky Bottom Action Bar */}
      {!isViewOnly &&
      <div className="bg-white border-t border-softPink p-4 shadow-lg flex justify-end items-center z-20 gap-3">
          <Button variant="outline" onClick={() => window.history.back()}>
            Cancel
          </Button>
          <Button
          variant="primary"
          leftIcon={<CheckCircle className="h-4 w-4" />}
          onClick={handleSave}>

            Save Meeting
          </Button>
        </div>
      }
    </div>);

}