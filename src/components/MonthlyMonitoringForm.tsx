import React, { useState } from 'react';
import { usePatient } from '../context/PatientContext';
import { MonthlyMonitoringData } from '../types';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Accordion } from './ui/Accordion';
import { Input, TextArea } from './ui/Input';
import { Checkbox } from './ui/Checkbox';
import {
  ClipboardList,
  CheckSquare,
  AlertTriangle,
  Activity,
  BarChart2,
  CheckCircle,
  AlertCircle } from
'lucide-react';
export function MonthlyMonitoringForm() {
  const { saveMonitoringData } = usePatient();
  // Form State
  const [monitoringDate, setMonitoringDate] = useState('');
  const [monitoringMonth, setMonitoringMonth] = useState('');
  const [blockSupervisorName, setBlockSupervisorName] = useState('');
  const [fieldCoordinatorName, setFieldCoordinatorName] = useState('');
  const [activitiesDone, setActivitiesDone] = useState<string[]>([]);
  const [activityComments, setActivityComments] = useState('');
  const [issuesFound, setIssuesFound] = useState<string[]>([]);
  const [otherIssues, setOtherIssues] = useState('');
  const [actionsTaken, setActionsTaken] = useState<string[]>([]);
  const [additionalActions, setAdditionalActions] = useState('');
  const [overallRating, setOverallRating] = useState('');
  const [nextReviewDate, setNextReviewDate] = useState('');
  const [supervisorRemarks, setSupervisorRemarks] = useState('');
  const handleActivityChange = (label: string, checked: boolean) => {
    if (checked) setActivitiesDone([...activitiesDone, label]);else
    setActivitiesDone(activitiesDone.filter((a) => a !== label));
  };
  const handleIssueChange = (label: string, checked: boolean) => {
    if (checked) setIssuesFound([...issuesFound, label]);else
    setIssuesFound(issuesFound.filter((i) => i !== label));
  };
  const handleActionChange = (label: string, checked: boolean) => {
    if (checked) setActionsTaken([...actionsTaken, label]);else
    setActionsTaken(actionsTaken.filter((a) => a !== label));
  };
  const handleSave = () => {
    const data: MonthlyMonitoringData = {
      id: Date.now().toString(),
      monitoringDate,
      monitoringMonth,
      blockSupervisorName,
      fieldCoordinatorName,
      activitiesDone,
      activityComments,
      issuesFound,
      otherIssues,
      actionsTaken,
      additionalActions,
      overallRating,
      nextReviewDate,
      supervisorRemarks,
      completedAt: new Date().toISOString()
    };
    saveMonitoringData(data);
    alert('Monitoring data saved successfully!');
  };
  const activitiesList = [
  'PWMI beneficiary details reviewed',
  'Follow-up activities conducted',
  'Medicine availability and linkage verified'];

  const issuesList = [
  'Irregular group meetings',
  'Incomplete forms',
  'Follow-ups not done',
  'Documentation gaps'];

  const actionsList = [
  'Group meetings conducted',
  'Enhance documentation and monitoring',
  'Re-orient and sensitize staff',
  'Re-plan support group activities'];

  const hasIssues = issuesFound.length > 0 || otherIssues.length > 0;
  const hasActions = actionsTaken.length > 0 || additionalActions.length > 0;
  const showActionWarning = hasIssues && !hasActions;
  const isCritical = overallRating === 'Critical';
  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-text">
            Monthly Monitoring Report
          </h1>
          <p className="text-neutral-secondary">
            Record field supervision and monitoring activities.
          </p>
        </div>

        {/* Accordion 1: Monitoring Information */}
        <Accordion
          title="Monitoring Information"
          icon={<ClipboardList className="h-5 w-5" />}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="date"
              label="Monitoring Date"
              value={monitoringDate}
              onChange={(e) => setMonitoringDate(e.target.value)}
              required />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Monitoring Month
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                value={monitoringMonth}
                onChange={(e) => setMonitoringMonth(e.target.value)}>

                <option value="">Select Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <Input
              label="Block Supervisor Name"
              value={blockSupervisorName}
              onChange={(e) => setBlockSupervisorName(e.target.value)} />

            <Input
              label="Field Coordinator Name"
              value={fieldCoordinatorName}
              onChange={(e) => setFieldCoordinatorName(e.target.value)} />

          </div>
        </Accordion>

        {/* Accordion 2: Activities Done */}
        <Accordion
          title="Activities Done"
          icon={<CheckSquare className="h-5 w-5" />}>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activitiesList.map((activity) =>
              <Checkbox
                key={activity}
                label={activity}
                checked={activitiesDone.includes(activity)}
                onChange={(e) =>
                handleActivityChange(activity, e.target.checked)
                } />

              )}
            </div>
            <TextArea
              label="Comments / Observations"
              rows={3}
              value={activityComments}
              onChange={(e) => setActivityComments(e.target.value)} />

          </div>
        </Accordion>

        {/* Accordion 3: Issues Found */}
        <Accordion
          title="Issues Found"
          icon={<AlertTriangle className="h-5 w-5" />}>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {issuesList.map((issue) =>
              <Checkbox
                key={issue}
                label={issue}
                checked={issuesFound.includes(issue)}
                onChange={(e) => handleIssueChange(issue, e.target.checked)} />

              )}
            </div>
            <Input
              label="Other Issues"
              value={otherIssues}
              onChange={(e) => setOtherIssues(e.target.value)} />


            {hasIssues &&
            <div className="bg-softPink/20 border border-softPink text-neutral-text p-4 rounded-lg flex items-center gap-3 animate-in fade-in">
                <AlertCircle className="h-5 w-5 text-coral" />
                <p className="font-medium">
                  Issues identified. Please record actions taken below.
                </p>
              </div>
            }
          </div>
        </Accordion>

        {/* Accordion 4: Action Taken */}
        <Accordion title="Action Taken" icon={<Activity className="h-5 w-5" />}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {actionsList.map((action) =>
              <Checkbox
                key={action}
                label={action}
                checked={actionsTaken.includes(action)}
                onChange={(e) => handleActionChange(action, e.target.checked)} />

              )}
            </div>
            <TextArea
              label="Additional Actions Taken"
              rows={3}
              value={additionalActions}
              onChange={(e) => setAdditionalActions(e.target.value)} />


            {showActionWarning &&
            <div className="bg-coral/10 border border-coral text-coral p-4 rounded-lg flex items-center gap-3 animate-in fade-in">
                <AlertTriangle className="h-5 w-5" />
                <p className="font-bold">
                  Warning: Issues were found but no action has been recorded.
                </p>
              </div>
            }
          </div>
        </Accordion>

        {/* Accordion 5: Overall Monitoring Status */}
        <Accordion
          title="Overall Monitoring Status"
          icon={<BarChart2 className="h-5 w-5" />}>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-secondary mb-2">
                  Overall Rating
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal"
                  value={overallRating}
                  onChange={(e) => setOverallRating(e.target.value)}>

                  <option value="">Select Rating</option>
                  <option value="Good">Good</option>
                  <option value="Needs Improvement">Needs Improvement</option>
                  <option value="Critical">Critical</option>
                </select>
                <div className="mt-2">
                  {overallRating === 'Good' &&
                  <Badge variant="teal">Good Performance</Badge>
                  }
                  {overallRating === 'Needs Improvement' &&
                  <Badge variant="softPink">Needs Improvement</Badge>
                  }
                  {overallRating === 'Critical' &&
                  <Badge variant="coral">Critical Attention Needed</Badge>
                  }
                </div>
              </div>
              <Input
                type="date"
                label="Next Review Date"
                value={nextReviewDate}
                onChange={(e) => setNextReviewDate(e.target.value)} />

            </div>

            {isCritical &&
            <div className="bg-coral/10 border border-coral p-4 rounded-lg flex items-start gap-3 animate-in fade-in">
                <AlertTriangle className="h-5 w-5 text-coral shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-coral">Critical Status Alert</p>
                  <p className="text-sm text-neutral-text">
                    Immediate intervention required by senior management. Please
                    schedule a follow-up review within 7 days.
                  </p>
                </div>
              </div>
            }

            <TextArea
              label="Supervisor Remarks"
              rows={4}
              value={supervisorRemarks}
              onChange={(e) => setSupervisorRemarks(e.target.value)} />

          </div>
        </Accordion>

        <div className="h-20"></div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="bg-white border-t border-softPink p-4 shadow-lg flex justify-between items-center z-20">
        <Button variant="ghost">Reset Form</Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleSave}>
            Save Draft
          </Button>
          <Button
            variant="primary"
            leftIcon={<CheckCircle className="h-4 w-4" />}
            onClick={handleSave}>

            Save & Complete Monitoring
          </Button>
        </div>
      </div>
    </div>);

}