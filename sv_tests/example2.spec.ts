import { test, expect, Page } from "@playwright/test";
import { HomePage } from "../pages/home_page";
import { TopMenuPage } from "../pages/top-menu-page";
import {
  BatchInfo,
  Configuration,
  EyesRunner,
  ClassicRunner,
  VisualGridRunner,
  BrowserType,
  DeviceName,
  ScreenOrientation,
  Eyes,
  Target,
} from "@applitools/eyes-playwright";

const BASE_URL = process.env.BASE_URL;
const pageUrl = "https://playwright.dev";
console.log(`BASE_URL: ${BASE_URL}`);

let homePage: HomePage;
let topMenuPage: TopMenuPage;

export const USE_ULTRAFAST_GRID: boolean = false;
export let Batch: BatchInfo | undefined = undefined;
export let Config: Configuration | undefined = undefined;
export let Runner: EyesRunner | undefined = undefined;
let eyes: Eyes | undefined = undefined;

test.beforeAll(async () => {
  if (USE_ULTRAFAST_GRID) {
    Runner = new VisualGridRunner({ testConcurrency: 5 });
  } else {
    Runner = new ClassicRunner();
  }
  
  const runnerName = USE_ULTRAFAST_GRID ? "Ultrafast Grid" : "Classic runner";
  Batch = new BatchInfo({ name: `Playwright tests - ${runnerName}` });
  Config = new Configuration();

  Config.setBatch(Batch);
  if (USE_ULTRAFAST_GRID) {
    // Config.setServerUrl("https://eyes.applitools.com");
    Config.addBrowser(800, 600, BrowserType.CHROME);
    Config.addBrowser(1280, 800, BrowserType.FIREFOX);
    Config.addBrowser(1280, 800, BrowserType.SAFARI);
    Config.addDeviceEmulation(DeviceName.iPhone_11, ScreenOrientation.PORTRAIT);
    Config.addDeviceEmulation(DeviceName.Nexus_10, ScreenOrientation.LANDSCAPE);
  }
});

test.beforeEach(async ({ page }) => {
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined");
  }

  eyes = new Eyes(Runner, Config);
  await eyes.open(page, "Playwright", test.info().title, { width: 1024, height: 768 });

  await page.goto(BASE_URL);
  homePage = new HomePage(page);
  topMenuPage = new TopMenuPage(page);
});


test.afterEach(async () => {
  if (eyes) {
    await eyes.close();
    // await eyes.check("Home Page", Target.window().fully());
  }
});

test.afterAll(async () => {
  const results = await Runner?.getAllTestResults();
  console.log('Visual test results:', results);
})

async function clickGetStarted(page: Page) {
  await homePage.clickGetStarted();
}

test.describe("Playwright website", () => {
  test("has title", async () => {
    await homePage.assertPageTitle();
    await eyes?.check("Home Page", Target.window().fully());
  });

  test("get started link", async ({ page }) => {
    await clickGetStarted(page);
    await topMenuPage.assertPageUrl(/.*intro/);
    await eyes?.check("Get Started Page", Target.window().fully().layout());
  });

  test("check java page", async ({ page }) => {
    await test.step("Act", async () => {
      await clickGetStarted(page);
      await topMenuPage.hoverNode();
      await topMenuPage.clickJava();
    });

    await test.step("Assert", async () => {
      await topMenuPage.assertPageUrl(pageUrl);
      await topMenuPage.assertJavaLabelVisible();
      await topMenuPage.assertNodeLabelVisible();
      await eyes?.check("Java Page", Target.window().fully().ignoreColors());
    });
  });
});
