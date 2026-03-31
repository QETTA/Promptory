#!/usr/bin/env node
import { chromium } from 'playwright-core';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.TEST_URL || 'https://3000-it6q73w8o5w0fi9r26fc9-ea026bf9.sandbox.novita.ai';
const OUTPUT_DIR = './e2e/screenshots';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const pages = [
  { name: 'home', path: '/' },
  { name: 'pricing', path: '/pricing' },
  { name: 'packages', path: '/packages' },
  { name: 'contact', path: '/contact' },
  { name: 'login', path: '/login' },
  { name: 'demo-slack', path: '/demo/slack' },
  { name: 'setup', path: '/setup' },
  { name: 'packages-detail', path: '/packages/website-diagnosis-agent' },
];

async function captureScreenshots() {
  console.log(`Testing against: ${BASE_URL}`);
  console.log('=' .repeat(60));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  const results = [];

  for (const page of pages) {
    const url = `${BASE_URL}${page.path}`;
    console.log(`\n[${page.name}] ${url}`);

    try {
      const p = await context.newPage();

      // Collect console errors
      const errors = [];
      p.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      p.on('pageerror', err => {
        errors.push(`PageError: ${err.message}`);
      });

      // Navigate and wait for network idle
      const response = await p.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      // Wait a bit for animations
      await p.waitForTimeout(2000);

      // Take screenshot
      const screenshotPath = path.join(OUTPUT_DIR, `${page.name}.png`);
      await p.screenshot({
        path: screenshotPath,
        fullPage: true,
      });

      const status = response?.status() || 'unknown';
      const hasErrors = errors.length > 0;

      console.log(`  Status: ${status}`);
      console.log(`  Screenshot: ${screenshotPath}`);
      if (errors.length > 0) {
        console.log(`  Console errors: ${errors.length}`);
        errors.slice(0, 3).forEach(e => console.log(`    - ${e.substring(0, 100)}`));
      }

      results.push({
        name: page.name,
        url,
        status,
        errors: errors.length,
        errorDetails: errors.slice(0, 5),
        screenshot: screenshotPath,
        success: status === 200 && !hasErrors,
      });

      await p.close();
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
      results.push({
        name: page.name,
        url,
        status: 'error',
        errors: 1,
        errorDetails: [err.message],
        success: false,
      });
    }
  }

  await browser.close();

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));

  const passed = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`Passed: ${passed.length}/${results.length}`);
  console.log(`Failed: ${failed.length}/${results.length}`);

  if (failed.length > 0) {
    console.log('\nFailed pages:');
    failed.forEach(f => {
      console.log(`  - ${f.name}: ${f.status} (${f.errors} errors)`);
    });
  }

  // Write report
  const reportPath = path.join(OUTPUT_DIR, 'report.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nReport saved: ${reportPath}`);

  process.exit(failed.length > 0 ? 1 : 0);
}

captureScreenshots().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
