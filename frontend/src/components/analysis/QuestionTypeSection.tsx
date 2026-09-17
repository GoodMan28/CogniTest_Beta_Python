import type { ReportAnalysis } from '../../types/reportAnalysis';
import { subjectColor } from '../../types/reportAnalysis';
import SectionCard, { marksTone, tdClass, thClass } from './SectionCard';
import ResponsiveTable from '../ui/ResponsiveTable';

interface Props {
  analysis: ReportAnalysis;
}

/**
 * "Marks by Question Type: Where You Earn the Most" — cross-tab of score per
 * question type per subject, plus a Total row. Matches PDF Section 6.
 */
const QuestionTypeSection = ({ analysis }: Props) => {
  const { questionTypes, subjects } = analysis;
  const { types, overall, bySubject } = questionTypes;
  if (subjects.length === 0 || types.length === 0) return null;

  const bySubjectMap = new Map(bySubject.map(row => [row.subject, row.cells]));

  return (
    <SectionCard
      icon="percent" iconColor="text-indigo-600"
      title="Marks by Question Type: Where You Earn the Most"
      description="This section shows how many marks you scored from each question type in every subject — like Single Correct or Numerical."
      tips={['Use it to find your high-yield question types and identify where marks are slipping away. Focusing your practice on low-scoring types can give a big boost in the next test.']}
    >
      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <ResponsiveTable>
<table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-100 max-sm:px-4">
            <tr>
              <th className={`${thClass} text-left max-sm:px-4`}>Subject</th>
              {types.map(t => (
                <th key={t} className={`${thClass} text-center max-sm:px-4`}>{t}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subjects.map((s, i) => {
              const cells = bySubjectMap.get(s.label) || [];
              const cellByLabel = new Map(cells.map(c => [c.label, c]));
              return (
                <tr key={s.key}>
                  <td className={`${tdClass} font-bold max-sm:px-4`} style={{ color: subjectColor(s.label, i) }}>{s.label}</td>
                  {types.map(t => {
                    const c = cellByLabel.get(t);
                    if (!c) {
                      return (
                        <td key={t} className={`${tdClass} text-center text-gray-300 max-sm:px-4`}>—</td>
                      );
                    }
                    return (
                      <td key={t} className={`${tdClass} text-center max-sm:px-4`}>
                        <div>
                          <span className={`font-black ${marksTone(c.score)}`}>{c.score}</span>
                          <span className="text-gray-400 text-xs">/{c.maxMarks}</span>
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{c.correct}C · {c.incorrect}I · {c.skipped}U</div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            <tr className="bg-gray-50 font-bold">
              <td className={`${tdClass} text-gray-900 max-sm:px-4`}>Total</td>
              {types.map(t => {
                const c = overall.find(o => o.label === t);
                return (
                  <td key={t} className={`${tdClass} text-center text-gray-800 max-sm:px-4`}>
                    {c ? (
                      <>
                        <span className={marksTone(c.score)}>{c.score}</span>
                        <span className="text-gray-400 text-xs">/{c.maxMarks}</span>
                      </>
                    ) : '—'}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
</ResponsiveTable>
      </div>
    </SectionCard>
  );
};

export default QuestionTypeSection;
