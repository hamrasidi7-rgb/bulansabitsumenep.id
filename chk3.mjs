import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const d = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const pd = await d.newPage();
await pd.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pd.waitForTimeout(2000);

// Get footer position
const footerY = await pd.evaluate(() => {
  const f = document.querySelector('footer');
  return f ? f.getBoundingClientRect().top + window.scrollY : 0;
});
await pd.evaluate((y) => window.scrollTo(0, y), footerY);
await pd.waitForTimeout(600);
await pd.screenshot({ path: './public/new-footer2.png', fullPage: false });
await browser.close();
console.log('footerY:', footerY);
