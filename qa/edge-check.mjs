import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require('C:/Users/Gaurav Kumar/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage({acceptDownloads:true});await page.goto('http://127.0.0.1:4173');
await page.locator('#offline-save').click();await page.waitForFunction(()=>document.querySelector('#offline-status').textContent.includes('ready'));
await page.evaluate(async()=>{const key=(await caches.keys()).find(k=>k.startsWith('exercise-v'));const c=await caches.open(key);await c.delete('./guides/plank.webm');});await page.locator('#offline-save').click();await page.waitForTimeout(2000);console.log('Cache repair status:',await page.locator('#offline-status').innerText());
await page.locator('#sets').fill('2');await page.locator('#sets').dispatchEvent('change');await page.locator('#target').fill('1');await page.locator('#target').dispatchEvent('change');await page.locator('#start-demo').click();await page.locator('#next-set').waitFor({state:'visible'});await page.locator('#finish').click();await page.locator('#sets-plus').click();console.log('Post-finish next button visible:',await page.locator('#next-set').isVisible());
await browser.close();
