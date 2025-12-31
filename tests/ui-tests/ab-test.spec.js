const { test, expect } = require("@playwright/test");

test("A/B test page should load correctly", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com");

  await page.click('a[href="/abtest"]');

  // Step 01: URL validation
  await expect(page).toHaveURL(/.*abtest/);

  // Step 02: A/B-safe heading validation
  const heading = page.locator("h3");
  await expect(heading).toBeVisible();
  await expect(heading).toContainText("A/B Test");

  // Step 3:Optional logging (no strict assertion)
  const bodyText = page.locator("p");
  if ((await bodyText.count()) > 0) {
    console.log("Body Text:", await bodyText.textContent());
  }

  // Step 4: Footer text validation (correct node)
  const footer = page.locator("#page-footer");
  await expect(footer).toContainText("Powered by");

  const footerLink = page.locator('a[href="http://elementalselenium.com/"]');
  await expect(footerLink).toBeVisible();
  await expect(footerLink).toHaveText("Elemental Selenium");

  // Step 5: Navigate back to home page
  await page.goBack();
});
