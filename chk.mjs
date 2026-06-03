import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });

// Mobile header
const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
const pm = await m.newPage();
await pm.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pm.waitForTimeout(1800);
await pm.screenshot({ path: './public/chk-navbar-mobile.png', clip: { x:0, y:0, width:390, height:68 } });

// Footer desktop
const d = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const pd = await d.newPage();
await pd.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pd.waitForTimeout(1800);
await pd.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await pd.waitForTimeout(800);
await pd.screenshot({ path: './public/chk-footer.png', fullPage: false });

// Footer mobile
const m2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
const pm2 = await m2.newPage();
await pm2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pm2.waitForTimeout(1800);
await pm2.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await pm2.waitForTimeout(800);
await pm2.screenshot({ path: './public/chk-footer-mobile.png', fullPage: false });

await browser.close();
console.log('done');
