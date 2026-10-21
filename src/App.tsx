/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SearchControlBar } from './components/SearchControlBar';
import { PrinterMachine } from './components/PrinterMachine';
import { TechHiveStudyModal } from './components/TechHiveStudyModal';
import { PrintReceiptModal } from './components/PrintReceiptModal';
import { DownloadAllModal } from './components/DownloadAllModal';
import { HeightMilestoneExplorer } from './components/HeightMilestoneExplorer';
import { INTERNET_PRESETS, InternetTarget } from './data/internetPresets';
import { printerAudio } from './utils/audioSynthesizer';
import { Volume2, VolumeX, Sparkles, BookOpen, Receipt, Layers, ExternalLink, Printer } from 'lucide-react';

export default function App() {
  const [currentTarget, setCurrentTarget] = useState<InternetTarget>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const siteParam = params.get('site');
      if (siteParam) {
        const found = INTERNET_PRESETS.find(
          (p) => p.id === siteParam || p.domain.toLowerCase().includes(siteParam.toLowerCase())
        );
        if (found) return found;
      }
    }
    // Default to English Wikipedia or TechHive 2015 study
    return (
      INTERNET_PRESETS.find((p) => p.id === 'wikipedia-en') ||
      INTERNET_PRESETS.find((p) => p.id === 'techhive-2015-study') ||
      INTERNET_PRESETS[0]
    );
  });

  const [pagesPrinted, setPagesPrinted] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });
  const [currentSpeedIndex, setCurrentSpeedIndex] = useState<number>(1); // Default to 60 ppm (Office)
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Overlay modals
  const [showTechHiveModal, setShowTechHiveModal] = useState<boolean>(false);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [showDownloadModal, setShowDownloadModal] = useState<boolean>(false);
  const [showMilestonesModal, setShowMilestonesModal] = useState<boolean>(false);

  const handleSelectTarget = (newTarget: InternetTarget) => {
    setCurrentTarget(newTarget);
    setPagesPrinted(0);
    setIsPlaying(false);
  };

  const handleRandomSelect = () => {
    const others = INTERNET_PRESETS.filter((p) => p.id !== currentTarget.id);
    const randomChoice = others[Math.floor(Math.random() * others.length)] || INTERNET_PRESETS[0];
    handleSelectTarget(randomChoice);
  };

  const toggleAudio = () => {
    const next = !isMuted;
    setIsMuted(next);
    printerAudio.setMuted(next);
    if (!next) {
      printerAudio.playButtonClick();
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 font-sans flex flex-col selection:bg-amber-200">
      {/* Minimal Neal.fun Top Header */}
      <header className="px-6 py-4 flex items-center justify-between max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center">
            <Printer className="w-4 h-4 text-amber-400" />
          </div>
          <span className="font-extrabold text-stone-900 text-base tracking-tight">
            Printing the Internet
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setShowTechHiveModal(true);
              printerAudio.playButtonClick();
            }}
            className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors hidden sm:inline"
          >
            TechHive 2015 Study
          </button>
          <button
            onClick={() => {
              setShowMilestonesModal(true);
              printerAudio.playButtonClick();
            }}
            className="text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors hidden sm:inline"
          >
            Height Scale
          </button>
          <button
            onClick={toggleAudio}
            aria-label={isMuted ? 'Unmute mechanical sound effects' : 'Mute sound effects'}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-600" />}
          </button>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full px-4 py-4">
        {/* Title */}
        <div className="text-center mb-5">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Printing the Internet
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Calculated from the 2015 TechHive study on printing the entire web
          </p>
        </div>

        {/* Minimal Search & Target Selector */}
        <div className="w-full mb-2">
          <SearchControlBar
            currentTarget={currentTarget}
            onSelectTarget={handleSelectTarget}
            onRandomSelect={handleRandomSelect}
          />
        </div>

        {/* Neal.fun Style Printer Machine & Live Counter */}
        <PrinterMachine
          target={currentTarget}
          pagesPrinted={pagesPrinted}
          setPagesPrinted={setPagesPrinted}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentSpeedIndex={currentSpeedIndex}
          setCurrentSpeedIndex={setCurrentSpeedIndex}
          onOpenDownloadModal={() => setShowDownloadModal(true)}
        />
      </main>

      {/* Minimal Footer */}
      <footer className="py-6 text-center text-xs text-stone-400 space-y-1">
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setShowTechHiveModal(true);
              printerAudio.playButtonClick();
            }}
            className="hover:text-stone-700 underline underline-offset-2 transition-colors"
          >
            About the TechHive (2015) research
          </button>
          <span>·</span>
          <button
            onClick={() => {
              setShowMilestonesModal(true);
              printerAudio.playButtonClick();
            }}
            className="hover:text-stone-700 underline underline-offset-2 transition-colors"
          >
            Height Comparison
          </button>
          <span>·</span>
          <button
            onClick={() => {
              setShowReceiptModal(true);
              printerAudio.playButtonClick();
            }}
            className="hover:text-stone-700 underline underline-offset-2 transition-colors"
          >
            Thermal Receipt
          </button>
          <span>·</span>
          <a
            href="https://neal.fun/printing-money/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-stone-700 transition-colors inline-flex items-center gap-0.5"
          >
            Inspired by Neal.fun <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </footer>

      {/* Modals & Drawers */}
      {showTechHiveModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
            <TechHiveStudyModal
              onLoadPreset={handleSelectTarget}
              onClose={() => setShowTechHiveModal(false)}
            />
          </div>
        </div>
      )}

      {showReceiptModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <PrintReceiptModal
            target={currentTarget}
            pagesPrinted={pagesPrinted}
            onClose={() => setShowReceiptModal(false)}
          />
        </div>
      )}

      {showDownloadModal && (
        <DownloadAllModal
          target={currentTarget}
          pagesPrinted={pagesPrinted}
          onClose={() => setShowDownloadModal(false)}
        />
      )}

      {showMilestonesModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-4 shadow-2xl relative">
            <button
              onClick={() => setShowMilestonesModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-xs font-bold bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-full"
            >
              Close
            </button>
            <HeightMilestoneExplorer
              target={currentTarget}
              pagesPrinted={pagesPrinted}
            />
          </div>
        </div>
      )}
    </div>
  );
}
