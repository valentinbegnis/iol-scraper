import { Request, Response } from "express";
import { chromium, errors } from "playwright";
import { getPortfolioAssets as getAssets } from "../services/portfolio.service";
import { IOL_PORTFOLIO_URL } from "../constants";

export const getPortfolioAssets = async (_: Request, res: Response) => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(IOL_PORTFOLIO_URL);

    const userInput = await page.locator("#usuario");

    if (await userInput.isVisible()) {
      await userInput.fill(process.env.IOL_EMAIL!);
      await page.locator("#password").fill(process.env.IOL_PASSWORD!);
      await page.keyboard.press("Enter");
    }
  } catch (e) {
    if (e instanceof errors.TimeoutError) {
      res
        .status(408)
        .set("Connection", "close")
        .json({ name: e.name, message: e.message });
    }

    res.status(500).json({
      name: "Uncaught exception",
      message: "An unhandled exception was thrown in the page"
    });
  } finally {
    await page.waitForURL(IOL_PORTFOLIO_URL);
    const assets = await getAssets(page);
    await browser.close();
    res.json(assets);
  }
};
