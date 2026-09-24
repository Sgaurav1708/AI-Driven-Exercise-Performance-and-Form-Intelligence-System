from pathlib import Path
p=Path('dist/offline.js');s=p.read_text();s=s.replace("await navigator.serviceWorker.register('./sw.js');await reg.update();", "await navigator.serviceWorker.register('./sw.js',{updateViaCache:'none'});")
s=s.replace("catch{status.textContent='Download incomplete. Connect and retry.';}","catch(error){status.textContent=error.name==='QuotaExceededError'?'Not enough browser storage. Free some space and retry.':`Offline download failed: ${error.message||'browser storage unavailable'}. Keep this page open and retry.`;}")
s=s.replace("await refresh();}catch(error)","await refresh();navigator.storage?.persist?.().catch(()=>{});}catch(error)")
p.write_text(s,encoding='utf-8')
p=Path('dist/sw.js');s=p.read_text().replace('exercise-v2.1.1','exercise-v2.1.2');p.write_text(s)
