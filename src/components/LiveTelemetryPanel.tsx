import React from 'react';
import { Layers, TreePine, Droplets, Gauge, Compass, Clock, Archive } from 'lucide-react';
import { InternetTarget, PRINTER_SPEED_PRESETS } from '../data/internetPresets';
import { calculatePrintMetrics, getMilestoneComparison, formatTimeDuration } from '../utils/printCalculator';

interface LiveTelemetryPanelProps {
  target: InternetTarget;
  pagesPrinted: number;
  currentSpeedIndex: number;
}

export const LiveTelemetryPanel: React.FC<LiveTelemetryPanelProps> = ({
  target,
  pagesPrinted,
  currentSpeedIndex,
}) => {
  const speedPreset = PRINTER_SPEED_PRESETS[currentSpeedIndex];
  const targetMetrics = calculatePrintMetrics(target.pages);
  const sessionMetrics = calculatePrintMetrics(pagesPrinted);

  const pagesRemaining = Math.max(0, target.pages - pagesPrinted);
  const remainingMinutes = pagesRemaining / speedPreset.ppm;
  const remainingTime = formatTimeDuration(remainingMinutes);

  const progressPercent = target.pages > 0 ? (pagesPrinted / target.pages) * 100 : 0;
  const milestone = getMilestoneComparison(targetMetrics.heightMeters);
  const currentStackMilestone = getMilestoneComparison(sessionMetrics.heightMeters);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      {/* 4-column metric grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Metric 1: Pages printed */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Pages Printed</span>
            <Gauge className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="font-mono text-xl sm:text-2xl font-extrabold text-stone-900 tabular-nums">
              {pagesPrinted.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              {progressPercent.toFixed(progressPercent < 0.01 ? 6 : 2)}% of target
            </div>
          </div>
        </div>

        {/* Metric 2: Stack Height */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Stack Height</span>
            <Layers className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <div className="font-mono text-xl sm:text-2xl font-extrabold text-stone-900 tabular-nums">
              {sessionMetrics.heightMeters < 1000
                ? `${sessionMetrics.heightMeters.toFixed(2)} m`
                : `${sessionMetrics.heightKm.toFixed(3)} km`}
            </div>
            <div className="text-[11px] text-stone-500 mt-1 truncate">
              {currentStackMilestone.current.name} scale
            </div>
          </div>
        </div>

        {/* Metric 3: Trees Required */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Trees Needed</span>
            <TreePine className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <div className="font-mono text-xl sm:text-2xl font-extrabold text-stone-900 tabular-nums">
              {targetMetrics.treesNeeded > 1_000_000
                ? `${(targetMetrics.treesNeeded / 1_000_000).toFixed(1)}M`
                : targetMetrics.treesNeeded.toLocaleString()}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              8,500 sheets / tree
            </div>
          </div>
        </div>

        {/* Metric 4: Time Remaining */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-stone-500 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider">Time Remaining</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="font-mono text-sm sm:text-base font-extrabold text-stone-900 truncate">
              {pagesRemaining === 0 ? 'Completed!' : remainingTime.humanLabel}
            </div>
            <div className="text-[11px] text-stone-500 mt-1">
              at {speedPreset.ppm.toLocaleString()} pages/min
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Detailed Footprint Row */}
      <div className="mt-3 bg-stone-50 rounded-2xl p-4 border border-stone-200/90 text-xs text-stone-700 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <div className="text-stone-400 font-semibold uppercase text-[10px] mb-0.5">Total Paper Weight</div>
          <div className="font-mono font-bold text-stone-900 text-sm">
            {targetMetrics.weightTons >= 1
              ? `${targetMetrics.weightTons.toLocaleString(undefined, { maximumFractionDigits: 1 })} metric tons`
              : `${targetMetrics.weightKg.toLocaleString()} kg`}
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">
            {targetMetrics.reams.toLocaleString()} reams (500/ream)
          </div>
        </div>

        <div>
          <div className="text-stone-400 font-semibold uppercase text-[10px] mb-0.5">Ink Cartridges</div>
          <div className="font-mono font-bold text-stone-900 text-sm">
            {targetMetrics.inkCartridges.toLocaleString()} units
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">
            Standard 500-page laser yield
          </div>
        </div>

        <div>
          <div className="text-stone-400 font-semibold uppercase text-[10px] mb-0.5">Water Consumed</div>
          <div className="font-mono font-bold text-stone-900 text-sm">
            {targetMetrics.waterLiters >= 1_000_000
              ? `${(targetMetrics.waterLiters / 1_000_000).toFixed(1)}M Liters`
              : `${targetMetrics.waterLiters.toLocaleString()} Liters`}
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5">
            Pulp & paper manufacturing
          </div>
        </div>

        <div>
          <div className="text-stone-400 font-semibold uppercase text-[10px] mb-0.5">Target Max Height</div>
          <div className="font-mono font-bold text-stone-900 text-sm truncate">
            {targetMetrics.heightKm >= 1
              ? `${targetMetrics.heightKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} km`
              : `${targetMetrics.heightMeters.toLocaleString()} m`}
          </div>
          <div className="text-[10px] text-stone-500 mt-0.5 truncate">
            Reaches {milestone.current.name}
          </div>
        </div>
      </div>
    </div>
  );
};
