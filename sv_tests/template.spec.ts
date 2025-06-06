import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/home_page";
import { TopMenuPage } from "../pages/top-menu-page";

// AAA PATERN
// Arrange, Act, Assert

// POM
// Page Object Model

const BASE_URL = process.env.BASE_URL;
const pageUrl = "https://playwright.dev";
console.log(`BASE_URL: ${BASE_URL}`);

let homePage: HomePage;
let topMenuPage: TopMenuPage;

test.beforeEach(async ({ page }) => {
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined");
  }
  await page.goto(BASE_URL);
  homePage = new HomePage(page);
  topMenuPage = new TopMenuPage(page);
});

async function clickGetStarted(page: Page) {
  await homePage.clickGetStarted();
}

test.describe("Playwright website", () => {
  test("has title", async () => {
    await homePage.assertPageTitle();
  });

  test("get started link", async ({ page }) => {
    await clickGetStarted(page);
    await topMenuPage.assertPageUrl(/.*intro/);
  });

  test("check java page", async ({ page }) => {
    await test.step('Act', async () => {
      await clickGetStarted(page);
      await topMenuPage.hoverNode();
      await topMenuPage.clickJava();
    });
   
    await test.step('Assert', async () => {
   await topMenuPage.assertPageUrl(pageUrl);
    await topMenuPage.assertJavaLabelVisible();
    await topMenuPage.assertNodeLabelVisible();
    });

  });
});
