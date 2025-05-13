import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly contentLocator;
  readonly totalPriceCell;
  readonly checkoutButton;

  constructor(page: Page) {
    this.page = page;
    this.contentLocator = page.locator('#content');
    this.checkoutButton = page.getByRole('link', { name: 'Checkout', exact: true });
  }

  async getPriceOfItem(itemName: string) {
    const row = this.page.locator('table.table-bordered tbody tr').filter({
      hasText: itemName,
    });
    return await row.locator('td.text-right:nth-child(6)').textContent();
  }

  async getTotalPrice() {
    return await this.page.locator('//*[@id="content"]/div[2]/div/table/tbody/tr[4]/td[2]').first().textContent();
  }

  async assertItemPriceVisible(price: string) {
    await expect(this.page.getByRole('cell', { name: price }).first()).toBeVisible();
  }

  async assertTotalPriceVisible(price: string) {
    const totalPriceRow = this.page.locator('table.table-bordered tfoot tr:last-child');
    await expect(totalPriceRow).toContainText(price);
  }

  async assertCartContentSnapshot() {
    await expect(this.contentLocator).toMatchAriaSnapshot(`- cell /\\$\\d+\\.\\d+/`);
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}