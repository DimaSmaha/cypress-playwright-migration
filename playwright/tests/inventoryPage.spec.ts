import { itemsNames } from "playwright/constants/data.json";
import { test, expect } from "playwright/app/fixtures/test.fixture";

test.describe("InventoryPage tests", () => {
  test.beforeEach(async ({ pageManager }) => {
    await pageManager.loginPage.loginWithValidData();
  });

  test("The user should add item to the cart", async ({ pageManager }) => {
    await expect(pageManager.inventoryPage.item.itemByName("Bike Light")).toHaveText(itemsNames.bikeLight);
    await pageManager.inventoryPage.item.addToCartByName("Bike Light");
    await pageManager.inventoryPage.assertCartLogoItems(1);
  });

  test("The user should remove item from the cart", async ({ pageManager }) => {
    await expect(pageManager.inventoryPage.backbackItem()).toHaveText(itemsNames.backpackItemName);
    await pageManager.inventoryPage.clickBackbackAddItemButton();
    await pageManager.inventoryPage.assertCartLogoItems(1);
    await pageManager.inventoryPage.clickBackbackRemoveItemButton();
    await expect(pageManager.inventoryPage.shoppingCartLogo()).toBeEmpty();
  });

  test("The user should add multiple items to the cart", async ({ pageManager }) => {
    await expect(pageManager.inventoryPage.backbackItem()).toHaveText(itemsNames.backpackItemName);
    await pageManager.inventoryPage.clickBackbackAddItemButton();
    await pageManager.inventoryPage.assertCartLogoItems(1);
    await pageManager.inventoryPage.clickBikeLightsAddItemButton();
    await pageManager.inventoryPage.assertCartLogoItems(2);
  });
});
