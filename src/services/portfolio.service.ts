import { Page } from "playwright";

export const getPortfolioAssets = async (page: Page) => {
  const tickers = await page.locator(".stock-link label").allInnerTexts();
  const values = await page
    .locator("[data-field=subTotalTitulo]")
    .allInnerTexts();
  const assets: Record<string, string> = {};

  for (let i = 0; i < tickers.length; i++) {
    assets[tickers[i]] = values[i];
  }

  return assets;
};
