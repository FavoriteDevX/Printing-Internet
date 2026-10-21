import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Check, Globe, Sparkles } from 'lucide-react';
import { INTERNET_PRESETS, InternetTarget } from '../data/internetPresets';
import { estimatePagesForDomain } from '../utils/printCalculator';
import { printerAudio } from '../utils/audioSynthesizer';

interface SearchControlBarProps {
  currentTarget: InternetTarget;
  onSelectTarget: (target: InternetTarget) => void;
  onRandomSelect: () => void;
}

export const SearchControlBar: React.FC<SearchControlBarProps> = ({
  currentTarget,
  onSelectTarget,
  onRandomSelect,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPresets = INTERNET_PRESETS.filter((preset) => {
    return (
      preset.name.toLowerCase().includes(query.toLowerCase()) ||
      preset.domain.toLowerCase().includes(query.toLowerCase())
    );
  });

  const isCustomDomain =
    query.trim().length > 2 &&
    !INTERNET_PRESETS.some(
      (p) =>
        p.domain.toLowerCase() === query.trim().toLowerCase() ||
        p.name.toLowerCase() === query.trim().toLowerCase()
    );

  const customEstimate = isCustomDomain ? estimatePagesForDomain(query) : null;

  const handleSelectPreset = (preset: InternetTarget) => {
    printerAudio.playButtonClick();
    onSelectTarget(preset);
    setQuery('');
    setIsOpen(false);
  };

  const handleSelectCustom = () => {
    if (!customEstimate) return;
    printerAudio.playButtonClick();
    const customTarget: InternetTarget = {
      id: `custom-${customEstimate.domain}`,
      name: customEstimate.displayName,
      domain: customEstimate.domain,
      category: 'web-scale',
      pages: customEstimate.estimatedPages,
      tagline: `Custom platform (${customEstimate.category})`,
      description: customEstimate.description,
      sourceAttribution: 'Algorithmic Domain Footprint Index & Web Crawl Analysis',
      badge: 'Custom Site',
      sampleSnippets: customEstimate.sampleHeadlines.map((headline, idx) => ({
        title: headline,
        section: `Public Web Archive / Page ${idx + 1}`,
        content: `Transcribed text and HTML node elements captured from ${customEstimate.domain}. Page index ${idx * 480 + 1} of ${customEstimate.estimatedPages.toLocaleString()} estimated printable sheets.`,
      })),
    };
    onSelectTarget(customTarget);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto" ref={dropdownRef}>
      {/* Neal.fun style clean selector button / input */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white hover:bg-stone-50 border border-stone-300 rounded-full py-2.5 px-5 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-stone-400 group"
        >
          <div className="flex items-center gap-2.5 truncate">
            <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider">
              Print:
            </span>
            <span className="font-bold text-stone-900 text-sm sm:text-base truncate">
              {currentTarget.name}
            </span>
            <span className="text-stone-400 text-xs font-mono hidden sm:inline">
              ({currentTarget.pages > 1_000_000_000
                ? `${(currentTarget.pages / 1_000_000_000).toFixed(1)}B pages`
                : `${(currentTarget.pages / 1_000_000).toFixed(1)}M pages`})
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-stone-400 group-hover:text-stone-700 transition-colors">
            <span className="text-xs font-semibold hidden sm:inline">Change</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        <button
          onClick={() => {
            onRandomSelect();
            printerAudio.playButtonClick();
          }}
          className="p-2.5 bg-white hover:bg-stone-100 text-stone-600 hover:text-stone-900 rounded-full border border-stone-300 shadow-sm shrink-0 transition-colors"
          title="Pick a random platform"
          aria-label="Pick a random platform"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
        </button>
      </div>

      {/* Clean Dropdown Modal */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Quick Search Input */}
          <div className="p-3 border-b border-stone-100 flex items-center gap-2 bg-stone-50">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search or enter any URL (e.g., nytimes.com)..."
              className="w-full bg-transparent text-sm text-stone-900 placeholder:text-stone-400 outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs text-stone-400 hover:text-stone-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Custom site option if user typed a new URL */}
          {isCustomDomain && customEstimate && (
            <div className="p-2 bg-amber-50/80 border-b border-amber-200">
              <button
                onClick={handleSelectCustom}
                className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-amber-100/60 border border-amber-300 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-600" />
                  <div>
                    <div className="text-xs font-bold text-stone-900">
                      Print "{customEstimate.displayName}" ({customEstimate.domain})
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Estimated ~{customEstimate.estimatedPages.toLocaleString()} pages · {customEstimate.category}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-700">Calculate</span>
              </button>
            </div>
          )}

          {/* Presets List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-stone-100 p-1">
            {filteredPresets.map((preset) => {
              const isSelected = currentTarget.id === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'hover:bg-stone-100 text-stone-800'
                  }`}
                >
                  <div className="truncate mr-2">
                    <div className="font-bold text-sm truncate">{preset.name}</div>
                    <div className={`text-[11px] truncate ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                      {preset.domain}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-mono font-bold">
                      {preset.pages > 1_000_000_000
                        ? `${(preset.pages / 1_000_000_000).toFixed(1)}B pages`
                        : `${(preset.pages / 1_000_000).toFixed(1)}M pages`}
                    </div>
                    {isSelected && <div className="text-[10px] text-amber-400 font-bold">Selected</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
