export class ReadinessGate {
  constructor(){this.reset();}
  reset(){this.since=null;this.last=null;this.ready=false;}
  update(valid,time){
    if(this.ready)return true;
    if(!valid||this.last!==null&&time-this.last>300)this.since=null;
    this.last=time;
    if(!valid)return false;
    if(this.since===null)this.since=time;
    this.ready=time-this.since>=1500;return this.ready;
  }
  progress(time){return this.since===null?0:Math.min(1,(time-this.since)/1500);}
}
export class RestTimer {
 constructor(){this.end=null;this.announced=false;}
 start(seconds,now){this.end=now+seconds*1000;this.announced=false;}
 clear(){this.end=null;this.announced=false;}
 remaining(now){return this.end===null?0:Math.max(0,Math.ceil((this.end-now)/1000));}
}
export function weeklyProgress(history,now=new Date()){
 const start=new Date(now.getFullYear(),now.getMonth(),now.getDate());start.setDate(start.getDate()-6);
 const days=Array.from({length:7},(_,i)=>{const date=new Date(start);date.setDate(date.getDate()+i);return {date,label:date.toLocaleDateString(undefined,{weekday:'short'}),sessions:0};});
 const live=history.filter(s=>s?.source==='camera'&&new Date(s.date)>=start&&new Date(s.date)<=now);
 for(const s of live){const d=new Date(s.date);const day=days.find(x=>x.date.toDateString()===d.toDateString());if(day)day.sessions++;}
 const number=v=>Math.max(0,Number(v)||0);
 return {days,sessions:live.length,reps:live.reduce((n,s)=>n+number(s.reps),0),holds:live.reduce((n,s)=>n+number(s.holdSeconds),0),sets:live.reduce((n,s)=>n+number(s.setsCompleted??((s.exercise==='plank'?s.holdSeconds:s.reps)>=s.target?1:0)),0)};
}
