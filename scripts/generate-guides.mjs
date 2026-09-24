import {createRequire} from 'node:module';
import {mkdir,writeFile} from 'node:fs/promises';
const require=createRequire(import.meta.url);const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const browser=await chromium.launch({headless:true,channel:"msedge"});const page=await browser.newPage();await page.goto('http://127.0.0.1:4173');await mkdir('dist/guides',{recursive:true});
for(const key of ['squat','curl','pushup','plank','press','pullup']){
 const data=await page.evaluate(async key=>{const {drawGuide}=await import('/guides.js');const c=document.createElement('canvas');c.width=960;c.height=600;const ctx=c.getContext('2d');const stream=c.captureStream(24);const rec=new MediaRecorder(stream,{mimeType:'video/webm;codecs=vp8',videoBitsPerSecond:350000});const chunks=[];rec.ondataavailable=e=>chunks.push(e.data);const done=new Promise(r=>rec.onstop=r);rec.start();const start=performance.now();await new Promise(resolve=>{function frame(){const t=performance.now()-start;drawGuide(ctx,key,t);if(t<8400)requestAnimationFrame(frame);else resolve();}frame();});rec.stop();await done;stream.getTracks().forEach(t=>t.stop());return Array.from(new Uint8Array(await new Blob(chunks).arrayBuffer()));},key);
 await writeFile(`dist/guides/${key}.webm`,Buffer.from(data));console.log(key,data.length);
}await browser.close();


