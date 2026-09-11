import {test} from 'node:test';
import assert from 'node:assert/strict';
import {RepCounter,angle} from '../dist/engine.js';
test('joint angle geometry',()=>{assert.equal(angle({x:0,y:0},{x:0,y:1},{x:1,y:1}),90);assert.equal(angle({x:0,y:0},{x:0,y:1},{x:0,y:2}),180);assert.ok(Number.isNaN(angle({x:0,y:0},{x:0,y:0},{x:1,y:0})));});
for(const [name,low]of [['squat',80],['curl',30],['pushup',80]]){test(name+' counts full stable cycles, rejects partials and tracking loss',()=>{const c=new RepCounter(name);let t=0;function hold(a,conf=.99,frames=25){for(let i=0;i<frames;i++)c.update(a,conf,t+=40);}hold(low);hold(170);assert.equal(c.reps,0,'starting bent does not count');hold(125);hold(170);assert.equal(c.reps,0,'partial does not count');hold(low);hold(170);assert.equal(c.reps,1);hold(170);assert.equal(c.reps,1,'holding top does not double-count');hold(low);hold(low,0);hold(170);assert.equal(c.reps,1,'occlusion invalidates cycle');hold(low);hold(170);assert.equal(c.reps,2);});}
test('single-frame spikes cannot count reps',()=>{const c=new RepCounter('squat');for(let t=0;t<3000;t+=40)c.update(t%80?80:170,.99,t);assert.equal(c.reps,0);});
