const $ = id => document.getElementById(id);
function atlasContext(){
  const selected=document.querySelector('[data-exercise].selected');
  return {
    exercise:selected?.textContent?.trim() || 'unknown',
    metric:`${$('reps')?.textContent || '0'} ${$('target-display')?.textContent || ''}`.trim(),
    phase:$('phase')?.textContent || 'unknown',
    confidence:$('confidence')?.textContent ? $('confidence').textContent+'%' : 'unknown',
    feedback:$('feedback')?.textContent || 'none'
  };
}
async function askAtlas(question){
  const button=$('ask-atlas');
  const input=$('atlas-question');
  const feedback=$('feedback');
  if(!button||!feedback)return;
  const old=button.textContent;
  button.disabled=true; button.textContent='Atlas is thinking…';
  try{
    const r=await fetch('/.netlify/functions/atlas-coach',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({question,context:atlasContext()})
    });
    const data=await r.json();
    if(!r.ok)throw new Error(data.error||'AI coach unavailable');
    feedback.textContent=data.text;
    if($('voice')?.checked && 'speechSynthesis' in window){
      speechSynthesis.cancel();
      const u=new SpeechSynthesisUtterance(data.text);
      u.rate=Number($('voice-rate')?.value||0.95);
      u.pitch=Number($('voice-pitch')?.value||1);
      const chosen=speechSynthesis.getVoices().find(v=>v.name===$('voice-select')?.value);
      if(chosen)u.voice=chosen;
      speechSynthesis.speak(u);
    }
  }catch(e){feedback.textContent=e.message+'. Rule-based coaching remains available.';}
  finally{button.disabled=false;button.textContent=old;if(input)input.value='';}
}
$('ask-atlas')?.addEventListener('click',()=>askAtlas($('atlas-question')?.value.trim()));
$('atlas-question')?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();askAtlas(e.currentTarget.value.trim());}});
document.querySelectorAll('[data-ai-prompt]').forEach(b=>b.addEventListener('click',()=>askAtlas(b.dataset.aiPrompt)));
