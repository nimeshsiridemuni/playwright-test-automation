const { test, expect } = require("@playwright/test");

test("Add/Remove Elements page should function correctly", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com");

  const addRemoveLink = page.locator('a[href="/add_remove_elements/"]');
  await addRemoveLink.waitFor(); // wait until it exists in DOM
  await expect(addRemoveLink).toBeVisible();
  await expect(addRemoveLink).toHaveText("Add/Remove Elements");

  const href = await addRemoveLink.getAttribute("href");
  expect(href).toBe("/add_remove_elements/");

  await addRemoveLink.click();

  await expect(page).toHaveURL(
    "https://the-internet.herokuapp.com/add_remove_elements/",
  );

  const addButton = page.locator('button[onclick="addElement()"]');
  await expect(addButton).toBeVisible();
  await addButton.click();
  await addButton.click(); // click twice for testing multiple deletes

  const deleteButtons = page.locator("button.added-manually");
  await expect(deleteButtons).toHaveCount(2);

  await deleteButtons.first().click();
  await expect(deleteButtons).toHaveCount(1);

  await page.goBack();
  await expect(page).toHaveURL("https://the-internet.herokuapp.com");
});
