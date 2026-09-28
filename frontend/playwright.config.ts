import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: process.env.VITE_E2E_BASE_URL || 'http://127.0.0.1:5173',
    trace: 'retain-on-failure',
  },
  webServer: process.env.VITE_E2E_BASE_URL ? undefined : {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
  },
});
