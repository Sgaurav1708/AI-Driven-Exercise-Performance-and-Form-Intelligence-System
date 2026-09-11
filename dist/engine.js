export const EXERCISES = {
  squat: {name:'Squats',type:'LOWER BODY',joint:'KNEE ANGLE',up:160,down:100,indices:[23,25,27],other:[24,26,28],tips:['Stand side-on, with hips, knees and ankles visible.','Bend your knees with a controlled descent.','Return to a tall standing position to finish a rep.'],setup:'Place the camera at hip height, side-on. Keep your hips, knees and feet in the frame. Start standing tall.'},
  curl: {name:'Bicep curls',type:'UPPER BODY',joint:'ELBOW ANGLE',up:150,down:55,indices:[11,13,15],other:[12,14,16],tips:['Keep shoulder, elbow and wrist visible from the side.','Keep your upper arm close to your torso.','Lower your arm fully to complete each curl.'],setup:'Stand side-on with your shoulder, elbow and wrist visible. Start with your arm extended. Keep your upper arm still.'},
  pushup: {name:'Push-ups',type:'UPPER BODY',joint:'ELBOW ANGLE',up:155,down:95,indices:[11,13,15],other:[12,14,16],tips:['Position the camera low and side-on.','Keep your shoulders, hips and ankles in one line.','Bend your elbows, then return to straight arms.'],setup:'Place the camera low, side-on, with your whole body visible. Start in the top push-up position with your arms extended.'}
};
export function angle(a,b,c){const x=a.x-b.x,y=a.y-b.y,u=c.x-b.x,v=c.y-b.y;const n=Math.hypot(x,y)*Math.hypot(u,v);return n<1e-8?NaN:Math.acos(Math.max(-1,Math.min(1,(x*u+y*v)/n)))*180/Math.PI;}
export class RepCounter {
  constructor(exercise){this.config=EXERCISES[exercise];this.reps=0;this.resetCycle();this.lastRep=-Infinity;}
  resetCycle(){this.phase='Ready';this.stage='seek';this.candidate='';this.since=0;this.filtered=null;}
  update(degrees,confidence,time){if(confidence<.65||!Number.isFinite(degrees)){this.resetCycle();return false;}
    this.filtered=this.filtered===null?degrees:this.filtered*.65+degrees*.35;
    const zone=this.filtered>=this.config.up?'up':this.filtered<=this.config.down?'down':'middle';
    if(zone!==this.candidate){this.candidate=zone;this.since=time;}
    if(time-this.since<180)return false;
    if(this.stage==='seek'&&zone==='up'){this.stage='top';this.phase='Extended';}
    else if(this.stage==='top'&&zone==='down'){this.stage='bottom';this.phase='Bent';this.bottomAt=time;}
    else if(this.stage==='bottom'&&zone==='up'){this.stage='top';this.phase='Extended';if(time-this.bottomAt>=350&&time-this.lastRep>=1100){this.reps++;this.lastRep=time;return true;}}
    else if(zone==='middle'){this.phase=this.stage==='bottom'?'Returning':this.stage==='top'?'Lowering':'Find start';}
    return false;
  }
}
