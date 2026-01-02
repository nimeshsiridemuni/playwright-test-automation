const { test, expect } = require("@playwright/test");

test("Basic Auth page should function correctly", async ({ browser }) => {
  // ---------- POSITIVE SCENARIO ----------
  const context = await browser.newContext({
    httpCredentials: {
      username: "admin",
      password: "admin",
    },
  });

  const page = await context.newPage();

  // Step 01: Go to Basic Auth page
  await page.goto("https://the-internet.herokuapp.com/basic_auth");

  // Step 02: Validate header
  const header = page.locator(".example h3");
  await expect(header).toBeVisible();
  await expect(header).toHaveText("Basic Auth");

  // Step 03: Validate success message
  const message = page.locator(".example p");
  await expect(message).toContainText(
    "Congratulations! You must have the proper credentials."
  );

  await context.close();

  // ---------- NEGATIVE SCENARIO ----------
  const invalidContext = await browser.newContext({
    httpCredentials: {
      username: "wrongUser",
      password: "wrongPass",
    },
  });

  const invalidPage = await invalidContext.newPage();
  const response = await invalidPage.goto(
    "https://the-internet.herokuapp.com/basic_auth"
  );

  // Step 04: Validate unauthorized access
  expect(response.status()).toBe(401);

  await invalidContext.close();
});
