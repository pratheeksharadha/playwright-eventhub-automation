import  { test, expect } from "../../src/fixtures/authFixture";

test('EventHub application authenticated user logs successfully', async ({ authenticatedPage }) => {
   await authenticatedPage.goto('/events');
   console.log(authenticatedPage.url());
   await expect(authenticatedPage.url()).toContain('https://eventhub.rahulshettyacademy.com/events');
});