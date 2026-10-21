/**
 * Pure calculation logic for "Printing the Internet"
 * Based on the University of Leicester / TechHive 2015 study:
 * - A standard sheet of A4 paper (80 g/m²) is approximately 0.1 mm (0.0001 m) thick and weighs 5 grams.
 * - Standard tree produces ~8,500 sheets of A4 paper (double-sided or single-sided consideration).
 * - Standard office laser ink cartridge prints ~500 to 1,000 pages of text.
 * - 1 standard ream = 500 sheets.
 * - 1 metric ton of paper = 200,000 sheets (1,000 kg / 0.005 kg).
 * - Manufacturing 500 sheets consumes ~5 to 10 liters of water.
 */

export interface PrintMetrics {
  pages: number;
  heightMeters: number;
  heightKm: number;
  weightKg: number;
  weightTons: number;
  treesNeeded: number;
  inkCartridges: number;
  waterLiters: number;
  reams: number;
  // Printing time calculations
  minutesToPrintAtSpeed: (ppm: number) => number;
  timeFormatted: (ppm: number) => FormattedTime;
}

export interface FormattedTime {
  totalMinutes: number;
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  humanLabel: string;
}

export interface Milestone {
  id: string;
  name: string;
  heightMeters: number;
  description: string;
  category: 'object' | 'nature' | 'architecture' | 'space';
}

export const MILESTONES: Milestone[] = [
  { id: 'coffee-cup', name: 'Coffee Mug', heightMeters: 0.1, description: '1,000 sheets (2 reams)', category: 'object' },
  { id: 'desk', name: 'Office Desk', heightMeters: 0.75, description: '7,500 sheets', category: 'object' },
  { id: 'human', name: 'Average Human', heightMeters: 1.75, description: '17,500 sheets', category: 'nature' },
  { id: 'giraffe', name: 'Adult Giraffe', heightMeters: 5.5, description: '55,000 sheets', category: 'nature' },
  { id: 'oak-tree', name: 'Giant Red Oak', heightMeters: 25, description: '250,000 sheets', category: 'nature' },
  { id: 'statue-liberty', name: 'Statue of Liberty', heightMeters: 93, description: '930,000 sheets', category: 'architecture' },
  { id: 'eiffel-tower', name: 'Eiffel Tower', heightMeters: 330, description: '3.3 million sheets', category: 'architecture' },
  { id: 'burj-khalifa', name: 'Burj Khalifa', heightMeters: 828, description: '8.28 million sheets', category: 'architecture' },
  { id: 'mount-everest', name: 'Mount Everest', heightMeters: 8848, description: '88.5 million sheets (nearly Wikipedia EN!)', category: 'nature' },
  { id: 'mariana-trench', name: 'Mariana Trench Depth', heightMeters: 11034, description: '110 million sheets', category: 'nature' },
  { id: 'stratosphere', name: 'Stratosphere Top', heightMeters: 50000, description: '500 million sheets', category: 'space' },
  { id: 'karman-line', name: 'Edge of Space (Kármán Line)', heightMeters: 100000, description: '1 billion sheets', category: 'space' },
  { id: 'iss-orbit', name: 'ISS Orbit Altitude', heightMeters: 408000, description: '4.08 billion sheets', category: 'space' },
  { id: 'earth-diameter', name: 'Earth Diameter', heightMeters: 12742000, description: '127.4 billion sheets (TechHive 2015 whole Web)', category: 'space' },
  { id: 'geostationary-orbit', name: 'Geostationary Orbit', heightMeters: 35786000, description: '357.8 billion sheets', category: 'space' },
  { id: 'moon-distance', name: 'Distance to the Moon', heightMeters: 384400000, description: '3.84 trillion sheets (The Modern 2026 Web!)', category: 'space' },
];

/**
 * Calculates physical and ecological footprint from page count.
 */
