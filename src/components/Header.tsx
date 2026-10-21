import React from 'react';
import { Volume2, VolumeX, Sparkles, Printer } from 'lucide-react';
import { printerAudio } from '../utils/audioSynthesizer';

interface HeaderProps {
  activeTab: 'printer' | 'milestones' | 'techhive' | 'receipt';
  setActiveTab: (tab: 'printer' | 'milestones' | 'techhive' | 'receipt') => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onRandomSelect: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  onRandomSelect,
}) => {
  const toggleAudio = () => {
    const next = !isMuted;
    setIsMuted(next);
    printerAudio.setMuted(next);
    if (!next) {
      printerAudio.playButtonClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-stone-900 text-white flex items-center justify-center shadow-sm">
            <Printer className="w-5 h-5 text-amber-400" />
          </div>
          <button
            onClick={() => {
              setActiveTab('printer');
              printerAudio.playButtonClick();
            }}
            className="text-left group"
          >
            <span className="text-lg font-extrabold tracking-tight text-stone-900 group-hover:text-amber-600 transition-colors whitespace-nowrap">
              Printing the Internet
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-stone-600">
          <button
            onClick={() => {
              setActiveTab('printer');
              printerAudio.playButtonClick();
            }}
            className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
              activeTab === 'printer'
                ? 'text-stone-900 border-amber-500 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Live Printer
          </button>
          <button
            onClick={() => {
              setActiveTab('milestones');
              printerAudio.playButtonClick();
            }}
            className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
              activeTab === 'milestones'
                ? 'text-stone-900 border-amber-500 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Height Comparison
          </button>
          <button
            onClick={() => {
              setActiveTab('techhive');
              printerAudio.playButtonClick();
            }}
            className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
              activeTab === 'techhive'
                ? 'text-stone-900 border-amber-500 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            TechHive 2015 Study
          </button>
          <button
            onClick={() => {
              setActiveTab('receipt');
              printerAudio.playButtonClick();
            }}
            className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
              activeTab === 'receipt'
                ? 'text-stone-900 border-amber-500 font-bold'
                : 'border-transparent hover:text-stone-900'
            }`}
          >
            Print Receipt
          </button>
        </nav>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleAudio}
            aria-label={isMuted ? 'Unmute printer mechanical audio' : 'Mute printer mechanical audio'}
            className="p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
            title={isMuted ? 'Unmute sounds' : 'Mute mechanical sounds'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-stone-400" /> : <Volume2 className="w-5 h-5 text-amber-600" />}
          </button>

          <button
            onClick={() => {
              onRandomSelect();
              printerAudio.playButtonClick();
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Random Site
          </button>
        </div>
      </div>

      {/* Mobile Tab Row */}
      <div className="flex md:hidden items-center justify-around border-t border-stone-200 bg-stone-50/80 px-2 py-1.5 text-xs font-semibold text-stone-600 overflow-x-auto">
        <button
          onClick={() => {
            setActiveTab('printer');
            printerAudio.playButtonClick();
          }}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'printer' ? 'bg-stone-900 text-white' : 'hover:text-stone-900'
          }`}
        >
          Live Printer
        </button>
        <button
          onClick={() => {
            setActiveTab('milestones');
            printerAudio.playButtonClick();
          }}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'milestones' ? 'bg-stone-900 text-white' : 'hover:text-stone-900'
          }`}
        >
          Height Scale
        </button>
        <button
          onClick={() => {
            setActiveTab('techhive');
            printerAudio.playButtonClick();
          }}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'techhive' ? 'bg-stone-900 text-white' : 'hover:text-stone-900'
          }`}
        >
          TechHive 2015
        </button>
        <button
          onClick={() => {
            setActiveTab('receipt');
            printerAudio.playButtonClick();
          }}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${
            activeTab === 'receipt' ? 'bg-stone-900 text-white' : 'hover:text-stone-900'
          }`}
        >
          Receipt
        </button>
      </div>
    </header>
  );
};
