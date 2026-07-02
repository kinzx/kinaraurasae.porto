import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for E2E testing.
 *
 * Uses a production build (`next start`) for realistic testing
 * of SSR, hydration, animations, and parallax behavior.
 */
export default defineConfig({
  testDir: './e2e',
  outputDir: './test-results',

  /* Maximum time one test can run — generous for heavy animation pages */
  timeout: 30_000,

  /* Expect assertions timeout */
  expect: {
    timeout: 10_000,
  },

  /* Run tests sequentially in CI to avoid resource contention */
  fullyParallel: !process.env.CI,

  /* Fail the build on CI if you accidentally left test.only in source */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests once on CI for flake resilience */
  retries: process.env.CI ? 1 : 0,

  /* Reporter */
  reporter: process.env.CI ? 'github' : 'html',

  use: {
    /* Base URL for navigation */
    baseURL: 'http://localhost:3000',

    /* Capture screenshot on failure for visual debugging */
    screenshot: 'only-on-failure',

    /* Record video on first retry (catches animation issues) */
    video: 'on-first-retry',

    /* Collect trace on first retry */
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    /* Uncomment to add more browsers when needed:
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    */
  ],

  /* Start the production server before running E2E tests */
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000, // 2 min — generous for heavy builds
  },
});
