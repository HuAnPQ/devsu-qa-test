import { Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly laptopsAndNotebooksMenuLink;
  readonly showAllLaptopsAndNotebooksLink;
  readonly tabletsMenuLink;
  readonly camerasMenuLink;

  constructor(page: Page) {
    this.page = page;
    this.laptopsAndNotebooksMenuLink = page.locator('#menu').getByRole('link', { name: 'Laptops & Notebooks', exact: true });
    this.showAllLaptopsAndNotebooksLink = page.getByRole('link', { name: 'Show All Laptops & Notebooks' });
    this.tabletsMenuLink = page.getByRole('link', { name: 'Tablets' });
    this.camerasMenuLink = page.getByRole('link', { name: 'Cameras' });
  }

  async gotoHomePage() {
    await this.page.goto('http://opencart.abstracta.us/');
  }

  async navigateToLaptopsAndNotebooks() {
    await this.laptopsAndNotebooksMenuLink.click();
    await this.showAllLaptopsAndNotebooksLink.click();
  }

  async navigateToTablets() {
    await this.tabletsMenuLink.click();
  }

  async navigateToCameras() {
    await this.camerasMenuLink.click();
  }
}