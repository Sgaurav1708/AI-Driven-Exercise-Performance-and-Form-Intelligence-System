from pathlib import Path
p=Path('dist/sw.js');s=p.read_text(encoding='utf-8').replace('exercise-v2.1.2','exercise-v2.2.0').replace("'./engine.js',","'./engine.js','./training.js',")
s=s.replace("self.addEventListener('install'", "async function report(done){for(const client of await self.clients.matchAll({type:'window',includeUncontrolled:true}))client.postMessage({type:'OFFLINE_PROGRESS',done,total:ASSETS.length});}\nasync function fill(cache,missingOnly=false){let done=0;for(const asset of ASSETS){if(!missingOnly||!await cache.match(asset))await cache.add(new Request(asset,{cache:'reload'}));await report(++done);}}\nself.addEventListener('install'",1)
s=s.replace('await cache.addAll(ASSETS);','await fill(cache);').replace("for(const asset of ASSETS){if(!await cache.match(asset))await cache.add(new Request(asset,{cache:'reload'}));}","await fill(cache,true);")
p.write_text(s,encoding='utf-8')
p=Path('dist/offline.js');s=p.read_text(encoding='utf-8').replace('Offline Â· ready to train','Offline - ready to train').replace('guidesâ€¦','guides...')
s=s.replace("button.onclick=async()=>{button.disabled=true;", "button.onclick=async()=>{button.disabled=true;const progress=document.getElementById('offline-progress');if(progress){progress.hidden=false;progress.value=0;}")
s=s.replace("await refresh();navigator.storage", "await refresh();if(progress)progress.value=100;navigator.storage")
s += "\nnavigator.serviceWorker?.addEventListener('message',event=>{if(event.data?.type!=='OFFLINE_PROGRESS'||!button.disabled)return;const {done,total}=event.data;status.textContent=`Saving offline files: ${done} of ${total}`;const progress=document.getElementById('offline-progress');if(progress){progress.hidden=false;progress.value=Math.round(done/total*100);}});\n"
p.write_text(s,encoding='utf-8');Path('dist/offline-recovery.js').write_text(s,encoding='utf-8')
p=Path('dist/offline-repair.html');s=p.read_text(encoding='utf-8').replace('<p>Keep this page open','<progress id="offline-progress" max="100" value="0" hidden aria-label="Offline download progress"></progress><p>Keep this page open');p.write_text(s,encoding='utf-8')
