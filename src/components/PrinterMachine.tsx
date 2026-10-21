import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, FastForward, Clock, Download, CheckCircle2 } from 'lucide-react';
import { InternetTarget, PRINTER_SPEED_PRESETS } from '../data/internetPresets';
import { calculatePrintMetrics, getMilestoneComparison } from '../utils/printCalculator';
import { printerAudio } from '../utils/audioSynthesizer';

interface PrinterMachineProps {
  target: InternetTarget;
  pagesPrinted: number;
  setPagesPrinted: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  currentSpeedIndex: number;
  setCurrentSpeedIndex: React.Dispatch<React.SetStateAction<number>>;
  onOpenDownloadModal: () => void;
}

export const PrinterMachine: React.FC<PrinterMachineProps> = ({
  target,
  pagesPrinted,
  setPagesPrinted,
  isPlaying,
  setIsPlaying,
  currentSpeedIndex,
  setCurrentSpeedIndex,
  onOpenDownloadModal,
}) => {
  const speedPreset = PRINTER_SPEED_PRESETS[currentSpeedIndex];
  const metrics = calculatePrintMetrics(target.pages);
  const sessionMetrics = calculatePrintMetrics(pagesPrinted);
  const milestone = getMilestoneComparison(sessionMetrics.heightMeters);
  const targetMilestone = getMilestoneComparison(metrics.heightMeters);
  const totalDuration = metrics.timeFormatted(speedPreset.ppm);

  // Real-time printing loop
  useEffect(() => {
    if (!isPlaying) return;

    let intervalMs = 100;
    let pagesPerTick = Math.max(1, Math.round((speedPreset.ppm / 60) * (intervalMs / 1000)));

    if (speedPreset.ppm <= 30) {
      intervalMs = 500;
      pagesPerTick = 1;
    } else if (speedPreset.ppm <= 100) {
      intervalMs = 250;
      pagesPerTick = 1;
    } else if (speedPreset.ppm <= 1000) {
      intervalMs = 100;
      pagesPerTick = Math.max(1, Math.round((speedPreset.ppm / 60) * 0.1));
    } else {
      intervalMs = 50;
      pagesPerTick = Math.max(10, Math.round((speedPreset.ppm / 60) * 0.05));
    }

    const timer = setInterval(() => {
      setPagesPrinted((prev) => {
        const next = Math.min(target.pages, prev + pagesPerTick);
        if (next >= target.pages) {
          setIsPlaying(false);
          printerAudio.playMilestoneChime();
        }
        return next;
      });

      printerAudio.playPaperEject(speedPreset.ppm / 60);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, speedPreset.ppm, target.pages, setPagesPrinted, setIsPlaying]);

  const handleTogglePlay = () => {
    printerAudio.playButtonClick();
    if (pagesPrinted >= target.pages) {
      setPagesPrinted(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    printerAudio.playButtonClick();
    setIsPlaying(false);
    setPagesPrinted(0);
  };

  // Helper to ensure every site has a real screenshot image or fallback
  const resolvedScreenshot = (() => {
    if (target.screenshotUrl) return target.screenshotUrl;
    const lower = (target.domain + ' ' + target.name).toLowerCase();
    if (lower.includes('facebook') || lower.includes('fb.com') || lower.includes('meta')) {
      return '/src/assets/images/page_facebook_screenshot_1792604324722.jpg';
    }
    if (lower.includes('youtube') || lower.includes('video') || lower.includes('youtu.be')) {
      return '/src/assets/images/page_youtube_screenshot_1792604325350.jpg';
    }
    if (lower.includes('twitter') || lower.includes('x.com')) {
      return '/src/assets/images/page_twitter_screenshot_1792604325577.jpg';
    }
    if (lower.includes('stack') || lower.includes('overflow')) {
      return '/src/assets/images/page_stackoverflow_screenshot_1792604325026.jpg';
    }
    if (lower.includes('git') || lower.includes('code') || lower.includes('dev')) {
      return '/src/assets/images/page_github_screenshot_1792604010680.jpg';
    }
    if (lower.includes('reddit')) {
      return '/src/assets/images/page_reddit_screenshot_1792604010696.jpg';
    }
    if (lower.includes('wiki')) {
      return '/src/assets/images/page_wikipedia_screenshot_1792604009457.jpg';
    }
    if (lower.includes('tech') || lower.includes('hive') || lower.includes('internet')) {
      return '/src/assets/images/page_techhive_screenshot_1792604010792.jpg';
    }
    return null;
  })();

  // Conveyor animation duration mapped to ppm
  const conveyorDuration =
    speedPreset.ppm <= 15
      ? '6s'
      : speedPreset.ppm <= 60
      ? '3s'
      : speedPreset.ppm <= 600
      ? '1s'
      : speedPreset.ppm <= 12000
      ? '0.35s'
      : '0.12s';

  // 6 repeating sheets to form a seamless infinite conveyor belt
  const beltSheets = Array.from({ length: 8 }, (_, idx) => {
    const pageOffset = Math.max(1, pagesPrinted - (7 - idx) * 3);
    const snippet = target.sampleSnippets[idx % target.sampleSnippets.length] || {
      title: `${target.name} Document`,
      section: 'Digital Heritage Document',
      content: `Extracting public web content from ${target.domain}...`,
    };
    return {
      index: idx,
      pageOffset,
      snippet,
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4">
      {/* Neal.fun style giant live counter */}
      <div className="text-center my-5">
        <div className="font-mono text-4xl sm:text-6xl font-black text-stone-900 tracking-tight tabular-nums">
          {pagesPrinted.toLocaleString()}
        </div>
        <div className="text-xs sm:text-sm text-stone-500 font-semibold mt-1">
          pages printed so far
        </div>

        {/* Minimalist Sub-metric ticker */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-stone-600 font-medium">
          <span>
            Stack:{' '}
            <strong className="text-stone-900 font-mono">
              {sessionMetrics.heightMeters < 1
                ? `${(sessionMetrics.heightMeters * 100).toFixed(1)} cm`
                : sessionMetrics.heightMeters < 1000
                ? `${sessionMetrics.heightMeters.toFixed(2)} m`
                : `${sessionMetrics.heightKm.toFixed(3)} km`}
            </strong>
          </span>
          <span className="text-stone-300">·</span>
          <span>
            Scale: <strong className="text-stone-900">{milestone.current.name}</strong>
          </span>
          <span className="text-stone-300">·</span>
          <span>
            Speed: <strong className="text-stone-900">{speedPreset.ppm.toLocaleString()} ppm</strong>
          </span>
        </div>
      </div>

      {/* FACTORY CONVEYOR BELT (Neal.fun Printing Money Style) */}
      <div className="relative w-full overflow-hidden bg-stone-200/90 rounded-2xl border-y-4 border-stone-400 py-3 shadow-inner my-4">
        {/* Top conveyor rail guide */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400 border-b border-stone-500 flex items-center justify-between px-2">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-stone-600 rounded-full" />
          ))}
        </div>

        {/* Conveyor track moving to the right */}
        <div
          className="flex gap-4 w-max"
          style={{
            animation: isPlaying ? `conveyor-move-right ${conveyorDuration} linear infinite` : 'none',
          }}
        >
          {/* Double set of sheets for seamless infinite loop */}
          {[...beltSheets, ...beltSheets].map((item, idx) => (
            <div
              key={`${item.index}-${idx}`}
              className="w-56 sm:w-64 bg-white rounded-lg shadow-md border border-stone-300 p-2.5 shrink-0 select-none flex flex-col justify-between"
              style={{ minHeight: '190px' }}
            >
              {/* Paper Header */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-1.5 mb-1.5 text-[9px] font-mono text-stone-600">
                <span className="font-bold text-stone-900 uppercase truncate max-w-[110px]">
                  {target.domain}
                </span>
                <span className="font-bold whitespace-nowrap">
                  #{item.pageOffset.toLocaleString()}
                </span>
              </div>

              {/* REAL SCREENSHOT OF THE WEBSITE ON EACH MOVING SHEET */}
              <div className="rounded overflow-hidden border border-stone-200 bg-stone-50 h-24 mb-1.5">
                {resolvedScreenshot ? (
                  <img
                    src={resolvedScreenshot}
                    alt={`Printed sheet ${target.name}`}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-100 p-1 text-[8px] font-sans flex flex-col justify-between">
                    <div className="flex items-center gap-1 border-b border-stone-200 pb-0.5 font-mono text-[7px] text-stone-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="truncate">https://{target.domain}</span>
                    </div>
                    <div className="font-bold text-[9px] text-stone-800 line-clamp-1">
                      {item.snippet.title}
                    </div>
                    <div className="space-y-0.5">
                      <div className="h-1 bg-stone-300 rounded w-full" />
                      <div className="h-1 bg-stone-200 rounded w-4/5" />
                    </div>
                  </div>
                )}
              </div>

              {/* Sheet Title & Metadata */}
              <div className="text-[9px] font-bold text-stone-800 line-clamp-1">
                {item.snippet.title}
              </div>
              <div className="flex items-center justify-between text-[8px] font-mono text-stone-400 mt-1 border-t border-stone-100 pt-1">
                <span className="truncate max-w-[120px]">{item.snippet.section}</span>
                <span>A4 · 80GSM</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom conveyor rail guide with rollers */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-stone-400 via-stone-300 to-stone-400 border-t border-stone-500 flex items-center justify-between px-2">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-stone-600 rounded-full" />
          ))}
        </div>
      </div>

      {/* Minimal Controls Row */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 flex flex-wrap items-center justify-between gap-3 mt-4">
        {/* Main Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-bold text-xs sm:text-sm shadow transition-all active:scale-95 ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-stone-950'
                : 'bg-stone-900 hover:bg-stone-800 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Print
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-stone-500 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
            title="Reset counter"
            aria-label="Reset counter"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Speed Selector (Clean segmented pills) */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full text-xs">
          {PRINTER_SPEED_PRESETS.map((preset, idx) => (
            <button
              key={preset.id}
              onClick={() => {
                printerAudio.playButtonClick();
                setCurrentSpeedIndex(idx);
              }}
              className={`px-2.5 py-1 font-bold rounded-full transition-all ${
                currentSpeedIndex === idx
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title={preset.description}
            >
              {preset.ppm >= 1_000_000
                ? '1M'
                : preset.ppm >= 1000
                ? `${preset.ppm / 1000}k`
                : `${preset.ppm}`}x
            </button>
          ))}
        </div>
      </div>

      {/* Mind-Blowing Time Calculation Box (Neal.fun style key callout) */}
      <div className="mt-5 bg-white rounded-2xl p-5 border border-stone-200 shadow-sm text-center">
        <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Total time to print all of {target.name} ({target.pages.toLocaleString()} pages):
        </div>
        <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-mono mt-1">
          {totalDuration.humanLabel}
        </div>
        <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
          Requires <strong>{metrics.treesNeeded.toLocaleString()} trees</strong> and builds a stack{' '}
          <strong>{metrics.heightKm >= 1 ? `${metrics.heightKm.toFixed(1)} km` : `${metrics.heightMeters.toFixed(0)} meters`} high</strong> (reaches {targetMilestone.current.name}!).
        </p>

        {/* Download All as PDF Button */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center">
          <button
            onClick={() => {
              printerAudio.playButtonClick();
              onOpenDownloadModal();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-bold transition-all shadow-sm group"
          >
            <Download className="w-3.5 h-3.5 text-amber-400 group-hover:-translate-y-0.5 transition-transform" />
            Download All as PDF ({target.pages > 1_000_000 ? `${((target.pages * 0.045) / 1024 / 1024).toFixed(1)} PB` : `${((target.pages * 0.045) / 1024).toFixed(0)} MB`})
          </button>
        </div>
      </div>
    </div>
  );
};
