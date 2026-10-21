import React from 'react';
import { MILESTONES, Milestone, calculatePrintMetrics } from '../utils/printCalculator';
import { InternetTarget } from '../data/internetPresets';
import { Layers, Rocket, Mountain, Building, CheckCircle2 } from 'lucide-react';

interface HeightMilestoneExplorerProps {
  target: InternetTarget;
  pagesPrinted: number;
}

export const HeightMilestoneExplorer: React.FC<HeightMilestoneExplorerProps> = ({
  target,
  pagesPrinted,
}) => {
  const targetMetrics = calculatePrintMetrics(target.pages);
  const sessionMetrics = calculatePrintMetrics(pagesPrinted);

  const getCategoryIcon = (category: Milestone['category']) => {
    switch (category) {
      case 'space':
        return <Rocket className="w-4 h-4 text-purple-600" />;
      case 'nature':
        return <Mountain className="w-4 h-4 text-emerald-600" />;
      case 'architecture':
        return <Building className="w-4 h-4 text-amber-600" />;
      default:
        return <Layers className="w-4 h-4 text-stone-600" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
          Cosmic Paper Stack Explorer
        </h2>
        <p className="text-sm text-stone-600 mt-1">
          Every A4 paper sheet is ~0.1mm thick. See how high the physical stack of{' '}
          <span className="font-bold text-stone-900">{target.name}</span>{' '}
          ({targetMetrics.heightKm >= 1
            ? `${targetMetrics.heightKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km`
            : `${targetMetrics.heightMeters.toLocaleString()} m`}) reaches compared to landmarks on Earth and outer space.
        </p>
      </div>

      {/* Target indicator banner */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">Target Stack Height</div>
          <div className="text-2xl font-mono font-extrabold text-stone-900 mt-0.5">
            {targetMetrics.heightKm >= 1
              ? `${targetMetrics.heightKm.toLocaleString(undefined, { maximumFractionDigits: 2 })} km`
              : `${targetMetrics.heightMeters.toFixed(1)} meters`}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-stone-500 font-semibold">Total Printed Sheets</div>
          <div className="text-lg font-mono font-bold text-stone-900">
            {target.pages.toLocaleString()} sheets
          </div>
        </div>
      </div>

      {/* Milestone List */}
      <div className="space-y-3">
        {MILESTONES.map((m) => {
          const isTargetReached = targetMetrics.heightMeters >= m.heightMeters;
          const isSessionReached = sessionMetrics.heightMeters >= m.heightMeters;

          const heightLabel =
            m.heightMeters >= 1000
              ? `${(m.heightMeters / 1000).toLocaleString()} km`
              : `${m.heightMeters.toLocaleString()} m`;

          return (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isTargetReached
                  ? 'bg-white border-stone-300 shadow-sm'
                  : 'bg-stone-50/70 border-stone-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isTargetReached ? 'bg-stone-100' : 'bg-stone-200'
                  }`}
                >
                  {getCategoryIcon(m.category)}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">{m.name}</span>
                    <span className="text-xs font-mono font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {heightLabel}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-0.5">{m.description}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                {isSessionReached ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Passed in session!
                  </span>
                ) : isTargetReached ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                    Exceeded by target
                  </span>
                ) : (
                  <span className="text-xs text-stone-400 font-medium">
                    Above target stack
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
