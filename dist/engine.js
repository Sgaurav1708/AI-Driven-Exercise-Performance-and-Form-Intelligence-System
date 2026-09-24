export const EXERCISES = {
  squat: {name:'Squats',type:'LOWER BODY',joint:'KNEE ANGLE',up:150,down:115,settle:100,indices:[23,25,27],other:[24,26,28],tips:['Stand side-on, with hips, knees and ankles visible.','Bend comfortably; the counter looks for a knee angle below 115°.','Stand tall again, above 150°, to finish a rep.'],setup:'Stand side-on to the camera with hips, knees and ankles visible. Start standing tall. The counter needs a bend below 115° and a return above 150°. Do not force a painful movement.'},
  curl: {name:'Bicep curls',type:'UPPER BODY',joint:'ELBOW ANGLE',up:150,down:55,indices:[11,13,15],other:[12,14,16],tips:['Keep shoulder, elbow and wrist visible from the side.','Keep your upper arm close to your torso.','Lower your arm fully to complete each curl.'],setup:'Stand side-on with your shoulder, elbow and wrist visible. Start with your arm extended. Keep your upper arm still.'},
  press: {name:'Shoulder press',type:'UPPER BODY',joint:'ELBOW ANGLE',up:155,down:100,indices:[11,13,15],other:[12,14,16],tips:['Face the camera with both arms visible.','Start with hands above shoulders and arms extended.','Lower to shoulder level, then press overhead.'],setup:'Face the camera. Keep wrists above shoulders and elbows at shoulder level or higher. Start with arms extended overhead.'},
  pullup: {name:'Pull-ups',type:'UPPER BODY',joint:'ELBOW ANGLE',up:155,down:75,indices:[11,13,15],other:[12,14,16],tips:['Show your shoulders, elbows and wrists.','Begin hanging with arms extended overhead.','Pull up, then lower under control to complete a cycle.'],setup:'Place the camera in front, with the bar and upper body visible. Start with extended arms. Elbow motion is tracked; chin clearance is not assessed.'},
  plank: {name:'Plank',type:'CORE HOLD',joint:'BODY ALIGNMENT',hold:true,up:160,down:0,indices:[11,23,27],other:[12,24,28],tips:['Place the camera low, directly side-on.','Keep shoulders, hips and ankles in one line.','Hold a steady horizontal body position.'],setup:'Use a side view with shoulders, hips and ankles visible. Hold a horizontal plank. The timer advances only while your body is aligned and tracking is clear.'},
  pushup: {name:'Push-ups',type:'UPPER BODY',joint:'ELBOW ANGLE',up:155,down:95,indices:[11,13,15],other:[12,14,16],tips:['Position the camera low and side-on.','Keep your shoulders, hips and ankles in one line.','Bend your elbows, then return to straight arms.'],setup:'Place the camera low, side-on, with your whole body visible. Start in the top push-up position with your arms extended.'}
};
export function angle(a,b,c){const x=a.x-b.x,y=a.y-b.y,u=c.x-b.x,v=c.y-b.y;const n=Math.hypot(x,y)*Math.hypot(u,v);return n<1e-8?NaN:Math.acos(Math.max(-1,Math.min(1,(x*u+y*v)/n)))*180/Math.PI;}
export class RepCounter {
  constructor(exercise){this.config=EXERCISES[exercise];this.reps=0;this.resetCycle();this.lastRep=-Infinity;}
  resetCycle(){this.phase='Ready';this.stage='seek';this.candidate='';this.since=0;this.filtered=null;this.lastValid=null;this.lostAt=null;}
  update(degrees,confidence,time){if(confidence<.65||!Number.isFinite(degrees)){if(this.lostAt===null)this.lostAt=time;if(time-this.lostAt>250)this.resetCycle();this.phase='Tracking lost';this.candidate='';this.since=time;return false;}
    if(this.lastValid!==null&&time-this.lastValid>350)this.resetCycle();
    this.lostAt=null;
    const alpha=this.lastValid===null?1:1-Math.exp(-Math.max(0,time-this.lastValid)/65);
    this.filtered=this.filtered===null?degrees:this.filtered+(degrees-this.filtered)*alpha;
    this.lastValid=time;
    const zone=this.filtered>=this.config.up?'up':this.filtered<=this.config.down?'down':'middle';
    if(zone!==this.candidate){this.candidate=zone;this.since=time;}
    if(time-this.since<(this.config.settle??180))return false;
    if(this.stage==='seek'&&zone==='up'){this.stage='top';this.phase='Extended';}
    else if(this.stage==='top'&&zone==='down'){this.stage='bottom';this.phase='Bent';this.bottomAt=time;}
    else if(this.stage==='bottom'&&zone==='up'){this.stage='top';this.phase='Extended';if(time-this.bottomAt>=350&&time-this.lastRep>=1100){this.reps++;this.lastRep=time;return true;}}
    else if(zone==='middle'){this.phase=this.stage==='bottom'?'Returning':this.stage==='top'?'Lowering':'Find start';}
    else if(zone==='up'&&this.stage==='top')this.phase='Extended';
    else if(zone==='down'&&this.stage==='bottom')this.phase='Bent';
    return false;
  }
}

export class HoldCounter {
  constructor(){this.reps=0;this.seconds=0;this.phase='Ready';this.lastValid=null;}
  resetCycle(){this.lastValid=null;this.phase='Ready';}
  update(degrees,confidence,time){
    const valid=confidence>=.65&&Number.isFinite(degrees)&&degrees>=160;
    this.phase=confidence<.65?'Tracking lost':valid?'Holding':'Align body';
    if(valid&&this.lastValid!==null&&time-this.lastValid<=250)this.seconds+=Math.max(0,time-this.lastValid)/1000;
    this.lastValid=valid?time:null;return false;
  }
}
export function poseMeasurement(key,points,width,height){
 const cfg=EXERCISES[key], score=ids=>Math.min(...ids.map(i=>{const p=points[i];return p&&p.x>.015&&p.x<.985&&p.y>.015&&p.y<.985?(p.visibility??0):0;}));
 const ids=score(cfg.indices)>=score(cfg.other)?cfg.indices:cfg.other;
 const scaled=points.map(p=>({...p,x:p.x*width,y:p.y*height}));
 let needed=ids;
 if(key==='pushup')needed=[...ids,ids[0]===11?23:24,ids[0]===11?27:28];
 let confidence=score(needed),degrees=angle(...ids.map(i=>scaled[i]));
 if(key==='press'||key==='pullup'){
  const [shoulder,elbow,wrist]=ids.map(i=>points[i]);
  if(wrist.y>=shoulder.y||elbow.y>shoulder.y+.1)confidence=0;
 }
 if(key==='plank'){
  const [shoulder,,ankle]=ids.map(i=>scaled[i]);
  if(Math.abs(shoulder.y-ankle.y)>Math.abs(shoulder.x-ankle.x)*.6)degrees=0;
 }
 return {ids,scaled,conf:confidence,deg:degrees};
}
