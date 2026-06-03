import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });

// Mobile header only
const m1 = await browser.newContext({ viewport: { width: 390, height: 844 } });
const pm1 = await m1.newPage();
await pm1.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pm1.waitForTimeout(2000);
await pm1.screenshot({ path: './public/v-hdr-mobile.png', clip: { x:0, y:0, width:390, height:68 } });

// Mobile full page top
const m2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
const pm2 = await m2.newPage();
await pm2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pm2.waitForTimeout(2000);
await pm2.screenshot({ path: './public/v-home-mobile.png', fullPage: false });

// Desktop full page top
const d = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const pd = await d.newPage();
await pd.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pd.waitForTimeout(2000);
await pd.screenshot({ path: './public/v-home-desktop.png', fullPage: false });

await browser.close();
console.log('done');
