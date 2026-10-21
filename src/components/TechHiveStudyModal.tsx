import React from 'react';
import { BookOpen, TreePine, Clock, Printer, ArrowRight, ExternalLink } from 'lucide-react';
import { INTERNET_PRESETS, InternetTarget } from '../data/internetPresets';
import { printerAudio } from '../utils/audioSynthesizer';

interface TechHiveStudyModalProps {
  onLoadPreset: (target: InternetTarget) => void;
  onClose: () => void;
}

export const TechHiveStudyModal: React.FC<TechHiveStudyModalProps> = ({
  onLoadPreset,
  onClose,
}) => {
  const techHivePreset = INTERNET_PRESETS.find((p) => p.id === 'techhive-2015-study')!;

  const handleApplyPreset = () => {
    printerAudio.playButtonClick();
    onLoadPreset(techHivePreset);
    onClose();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          The Scientific Foundation · TechHive & University of Leicester (2015)
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
          "How Much of the Amazon Would it Take to Print the Entire Internet?"
        </h2>

        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 border-y border-stone-100 py-3">
          <span className="font-semibold text-stone-800">Original Researchers:</span>
          <span>George Harwood & Evangeline Walker</span>
          <span>·</span>
          <span>University of Leicester (JIST Vol. 4)</span>
          <span>·</span>
          <span>Reported by TechHive (PCWorld) in 2015</span>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-500 mb-1">
              <Printer className="w-4 h-4 text-amber-600" />
              136 Billion Pages
            </div>
            <div className="font-bold text-stone-900 text-sm">
              The 2015 Indexed Web
            </div>
            <p className="text-xs text-stone-600 mt-1">
              Calculated using the ratio of English Wikipedia (70.8M pages) to the entire indexed web at 1.02 × 10¹² bytes.
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-500 mb-1">
              <TreePine className="w-4 h-4 text-emerald-600" />
              16 Million Trees
            </div>
            <div className="font-bold text-stone-900 text-sm">
              0.0054% of the Amazon
            </div>
            <p className="text-xs text-stone-600 mt-1">
              Based on a usable tree yielding 8,500 A4 pages. A surprisingly tiny sliver of the Amazon’s 300 billion trees!
            </p>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-500 mb-1">
              <Clock className="w-4 h-4 text-purple-600" />
              10,776 Years to Millions
            </div>
            <div className="font-bold text-stone-900 text-sm">
              Printing Duration
            </div>
            <p className="text-xs text-stone-600 mt-1">
              A standard 24 ppm laser printer running non-stop 24/7 needs ~10,776 years. Factoring in deep web & image halftones extends it to millions of years.
            </p>
          </div>
        </div>

        {/* Narrative & Deep Dive */}
        <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
          <h3 className="text-lg font-bold text-stone-900">
            The Mathematical Methodology
          </h3>
          <p>
            In 2015, two undergraduate scientists at the University of Leicester published an influential paper in the <em>Journal of Interdisciplinary Science Topics</em>. TechHive covered their surprising conclusion:
          </p>

          <blockquote className="border-l-4 border-amber-500 pl-4 py-1 italic bg-amber-50/50 rounded-r-lg text-stone-800">
            "To calculate the total number of paper sheets required, we used the English version of Wikipedia as a proxy for the web. An average Wikipedia page occupies roughly 15 printed pages in full detail. Scaling this across the 4.5 billion web pages estimated in 2015 yields approximately 136 billion sheets of paper."
          </blockquote>

          <h3 className="text-lg font-bold text-stone-900 mt-6">
            The Modern 2026 Expansion
          </h3>
          <p>
            In the decade since TechHive's report, the internet has grown by orders of magnitude. The explosion of social media comments (Reddit, X), code repositories (GitHub), video transcripts (YouTube), and AI-generated documents means the printed web in 2026 is estimated at over <strong>4.5 trillion pages</strong>.
          </p>
          <p>
            That modern paper stack wouldn’t just clear Mount Everest—it reaches <strong>450,000 kilometers</strong>, past the orbit of the Moon!
          </p>
        </div>

        {/* Action CTA */}
        <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={handleApplyPreset}
            className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-sm shadow-md transition-all"
          >
            Load TechHive 2015 Benchmark in Simulator
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 text-stone-600 hover:text-stone-900 font-semibold text-xs rounded-lg hover:bg-stone-100 transition-colors"
          >
            Back to Live Printer
          </button>
        </div>
      </div>
    </div>
  );
};
