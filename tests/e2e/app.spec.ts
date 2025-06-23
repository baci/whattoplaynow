import { test, expect } from '@playwright/test';

test.describe('WhatToPlayNow Real E2E Tests', () => {
  test('should complete the full user flow and see recommendations', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // 1. Check for Intro Slide
    await expect(page.getByText('Welcome!')).toBeVisible();
    await expect(page.getByText("Swipe right for 'Yes', or left for 'No'.")).toBeVisible();

    // 2. Swipe through all cards (intro + questions)
    // Keep swiping until no more swipe cards are present
    while (await page.getByTestId('swipe-card').count() > 0) {
      const cardToDrag = page.getByTestId('swipe-card').first();
      await expect(cardToDrag).toBeVisible();
      await cardToDrag.hover();
      await page.mouse.down();
      await page.mouse.move(300, 150); // move to the right
      await page.mouse.up();
      await page.waitForTimeout(300); // allow UI to update
    }

    // 3. Wait for loading spinner to appear and disappear (if present)
    await expect(page.getByText('Finding your next favorite game...')).toBeVisible({ timeout: 5000 }).catch(() => {});
    await expect(page.getByText('Finding your next favorite game...')).toBeHidden({ timeout: 15000 }).catch(() => {});

    // 4. Check for recommendations
    await expect(page.getByText('Here are your recommendations!')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Buy on CDKeys').first()).toBeVisible();
  });

  test('should restart the flow when the "Start Over" button is clicked', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    await page.waitForTimeout(300);

    // Swipe through all cards
    while (await page.getByTestId('swipe-card').count() > 0) {
      const cardToDrag = page.getByTestId('swipe-card').first();
      await expect(cardToDrag).toBeVisible();
      await cardToDrag.hover();
      await page.mouse.down();
      await page.mouse.move(300, 150);
      await page.mouse.up();
      await page.waitForTimeout(300);
    }

    await expect(page.getByText('Here are your recommendations!')).toBeVisible();
    await expect(page.getByText('Buy on CDKeys').first()).toBeVisible();

    // Click the restart button
    await page.getByText('Start Over').click();

    // Verify that the intro slide is visible again
    await expect(page.getByText('Welcome!')).toBeVisible();
    await expect(page.getByText("Swipe right for 'Yes', or left for 'No'.")).toBeVisible();
  });
}); 