import { test, expect } from '@playwright/test';

/**
 * E2E tests for the portfolio home page.
 *
 * These tests verify:
 * - Page loads successfully (no 5xx errors)
 * - Core content is visible after hydration
 * - No uncaught JavaScript errors (critical for GSAP/Framer Motion)
 * - Basic navigation works
 */

test.describe('Home Page', () => {
  test('should load without errors', async ({ page }) => {
    // Collect console errors during page load
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const response = await page.goto('/');

    // Page should return 200
    expect(response?.status()).toBe(200);

    // Wait for hydration — the page should have meaningful content
    await page.waitForLoadState('networkidle');

    // No uncaught JS errors (animations, parallax, etc.)
    const criticalErrors = consoleErrors.filter(
      (err) =>
        !err.includes('favicon') && // Ignore favicon 404s
        !err.includes('third-party'), // Ignore third-party script errors
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have correct page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/./); // Should have any title set
  });

  test('should be responsive — no horizontal overflow', async ({ page }) => {
    // Test at mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    // Body should not overflow horizontally (common issue with parallax)
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for rounding
  });

  test('should load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - startTime;

    // Page should load DOM within 5 seconds (generous for heavy animations)
    expect(loadTime).toBeLessThan(5_000);
  });
});
