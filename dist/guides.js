// Landmark diagrams used by the labelled simulation and instructional videos.
export function guidePose(key,t){
 const phase=(1-Math.cos(t/4200*2*Math.PI))/2;
 const theta=(170-phase*(key==='curl'?135:key==='pullup'?115:95))*Math.PI/180;
 const p=Array.from({length:33},()=>({x:.5,y:.5,z:0,visibility:0}));
 const set=(i,x,y)=>p[i]={x:x/960,y:y/600,z:0,visibility:.98};
 if(key==='squat'){
 const hip=[500+105*Math.sin(theta),345+105*Math.cos(theta)];set(23,...hip);set(25,500,345);set(27,500,455);set(11,hip[0]-18,hip[1]-120);set(13,hip[0]-65,hip[1]-63);set(15,hip[0]-110,hip[1]-98);
 }else if(key==='curl'){
 set(11,470,175);set(13,470,280);set(15,470-100*Math.sin(theta),280-100*Math.cos(theta));set(23,465,335);set(25,460,410);set(27,460,470);
 }else if(key==='press'||key==='pullup'){
 const y=key==='pullup'?245-phase*75:245;
 set(11,440,y);set(13,360,y-35);const a=Math.atan2(35,80)-theta;set(15,360+90*Math.cos(a),y-35+90*Math.sin(a));
 set(23,440,y+115);set(25,430,y+190);set(27,430,y+255);
 }else if(key==='plank'){
 set(11,290,270);set(13,300,370);set(15,400,370);set(23,490,300);set(25,630,321);set(27,770,342);
 }else{
 const shoulder=[390+100*Math.sin(theta),345+100*Math.cos(theta)];set(11,...shoulder);set(13,390,345);set(15,390,455);set(23,shoulder[0]+145,shoulder[1]+65);set(25,shoulder[0]+230,shoulder[1]+100);set(27,shoulder[0]+325,shoulder[1]+145);
 }
 for(const [a,b] of [[11,12],[13,14],[15,16],[23,24],[25,26],[27,28]])p[b]={...p[a],x:p[a].x+.025};
 return p;
}
const GUIDE_STEPS={
 squat:['Side view: hips, knees and ankles','Bend with a controlled tempo','Return to your standing start'],
 curl:['Side view: shoulder, elbow, wrist','Curl with your upper arm still','Lower back to extended arms'],
 pushup:['Side view: keep your body visible','Bend elbows with control','Push back to extended arms'],
 plank:['Side view: show the whole body','Keep shoulders, hips, ankles aligned','Hold steady; keep breathing'],
 press:['Front view: show both arms','Lower hands toward shoulder level','Press overhead to extend arms'],
 pullup:['Front view: show bar and arms','Pull upward with control','Lower back to extended arms']
};
export function drawGuide(ctx,key,t){
 const names={squat:'SQUATS',curl:'BICEP CURLS',pushup:'PUSH-UPS',plank:'PLANK',press:'SHOULDER PRESS',pullup:'PULL-UPS'};
 const stage=key==='plank'?Math.min(2,Math.floor(t/2800)):t%4200<700?0:t%4200<2400?1:2;
 ctx.fillStyle='#101c18';ctx.fillRect(0,0,960,600);ctx.fillStyle='#c5f27b';ctx.font='bold 28px sans-serif';ctx.fillText(names[key],35,48);
 ctx.fillStyle='#b9c7be';ctx.font='17px sans-serif';ctx.fillText('ANIMATED FORM GUIDE  /  '+(['press','pullup'].includes(key)?'FRONT VIEW':'SIDE VIEW'),35,80);
 GUIDE_STEPS[key].forEach((text,i)=>{const y=145+i*95;ctx.fillStyle=stage===i?'#c5f27b':'#6e8378';ctx.font='bold 25px sans-serif';ctx.fillText('0'+(i+1),35,y);ctx.font='18px sans-serif';const words=text.split(' ');let line='',lineY=y+30;for(const word of words){if(ctx.measureText(line+word).width>290){ctx.fillText(line,35,lineY);line=word+' ';lineY+=24;}else line+=word+' ';}ctx.fillText(line,35,lineY);});
 ctx.save();ctx.translate(220,38);ctx.scale(.85,.85);
 const p=guidePose(key,t),xy=i=>[p[i].x*960,p[i].y*600];
 const line=(a,b,width,color)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(...xy(a));ctx.lineTo(...xy(b));ctx.stroke();};
 ctx.strokeStyle='#345046';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(190,535);ctx.lineTo(850,535);ctx.stroke();
 for(const [a,b] of [[12,14],[14,16],[24,26],[26,28]])line(a,b,18,'#4d695a');
 line(11,23,35,'#659761');
 for(const [a,b] of [[11,13],[13,15],[23,25],[25,27]]){line(a,b,22,'#91bd71');line(a,b,10,'#c5f27b');}
 ctx.fillStyle='#b4d791';ctx.beginPath();ctx.arc(p[11].x*960,p[11].y*600-39,22,0,Math.PI*2);ctx.fill();
 const ids=key==='squat'?[23,25,27]:key==='plank'?[11,23,27]:[11,13,15];
 for(const i of [11,13,15,23,25,27]){ctx.beginPath();ctx.arc(...xy(i),ids.includes(i)?8:5,0,Math.PI*2);ctx.fillStyle=ids.includes(i)?'#ffffff':'#578347';ctx.fill();}
 const [a,b,c]=ids.map(xy);const aa=Math.atan2(a[1]-b[1],a[0]-b[0]),bb=Math.atan2(c[1]-b[1],c[0]-b[0]);let delta=((bb-aa+Math.PI*3)%(Math.PI*2))-Math.PI;ctx.strokeStyle='#f1c87a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(b[0],b[1],34,aa,aa+delta,delta<0);ctx.stroke();
 ctx.fillStyle='#f1c87a';ctx.font='bold 20px sans-serif';ctx.fillText(Math.round(Math.abs(delta)*180/Math.PI)+'°',b[0]+44,b[1]);
 ctx.restore();ctx.fillStyle='#20382c';ctx.fillRect(35,488,890,62);ctx.fillStyle='#e4eedb';ctx.font='18px sans-serif';ctx.fillText(key==='plank'?'TRACKING: aligned hold time':'TRACKING: extended start → bend → extended finish',52,514);ctx.font='15px sans-serif';ctx.fillStyle='#b9c7be';ctx.fillText(key==='pullup'?'Elbow movement is counted; chin clearance is not measured.':'Highlighted joints show what the camera needs to see.',52,538);
 ctx.fillStyle='#c5f27b';ctx.fillRect(35,569,890*((t%4200)/4200),4);
}
