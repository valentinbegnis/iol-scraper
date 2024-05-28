import express from "express"
import { chromium } from "playwright"
import { PORT, IOL_URL } from "./constants"

const app = express()

app.get('/', async (req, res) => {
  res.send('test')
})

app.get('/scraper', async (req, res) => {
  const browser = await chromium.launch({ headless: false })  
  const page = await browser.newPage()

  try {
    await page.goto(IOL_URL)
    
    await page.locator('#usuario').fill(process.env.IOL_EMAIL!)
    await page.locator('#password').fill(process.env.IOL_PASSWORD!)
    // await page.locator('').click()
  } catch (e) {
    console.error(e)
  }

  await browser.close()
  res.send('Un éxito mi pana')
})

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))