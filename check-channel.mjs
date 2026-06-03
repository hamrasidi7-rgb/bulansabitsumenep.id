import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });

// Desktop — section kanal
const ctx1 = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p1 = await ctx1.newPage();
await p1.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await p1.waitForTimeout(2500);
await p1.evaluate(() => window.scrollTo(0, window.innerHeight));
await p1.waitForTimeout(1500);
await p1.screenshot({ path: './public/channel-desktop.png', fullPage: false });

// Mobile — section kanal
const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
const p2 = await ctx2.newPage();
await p2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await p2.waitForTimeout(2500);
await p2.evaluate(() => window.scrollTo(0, window.innerHeight));
await p2.waitForTimeout(1500);
await p2.screenshot({ path: './public/channel-mobile.png', fullPage: false });

await browser.close();
console.log('done');
