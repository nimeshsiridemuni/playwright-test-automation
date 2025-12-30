const { test, expect } = require("@playwright/test");

test("Home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/The Internet/);
});
