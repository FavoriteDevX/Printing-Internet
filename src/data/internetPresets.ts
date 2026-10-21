export interface InternetTarget {
  id: string;
  name: string;
  domain: string;
  category: 'web-scale' | 'encyclopedia' | 'social' | 'code' | 'news' | 'culture';
  pages: number;
  tagline: string;
  description: string;
  sourceAttribution: string;
  badge: string;
  screenshotUrl?: string;
  sampleSnippets: Array<{
    title: string;
    section: string;
    content: string;
  }>;
}

export const INTERNET_PRESETS: InternetTarget[] = [
  {
    id: 'the-entire-web-2026',
    name: 'The Entire World Wide Web (2026)',
    domain: 'internet.2026',
    category: 'web-scale',
    pages: 4_500_000_000_000,
    tagline: 'All ~50+ billion indexed pages, public forums, feeds, and articles',
    description: 'Estimated total volume of indexed text, blogs, documentation, social threads, and media transcripts across the modern web in 2026. Stretched out, this paper stack extends 450,000 kilometers—beyond the Moon!',
    sourceAttribution: 'WorldWideWebSize & Data Center Telemetry 2026 projections',
    badge: 'Total Web',
    screenshotUrl: '/src/assets/images/page_techhive_screenshot_1792604010792.jpg',
    sampleSnippets: [
      {
        title: 'Universal Web Index: Volume 14,892,100',
        section: 'HTTP Archive / Common Crawl Index',
        content: '<!DOCTYPE html><html lang="en"><head><title>Global Network Manifest</title></head><body><h1>Documenting the sum of human digital knowledge...</h1>'
      },
      {
        title: 'Network Node 88,419: Distributed Server Logs',
        section: 'Global Backbone Routing Records',
        content: 'BGP Route Table: 940,000 active prefixes routed across 12,000 autonomous systems worldwide. Total active connections: 5.4 billion humans.'
      },
      {
        title: 'Open Knowledge Exchange: Forum Thread 941,200',
        section: 'Decentralized Web Archive',
        content: 'Question: "Will humanity ever run out of digital storage before we run out of physical atoms?" Answer: "At current exponential print rates, the stack reaches orbit before 2030."'
      }
    ]
  },
  {
    id: 'techhive-2015-study',
    name: 'TechHive / Leicester 2015 Benchmark',
    domain: 'techhive.com/study-2015',
    category: 'web-scale',
    pages: 136_000_000_000,
    tagline: 'The historic calculation that inspired this simulator',
    description: 'In 2015, researchers George Harwood and Evangeline Walker at the University of Leicester published "How Much of the Amazon Would it Take to Print the Internet?", featured by TechHive and the BBC. They calculated 136 billion pages requiring ~16 million trees (0.0054% of the Amazon rainforest) and over 10,000 years on a continuous office printer.',
    sourceAttribution: 'Journal of Interdisciplinary Science Topics (Vol 4, 2015) & TechHive',
    badge: 'Historical Study',
    screenshotUrl: '/src/assets/images/page_techhive_screenshot_1792604010792.jpg',
    sampleSnippets: [
      {
        title: 'TechHive Special Report (2015)',
        section: 'Computing & Science News',
        content: 'How much of the Amazon would it take to print the Internet? University of Leicester students calculated that printing out the World Wide Web would swallow 0.0054 percent of the Amazon rainforest.'
      },
      {
        title: 'Leicester University JIST Research Paper #42',
        section: 'Computational Ecology Methodology',
        content: 'Using English Wikipedia (70,859,840 pages) as a baseline against the indexed web (1.02 × 10^12 bytes), a single office printer operating 24/7 at 24 ppm would require 10,776 continuous years.'
      }
    ]
  },
  {
    id: 'wikipedia-en',
    name: 'English Wikipedia',
    domain: 'en.wikipedia.org',
    category: 'encyclopedia',
    pages: 78_500_000,
    tagline: '6.9+ million articles of human knowledge and citations',
    description: 'If you bound all English Wikipedia articles into encyclopedic volumes without discussion pages, it would fill approximately 78.5 million standard A4 pages—creating a stack 7.85 km tall, nearly matching the summit of Mount Everest.',
    sourceAttribution: 'Wikimedia Foundation Database Dumps & Rob Matthews Print Wikipedia project',
    badge: 'Encyclopedia',
    screenshotUrl: '/src/assets/images/page_wikipedia_screenshot_1792604009457.jpg',
    sampleSnippets: [
      {
        title: 'Wikipedia: Earth',
        section: 'Geography & Biosphere',
        content: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. This is enabled by Earth being a water world, the only one in the Solar System sustaining liquid surface water.'
      },
      {
        title: 'Wikipedia: Printing Press',
        section: 'Gutenberg Revolution',
        content: 'A printing press is a mechanical device for applying pressure to an inked surface resting upon a print medium, thereby transferring the ink. Invented in the Holy Roman Empire by Johannes Gutenberg around 1440.'
      },
      {
        title: 'Wikipedia: World Wide Web',
        section: 'History of Information Systems',
        content: 'The World Wide Web (WWW or simply the Web) is an information system where documents and other web resources are identified by URLs, interlinked by hypertext, and accessible via the Internet.'
      }
    ]
  },
  {
    id: 'reddit',
    name: 'Reddit (All Posts & Comments)',
    domain: 'reddit.com',
    category: 'social',
    pages: 18_500_000_000,
    tagline: 'Over 1.8 billion threads, discussions, and upvoted comments',
    description: 'All public subreddit submissions, AskMeAnything transcripts, gaming discussions, and comment chains since 2005. Stacked up, it reaches 1,850 kilometers into space—over four times the orbital altitude of the International Space Station.',
    sourceAttribution: 'Pushshift Archives & Reddit Transparency Reports',
    badge: 'Community',
    screenshotUrl: '/src/assets/images/page_reddit_screenshot_1792604010696.jpg',
    sampleSnippets: [
      {
        title: 'r/AskReddit: What is the most mind-blowing fact about the internet?',
        section: 'Top All-Time Discussion (142k upvotes)',
        content: '[u/paper_stack]: If you printed all the comments ever written here, you would need a fleet of 50,000 laser printers running for three centuries. [u/curious_coder]: And 80% would be memes.'
      },
      {
        title: 'r/science: New study estimates volume of digital human discourse',
        section: 'Peer-Reviewed Commentary',
        content: 'Subreddit post #8491: Commentators discuss how digital archiving compares to the ancient Great Library of Alexandria. "We produce ten Libraries of Alexandria every minute."'
      }
    ]
  },
  {
    id: 'github',
    name: 'GitHub (Public Repositories)',
    domain: 'github.com',
    category: 'code',
    pages: 65_000_000_000,
    tagline: 'Public open-source source code, commits, and issue trackers',
    description: 'Billions of lines of JavaScript, Python, Rust, C++, HTML, and markdown across millions of open-source projects. Printing it requires 7.6 million trees and forms a paper tower 6,500 km tall.',
    sourceAttribution: 'GitHub Innovation Graph & Octoverse Metrics',
    badge: 'Open Source',
    screenshotUrl: '/src/assets/images/page_github_screenshot_1792604010680.jpg',
    sampleSnippets: [
      {
        title: 'torvalds/linux: kernel/sched/core.c',
        section: 'Linux Kernel Monolithic Source',
        content: '/* SPDX-License-Identifier: GPL-2.0 */\n#include <linux/sched.h>\n/* The main scheduler dispatch queue loop for CFS (Completely Fair Scheduler) */\nvoid schedule(void) { ... }'
      },
      {
        title: 'facebook/react: packages/react/src/React.js',
        section: 'UI Component Architecture',
        content: 'export { useState, useEffect, useMemo, useCallback } from "./ReactHooks";\nexport { createElement, cloneElement } from "./ReactElement";'
      }
    ]
  },
  {
    id: 'facebook',
    name: 'Facebook (News Feed & Groups)',
    domain: 'facebook.com',
    category: 'social',
    pages: 42_000_000_000,
    tagline: 'Billions of public status updates, photos, group discussions, and community posts',
    description: 'All public status posts, page updates, community group discussions, and viral shares posted on Facebook since 2004. Stack height: 4,200 kilometers.',
    sourceAttribution: 'Meta Public Transparency Reports & Global Feed Metrics',
    badge: 'Social Network',
    screenshotUrl: '/src/assets/images/page_facebook_screenshot_1792604324722.jpg',
    sampleSnippets: [
      {
        title: 'Sarah Johnson: Feeling happy in the mountains',
        section: 'News Feed · Status Update',
        content: 'So incredibly grateful for the beautiful weather today! Perfect day for a hike enjoying the sunshine and fresh air with amazing views. 142 Likes · 36 Comments.'
      },
      {
        title: 'David Chen: Community Group Update',
        section: 'Public Group Thread',
        content: 'Beautiful! Where is this? Alex Smith: Looks amazing! Emily Davis: Love this view.'
      }
    ]
  },
  {
    id: 'youtube-transcripts',
    name: 'YouTube (Spoken Transcripts)',
    domain: 'youtube.com',
    category: 'culture',
    pages: 45_000_000_000,
    tagline: 'Every automated and creator closed-caption transcript',
    description: 'All spoken words across hundreds of millions of public videos, lectures, documentaries, tutorials, and podcasts transcribed into continuous double-spaced lines.',
    sourceAttribution: 'YouTube Public Statistics & Caption Metrics',
    badge: 'Audio/Video',
    screenshotUrl: '/src/assets/images/page_youtube_screenshot_1792604325350.jpg',
    sampleSnippets: [
      {
        title: 'Transcript: 3Blue1Brown - The Essence of Calculus',
        section: 'Educational Lecture #01',
        content: '[00:01:14] Let’s start with a circle of radius r. Why is the area pi times r squared? Let’s unroll concentric rings into a right triangle of base 2 pi r and height r...'
      },
      {
        title: 'Transcript: Computerphile - How The Internet Actually Works',
        section: 'Computer Science Explained',
        content: '[00:03:45] When you hit Enter in your browser, packets don’t care what is written on them. They just bounce through routers using IP addresses until they arrive at port 80 or 443.'
      }
    ]
  },
  {
    id: 'twitter-x',
    name: 'Twitter / X (All Public Tweets)',
    domain: 'x.com',
    category: 'social',
    pages: 28_000_000_000,
    tagline: 'All public tweets and replies posted since March 2006',
    description: 'Over 1 trillion short-form messages, breaking news bulletins, jokes, and arguments sent since Jack Dorsey typed "just setting up my twttr" in 2006. Stack height: 2,800 kilometers.',
    sourceAttribution: 'Historical Tweet Volume & Firehose Estimates',
    badge: 'Microblog',
    screenshotUrl: '/src/assets/images/page_twitter_screenshot_1792604325577.jpg',
    sampleSnippets: [
      {
        title: 'Tweet ID #20: @jack (21 Mar 2006)',
        section: 'Origin of Microblogging',
        content: 'just setting up my twttr · 12:50 PM · 24 Retweets · 182k Likes'
      },
      {
        title: 'Tweet ID #14892019482: Breaking News Dispatch',
        section: 'Global Real-Time Wire',
        content: 'Scientists announce discovery of gravitational waves from colliding neutron stars. "A new window onto the cosmos."'
      }
    ]
  },
  {
    id: 'internet-archive',
    name: 'Internet Archive (Wayback Machine)',
    domain: 'archive.org',
    category: 'web-scale',
    pages: 850_000_000_000,
    tagline: '860+ billion historical web snapshots since 1996',
    description: 'The monumental digital memory of humankind, preserving obsolete homepages, Geocities sites, defunct forums, and decades of evolving web design. Stacking this would stretch 85,000 km into outer space.',
    sourceAttribution: 'Internet Archive Wayback Machine Official Counter',
    badge: 'Historical Web',
    screenshotUrl: '/src/assets/images/page_techhive_screenshot_1792604010792.jpg',
    sampleSnippets: [
      {
        title: 'Wayback Snapshot: Yahoo! Homepage (October 17, 1996)',
        section: 'Early Web Directory',
        content: 'Yahoo! What’s New · Cool Sites · Today’s News. Categories: Arts & Humanities, Business & Economy, Computers & Internet, Education, Entertainment, Government.'
      },
      {
        title: 'Wayback Snapshot: Space Jam Official Website (1996)',
        section: 'Vintage Warner Bros Architecture',
        content: '<center><table border="0"><tr><td><font face="Arial">WELCOME TO SPACE JAM. Click here for the planetary soundtrack and stellar screensavers!</font></td></tr></table></center>'
      }
    ]
  },
  {
    id: 'stack-overflow',
    name: 'Stack Overflow (All Q&As)',
    domain: 'stackoverflow.com',
    category: 'code',
    pages: 320_000_000,
    tagline: '23+ million programming questions and 35+ million verified answers',
    description: 'The entire repository of solutions that powered modern software development, from "How to exit Vim" to complex distributed consensus debugging. Stack height: 32 kilometers.',
    sourceAttribution: 'Stack Exchange Data Dump & API',
    badge: 'Q&A',
    screenshotUrl: '/src/assets/images/page_stackoverflow_screenshot_1792604325026.jpg',
    sampleSnippets: [
      {
        title: 'Question #11227809: Why is processing a sorted array faster than unsorted?',
        section: 'C++ Branch Prediction (34k upvotes)',
        content: 'Answer by Mysticial: You are a victim of branch prediction fail! Consider a railroad crossing. If the direction alternates randomly, the operator must wait and slow down the train.'
      },
      {
        title: 'Question #184618: How do I exit the Vim editor?',
        section: 'Most Viewed Lifesaver (5.4M views)',
        content: 'Press Esc to ensure you are in normal mode, then type :q! and press Enter to quit without saving changes.'
      }
    ]
  },
  {
    id: 'arxiv',
    name: 'ArXiv (All Scientific Papers)',
    domain: 'arxiv.org',
    category: 'encyclopedia',
    pages: 48_000_000,
    tagline: '2.4+ million physics, mathematics, CS, and AI preprints',
    description: 'Every foundational paper from the breakthrough of Deep Learning (AlexNet, Transformers) to the Poincaré conjecture solution by Grigori Perelman. Stack height: 4.8 km.',
    sourceAttribution: 'Cornell University ArXiv Open Access Repository',
    badge: 'Science',
    sampleSnippets: [
      {
        title: 'arXiv:1706.03762: Attention Is All You Need',
        section: 'Vaswani et al. (Google Brain)',
        content: 'Abstract: The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose the Transformer, based solely on attention mechanisms...'
      },
      {
        title: 'arXiv:math/0211159: The Entropy Formula for the Ricci Flow',
        section: 'Grigori Perelman (Steklov Institute)',
        content: 'We present a monotonic functional for the Ricci flow on Riemannian manifolds, leading to a proof of Thurston’s Geometrization Conjecture and Poincaré’s Conjecture.'
      }
    ]
  },
  {
    id: 'us-library-of-congress',
    name: 'Library of Congress Digital Catalog',
    domain: 'loc.gov',
    category: 'culture',
    pages: 190_000_000,
    tagline: 'Digitized historic maps, manuscripts, audio, and copyright archives',
    description: 'The national library of the United States and the largest library in human history in printed equivalent. Stack height: 19 kilometers.',
    sourceAttribution: 'Library of Congress Digital Strategy Reports',
    badge: 'National Archive',
    sampleSnippets: [
      {
        title: 'Declaration of Independence (1776 Digitized Manuscript)',
        section: 'Founding Documents Collection',
        content: 'When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another...'
      }
    ]
  },
  {
    id: 'neal-fun',
    name: 'Neal.fun (Interactive Experiments)',
    domain: 'neal.fun',
    category: 'culture',
    pages: 1_850,
    tagline: 'Printing Money, The Deep Sea, Asteroid Launcher, and Wonders',
    description: 'Neal Agarwal’s celebrated collection of delight-inducing interactive web toys, simulations, and data visualizations. Printing all of it takes less than 2 hours on an office printer!',
    sourceAttribution: 'Neal Agarwal (Neal.fun) Website Index',
    badge: 'Inspiration',
    sampleSnippets: [
      {
        title: 'Neal.fun: Printing Money',
        section: 'Reference Inspiration',
        content: 'Watch cash print in real-time as Elon Musk, Jeff Bezos, and national economies make money every second.'
      },
      {
        title: 'Neal.fun: The Deep Sea',
        section: 'Oceanic Depth Visualization',
        content: 'Scroll down through the epipelagic, mesopelagic, bathypelagic, and Mariana trench zones to discover sea life at extreme depths.'
      }
    ]
  }
];

export const PRINTER_SPEED_PRESETS = [
  { id: 'home', name: 'Home Inkjet', ppm: 15, description: '15 pages/min · Cheap cartridge, occasional jams' },
  { id: 'office', name: 'Office Laser', ppm: 60, description: '60 pages/min · Reliable black-and-white workhorse' },
  { id: 'commercial', name: 'Continuous Press', ppm: 600, description: '600 pages/min · Industrial roll-fed print house' },
  { id: 'hyperspeed', name: 'High-Speed Web Press', ppm: 12_000, description: '12,000 pages/min · Newspaper rotogravure array' },
  { id: 'quantum', name: 'Quantum Nanoprinter', ppm: 1_000_000, description: '1,000,000 pages/min · Molecular ink hyper-emitter' },
];
