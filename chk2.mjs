import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });

// Mobile header
const m = await browser.newContext({ viewport: { width: 390, height: 844 } });
const pm = await m.newPage();
await pm.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pm.waitForTimeout(2000);
await pm.screenshot({ path: './public/new-hdr-mobile.png', clip: { x:0, y:0, width:390, height:68 } });

// Desktop header
const d = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const pd = await d.newPage();
await pd.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pd.waitForTimeout(2000);
await pd.screenshot({ path: './public/new-hdr-desktop.png', clip: { x:0, y:0, width:1440, height:114 } });

// Footer desktop
const d2 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const pd2 = await d2.newPage();
await pd2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await pd2.waitForTimeout(2000);
await pd2.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await pd2.waitForTimeout(800);
await pd2.screenshot({ path: './public/new-footer.png', clip: { x:0, y:64, width:1440, height:300 } });

await browser.close();
console.log('done');
