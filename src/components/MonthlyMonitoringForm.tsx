import React, { useEffect, useState } from 'react';
import { usePatient } from '../context/PatientContext';
import { MonthlyMonitoringData } from '../types';
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
  AlertCircle,
  Lock } from
'lucide-react';
interface MonthlyMonitoringFormProps {
  viewRecord?: MonthlyMonitoringData | null;
}
export function MonthlyMonitoringForm({
  viewRecord
}: MonthlyMonitoringFormProps) {
  const { saveMonitoringData } = usePatient();
  const isViewOnly = !!viewRecord;
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
  // Pre-fill when viewing an existing record
  useEffect(() => {
    if (viewRecord) {
      setMonitoringDate(viewRecord.monitoringDate);
      setMonitoringMonth(viewRecord.monitoringMonth);
      setBlockSupervisorName(viewRecord.blockSupervisorName);
      setFieldCoordinatorName(viewRecord.fieldCoordinatorName);
      setActivitiesDone(viewRecord.activitiesDone);
      setActivityComments(viewRecord.activityComments);
      setIssuesFound(viewRecord.issuesFound);
      setOtherIssues(viewRecord.otherIssues);
      setActionsTaken(viewRecord.actionsTaken);
      setAdditionalActions(viewRecord.additionalActions);
      setOverallRating(viewRecord.overallRating);
      setNextReviewDate(viewRecord.nextReviewDate);
      setSupervisorRemarks(viewRecord.supervisorRemarks);
    }
  }, [viewRecord]);
  const handleActivityChange = (label: string, checked: boolean) => {
    if (isViewOnly) return;
    if (checked) setActivitiesDone([...activitiesDone, label]);else
    setActivitiesDone(activitiesDone.filter((a) => a !== label));
  };
  const handleIssueChange = (label: string, checked: boolean) => {
    if (isViewOnly) return;
    if (checked) setIssuesFound([...issuesFound, label]);else
    setIssuesFound(issuesFound.filter((i) => i !== label));
  };
  const handleActionChange = (label: string, checked: boolean) => {
    if (isViewOnly) return;
    if (checked) setActionsTaken([...actionsTaken, label]);else
    setActionsTaken(actionsTaken.filter((a) => a !== label));
  };
  const handleReset = () => {
    if (isViewOnly) return;
    setMonitoringDate('');
    setMonitoringMonth('');
    setBlockSupervisorName('');
    setFieldCoordinatorName('');
    setActivitiesDone([]);
    setActivityComments('');
    setIssuesFound([]);
    setOtherIssues('');
    setActionsTaken([]);
    setAdditionalActions('');
    setOverallRating('');
    setNextReviewDate('');
    setSupervisorRemarks('');
  };
  const handleSave = () => {
    if (isViewOnly) return;
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
  const showActionWarning = hasIssues && !hasActions && !isViewOnly;
  const isCritical = overallRating === 'Critical';
  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto w-full">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-text">
              {isViewOnly ?
              'Monitoring Report' :
              'New Monthly Monitoring Report'}
            </h1>
            <p className="text-neutral-secondary">
              {isViewOnly ?
              `${monitoringMonth} ${monitoringDate ? monitoringDate.split('-')[0] : ''} — View only` :
              'Record field supervision and monitoring activities.'}
            </p>
          </div>
          {isViewOnly &&
          <div className="flex items-center gap-2 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium">
              <Lock className="h-4 w-4" />
              Read Only
            </div>
          }
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
              required
              disabled={isViewOnly} />

            <div>
              <label className="block text-sm font-medium text-neutral-secondary mb-2">
                Monitoring Month
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal disabled:bg-gray-100 disabled:text-gray-500"
                value={monitoringMonth}
                onChange={(e) => setMonitoringMonth(e.target.value)}
                disabled={isViewOnly}>

                <option value="">Select Month</option>
                {[
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'].
                map((m) =>
                <option key={m} value={m}>
                    {m}
                  </option>
                )}
              </select>
            </div>
            <Input
              label="Block Supervisor Name"
              value={blockSupervisorName}
              onChange={(e) => setBlockSupervisorName(e.target.value)}
              disabled={isViewOnly} />

            <Input
              label="Field Coordinator Name"
              value={fieldCoordinatorName}
              onChange={(e) => setFieldCoordinatorName(e.target.value)}
              disabled={isViewOnly} />

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
                }
                disabled={isViewOnly} />

              )}
            </div>
            <TextArea
              label="Comments / Observations"
              rows={3}
              value={activityComments}
              onChange={(e) => setActivityComments(e.target.value)}
              disabled={isViewOnly} />

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
                onChange={(e) => handleIssueChange(issue, e.target.checked)}
                disabled={isViewOnly} />

              )}
            </div>
            <Input
              label="Other Issues"
              value={otherIssues}
              onChange={(e) => setOtherIssues(e.target.value)}
              disabled={isViewOnly} />

            {hasIssues &&
            <div className="bg-softPink/20 border border-softPink text-neutral-text p-4 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-coral" />
                <p className="font-medium">
                  {isViewOnly ?
                'Issues were identified during this monitoring visit.' :
                'Issues identified. Please record actions taken below.'}
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
                onChange={(e) => handleActionChange(action, e.target.checked)}
                disabled={isViewOnly} />

              )}
            </div>
            <TextArea
              label="Additional Actions Taken"
              rows={3}
              value={additionalActions}
              onChange={(e) => setAdditionalActions(e.target.value)}
              disabled={isViewOnly} />

            {showActionWarning &&
            <div className="bg-coral/10 border border-coral text-coral p-4 rounded-lg flex items-center gap-3">
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-teal focus:ring-teal disabled:bg-gray-100 disabled:text-gray-500"
                  value={overallRating}
                  onChange={(e) => setOverallRating(e.target.value)}
                  disabled={isViewOnly}>

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
                onChange={(e) => setNextReviewDate(e.target.value)}
                disabled={isViewOnly} />

            </div>

            {isCritical &&
            <div className="bg-coral/10 border border-coral p-4 rounded-lg flex items-start gap-3">
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
              onChange={(e) => setSupervisorRemarks(e.target.value)}
              disabled={isViewOnly} />

          </div>
        </Accordion>

        <div className="h-20"></div>
      </div>

      {/* Sticky Bottom Action Bar — only for new records */}
      {!isViewOnly &&
      <div className="bg-white border-t border-softPink p-4 shadow-lg flex justify-between items-center z-20">
          <Button variant="ghost" onClick={handleReset}>
            Reset Form
          </Button>
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
      }
    </div>);

}