import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  const pageLoad = await page.goto("/");

  if (pageLoad?.status() == 200) {
    console.log("Page loaded successfully");
    await expect(page).toHaveTitle(/Playwright/);
  } else {
    throw new Error(`Failed to load page,`);
  }
});

test("get started link", async ({ page }) => {
  await page.goto("/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click({delay: 10000});
  await expect(page).toHaveURL(/.*intro/);
});

test("check java page", async ({ page }) => {
  await page.goto("/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();
  await page.getByRole("button", { name: "Node.js" }).hover();
  await page.getByText("Java", { exact: true }).click();
  await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
  await expect(page.getByText('Installing Playwright', {exact:true})).not.toBeVisible();
  const javaDescription = "Playwright is distributed as a set of Maven modules";
  await expect(page.getByText(javaDescription)).toBeVisible();
});
