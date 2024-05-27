import express from "express"
import { chromium } from "playwright-chromium"

const app = express()

app.get('/', async (req, res) => {
  const browser = await chromium.launch({ headless: false })  
  const page = await browser.newPage()

  try {
    await page.waitForURL(
      'https://micuenta.invertironline.com/ingresar?url=https://iol.invertironline.com/MiCuenta/MiPortafolio',
    )
    
    const usernameInput = await page.$('#usuario')
    
    console.log(usernameInput);
  } catch (e) {
    console.error(e)
  }

  await browser.close()
})

app.listen(3000, () => console.log('Server running on port 3000...'))