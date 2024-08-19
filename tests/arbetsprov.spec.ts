import { test, expect } from '@playwright/test';

test('Press the button', async ({ page }) => {

  await page.goto('https://daedalus.janniskaranikis.dev/challenges/1-press-the-button');

  await page.getByRole('button', { name: 'Press Me' }).click();
  
  await expect(page.locator('div.text-green-600.text-lg')).toContainText('You made it! Your assert code: ASSERTME' );
  await expect(page.getByText('ASSERTME')).toBeVisible();

});

test('Log in', async ({ page }) => {

    await page.goto('https://daedalus.janniskaranikis.dev/challenges/2-log-in');
  
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('SafePass123');

    await page.getByRole('button', { name: 'Log in' }).click();
    
    await expect(page.locator('div.text-green-600.text-lg')).toContainText('Good Job! Your well earned assert code: ASSERTME' );
    await expect(page.getByText('ASSERTME')).toBeVisible();
  
  });