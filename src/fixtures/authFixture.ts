import { test as base, expect, type Page } from '@playwright/test';

import fs from 'fs';
import path from 'path';
import process from 'process';
import { LoginPage } from '../pages/LoginPage';
import { ConfigManager } from '../config/ConfigManager';

type MyFixtures = {
  authenticatedPage: Page;
};

const authFile = path.join(
  process.cwd(),
  'playwright/.auth/user.json'
);

export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ browser }, use) => {
    // Restore the saved state if it already exists.
    const hasSavedState = fs.existsSync(authFile);

    const context = await browser.newContext({
      storageState: hasSavedState ? authFile : undefined,
    });

    const page = await context.newPage();

    // Log in only when no saved state exists.
    if (!hasSavedState) {
      await page.goto('/login');

      // Replace these with your actual EventHub locators.
      const loginPage = new LoginPage(page);
      const emailId =(String) (ConfigManager.userMail);
      const password = (String) (ConfigManager.userPassword);
      await loginPage.login(emailId, password);

      // Replace with an assertion that confirms successful login.
      await page.waitForURL(
        url => !url.pathname.endsWith('/login')
      );

      // Save the authenticated browser state.
      fs.mkdirSync(path.dirname(authFile), {
        recursive: true,
      });

      await context.storageState({
        path: authFile,
      });
    }

    await use(page);

    await context.close();
  },
});

export { expect };