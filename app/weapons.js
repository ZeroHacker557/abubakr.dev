import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const WEAPONS = [
 {id:'ak',name:'AK-47',kind:'AVTOMAT',capacity:30,reserve:240,damage:28,interval:.105,reload:2.1,range:180,spread:.009,pellets:1},
 {id:'sniper',name:'M24 Sniper',kind:'SNAYPER',capacity:5,reserve:45,damage:100,interval:1.1,reload:2.7,range:430,spread:.001,pellets:1},
 {id:'pistol',name:'P9 Tactical',kind:'TO‘PPONCHA',capacity:15,reserve:120,damage:34,interval:.28,reload:1.5,range:100,spread:.007,pellets:1},
 {id:'shotgun',name:'M870',kind:'POMPALI MILTIQ',capacity:8,reserve:56,damage:19,interval:.8,reload:2.5,range:65,spread:.047,pellets:8},
 {id:'knife',name:'Field Knife',kind:'PICHOQ',capacity:0,reserve:0,damage:70,interval:.5,reload:0,range:2.7,spread:0,pellets:1}
];

export function createWeaponFactory(){
 const geometries=[],materials=[],textures=[];
 const material=(color,metalness=0,roughness=.6)=>{const m=new THREE.MeshStandardMaterial({color,metalness,roughness});materials.push(m);return m};
 const steel=material('#333c43',.85,.31),edge=material('#65747d',.86,.25),black=material('#141c21',.25,.7),rubber=material('#242b2b',0,.94),wood=material('#8c4428',.05,.36),woodLight=material('#bd7044',.05,.42),brass=material('#bfa469',.74,.3),silver=material('#bac8ce',.95,.17);
 const c=document.createElement('canvas');c.width=128;c.height=128;const ctx=c.getContext('2d');ctx.fillStyle='#995530';ctx.fillRect(0,0,128,128);for(let i=0;i<130;i++){ctx.strokeStyle=i%2?'#43201038':'#e8a06928';ctx.lineWidth=.4+i%3*.3;ctx.beginPath();ctx.moveTo(i,0);ctx.bezierCurveTo(i+Math.sin(i)*6,35,i-4,80,i+3,128);ctx.stroke()}const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;textures.push(texture);wood.map=texture;wood.color.set('#ffffff');
 const geo=g=>{geometries.push(g);return g};
 const rounded=geo(new RoundedBoxGeometry(1,1,1,3,.09)),cylinder=geo(new THREE.CylinderGeometry(1,1,1,24)),sphere=geo(new THREE.SphereGeometry(1,20,12));
 function mesh(parent,g,m,p,s,rot=[0,0,0]){const o=new THREE.Mesh(g,m);o.position.set(...p);o.scale.set(...s);o.rotation.set(...rot);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o}
 const box=(p,m,x,y,z,w,h,d,rx=0)=>mesh(p,rounded,m,[x,y,z],[w,h,d],[rx,0,0]);
 const tube=(p,m,x,y,z,r,len)=>mesh(p,cylinder,m,[x,y,z],[r,len,r],[Math.PI/2,0,0]);
 function profile(p,m,points,thickness){const s=new THREE.Shape();points.forEach(([z,y],i)=>i?s.lineTo(z,y):s.moveTo(z,y));s.closePath();const g=geo(new THREE.ExtrudeGeometry(s,{depth:thickness,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.008,bevelThickness:.008}));g.rotateY(-Math.PI/2);g.translate(thickness/2,0,0);return mesh(p,g,m,[0,0,0],[1,1,1])}
 function scope(p,z=-.05){tube(p,black,0,.185,z,.046,.36);tube(p,edge,0,.185,z-.22,.075,.15);tube(p,rubber,0,.185,z+.22,.059,.1);for(const zz of [z-.1,z+.1]){box(p,steel,0,.115,zz,.09,.09,.055);tube(p,edge,0,.185,zz,.049,.033)}const lens=material('#3f9fbc',.65,.08);tube(p,lens,0,.185,z-.298,.06,.007);tube(p,lens,0,.185,z+.273,.049,.007);mesh(p,cylinder,black,[0,.25,z],[.036,.063,.036]);box(p,edge,.07,.185,z,.08,.05,.05);for(let i=0;i<12;i++)box(p,edge,Math.sin(i/12*Math.PI*2)*.059,.185+Math.cos(i/12*Math.PI*2)*.059,z+.22,.005,.005,.07)}
 function rail(p,z,len){box(p,steel,0,.072,z,.063,.034,len);for(let i=-len/2;i<len/2;i+=.026)box(p,edge,0,.097,z+i,.08,.014,.012)}
 function build(id,detail=true){const p=new THREE.Group();p.userData.weapon=id;
  if(id==='ak'){
   box(p,steel,0,0,-.01,.11,.125,.43);tube(p,edge,0,.047,-.05,.051,.37);box(p,wood,0,-.004,-.39,.112,.09,.28);box(p,woodLight,0,.052,-.38,.086,.066,.25);
   tube(p,steel,0,.005,-.7,.019,.4);tube(p,steel,0,.073,-.62,.013,.29);tube(p,black,0,.005,-.923,.025,.07);box(p,steel,0,.075,-.78,.036,.17,.035);tube(p,edge,0,.14,-.78,.027,.018);
   profile(p,wood,[[.22,.03],[.52,-.03],[.58,-.04],[.58,-.24],[.48,-.23],[.23,-.08]],.115);box(p,rubber,0,-.14,.584,.125,.21,.027);box(p,wood,0,-.17,.135,.073,.23,.09,-.23);
   profile(p,steel,[[-.16,-.055],[-.04,-.07],[-.045,-.25],[-.11,-.39],[-.22,-.43],[-.3,-.35],[-.22,-.22]],.07);
   for(let side of [-1,1])for(let i=0;i<3;i++)box(p,edge,side*.039,-.21,-.115-i*.029,.006,.22,.007,-.24);
   box(p,steel,.092,.018,.012,.095,.02,.027);box(p,edge,.06,-.015,.08,.009,.013,.15);box(p,black,0,.091,.12,.04,.035,.04);
   for(let zz of [-.27,-.49])box(p,steel,0,.004,zz,.12,.11,.02);for(let i=0;i<4;i++)box(p,black,.058,.045,-.32-i*.041,.004,.018,.022);
  }else if(id==='sniper'){
   profile(p,material('#60664d',.05,.83),[[.61,-.02],[.62,-.21],[.37,-.22],[.17,-.11],[-.51,-.105],[-.52,-.02]],.11);box(p,rubber,0,-.12,.626,.13,.23,.04);box(p,black,0,.025,.4,.105,.085,.24);
   tube(p,steel,0,.02,-.04,.045,.44);tube(p,edge,0,.025,-.64,.019,.81);tube(p,black,0,.025,-1.07,.024,.085);box(p,steel,0,-.14,-.045,.09,.13,.15);scope(p,-.01);box(p,steel,.094,.009,.15,.12,.025,.025);mesh(p,sphere,black,[.15,-.015,.15],[.034,.034,.034]);
   for(const side of [-1,1]){mesh(p,cylinder,black,[side*.09,-.15,-.47],[.012,.26,.012],[0,0,side*.3]);box(p,rubber,side*.12,-.27,-.47,.06,.02,.05)}
  }else if(id==='pistol'){
   box(p,steel,0,.02,-.05,.083,.085,.3);box(p,edge,0,.066,-.054,.071,.014,.27);tube(p,black,0,.02,-.219,.022,.04);box(p,black,0,-.045,-.02,.073,.055,.25);box(p,rubber,0,-.15,.065,.078,.21,.115,-.18);box(p,steel,0,-.25,.081,.091,.021,.12);
   for(let i=0;i<7;i++){box(p,edge,.043,.022,.03+i*.012,.006,.057,.006);box(p,black,.041,-.095-i*.019,.077,.004,.007,.08)}box(p,black,0,.083,-.17,.015,.024,.025);box(p,black,0,.083,.076,.044,.023,.027);box(p,silver,.043,.022,-.035,.006,.025,.06);
  }else if(id==='shotgun'){
   box(p,steel,0,0,-.02,.102,.13,.35);tube(p,steel,0,.02,-.63,.025,.86);tube(p,steel,0,-.057,-.54,.024,.63);box(p,wood,0,-.055,-.44,.126,.12,.26);for(let i=0;i<11;i++)box(p,black,0,-.06,-.34-i*.02,.129,.12,.007);
   profile(p,wood,[[.17,.025],[.5,-.04],[.56,-.06],[.56,-.24],[.43,-.23],[.18,-.07]],.115);box(p,rubber,0,-.14,.575,.13,.2,.035);box(p,black,0,.06,-1.02,.014,.025,.025);for(let i=0;i<4;i++){tube(p,brass,-.069,-.007,.06-i*.047,.018,.04);box(p,black,-.064,-.003,.06-i*.047,.02,.075,.035)}
  }else{
   profile(p,silver,[[.015,.026],[-.42,.021],[-.61,-.017],[-.43,-.068],[.015,-.052]],.024);profile(p,edge,[[.005,-.01],[-.44,-.012],[-.61,-.017],[-.43,-.068],[.005,-.052]],.026);box(p,black,0,-.01,.04,.06,.13,.025);tube(p,rubber,0,-.01,.17,.043,.23);for(let i=0;i<9;i++)tube(p,black,0,-.01,.065+i*.025,.046,.009);tube(p,edge,0,-.01,.29,.046,.02);box(p,edge,.015,.005,-.21,.002,.015,.33);
  }
  if(id!=='knife'){
   const z=id==='pistol'?.006:.11;const torus=geo(new THREE.TorusGeometry(.042,.008,8,24));mesh(p,torus,black,[0,-.105,z],[1,1.2,1],[0,Math.PI/2,0]);box(p,steel,0,-.099,z-.008,.014,.05,.009,-.22);
   if(detail){for(const side of [-1,1])for(let i=0;i<5;i++){mesh(p,cylinder,edge,[side*(id==='pistol'?.044:.059),-.023,-.12+i*.047],[.007,.004,.007],[0,0,Math.PI/2])}}
  }
  p.userData.muzzle=new THREE.Vector3(0,.02,id==='ak'?-.96:id==='sniper'?-1.12:id==='shotgun'?-1.08:id==='pistol'?-.24:-.6);
  return p;
 }
 return {build,dispose(){geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose())}};
}
