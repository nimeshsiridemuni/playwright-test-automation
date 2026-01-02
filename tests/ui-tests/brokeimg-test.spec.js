const { test, expect } = require("@playwright/test");

test("Broke Images page should display broken images correctly", async ({
  page,
}) => {
  // Step 01: Go to home page
  await page.goto("https://the-internet.herokuapp.com");

  // Step 02: Validate whether the Broke Images link is visible and has correct text
  const brokeImagesLink = page.locator('a[href="/broken_images"]');
  await brokeImagesLink.waitFor();

  // Step 03: Validate the href before clicking
  const href = await brokeImagesLink.getAttribute("href");
  expect(href).toBe("/broken_images");

  // Step 04: Click to navigate
  await brokeImagesLink.click();

  // Step 05: Validate URL
  await expect(page).toHaveURL(
    "https://the-internet.herokuapp.com/broken_images"
  );

  // Step 06: Validate broken images
  const images = page.locator(".example img");
  const imageCount = await images.count();
  expect(imageCount).toBe(3); // Ensure there are 3 images

  for (let i = 0; i < imageCount; i++) {
    const img = images.nth(i);
    const isImageLoaded = await img.evaluate((image) => {
      return image.complete && image.naturalWidth !== 0;
    });
    expect(isImageLoaded).toBeFalsy(); // Expecting broken images
  }

  // Step 07: Navigate back to home page
  await page.goBack();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com");
});
