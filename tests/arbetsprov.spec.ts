import { test, expect } from '@playwright/test';

test('Press the button', async ({ page }) => {

  await page.goto('https://daedalus.janniskaranikis.dev/challenges/1-press-the-button');

  await page.getByRole('button', { name: 'Press Me' }).click();
  
  await expect(page.locator('div.text-green-600.text-lg')).toContainText('You made it! Your assert code: ASSERTME' );
  await expect(page.getByText('ASSERTME')).toBeVisible();

});