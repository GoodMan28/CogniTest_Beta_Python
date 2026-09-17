import type { ReportAnalysis } from '../../types/reportAnalysis';
import { subjectColor } from '../../types/reportAnalysis';
import SectionCard, { tdClass, thClass } from './SectionCard';
import ResponsiveTable from '../ui/ResponsiveTable';

interface Props {
  analysis: ReportAnalysis;
}

/** You vs. class average vs. topper, overall and per subject, computed from every report of this test. */
const BatchComparisonSection = ({ analysis }: Props) => {
  const { cohort, subjects, summary } = analysis;
  if (cohort.size < 2) {
    return (
      <SectionCard icon="flag" iconColor="text-indigo-600" title="You vs. the Batch" description="Comparison unavailable: only one evaluated student for this test so far.">
        <p className="text-sm text-gray-400">Check back once more results are published.</p>
      </SectionCard>
    );
  }

  const topperLabel = cohort.topperCount > 1 ? `Joint toppers' avg (${cohort.topperCount})` : 'Topper';
  const rows = [
    { label: 'Overall', you: summary.score, avg: cohort.classAverage, top: cohort.topperScore, max: summary.maxMarks, color: '#111827' },
    ...subjects.map((s, i) => {
      const c = cohort.subjects.find(x => x.subject === s.label);
      return { label: s.label, you: s.score, avg: c?.classAverage ?? 0, top: c?.topperScore ?? 0, max: s.maxMarks, color: subjectColor(s.label, i) };
    }),
  ];

  const Bar = ({ value, max, color, faded }: { value: number; max: number; color: string; faded?: boolean }) => (
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0}%`, backgroundColor: color, opacity: faded ? 0.35 : 1 }} />
    </div>
  );

  return (
    <SectionCard
      icon="flag" iconColor="text-indigo-600"
      title="You vs. the Batch"
      description={`How your marks stack up against the class average and the ${cohort.topperCount > 1 ? 'joint toppers' : 'topper'} across ${cohort.size} evaluated students.`}
    >
      <div className="overflow-x-auto rounded-lg border border-gray-100 min-w-0 w-full">
        <ResponsiveTable>
<table className="min-w-full">
          <thead className="bg-gray-50 border-b border-gray-100 max-sm:px-4">
            <tr>
              <th className={`${thClass} text-left max-sm:px-4`}>Scope</th>
              <th className={`${thClass} text-center max-sm:px-4`}>You</th>
              <th className={`${thClass} text-center max-sm:px-4`}>Class Avg</th>
              <th className={`${thClass} text-center max-sm:px-4`}>{topperLabel}</th>
              <th className={`${thClass} text-left w-64 max-sm:px-4`}>Gap to topper</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map(r => {
              const aboveAvg = r.you >= r.avg;
              return (
                <tr key={r.label}>
                  <td className={`${tdClass} font-bold max-sm:px-4`} style={{ color: r.color }}>{r.label}</td>
                  <td className={`${tdClass} text-center font-black ${aboveAvg ? 'text-green-700' : 'text-red-600'} max-sm:px-4`}>{r.you}<span className="text-gray-400 text-xs font-medium">/{r.max}</span></td>
                  <td className={`${tdClass} text-center font-bold text-gray-700 max-sm:px-4`}>{r.avg}</td>
                  <td className={`${tdClass} text-center font-bold text-gray-700 max-sm:px-4`}>{r.top}</td>
                  <td className={`${tdClass} max-sm:px-4`}>
                    <div className="space-y-1">
                      <Bar value={r.you} max={r.max} color={r.color} />
                      <Bar value={r.top} max={r.max} color={r.color} faded />
                    </div>
                    <div className="text-[10px] text-gray-400 font-medium mt-1">
                      {r.top - r.you > 0 ? `${Math.round((r.top - r.you) * 10) / 10} marks behind the top` : (
                        <>You are at the top <span className="material-symbols-outlined text-[18px] text-amber-600 inline-block align-text-bottom">emoji_events</span></>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
</ResponsiveTable>
      </div>
    </SectionCard>
  );
};

export default BatchComparisonSection;
