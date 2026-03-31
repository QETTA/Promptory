import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://3000-it6q73w8o5w0fi9r26fc9-ea026bf9.sandbox.novita.ai';

const pages = [
  { path: '/', name: 'home' },
  { path: '/packages', name: 'packages' },
  { path: '/pricing', name: 'pricing' },
  { path: '/contact', name: 'contact' },
  { path: '/proposal', name: 'proposal' },
  { path: '/contact?type=quick_audit', name: 'contact-quick-audit' },
  { path: '/packages/website-diagnosis-agent', name: 'package-detail' }
];

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  for (const page of pages) {
    const p = await context.newPage();
    console.log(`Capturing: ${page.path}`);
    try {
      await p.goto(`${BASE_URL}${page.path}`, { waitUntil: 'networkidle', timeout: 30000 });
      await p.waitForTimeout(2000); // Wait for animations
      
      const screenshotPath = join(__dirname, `screenshot-${page.name}.png`);
      await p.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`  ✅ Saved: ${screenshotPath}`);
    } catch (e) {
      console.log(`  ❌ Error: ${e.message}`);
    }
    await p.close();
  }
  
  await browser.close();
  console.log('\nDone!');
}

captureScreenshots().catch(console.error);
