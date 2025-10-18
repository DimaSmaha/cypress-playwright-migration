import { test as base, expect } from "@playwright/test";
import { PageManager } from "../pageobjects/pageManager";

export const test = base.extend<{
  pageManager: PageManager;
}>({
  pageManager: async ({ page }, use) => {
    const manager = new PageManager(page);
    await use(manager);
  },
});
export { expect };
