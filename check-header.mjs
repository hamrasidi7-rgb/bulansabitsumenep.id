import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });

// Desktop full width
const d = await browser.newContext({ viewport: { width: 1440, height: 100 } });
const pd = await d.newPage();
await pd.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pd.waitForTimeout(1500);
await pd.screenshot({ path: './public/hdr-desktop.png', clip: { x:0, y:0, width:1440, height:114 } });

// Tablet
const t = await browser.newContext({ viewport: { width: 768, height: 100 } });
const pt = await t.newPage();
await pt.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pt.waitForTimeout(1500);
await pt.screenshot({ path: './public/hdr-tablet.png', clip: { x:0, y:0, width:768, height:80 } });

// Mobile
const m = await browser.newContext({ viewport: { width: 390, height: 100 } });
const pm = await m.newPage();
await pm.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pm.waitForTimeout(1500);
await pm.screenshot({ path: './public/hdr-mobile.png', clip: { x:0, y:0, width:390, height:75 } });

await browser.close();
console.log('done');
