import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly guestCheckoutRadio: Locator;
  readonly registerAccountRadio: Locator;
  readonly continueButton: Locator;
  readonly continueButtonShipping: Locator;
  // Billing Details fields
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly telephoneInput: Locator;
  readonly address1Input: Locator;
  readonly cityInput: Locator;
  readonly countrySelect: Locator;
  readonly postCodeInput: Locator;
  readonly regionStateSelect: Locator;
  // Delivery Method fields
  readonly deliveryCommentTextarea: Locator;
  // Payment Method fields
  readonly termsAndConditionsCheckbox: Locator;
  readonly confirmOrderButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.guestCheckoutRadio = page.getByRole('radio', { name: 'Guest Checkout' });
    this.registerAccountRadio = page.getByRole('radio', { name: 'Register Account' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.continueButtonShipping = page.locator('#button-shipping-method');

    // Billing Details
    this.firstNameInput = page.getByRole('textbox', { name: '* First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: '* Last Name' });
    this.emailInput = page.getByRole('textbox', { name: '* E-Mail' });
    this.telephoneInput = page.getByRole('textbox', { name: '* Telephone' });
    this.address1Input = page.getByRole('textbox', { name: '* Address 1' });
    this.cityInput = page.getByRole('textbox', { name: '* City' });
    this.countrySelect = page.getByLabel('Country');
    this.postCodeInput = page.getByRole('textbox', { name: '* Post Code' });
    this.regionStateSelect = page.getByLabel('Region / State');

    // Delivery Method
    this.deliveryCommentTextarea = page.locator('textarea[name="comment"]');

    // Payment Method
    this.termsAndConditionsCheckbox = page.getByRole('checkbox');
    this.confirmOrderButton = page.getByRole('button', { name: 'Confirm Order' });
  }

  async selectGuestCheckout() {
    await this.guestCheckoutRadio.check();
    await this.continueButton.click();
  }

  async fillBillingDetails(details: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    address1: string;
    city: string;
    country: string; // Use value or label
    postCode: string;
    regionState: string; // Use value or label
  }) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.emailInput.fill(details.email);
    await this.telephoneInput.fill(details.telephone);
    await this.address1Input.fill(details.address1);
    await this.cityInput.fill(details.city);
    await this.countrySelect.selectOption(details.country);
    await this.regionStateSelect.selectOption(details.regionState);
    await this.postCodeInput.fill(details.postCode);

    await this.continueButton.click();
  }

  async addDeliveryComment(comment: string) {
    await this.deliveryCommentTextarea.fill(comment);
    await this.continueButtonShipping.click();
  }

  async agreeToTermsAndConditions() {
    await this.termsAndConditionsCheckbox.check();
    await this.continueButton.click();
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}