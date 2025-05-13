import { Page } from '@playwright/test';

export class CategoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectProduct(productName: string) {
    await this.page.getByText(productName, { exact: true }).click();
  }

  async addNthProductToCart(index: number) {
    await this.page.getByRole('button', { name: ' Add to Cart' }).nth(index).click();
  }
}