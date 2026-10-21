import React, { useState, useEffect } from 'react';
import { Download, FileText, HardDrive, AlertCircle, CheckCircle2, X, RefreshCw } from 'lucide-react';
import { InternetTarget } from '../data/internetPresets';
import { calculatePrintMetrics } from '../utils/printCalculator';
import { generateArchivalPdf, triggerPdfDownload } from '../utils/pdfGenerator';
import { printerAudio } from '../utils/audioSynthesizer';

interface DownloadAllModalProps {
  target: InternetTarget;
  pagesPrinted: number;
  onClose: () => void;
}

export const DownloadAllModal: React.FC<DownloadAllModalProps> = ({
  target,
  pagesPrinted,
  onClose,
}) => {
  const [downloadingReal, setDownloadingReal] = useState(false);
  const [isSimulatingFull, setIsSimulatingFull] = useState(false);
  const [simulatedGb, setSimulatedGb] = useState(0);

  const metrics = calculatePrintMetrics(target.pages);
  // ~45 KB per page compressed PDF
  const totalGb = (target.pages * 0.045) / 1024;
  const totalTb = totalGb / 1024;
  const totalPb = totalTb / 1024;

  const formattedSize =
    totalPb >= 1
      ? `${totalPb.toFixed(1)} Petabytes (${(totalPb * 1000).toLocaleString()} TB)`
      : totalTb >= 1
      ? `${totalTb.toFixed(1)} Terabytes (${totalTb.toFixed(1)} TB)`
      : totalGb >= 1
      ? `${totalGb.toFixed(1)} Gigabytes (${totalGb.toFixed(0)} GB)`
      : `${(totalGb * 1024).toFixed(0)} Megabytes`;

  // Standard 1 Gbps broadband download time in years/days
  // 1 Gbps = ~125 MB/sec = ~450 GB/hour = ~10.8 TB/day
  const daysOnBroadband = (totalTb * 1024) / 10.8;
  const yearsOnBroadband = daysOnBroadband / 365.25;

  const hardDrivesCount = Math.ceil(totalTb / 16); // 16TB drives

  useEffect(() => {
    if (!isSimulatingFull) return;
    const interval = setInterval(() => {
      setSimulatedGb((prev) => {
        const increment = totalGb > 100_000 ? 450 : 25;
        const next = prev + increment;
        if (next >= totalGb) {
          setIsSimulatingFull(false);
          return totalGb;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isSimulatingFull, totalGb]);

  const handleDownloadRealPdf = () => {
    printerAudio.playButtonClick();
    setDownloadingReal(true);
    setTimeout(() => {
      const blob = generateArchivalPdf(target, pagesPrinted);
      triggerPdfDownload(
        blob,
        `Printing-The-Internet_${target.domain.replace(/[^a-z0-9]/gi, '_')}_Archive.pdf`
      );
      setDownloadingReal(false);
    }, 400);
  };

  const handleStartFullSimulation = () => {
    printerAudio.playButtonClick();
    setSimulatedGb(0);
    setIsSimulatingFull(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-stone-200 w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center">
              <Download className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 text-base sm:text-lg">
                Download All Documents as PDF
              </h3>
              <p className="text-xs text-stone-500">
                Target: {target.name} ({target.pages.toLocaleString()} pages)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Download Size Warning Card */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider mb-1">
              <HardDrive className="w-4 h-4 text-amber-600" />
              Calculated PDF File Size
            </div>
            <div className="text-2xl font-mono font-extrabold text-stone-900">
              {formattedSize}
            </div>
            <p className="text-xs text-stone-600 mt-1">
              Printing every page into a single PDF volume requires approximately{' '}
              <strong>{hardDrivesCount.toLocaleString()}</strong> 16-Terabyte server hard drives.
              At 1 Gbps broadband speed, downloading this file non-stop would take{' '}
              <strong>
                {yearsOnBroadband >= 1
                  ? `${yearsOnBroadband.toFixed(0)} years`
                  : `${daysOnBroadband.toFixed(0)} continuous days`}
              </strong>.
            </p>
          </div>

          {/* Option 1: Real Instant PDF Download */}
          <div className="border border-stone-200 rounded-2xl p-4 hover:border-stone-300 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-amber-600" />
                1. Archival Certificate & Sample Sheet (PDF)
              </span>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Ready Now
              </span>
            </div>
            <p className="text-xs text-stone-500 mb-3">
              Generates an authentic PDF document with official publication metadata, total volume calculations, TechHive 2015 study metrics, and sample printed lines.
            </p>
            <button
              onClick={handleDownloadRealPdf}
              disabled={downloadingReal}
              className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {downloadingReal ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-400" /> Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-400" /> Download Official PDF (Instant)
                </>
              )}
            </button>
          </div>

          {/* Option 2: Full Archive Download Simulation */}
          <div className="border border-stone-200 rounded-2xl p-4 bg-stone-50/60">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                <HardDrive className="w-4 h-4 text-purple-600" />
                2. Full {target.pages > 1_000_000 ? 'Multi-Petabyte' : ''} Archive (.pdf stream)
              </span>
              <span className="text-[10px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
                Cosmic Scale
              </span>
            </div>
            <p className="text-xs text-stone-500 mb-3">
              Attempts to download all {target.pages.toLocaleString()} pages ({formattedSize}) directly to your local device.
            </p>

            {isSimulatingFull ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-600">Downloading...</span>
                  <span className="font-bold text-stone-900">
                    {simulatedGb.toLocaleString()} GB / {totalGb.toFixed(0)} GB
                  </span>
                </div>
                <div className="w-full h-2.5 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all duration-100"
                    style={{ width: `${Math.min(100, (simulatedGb / Math.max(1, totalGb)) * 100)}%` }}
                  />
                </div>
                <div className="text-[11px] text-amber-800 italic">
                  Allocating hard drive cluster... Estimated remaining: {yearsOnBroadband >= 1 ? `${yearsOnBroadband.toFixed(0)} years` : `${daysOnBroadband.toFixed(0)} days`}.
                </div>
              </div>
            ) : (
              <button
                onClick={handleStartFullSimulation}
                className="w-full py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                Start Full Archive Download ({formattedSize})
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
