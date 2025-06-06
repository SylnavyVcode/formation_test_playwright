import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  // This class represents the home page of the Playwright website.
  // It contains methods to interact with the page, such as navigating to it and clicking the "Get started" link.
  // The class uses Playwright's Page and Locator types for type safety and better code completion.
  // The constructor takes a Page object as an argument, which is used to interact with the page.

  // Variables
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly title:RegExp

  // Constructor
  // The constructor initializes the page and the getStartedLink locator.
  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole("link", { name: "Get started" });
    this.title = /Playwright/;
  }

  // Methods
  // The goto method navigates to the home page of the Playwright website.
  async goto() {
    await this.page.goto("/");
  }

  async clickGetStarted() {
    await this.getStartedLink.click();
  }

  async assertPageTitle() {
    // This method asserts that the page title matches the expected title.
    await expect(this.page).toHaveTitle(this.title);
  }
}

export default HomePage;