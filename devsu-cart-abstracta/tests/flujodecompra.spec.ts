import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { CategoryPage } from '../pages/categoryPage';
import { ProductPage } from '../pages/productPage';
import { CartPage } from '../pages/cartPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { OrderSuccessPage } from '../pages/orderSuccessPage';

test.describe("Test Suite -Flujo de compra", async () => {
  test('TC001 -POM -Finalizar compra como invitado', async ({ page }) => {
    const homePage = new HomePage(page);
    const categoryPage = new CategoryPage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderSuccessPage = new OrderSuccessPage(page);

    await test.step("Ir al Home de la pagina", async () => {
      await homePage.gotoHomePage();
    });

    await test.step("Añadir una MacBook Air", async () => {
      await homePage.navigateToLaptopsAndNotebooks();
      await categoryPage.selectProduct('MacBook Air');
      await productPage.clickAddToCart();
    });

    await test.step("Añadir una Samsung Galaxy Tab 10.1", async () => {
      await homePage.navigateToTablets();
      await categoryPage.selectProduct('Samsung Galaxy Tab 10.1');
      await productPage.clickAddToCart();
    });

    await test.step("Añadir una Camera", async () => {
      await homePage.navigateToCameras();
      await categoryPage.addNthProductToCart(1);
    });

    await test.step("Visulizar el carrito", async () => {
      await productPage.clickViewCart();
    });

    await test.step("Validar datos en el carrito", async () => {
      await cartPage.assertCartContentSnapshot();
      await cartPage.assertItemPriceVisible('$241.99');
      await expect(async () => {
        const totalPrice = await cartPage.getTotalPrice();
        expect(totalPrice).toBe('$1,541.99');
      }).toPass({ timeout: 5000 });
    });

    await test.step("Continuar la compra como invitado", async () => {
      await cartPage.clickCheckout();
      await checkoutPage.selectGuestCheckout();
    });

    await test.step("Completar los datos obligatorios", async () => {
      await checkoutPage.fillBillingDetails({
        firstName: 'Invitado',
        lastName: 'Apellido',
        email: 'invitado@gmail.com',
        telephone: '0987654321',
        address1: 'Quito',
        city: 'Quito',
        country: '62',
        postCode: 'ec13059',
        regionState: '997',
      });
    });

    await test.step("Aceptar los termino y condiciones", async () => {
      await checkoutPage.addDeliveryComment('okey');
      await checkoutPage.agreeToTermsAndConditions();
    });

    await test.step("Confirmar la orden", async () => {
      await checkoutPage.confirmOrder();
      await orderSuccessPage.assertOrderPlacedSuccessfully();
    });

    await test.step("Regresar a la pantalla principal", async () => {
      await orderSuccessPage.clickContinue();
      await orderSuccessPage.assertCartIsEmpty();
    });

  });
});
