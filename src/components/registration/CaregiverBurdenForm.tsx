import React, { useEffect, useState } from 'react';
import { usePatient } from '../../context/PatientContext';
import { CaregiverBurdenData } from '../../types';
import { Button } from '../ui/Button';
import { Accordion } from '../ui/Accordion';
import { CheckCircle, Heart } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
const QUESTIONS = [
'Do you feel that your relative asks for more help than he or she needs?',
'Do you feel that because of the time you spend with your relative you do not have enough time for yourself?',
'Do you feel stressed between caring for your relative and trying to meet other responsibilities for your family or work?',
"Do you feel embarrassed over your relative's behavior?",
'Do you feel angry when you are around your relative?',
'Do you feel that your relative currently affects your relationship with other family members or friends in a negative way?',
'Are you afraid about what the future holds for your relative?',
'Do you feel your relative is dependent on you?',
'Do you feel strained when you are around your relative?',
'Do you feel your health has suffered because of your involvement with your relative?',
'Do you feel that you do not have as much privacy as you would like, because of your relative?',
'Do you feel that your social life has suffered because you are caring for your relative?',
'Do you feel uncomfortable about having friends over, because of your relative?',
'Do you feel that your relative seems to expect you to take care of him or her, as if you were the only one he or she could depend on?',
'Do you feel that you do not have enough money to care for your relative, in addition to the rest of your expenses?',
'Do you feel that you will be unable to take care of your relative much longer?',
"Do you feel you have lost control of your life since your relative's illness?",
'Do you wish you could just leave the care of your relative to someone else?',
'Do you feel uncertain about what to do about your relative?',
'Do you feel you should be doing more for your relative?',
'Do you feel you could do a better job in caring for your relative?',
'Overall, how burdened do you feel in caring for your relative?'];

const LIKERT_OPTIONS = [
{
  label: 'Never',
  val: 0
},
{
  label: 'Rarely',
  val: 1
},
{
  label: 'Sometimes',
  val: 2
},
{
  label: 'Frequently',
  val: 3
},
{
  label: 'Nearly Always',
  val: 4
}];

function getBurdenLevel(score: number): {
  level: string;
  variant: 'teal' | 'softPink' | 'coral' | 'gray';
} {
  if (score >= 61)
  return {
    level: 'Severe',
    variant: 'coral'
  };
  if (score >= 41)
  return {
    level: 'Moderate to Severe',
    variant: 'coral'
  };
  if (score >= 21)
  return {
    level: 'Moderate',
    variant: 'softPink'
  };
  return {
    level: 'Low',
    variant: 'teal'
  };
}
export function CaregiverBurdenForm() {
  const { selectedPatient: patient, saveSubStageData } = usePatient();
  const [responses, setResponses] = useState<Record<string, number>>({});
  useEffect(() => {
    if (patient?.caregiverBurdenData) {
      setResponses(patient.caregiverBurdenData.responses || {});
    }
  }, [patient]);
  if (!patient) return null;
  const totalScore = QUESTIONS.reduce(
    (sum, q, i) => sum + (responses[`q${i}`] || 0),
    0
  );
  const maxScore = QUESTIONS.length * 4; // 88
  const { level: burdenLevel, variant: badgeVariant } =
  getBurdenLevel(totalScore);
  const handleChange = (index: number, value: number) => {
    setResponses((prev) => ({
      ...prev,
      [`q${index}`]: value
    }));
  };
  const handleSave = () => {
    const data: CaregiverBurdenData = {
      responses,
      burdenScore: totalScore,
      burdenLevel,
      assessmentDate: new Date().toISOString().split('T')[0],
      completedAt: new Date().toISOString()
    };
    saveSubStageData(patient.id, 'caregiverBurdenData', data);
    alert('Caregiver Burden Assessment saved!');
  };
  const answeredCount = QUESTIONS.filter(
    (_, i) => responses[`q${i}`] !== undefined
  ).length;
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-neutral-text">
          Caregiver Burden Assessment
        </h3>
        <span className="text-sm text-neutral-secondary">
          {answeredCount} / {QUESTIONS.length} answered
        </span>
      </div>

      {/* Score Summary Card */}
      <Card className="p-6 bg-gray-50 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Total Burden Score
            </h4>
            <div className="text-4xl font-bold text-neutral-text mt-1">
              {totalScore}{' '}
              <span className="text-lg text-gray-400 font-normal">
                / {maxScore}
              </span>
            </div>
          </div>
          <div className="text-right">
            <Badge variant={badgeVariant} className="text-sm px-3 py-1 mb-2">
              {burdenLevel} Burden
            </Badge>
            <p className="text-xs text-gray-500 max-w-[240px]">
              0–20: Low • 21–40: Moderate • 41–60: Moderate to Severe • 61–88:
              Severe
            </p>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${badgeVariant === 'coral' ? 'bg-coral' : badgeVariant === 'softPink' ? 'bg-softPink' : 'bg-teal'}`}
            style={{
              width: `${totalScore / maxScore * 100}%`
            }}>
          </div>
        </div>
      </Card>

      <Accordion
        title="Caregiver Burden Tool (Zarit Burden Interview)"
        icon={<Heart className="h-5 w-5" />}>
        
        <div className="space-y-1">
          {QUESTIONS.map((question, index) =>
          <div
            key={index}
            className={`py-4 px-4 rounded-lg ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
            
              <p className="font-medium text-neutral-text mb-3 text-sm">
                {index + 1}. {question}
              </p>
              <div className="flex gap-4 flex-wrap">
                {LIKERT_OPTIONS.map((option) =>
              <label
                key={option.label}
                className="flex items-center gap-2 cursor-pointer">
                
                    <input
                  type="radio"
                  name={`burden-q${index}`}
                  checked={responses[`q${index}`] === option.val}
                  onChange={() => handleChange(index, option.val)}
                  className="text-teal focus:ring-teal" />
                
                    <span className="text-sm text-gray-700">
                      {option.label}
                    </span>
                  </label>
              )}
              </div>
            </div>
          )}
        </div>
      </Accordion>

      <div className="flex justify-end pt-4">
        <Button
          variant="primary"
          onClick={handleSave}
          leftIcon={<CheckCircle className="h-4 w-4" />}>
          
          Save Assessment
        </Button>
      </div>
    </div>);

}