import React from 'react';
import { usePatient } from '../../context/PatientContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import {
  Activity,
  ClipboardCheck,
  AlertTriangle,
  Building2,
  Brain,
  Stethoscope,
  ShieldCheck,
  FileText } from
'lucide-react';
function SummarySection({
  title,
  icon,
  children




}: {title: string;icon: React.ReactNode;children: React.ReactNode;}) {
  return (
    <Card className="p-5 border border-gray-200 bg-white">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
        <span className="text-teal">{icon}</span>
        <h4 className="font-bold text-neutral-text text-sm uppercase tracking-wider">
          {title}
        </h4>
      </div>
      {children}
    </Card>);

}
function FieldRow({
  label,
  value



}: {label: string;value: string | undefined;}) {
  return (
    <div className="flex justify-between items-start py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500 w-2/5">{label}</span>
      <span className="text-sm font-medium text-neutral-text w-3/5 text-right">
        {value || '—'}
      </span>
    </div>);

}
export function IdentificationSummary() {
  const { selectedPatient: patient } = usePatient();
  if (!patient) return null;
  const data = patient.identificationData;
  const hasData = !!data;
  if (!hasData) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-neutral-text">
          Identification Summary
        </h3>
        <div className="text-center py-16 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
          <p className="font-medium text-gray-600">
            No identification data available
          </p>
          <p className="text-sm mt-1">
            Please complete the PWMI Identification form first.
          </p>
        </div>
      </div>);

  }
  const riskVariant =
  data.riskLevel === 'High' ?
  'coral' :
  data.riskLevel === 'Moderate' ?
  'softPink' :
  'teal';
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-neutral-text">
          Identification Summary
        </h3>
        <Badge variant="gray" className="text-xs">
          Read-only — from PWMI Identification
        </Badge>
      </div>

      {/* Info Banner */}
      <div className="bg-teal/5 border border-teal/20 rounded-lg p-4 flex items-start gap-3">
        <FileText className="h-5 w-5 text-teal shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-teal">
            This data was captured during PWMI Identification
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            Screened on {data.screeningDate || 'N/A'}. To edit, go back to the
            Identification tab.
          </p>
        </div>
      </div>

      {/* Symptoms Screening */}
      <SummarySection
        title="Symptoms Screening"
        icon={<Activity className="h-5 w-5" />}>

        <div className="space-y-2">
          {data.symptoms.length > 0 ?
          <div className="flex flex-wrap gap-2">
              {data.symptoms.map((symptom) =>
            <span
              key={symptom}
              className="inline-flex items-center gap-1.5 bg-softPink/15 text-neutral-text text-xs font-medium px-3 py-1.5 rounded-full">

                  <span className="w-1.5 h-1.5 rounded-full bg-coral"></span>
                  {symptom}
                </span>
            )}
            </div> :

          <p className="text-sm text-gray-400 italic">No symptoms recorded</p>
          }
          {data.otherSymptoms &&
          <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">Other Symptoms:</span>
              <p className="text-sm text-neutral-text mt-0.5">
                {data.otherSymptoms}
              </p>
            </div>
          }
        </div>
      </SummarySection>

      {/* Functional Impact Classification */}
      <SummarySection
        title="Functional Impact Classification"
        icon={<ClipboardCheck className="h-5 w-5" />}>

        <div className="space-y-2">
          {data.functionalImpacts.length > 0 ?
          <div className="flex flex-wrap gap-2">
              {data.functionalImpacts.map((impact) =>
            <span
              key={impact}
              className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-medium px-3 py-1.5 rounded-full">

                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  {impact}
                </span>
            )}
            </div> :

          <p className="text-sm text-gray-400 italic">
              No functional impacts recorded
            </p>
          }
          {data.suicidalThoughts &&
          <div className="mt-3 bg-coral/10 border border-coral/30 p-3 rounded-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-coral" />
              <span className="text-sm font-medium text-coral">
                Self-harm / suicidal thoughts reported
              </span>
            </div>
          }
          {data.otherImpacts &&
          <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">Other:</span>
              <p className="text-sm text-neutral-text mt-0.5">
                {data.otherImpacts}
              </p>
            </div>
          }
        </div>
      </SummarySection>

      {/* Risk Level Classification */}
      <SummarySection
        title="Risk Level Classification"
        icon={<AlertTriangle className="h-5 w-5" />}>

        <div className="flex items-center gap-3">
          <Badge variant={riskVariant} className="text-sm px-4 py-1.5">
            {data.riskLevel} Risk
          </Badge>
          <span className="text-sm text-gray-500">
            {data.riskLevel === 'Low' && 'Can be managed at community level'}
            {data.riskLevel === 'Moderate' &&
            'Needs clinical consultation soon'}
            {data.riskLevel === 'High' && 'Needs immediate clinical attention'}
          </span>
        </div>
        {data.riskNotes &&
        <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">Action Notes:</span>
            <p className="text-sm text-neutral-text mt-0.5">{data.riskNotes}</p>
          </div>
        }
      </SummarySection>

      {/* Referral Details */}
      <SummarySection
        title="Referral Details"
        icon={<Building2 className="h-5 w-5" />}>

        <div className="space-y-0">
          <FieldRow label="PWMI Referred?" value={data.pwmiReferred} />
          <FieldRow label="Date of Referral" value={data.dateOfReferral} />
          <FieldRow label="Referral Facility" value={data.referralFacility} />
          <FieldRow
            label="Mental Health Facility"
            value={data.mentalHealthFacilityName} />

        </div>
      </SummarySection>

      {/* Mental Disorder and Disability Details */}
      <SummarySection
        title="Mental Disorder and Disability Details"
        icon={<Brain className="h-5 w-5" />}>

        <div className="space-y-0">
          <FieldRow
            label="Type of Mental Disorder"
            value={data.mentalDisorderType} />

          <FieldRow label="Type of Disability" value={data.disabilityType} />
        </div>
      </SummarySection>

      {/* Mental Illness Diagnosis */}
      <SummarySection
        title="Mental Illness Diagnosis"
        icon={<Stethoscope className="h-5 w-5" />}>

        <div className="space-y-0">
          <FieldRow
            label="Type of Mental Illness"
            value={data.mentalIllnessType} />

          <FieldRow
            label="Severity of Illness"
            value={data.severityOfIllness} />

          <FieldRow label="Severity Rating" value={data.severityRating} />
        </div>
      </SummarySection>

      {/* Consent */}
      <SummarySection
        title="Consent for Registration in CHMP Program"
        icon={<ShieldCheck className="h-5 w-5" />}>

        <div className="flex items-center gap-3">
          {data.consentGiven === 'Yes' ?
          <Badge variant="teal" className="text-sm px-4 py-1.5">
              ✓ Consent Given
            </Badge> :
          data.consentGiven === 'No' ?
          <Badge variant="coral" className="text-sm px-4 py-1.5">
              ✗ Consent Not Given
            </Badge> :

          <span className="text-sm text-gray-400 italic">Not recorded</span>
          }
        </div>
      </SummarySection>
    </div>);

}