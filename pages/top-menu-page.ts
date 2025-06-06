import { expect, type Locator, type Page } from "@playwright/test";

export class TopMenuPage {
  // Variables
  readonly page: Page;
  readonly getStartedLink: Locator;
  readonly nodeLink: Locator;
  readonly javaLink: Locator;
  readonly nodeLabel: Locator;
  readonly javaLabel: Locator;
  readonly nodeDescription: string = "Installing Playwright";
  readonly javaDescription: string =
    "Playwright is distributed as a set of Maven modules";

  // Constructor
  // The constructor initializes the page and the getStartedLink locator.
  constructor(page: Page) {
    this.page = page;
    this.getStartedLink = page.getByRole("link", { name: "Get started" });
    this.nodeLink = page.getByRole("button", { name: "Node.js" });
    this.javaLink = page.getByRole("navigation", { name: 'Main' }).getByText("Java", { exact: true });
    this.nodeLabel = page.getByText(this.nodeDescription, { exact: true });
    this.javaLabel = page.getByText(this.javaDescription);
  }

  // Methods
  // The goto method navigates to the home page of the Playwright website.
  async clickGetStarted() {
    await this.getStartedLink.click();
  }
  async hoverNode() {
    await this.nodeLink.hover();
  }
  async clickJava() {
    await this.javaLink.click();
  }
  async assertNodeLabelVisible() {
    await expect(this.nodeLabel).not.toBeVisible();
  }
  async assertJavaLabelVisible() {
    await expect(this.javaLabel).toBeVisible();
  }
  async assertPageUrl(pageUrl: RegExp | string) {
    await expect(this.page).toHaveURL(pageUrl);
  }
}

export default TopMenuPage;
