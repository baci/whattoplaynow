import { test, expect } from '@playwright/test';

test.describe('WhatToPlayNow E2E Tests', () => {
  
  test('should complete the full user flow', async ({ page }) => {
    // Mock API responses
    await page.route('**/api/questions', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: [
          { id: 1, questionText: 'I like fast-paced games.', positiveAnswerTag: 'fast-paced', negativeAnswerTag: 'slow-paced' },
          { id: 2, questionText: 'I enjoy games with a strong story.', positiveAnswerTag: 'story-rich', negativeAnswerTag: 'gameplay-focused' },
          { id: 3, questionText: 'I prefer multiplayer games.', positiveAnswerTag: 'multiplayer', negativeAnswerTag: 'single-player' },
        ],
      });
    });

    await page.route('**/api/recommendations', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: [
          { id: 1, gameTitle: 'Awesome Game 1', tags: ['fast-paced', 'multiplayer'], youtubeVideoId: 'dQw4w9WgXcQ', cdkeysId: 'awesome-game-1' },
          { id: 2, gameTitle: 'Awesome Game 2', tags: ['story-rich', 'single-player'], youtubeVideoId: 'o-YBDTqX_ZU', cdkeysId: 'awesome-game-2' },
        ],
      });
    });

    await page.goto('http://localhost:5173/');

    // 1. Check for Intro Slide
    await expect(page.getByText('Welcome!')).toBeVisible();
    await expect(page.getByText("Swipe right for 'Yes', or left for 'No'.")).toBeVisible();

    const card = page.getByTestId('swipe-card');

    // 2. Swipe through all cards (intro + 3 questions)
    const totalCards = 4;
    for (let i = 0; i < totalCards; i++) {
      await card.dragTo(page.locator('body'), {
        sourcePosition: { x: 100, y: 100 },
        // Alternate between swiping left and right
        targetPosition: { x: i % 2 === 0 ? -200 : 200, y: 150 },
      });
    }

    // 3. Check for loading spinner
    await expect(page.getByText('Finding your next favorite game...')).toBeVisible();

    // 4. Check for recommendations
    await expect(page.getByText('Here are your recommendations!')).toBeVisible();
    await expect(page.getByText('Awesome Game 1')).toBeVisible();
    await expect(page.getByText('Awesome Game 2')).toBeVisible();
    
    // Check for the affiliate link
    await expect(page.getByText('Buy on CDKeys').first()).toBeVisible();
  });

  test('should restart the flow when the "Start Over" button is clicked', async ({ page }) => {
    // This test assumes the full flow from the previous test has a place to be setup
    // For a real-world scenario, you might have a helper function to avoid duplicating the setup code.
    await page.route('**/api/questions', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          json: [
            { id: 1, questionText: 'I like fast-paced games.', positiveAnswerTag: 'fast-paced', negativeAnswerTag: 'slow-paced' },
            { id: 2, questionText: 'I enjoy games with a strong story.', positiveAnswerTag: 'story-rich', negativeAnswerTag: 'gameplay-focused' },
            { id: 3, questionText: 'I prefer multiplayer games.', positiveAnswerTag: 'multiplayer', negativeAnswerTag: 'single-player' },
          ],
        });
      });
  
      await page.route('**/api/recommendations', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          json: [
            { id: 1, gameTitle: 'Awesome Game 1', tags: ['fast-paced', 'multiplayer'], youtubeVideoId: 'dQw4w9WgXcQ', cdkeysId: 'awesome-game-1' },
            { id: 2, gameTitle: 'Awesome Game 2', tags: ['story-rich', 'single-player'], youtubeVideoId: 'o-YBDTqX_ZU', cdkeysId: 'awesome-game-2' },
          ],
        });
      });
  
      await page.goto('http://localhost:5173/');
  
      const card = page.getByTestId('swipe-card');
      const totalCards = 4;
      for (let i = 0; i < totalCards; i++) {
        await card.dragTo(page.locator('body'), {
          sourcePosition: { x: 100, y: 100 },
          targetPosition: { x: 200, y: 150 },
        });
      }
  
      await expect(page.getByText('Here are your recommendations!')).toBeVisible();
  
      // Click the restart button
      await page.getByText('Start Over').click();
  
      // Verify that the intro slide is visible again
      await expect(page.getByText('Welcome!')).toBeVisible();
  });
}); 