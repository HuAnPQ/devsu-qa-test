import { Page } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly addToCartButton;
  //readonly cartButton;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    //this.cartButton = page.getByRole('button', { name: /^\d+ item\(s\) - \$[\d,.]+/ });
  }

  async clickAddToCart() {
    await this.addToCartButton.click();
  }

  async clickViewCart() {
    //await this.cartButton.click();
    await this.page.getByRole('button', { name: ' 3 item(s) - $' }).click();
    await this.page.getByRole('link', { name: ' View Cart' }).click();
  }

  async getProductPrice() {
    const priceElement = await this.page.getByRole('heading', { name: '$' }).locator('xpath=following-sibling::p[@class="price"]');
    const priceText = await priceElement.textContent();
    return priceText ? priceText.split(' ')[0] : '';
  }
}