// Import Playwright's test runner and assertion library
const { test, expect } = require("@playwright/test");

/*
|--------------------------------------------------------------------------
| TEST 01: Navigation to Challenging DOM page
|--------------------------------------------------------------------------
| Purpose:
| - Verify that the user can navigate from the home page
|   to the Challenging DOM page correctly
*/
test("Navigate to Challenging DOM page", async ({ page }) => {
  // Step 1: Open the home page
  await page.goto("https://the-internet.herokuapp.com");

  // Step 2: Locate the Challenging DOM link using its href
  const challengeDomLink = page.locator('a[href="/challenging_dom"]');

  // Step 3: Verify the link is visible to the user
  await expect(challengeDomLink).toBeVisible();

  // Step 4: Verify the link text
  await expect(challengeDomLink).toHaveText("Challenging DOM");

  // Step 5: Click the link
  await challengeDomLink.click();

  // Step 6: Verify correct navigation
  await expect(page).toHaveURL(
    "https://the-internet.herokuapp.com/challenging_dom"
  );
});

/*
|--------------------------------------------------------------------------
| TEST 02: Validate page elements (canvas, buttons, table)
|--------------------------------------------------------------------------
| Purpose:
| - Ensure all important UI elements exist and render correctly
*/
test("Validate Challenging DOM page elements", async ({ page }) => {
  // Step 1: Directly navigate to the Challenging DOM page
  await page.goto("https://the-internet.herokuapp.com/challenging_dom");

  // Step 2: Validate canvas element exists
  const canvas = page.locator("#canvas");
  await expect(canvas).toBeVisible();

  // Step 3: Validate there are exactly 3 buttons
  const buttons = page.locator(".button");
  await expect(buttons).toHaveCount(3);

  // Step 4: Validate table exists
  const table = page.locator("table");
  await expect(table).toBeVisible();

  // Step 5: Validate table headers
  const headers = table.locator("thead th");
  const expectedHeaders = [
    "Lorem",
    "Ipsum",
    "Dolor",
    "Sit",
    "Amet",
    "Diceret",
    "Action",
  ];

  for (let i = 0; i < expectedHeaders.length; i++) {
    await expect(headers.nth(i)).toHaveText(expectedHeaders[i]);
  }

  // Step 6: Validate table rows and columns
  const rows = table.locator("tbody tr");
  const rowCount = await rows.count();
  expect(rowCount).toBeGreaterThan(0);

  for (let i = 0; i < rowCount; i++) {
    const cells = rows.nth(i).locator("td");
    await expect(cells).toHaveCount(7);
  }
});

/*
|--------------------------------------------------------------------------
| TEST 03: Validate dynamic button behavior
|--------------------------------------------------------------------------
| Purpose:
| - Verify that button text changes dynamically after clicking
| - Demonstrates handling of unstable DOM content
*/
test("Validate Challenging DOM buttons behavior", async ({ page }) => {
  // Step 1: Open the page
  await page.goto("https://the-internet.herokuapp.com/challenging_dom");

  // Step 2: Locate all buttons
  const buttons = page.locator(".button");

  // Step 3: Loop through buttons to validate dynamic text
  for (let i = 0; i < 3; i++) {
    const button = buttons.nth(i);

    // Capture text BEFORE click
    const textBefore = await button.textContent();

    // Click the button
    await button.click();

    // Capture text AFTER click
    const textAfter = await button.textContent();

    // Validate text has changed
    expect(textAfter).not.toBe(textBefore);
  }
});
