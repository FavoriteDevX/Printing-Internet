import React, { useState } from 'react';
import { Copy, Check, Printer, Share2 } from 'lucide-react';
import { InternetTarget, PRINTER_SPEED_PRESETS } from '../data/internetPresets';
import { calculatePrintMetrics, getMilestoneComparison } from '../utils/printCalculator';
import { printerAudio } from '../utils/audioSynthesizer';

interface PrintReceiptModalProps {
  target: InternetTarget;
  pagesPrinted: number;
  onClose: () => void;
}

export const PrintReceiptModal: React.FC<PrintReceiptModalProps> = ({
  target,
  pagesPrinted,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const metrics = calculatePrintMetrics(target.pages);
  const milestone = getMilestoneComparison(metrics.heightMeters);

  const homeTime = metrics.timeFormatted(15);
  const officeTime = metrics.timeFormatted(60);
  const pressTime = metrics.timeFormatted(600);
  const quantumTime = metrics.timeFormatted(1_000_000);

  const receiptText = `
========================================
    PRINTING THE INTERNET ARCHIVE
      OFFICIAL EMISSION RECEIPT
========================================
Date: ${new Date().toLocaleDateString()}
Platform: ${target.name}
Domain: ${target.domain}
----------------------------------------
TOTAL VOLUME ESTIMATION:
Total Pages:    ${target.pages.toLocaleString()} sheets
Paper Weight:   ${metrics.weightTons >= 1 ? `${metrics.weightTons.toFixed(1)} tons` : `${metrics.weightKg.toLocaleString()} kg`}
Stack Height:   ${metrics.heightKm >= 1 ? `${metrics.heightKm.toFixed(2)} km` : `${metrics.heightMeters.toFixed(1)} m`}
Landmark Scale: Reaches ${milestone.current.name}
----------------------------------------
ECOLOGICAL FOOTPRINT:
Trees Felled:   ${metrics.treesNeeded.toLocaleString()} trees
Water Consumed: ${metrics.waterLiters.toLocaleString()} Liters
Cartridges:     ${metrics.inkCartridges.toLocaleString()} units
----------------------------------------
ESTIMATED TIME TO COMPLETE:
Home Inkjet (15 ppm):   ${homeTime.humanLabel}
Office Laser (60 ppm):  ${officeTime.humanLabel}
Web Press (600 ppm):    ${pressTime.humanLabel}
Quantum (1M ppm):       ${quantumTime.humanLabel}
========================================
Session Progress: ${pagesPrinted.toLocaleString()} / ${target.pages.toLocaleString()} pages
Inspired by TechHive (2015) & Neal.fun
========================================
`.trim();

  const handleCopy = () => {
    printerAudio.playButtonClick();
    navigator.clipboard.writeText(receiptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8">
      {/* Thermal Receipt Visual Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-stone-300 p-6 sm:p-8 font-mono text-stone-900 relative">
        {/* Jagged top edge styling */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-stone-200 via-stone-300 to-stone-200 rounded-t-2xl" />

        {/* Receipt Header */}
        <div className="text-center pb-4 border-b-2 border-dashed border-stone-400">
          <div className="text-xs font-bold uppercase tracking-widest text-stone-500">
            Official Emission Slip
          </div>
          <h3 className="text-lg font-black tracking-tight mt-1">
            PRINTING THE INTERNET
          </h3>
          <p className="text-[11px] text-stone-500 mt-0.5">
            Calculation Engine based on TechHive (2015) & Neal.fun
          </p>
        </div>

        {/* Target metadata */}
        <div className="py-4 border-b border-stone-200 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-stone-500">TARGET:</span>
            <span className="font-bold">{target.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">DOMAIN:</span>
            <span className="font-semibold text-stone-700">{target.domain}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">DATE:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Breakdown Items */}
        <div className="py-4 border-b border-dashed border-stone-300 text-xs space-y-2">
          <div className="flex justify-between font-bold text-sm">
            <span>TOTAL PAGES:</span>
            <span>{target.pages.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Stack Height:</span>
            <span>
              {metrics.heightKm >= 1 ? `${metrics.heightKm.toFixed(2)} km` : `${metrics.heightMeters.toFixed(1)} m`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Comparison:</span>
            <span className="font-bold text-amber-800">{milestone.current.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Paper Weight:</span>
            <span>
              {metrics.weightTons >= 1 ? `${metrics.weightTons.toFixed(1)} tons` : `${metrics.weightKg.toLocaleString()} kg`}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Trees Required:</span>
            <span>{metrics.treesNeeded.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500">Ink Cartridges:</span>
            <span>{metrics.inkCartridges.toLocaleString()} units</span>
          </div>
        </div>

        {/* Print Times */}
        <div className="py-4 border-b-2 border-dashed border-stone-400 text-xs space-y-2">
          <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
            PRINTING DURATION BENCHMARKS:
          </div>
          <div className="flex justify-between">
            <span className="text-stone-600">Home Inkjet (15 ppm):</span>
            <span className="font-bold">{homeTime.humanLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-600">Office Laser (60 ppm):</span>
            <span className="font-bold text-amber-900">{officeTime.humanLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-600">Continuous Press (600 ppm):</span>
            <span className="font-bold">{pressTime.humanLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-600">Quantum Nanoprinter (1M ppm):</span>
            <span className="font-bold text-purple-900">{quantumTime.humanLabel}</span>
          </div>
        </div>

        {/* Barcode Graphic */}
        <div className="pt-5 pb-2 text-center flex flex-col items-center">
          <div className="flex gap-1 h-8 items-stretch opacity-80">
            {[2, 1, 3, 1, 4, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 4, 2, 1, 3].map((w, i) => (
              <div key={i} className="bg-stone-900" style={{ width: `${w * 2}px` }} />
            ))}
          </div>
          <div className="text-[10px] tracking-widest text-stone-400 mt-1">
            01001001-01001110-01010100
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" /> Copied Slip!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copy Receipt
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