export function calculatePrintMetrics(pages: number): PrintMetrics {
  const safePages = Math.max(1, pages);
  // 0.1 mm per sheet = 0.0001 meters
  const heightMeters = safePages * 0.0001;
  const heightKm = heightMeters / 1000;
  // 5 grams per sheet = 0.005 kg
  const weightKg = safePages * 0.005;
  const weightTons = weightKg / 1000;
  // 8,500 sheets per tree
  const treesNeeded = Math.ceil(safePages / 8500);
  // 500 pages per cartridge
  const inkCartridges = Math.ceil(safePages / 500);
  // 10 liters of water per 500 sheets (0.02 L/sheet)
  const waterLiters = safePages * 0.02;
  // 500 sheets per ream
  const reams = Math.ceil(safePages / 500);

  return {
    pages: safePages,
    heightMeters,
    heightKm,
    weightKg,
    weightTons,
    treesNeeded,
    inkCartridges,
    waterLiters,
    reams,
    minutesToPrintAtSpeed: (ppm: number) => safePages / Math.max(1, ppm),
    timeFormatted: (ppm: number) => formatTimeDuration(safePages / Math.max(1, ppm)),
  };
}

/**
 * Formats total duration in minutes into structured years, days, hours, minutes, seconds.
 */
export function formatTimeDuration(totalMinutes: number): FormattedTime {
  if (totalMinutes <= 0 || !Number.isFinite(totalMinutes)) {
    return {
      totalMinutes: 0,
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      humanLabel: 'Instant',
    };
  }

  const MINUTES_IN_HOUR = 60;
  const MINUTES_IN_DAY = 24 * MINUTES_IN_HOUR; // 1440
  const MINUTES_IN_YEAR = 365.25 * MINUTES_IN_DAY; // 525960

  const years = Math.floor(totalMinutes / MINUTES_IN_YEAR);
  let rem = totalMinutes % MINUTES_IN_YEAR;

  const days = Math.floor(rem / MINUTES_IN_DAY);
  rem = rem % MINUTES_IN_DAY;

  const hours = Math.floor(rem / MINUTES_IN_HOUR);
  rem = rem % MINUTES_IN_HOUR;

  const minutes = Math.floor(rem);
  const seconds = Math.floor((rem - minutes) * 60);

  let humanLabel = '';
  if (years > 1_000_000) {
    humanLabel = `${(years / 1_000_000).toLocaleString('en-US', { maximumFractionDigits: 1 })} Million Years`;
  } else if (years > 1_000) {
    humanLabel = `${(years / 1_000).toLocaleString('en-US', { maximumFractionDigits: 1 })} Millennia`;
  } else if (years > 0) {
    humanLabel = `${years.toLocaleString('en-US')} yr${years > 1 ? 's' : ''} ${days} d`;
  } else if (days > 0) {
    humanLabel = `${days} d ${hours} h`;
  } else if (hours > 0) {
    humanLabel = `${hours} h ${minutes} m`;
  } else if (minutes > 0) {
    humanLabel = `${minutes} min ${seconds} s`;
  } else {
    humanLabel = `${seconds} seconds`;
  }

  return {
    totalMinutes,
    years,
    days,
    hours,
    minutes,
    seconds,
    humanLabel,
  };
}

/**
 * Finds the closest or achieved milestone based on height in meters.
 */
export function getMilestoneComparison(heightMeters: number): {
  current: Milestone;
  next: Milestone | null;
  ratio: number;
} {
  const sorted = [...MILESTONES].sort((a, b) => a.heightMeters - b.heightMeters);
  
  if (heightMeters < sorted[0].heightMeters) {
    return {
      current: sorted[0],
      next: sorted[1] || null,
      ratio: heightMeters / sorted[0].heightMeters,
    };
  }

  let current = sorted[0];
  let next: Milestone | null = null;

  for (let i = 0; i < sorted.length; i++) {
    if (heightMeters >= sorted[i].heightMeters) {
      current = sorted[i];
      next = sorted[i + 1] || null;
    } else {
      break;
    }
  }

  const ratio = next 
    ? (heightMeters - current.heightMeters) / (next.heightMeters - current.heightMeters)
    : 1;

  return { current, next, ratio: Math.min(1, Math.max(0, ratio)) };
}

