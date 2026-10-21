import {test, expect} from '../../src/fixtures/loginFixtures';
import {ConfigManager} from '../../src/config/ConfigManager';
import dotenv from 'dotenv';

dotenv.config();

test.beforeEach(async ({page}) => {
    await page.goto('/');
});

test('EventHub application opens successfully', async ({page}) => {
    //await page.goto('/');
    await expect(page).toHaveTitle('EventHub — Discover & Book Events');
});

test('EventHub application user login successfully', async ({ page, loginPage }) => {
    const emailId =(String) (ConfigManager.userMail);
    const password = (String) (ConfigManager.userPassword);
    await expect(page).toHaveTitle('EventHub — Discover & Book Events');
    await loginPage.login(emailId, password);
   // print(await page.title());
   await expect(page.getByText('Featured Events')).toBeVisible();
   console.log("ENV =", process.env.ENV);
});

