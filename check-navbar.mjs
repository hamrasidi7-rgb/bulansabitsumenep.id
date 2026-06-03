import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });

// Desktop
const ctx1 = await browser.newContext({ viewport: { width: 1440, height: 200 } });
const p1 = await ctx1.newPage();
await p1.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await p1.waitForTimeout(1500);
await p1.screenshot({ path: './public/nav-desktop.png', clip: { x:0, y:0, width:1440, height:90 } });
console.log('✓ desktop');

// Mobile 390px
const ctx2 = await browser.newContext({ viewport: { width: 390, height: 200 } });
const p2 = await ctx2.newPage();
await p2.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await p2.waitForTimeout(1500);
await p2.screenshot({ path: './public/nav-mobile.png', clip: { x:0, y:0, width:390, height:75 } });
console.log('✓ mobile');

await browser.close();