/**
 * Algorithmic domain estimator for any user-typed URL or domain.
 * Generates deterministic realistic numbers using domain hash + pattern heuristics.
 */
export function estimatePagesForDomain(rawInput: string): {
  domain: string;
  displayName: string;
  estimatedPages: number;
  category: string;
  description: string;
  sampleHeadlines: string[];
} {
  const clean = rawInput.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/.*$/, '');
  const baseName = clean.split('.')[0] || 'custom-site';

  // Deterministic seed from string characters
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);

  // Heuristic categorization based on TLD and keywords
  let multiplier = 50_000;
  let category = 'Website';
  let desc = `Estimated public pages, archive articles, subdirectories, and media transcripts on ${clean}.`;

  if (clean.includes('gov') || clean.includes('mil')) {
    multiplier = 1_800_000;
    category = 'Government Portal';
    desc = `Official archives, public bills, census data, administrative documents, and press releases.`;
  } else if (clean.includes('edu') || clean.includes('ac.') || clean.includes('univ')) {
    multiplier = 950_000;
    category = 'Academic Institution';
    desc = `Research repositories, faculty publications, course syllabi, library databases, and student portals.`;
  } else if (clean.includes('news') || clean.includes('times') || clean.includes('post') || clean.includes('tribune') || clean.includes('journal') || clean.includes('globo') || clean.includes('bbc')) {
    multiplier = 4_500_000;
    category = 'News & Journalism';
    desc = `Daily breaking articles, historical archives, opinion columns, photo essays, and syndicated reports.`;
  } else if (clean.includes('shop') || clean.includes('store') || clean.includes('mall') || clean.includes('market') || clean.includes('buy')) {
    multiplier = 2_200_000;
    category = 'E-Commerce Marketplace';
    desc = `Product listings, customer verified reviews, order specifications, seller storefronts, and category filters.`;
  } else if (clean.includes('wiki')) {
    multiplier = 8_000_000;
    category = 'Knowledge Base';
    desc = `Peer-curated reference articles, talk pages, revision histories, and multilingual citations.`;
  } else if (clean.includes('blog') || clean.includes('medium') || clean.includes('substack')) {
    multiplier = 350_000;
    category = 'Publishing / Blogs';
    desc = `Longform essays, newsletters, author archives, comments, and subscriber discussions.`;
  } else if (clean.includes('io') || clean.includes('dev') || clean.includes('tech') || clean.includes('app')) {
    multiplier = 180_000;
    category = 'Software & Tech Platform';
    desc = `API documentation, developer changelogs, forum threads, release notes, and product manuals.`;
  }

  // Calculate estimated page count between 12,000 and 250,000,000 based on hash
  const seedFactor = (positiveHash % 89) / 89; // 0..1
  const calculated = Math.round(15_000 + (seedFactor * multiplier * 2.5));

  // Capitalize name
  const displayName = baseName.charAt(0).toUpperCase() + baseName.slice(1);

  const sampleHeadlines = [
    `Welcome to ${displayName} - Official Archive Edition Vol. 1`,
    `Index Page 4,092: Recent Community Updates and Discussion Logs`,
    `Technical Documentation: API Architecture and Server Protocols`,
    `Historical Retrospective: Ten Years of Digital Publishing on ${clean}`,
    `User Directory: Public Profile Postings and User Forum Archive`,
    `Legal & Privacy Policies, Terms of Service, and Compliance Records`,
    `Media Catalog: Transcripts, Metadata, and High-Resolution Image Halftones`
  ];

  return {
    domain: clean,
    displayName,
    estimatedPages: calculated,
    category,
    description: desc,
    sampleHeadlines,
  };
}
