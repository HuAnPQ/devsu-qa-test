import { Page, expect, Locator } from '@playwright/test';

export class OrderSuccessPage {
  readonly page: Page;
  readonly contentLocator: Locator;
  readonly successHeading: Locator;
  readonly continueLink: Locator;
  readonly cartTotalLocator: Locator;


  constructor(page: Page) {
    this.page = page;
    this.contentLocator = page.locator('#content');
    this.successHeading = page.getByRole('heading', { name: 'Your order has been placed!' });
    this.continueLink = page.getByRole('link', { name: 'Continue' });
    this.cartTotalLocator = page.locator('#cart-total'); // Locator for the cart total in the header
  }

  async assertOrderPlacedSuccessfully() {
    await expect(this.successHeading).toBeVisible();
    await expect(this.contentLocator).toContainText('Your order has been placed!');
    await expect(this.contentLocator).toContainText('Thanks for shopping with us online!');
  }

  async clickContinue() {
    await this.continueLink.click();
  }

  async assertCartIsEmpty() {
     await expect(this.cartTotalLocator).toContainText('0 item(s) - $0.00');
  }
}