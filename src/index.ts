import express from "express";
import { chromium, errors } from "playwright";

import { PORT, IOL_PORTFOLIO_URL } from "./constants";
import { getAssets } from "./getAssets";

const app = express();

app.get("/", async (_, res) => {
  res.send("test");
});

app.get("/portfolio-assets", async (_, res) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(IOL_PORTFOLIO_URL);

    const userInput = await page.locator("#usuario");

    // si no está el input estoy en el portfolio
    if (await userInput.isHidden()) {
      const assets = await getAssets(page);
      res.json(assets);
    }

    // estoy en el login
    await userInput.fill(process.env.IOL_EMAIL!);
    await page.locator("#password").fill(process.env.IOL_PASSWORD!);
    await page.keyboard.press("Enter");
    await page.waitForURL(IOL_PORTFOLIO_URL);

    const assets = await getAssets(page);
    res.json(assets);
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
    await browser.close();
  }
});

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
