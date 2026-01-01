const { test, expect } = require("@playwright/test");

test("Add/Remove Elements page should function correctly", async ({ page }) => {
  // Step 01: Go to home page
  await page.goto("https://the-internet.herokuapp.com");

  // Step 02: Validate the Add/Remove Elements link
  const addRemoveLink = page.locator('a[href="/add_remove_elements/"]'); // trailing slash fixed
  await addRemoveLink.waitFor(); // wait until it exists in DOM
  await expect(addRemoveLink).toBeVisible();
  await expect(addRemoveLink).toHaveText("Add/Remove Elements");

  // Step 03: Validate the href before clicking
  const href = await addRemoveLink.getAttribute("href");
  expect(href).toBe("/add_remove_elements/");

  // Step 04: Click to navigate
  await addRemoveLink.click();

  // Step 05: Validate URL
  await expect(page).toHaveURL(
    "https://the-internet.herokuapp.com/add_remove_elements/"
  );

  // Step 06: Click Add Element button
  const addButton = page.locator('button[onclick="addElement()"]');
  await expect(addButton).toBeVisible();
  await addButton.click();
  await addButton.click(); // click twice for testing multiple deletes

  // Step 07: Validate Delete buttons appear
  const deleteButtons = page.locator("button.added-manually");
  await expect(deleteButtons).toHaveCount(2);

  // Step 08: Delete button functionality
  await deleteButtons.first().click();
  await expect(deleteButtons).toHaveCount(1);

  // Step 09: Navigate back to home page
  await page.goBack();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com");
});
