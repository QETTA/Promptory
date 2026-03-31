import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Core Pages
 * Tests page loading, visual appearance, and basic interactions
 */

const pages = [
  { name: 'Home', path: '/', expectedTitle: /프롬프토리/ },
  { name: 'Pricing', path: '/pricing', expectedTitle: /가격/ },
  { name: 'Packages', path: '/packages', expectedTitle: /패키지/ },
  { name: 'Contact', path: '/contact', expectedTitle: /문의|데모|요청/ },
  { name: 'Login', path: '/login', expectedTitle: /로그인/ },
  { name: 'Setup', path: '/setup', expectedTitle: /설정|Setup/ },
];

for (const page of pages) {
  test.describe(`${page.name} Page`, () => {
    test('should load successfully', async ({ page: p }) => {
      const response = await p.goto(page.path);
      expect(response?.status()).toBe(200);
    });

    test('should have correct title', async ({ page: p }) => {
      await p.goto(page.path);
      await expect(p).toHaveTitle(page.expectedTitle);
    });

    test('should not have console errors', async ({ page: p }) => {
      const errors: string[] = [];
      p.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      await p.goto(page.path);
      await p.waitForLoadState('networkidle');

      // Filter out hydration warnings which are common in Next.js dev
      const criticalErrors = errors.filter(e =>
        !e.includes('hydrat') &&
        !e.includes('Hydration') &&
        !e.includes('server rendered HTML')
      );

      expect(criticalErrors).toHaveLength(0);
    });

    test('should be responsive', async ({ page: p }) => {
      // Test mobile viewport
      await p.setViewportSize({ width: 375, height: 667 });
      await p.goto(page.path);
      await expect(p.locator('body')).toBeVisible();

      // Test tablet viewport
      await p.setViewportSize({ width: 768, height: 1024 });
      await p.goto(page.path);
      await expect(p.locator('body')).toBeVisible();

      // Test desktop viewport
      await p.setViewportSize({ width: 1440, height: 900 });
      await p.goto(page.path);
      await expect(p.locator('body')).toBeVisible();
    });
  });
}

test.describe('Package Detail Pages', () => {
  const packages = [
    { name: 'Website Diagnosis Agent', path: '/packages/website-diagnosis-agent' },
    { name: 'Campaign Brief Agent', path: '/packages/campaign-brief-agent' },
    { name: 'Korea Local Ops Agent', path: '/packages/korea-local-ops-agent' },
  ];

  for (const pkg of packages) {
    test(`${pkg.name} should load`, async ({ page }) => {
      await page.goto(pkg.path);
      await expect(page.locator('body')).toBeVisible();
      expect(await page.locator('h1').count()).toBeGreaterThan(0);
    });
  }
});

test.describe('Navigation', () => {
  test('header should be visible on all pages', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();

    await page.goto('/pricing');
    await expect(page.locator('header')).toBeVisible();

    await page.goto('/contact');
    await expect(page.locator('header')).toBeVisible();
  });

  test('footer should be visible on all pages', async ({ page }) => {
    const pagesToTest = ['/', '/pricing', '/packages', '/contact'];

    for (const path of pagesToTest) {
      await page.goto(path);
      await expect(page.locator('footer')).toBeVisible();
    }
  });

  test('should navigate between pages', async ({ page }) => {
    await page.goto('/');

    // Click pricing link
    await page.click('text=가격 보기, text=패키지, text=Pricing');
    await expect(page).toHaveURL(/\/pricing|\/packages/);
  });
});

test.describe('Contact Form', () => {
  test('should display contact form', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('form, [name="contact"], button:has-text("보내기")')).toBeVisible();
  });

  test('should handle query parameters', async ({ page }) => {
    await page.goto('/contact?type=quick_audit');
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/contact?type=demo');
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('Visual Regression', () => {
  test('home page should match snapshot', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('home.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });

  test('pricing page should match snapshot', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot('pricing.png', {
      fullPage: true,
      threshold: 0.2,
    });
  });
});
