# 🖨️ Printing the Internet

An interactive, real-time web simulation calculating what it would take to print the entire Internet, specific platforms, or any website into physical paper. Inspired by **[Neal.fun's Printing Money](https://neal.fun/printing-money/)** and grounded in the famous **2015 TechHive / University of Leicester study** (*"How Much of the Amazon Would it Take to Print the Internet?"*).

![Printing the Internet Preview](https://raw.githubusercontent.com/adelli/printing-the-internet/main/public/preview.png)

---

## 🌟 Features

- **🔍 Search Any Platform or URL**:
  - Search from curated benchmarks: *The Entire Web (2026)*, *TechHive 2015 Study*, *English Wikipedia*, *Reddit*, *GitHub*, *YouTube Transcripts*, *Twitter / X*, *Stack Overflow*, *ArXiv*, *Library of Congress*, *Neal.fun*, and more.
  - Or type **any custom URL** (e.g. `globo.com`, `nytimes.com`, `medium.com`, `yourblog.dev`): an algorithmic domain estimator calculates page volume, text density, reams, and sample printed headlines.

- **🖨️ Real-Time Neal.fun Style Printing Animation**:
  - Mechanical web press machine with continuous roller feeding, status LEDs, and animated paper sheet ejection.
  - Physical paper stack that visibly grows in real time beneath the output tray.
  - Live printed sheet preview rendering authentic headlines, volume numbers, and timestamps.
  - Multi-speed selector: Home Inkjet (15 ppm), Office Laser (60 ppm), Commercial Continuous Press (600 ppm), High-Speed Web Press (12,000 ppm), and Quantum Nanoprinter (1,000,000 ppm).

- **⏱️ Real-Time Printing Duration & Odometer**:
  - Live breakdown of total time required: *Years, Days, Hours, Minutes, Seconds*.
  - For the entire web: calculates the millions of years and millennia required on standard hardware!

- **🌲 Ecological & Material Footprint**:
  - Number of trees required (based on 8,500 sheets of A4 paper per mature tree).
  - Standard laser ink cartridges consumed (500 pages/unit).
  - Paper weight in metric tons and kilograms.
  - Water consumed in pulp & paper processing.

- **🚀 Cosmic Height Landmark Explorer**:
  - Interactive vertical scale comparing paper stacks to landmarks: Coffee Mug, Adult Giraffe, Statue of Liberty, Eiffel Tower, Burj Khalifa, Mount Everest, ISS Orbit, Earth Diameter, and Distance to the Moon (384,400 km).

- **📜 Historical TechHive (2015) Research Dossier**:
  - Full breakdown of the George Harwood & Evangeline Walker paper from the *Journal of Interdisciplinary Science Topics*, covered by TechHive and the BBC.
  - Explains the 136 billion pages, 16 million trees (0.0054% of Amazon rainforest), and 10,776-year calculations.

- **🧾 Retro Thermal Print Slip Generator**:
  - Generates itemized supermarket-style receipt cards with copyable report and stats.

- **🔊 Web Audio API Procedural Mechanical Sound Effects**:
  - Stepper motor whir, roller ejection sweep, button clicks, and milestone chimes synthesized in pure client-side code (zero external audio asset latency).

---

## 🚀 Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run unit tests
npm test # or npx tsx --test src/utils/printCalculator.test.ts

# Build for production
npm run build
```

---

## ☁️ Deploying to Vercel

This repository is optimized for one-click deployment on [Vercel](https://vercel.com):

1. Import the repository into your Vercel Dashboard.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Click **Deploy**.

---

## 📚 References & Scientific Sources

- **TechHive / PCWorld (2015)**: *"Here's what would happen if you tried to print out the internet"*
- **Harwood, G. & Walker, E. (2015)**: *"How Much of the Amazon Would it Take to Print the Internet?"*, Journal of Interdisciplinary Science Topics, University of Leicester.
- **Neal Agarwal (Neal.fun)**: *"Printing Money"* interactive simulation.
- **Wikimedia Foundation**: English Wikipedia total article database dumps.
- **WorldWideWebSize**: Estimation of the size of the World Wide Web.

---

## 📄 License

Apache 2.0 / MIT.
