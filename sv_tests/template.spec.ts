import { test, expect, Page } from "@playwright/test";

// AAA PATERN
// Arrange, Act, Assert

// POM
// Page Object Model

const BASE_URL = process.env.BASE_URL;

test.beforeEach(async ({ page }) => {
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined");
  }
  await page.goto(BASE_URL);
});

async function clickGetStarted(page: Page) {
  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();
}

test.describe("Playwright website", () => {
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Playwright/);
  });

  test("get started link", async ({ page }) => {
    await clickGetStarted(page);
    await expect(page).toHaveURL(/.*intro/);
  });

  test("check java page", async ({ page }) => {
    await clickGetStarted(page);
    await page.getByRole("button", { name: "Node.js" }).hover();
    await page.getByText("Java", { exact: true }).click();
    await expect(page).toHaveURL("https://playwright.dev/java/docs/intro");
    await expect(
      page.getByText("Installing Playwright", { exact: true })
    ).not.toBeVisible();
    const javaDescription =
      "Playwright is distributed as a set of Maven modules";
    await expect(page.getByText(javaDescription)).toBeVisible();
  });
});
