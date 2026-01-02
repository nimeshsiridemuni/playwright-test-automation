const { test, expect } = require("@playwright/test");

test("Broken Images page should display at least one broken image", async ({
  page,
}) => {
  await page.goto("https://the-internet.herokuapp.com");

  const brokeImagesLink = page.locator('a[href="/broken_images"]');
  await expect(brokeImagesLink).toBeVisible();
  await expect(brokeImagesLink).toHaveAttribute("href", "/broken_images");

  await brokeImagesLink.click();
  await expect(page).toHaveURL(
    "https://the-internet.herokuapp.com/broken_images"
  );

  const images = page.locator(".example img");
  const imageCount = await images.count();
  expect(imageCount).toBeGreaterThan(0);

  // Count broken images
  let brokenImageCount = 0;
  for (let i = 0; i < imageCount; i++) {
    const img = images.nth(i);
    const isImageLoaded = await img.evaluate(
      (image) => image.complete && image.naturalWidth !== 0
    );
    if (!isImageLoaded) brokenImageCount++;
  }

  expect(brokenImageCount).toBeGreaterThan(0); // Stable assertion

  await page.goBack();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com");
});
