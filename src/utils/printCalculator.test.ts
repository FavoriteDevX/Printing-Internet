import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePrintMetrics,
  formatTimeDuration,
  getMilestoneComparison,
  estimatePagesForDomain,
  MILESTONES,
} from './printCalculator';

test('calculatePrintMetrics computes realistic physical dimensions', () => {
  const metrics = calculatePrintMetrics(100_000);
  // 100,000 * 0.0001m = 10m
  assert.equal(metrics.heightMeters, 10);
  assert.equal(metrics.heightKm, 0.01);
  // 100,000 * 0.005kg = 500kg
  assert.equal(metrics.weightKg, 500);
  assert.equal(metrics.weightTons, 0.5);
  // 100,000 / 8,500 = 11.76 -> 12 trees
  assert.equal(metrics.treesNeeded, 12);
  // 100,000 / 500 = 200 cartridges
  assert.equal(metrics.inkCartridges, 200);
  // 100,000 * 0.02 = 2000 liters
  assert.equal(metrics.waterLiters, 2000);
  // 100,000 / 500 = 200 reams
  assert.equal(metrics.reams, 200);
});

test('calculatePrintMetrics printing time at speeds', () => {
  const metrics = calculatePrintMetrics(600);
  // At 60 ppm, 600 pages takes 10 minutes
  assert.equal(metrics.minutesToPrintAtSpeed(60), 10);
  const time = metrics.timeFormatted(60);
  assert.equal(time.minutes, 10);
});

test('formatTimeDuration handles seconds, minutes, days, and large millennia', () => {
  const instant = formatTimeDuration(0);
  assert.equal(instant.humanLabel, 'Instant');

  const halfMin = formatTimeDuration(0.5);
  assert.equal(halfMin.seconds, 30);

  // 1440 minutes = 1 day
  const oneDay = formatTimeDuration(1440);
  assert.equal(oneDay.days, 1);
  assert.equal(oneDay.hours, 0);

  // 1 million years = 1,000,000 * 525960 minutes
  const millions = formatTimeDuration(1_500_000 * 525960);
  assert.match(millions.humanLabel, /1.5 Million Years/);
});

test('getMilestoneComparison tracks progress across heights', () => {
  // 0.05m is below coffee mug (0.1m)
  const low = getMilestoneComparison(0.05);
  assert.equal(low.current.id, 'coffee-cup');
  assert.equal(low.ratio, 0.5);

  // 350m is between Eiffel Tower (330m) and Burj Khalifa (828m)
  const mid = getMilestoneComparison(350);
  assert.equal(mid.current.id, 'eiffel-tower');
  assert.equal(mid.next?.id, 'burj-khalifa');
  assert.ok(mid.ratio > 0 && mid.ratio < 1);

  // Huge height beyond moon
  const cosmic = getMilestoneComparison(500_000_000);
  assert.equal(cosmic.current.id, 'moon-distance');
  assert.equal(cosmic.next, null);
  assert.equal(cosmic.ratio, 1);
});

test('estimatePagesForDomain returns deterministic estimations for domains', () => {
  const res1 = estimatePagesForDomain('https://www.wikipedia.org/wiki/Special');
  const res2 = estimatePagesForDomain('wikipedia.org');
  assert.equal(res1.domain, 'wikipedia.org');
  assert.equal(res1.estimatedPages, res2.estimatedPages);
  assert.ok(res1.estimatedPages > 0);
  assert.equal(res1.category, 'Knowledge Base');
  assert.ok(res1.sampleHeadlines.length > 0);

  const news = estimatePagesForDomain('nytimes.com');
  assert.equal(news.category, 'News & Journalism');

  const tech = estimatePagesForDomain('github.io');
  assert.equal(tech.category, 'Software & Tech Platform');
});
