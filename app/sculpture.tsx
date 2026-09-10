'use client';
import { useEffect, useRef, useState } from 'react';
import type { WebGLRenderer } from 'three';

export default function Sculpture({material,paused,reset}:{material:number;paused:boolean;reset:number}) {
 const host=useRef<HTMLDivElement>(null),state=useRef({material,paused,reset});
 const [failed,setFailed]=useState(false),[ready,setReady]=useState(false);
 state.current={material,paused,reset};
 useEffect(()=>{
  const container=host.current!;
  let stopped=false,cleanup:(()=>void)|undefined,renderer:WebGLRenderer|undefined;
  Promise.all([import('three'),import('three/examples/jsm/environments/RoomEnvironment.js')]).then(([T,{RoomEnvironment}])=>{
   if(stopped)return;
   renderer=new T.WebGLRenderer({alpha:true,antialias:window.devicePixelRatio<2,powerPreference:'high-performance'});
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));renderer.setClearColor(0x000000,0);renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;container.appendChild(renderer.domElement);
   const scene=new T.Scene(),camera=new T.PerspectiveCamera(34,1,.1,100);camera.position.set(0,0,9.7);
   const pmrem=new T.PMREMGenerator(renderer),room=new RoomEnvironment(),environment=pmrem.fromScene(room,.035);scene.environment=environment.texture;room.dispose();pmrem.dispose();
   scene.add(new T.AmbientLight(0xffffff,1.2));
   const key=new T.DirectionalLight(0xf7ffd6,6);key.position.set(-3,4,5);scene.add(key);
   const edge=new T.DirectionalLight(0xd7ff58,5);edge.position.set(4,-2,1);scene.add(edge);
   const back=new T.DirectionalLight(0xffffff,5);back.position.set(-4,1,-3);scene.add(back);
   const group=new T.Group();scene.add(group);
   const surface=new T.MeshPhysicalMaterial({color:0xc8f650,metalness:.93,roughness:.22,clearcoat:1,clearcoatRoughness:.1,envMapIntensity:2.3,iridescence:.2,iridescenceIOR:1.35});
   const geometry=new T.TorusKnotGeometry(1.32,.43,240,40,2,3);group.add(new T.Mesh(geometry,surface));group.rotation.set(.3,-.45,-.22);
   const orbit=new T.Group();scene.add(orbit);orbit.rotation.set(1.15,.28,-.25);
   const points=Array.from({length:181},(_,i)=>new T.Vector3(Math.cos(i/180*Math.PI*2)*2.62,Math.sin(i/180*Math.PI*2)*2.62,0));
   const orbitGeometry=new T.BufferGeometry().setFromPoints(points),orbitMaterial=new T.LineBasicMaterial({color:0xa8b194,transparent:true,opacity:.26});orbit.add(new T.Line(orbitGeometry,orbitMaterial));
   const satelliteGeometry=new T.SphereGeometry(.052,16,12),satelliteMaterial=new T.MeshBasicMaterial({color:0xd3ff6b}),satellite=new T.Mesh(satelliteGeometry,satelliteMaterial);orbit.add(satellite);
   const dustGeometry=new T.BufferGeometry(),positions=new Float32Array(55*3);
   for(let i=0;i<55;i++){const a=i*2.39996,r=2.5+(i%7)*.24;positions[i*3]=Math.cos(a)*r;positions[i*3+1]=Math.sin(a)*r*.72;positions[i*3+2]=Math.sin(i*5)*1.2-1;}
   dustGeometry.setAttribute('position',new T.BufferAttribute(positions,3));const dustMaterial=new T.PointsMaterial({color:0xb3c49b,size:.014,transparent:true,opacity:.55});scene.add(new T.Points(dustGeometry,dustMaterial));
   const resize=()=>{const {width,height}=container.getBoundingClientRect();if(width&&height){renderer!.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();}};
   const observer=new ResizeObserver(resize);observer.observe(container);resize();
   let dragging=false,lastX=0,lastY=0,targetX=.3,targetY=-.45,pointerX=0,pointerY=0,visible=true,motionPaused=false;
   const down=(e:PointerEvent)=>{dragging=true;lastX=e.clientX;lastY=e.clientY;container.setPointerCapture(e.pointerId);};
   const move=(e:PointerEvent)=>{const r=container.getBoundingClientRect();pointerX=(e.clientX-r.left)/r.width-.5;pointerY=(e.clientY-r.top)/r.height-.5;if(dragging){targetY+=(e.clientX-lastX)*.008;targetX+=(e.clientY-lastY)*.008;lastX=e.clientX;lastY=e.clientY;}};
   const up=()=>{dragging=false;},leave=()=>{pointerX=0;pointerY=0;};
   const toggleMotion=()=>{motionPaused=!motionPaused;};
   const keydown=(e:KeyboardEvent)=>{if(e.code==='Space'){e.preventDefault();if(!e.repeat)toggleMotion();}else if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){e.preventDefault();targetY+=e.key==='ArrowRight'?.2:e.key==='ArrowLeft'?-.2:0;targetX+=e.key==='ArrowDown'?.2:e.key==='ArrowUp'?-.2:0;}};
   container.addEventListener('pointerdown',down);container.addEventListener('pointermove',move);container.addEventListener('pointerup',up);container.addEventListener('pointercancel',up);container.addEventListener('pointerleave',leave);container.addEventListener('keydown',keydown);container.addEventListener('dblclick',toggleMotion);
   const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});visibility.observe(container);
   const reduced=window.matchMedia('(prefers-reduced-motion: reduce)'),colors=[new T.Color(0xc8f650),new T.Color(0xbfc6d0),new T.Color(0xff592e)];
   let frame=0,previous=performance.now(),elapsed=0,lastReset=state.current.reset;
   const render=(now:number)=>{if(stopped)return;frame=requestAnimationFrame(render);const dt=Math.min((now-previous)/1000,.05);previous=now;if(!visible||document.hidden)return;if(lastReset!==state.current.reset){targetX=.3;targetY=-.45;lastReset=state.current.reset;}if(!state.current.paused&&!motionPaused&&!reduced.matches){elapsed+=dt;if(!dragging)targetY+=dt*.13;}group.rotation.x+=(targetX+pointerY*.08-group.rotation.x)*.065;group.rotation.y+=(targetY+pointerX*.12-group.rotation.y)*.065;group.position.y=Math.sin(elapsed*.7)*.075;surface.color.lerp(colors[state.current.material],.045);edge.color.lerp(colors[state.current.material],.045);surface.iridescence=state.current.material===1?.45:.2;satellite.position.set(Math.cos(elapsed*.2)*2.62,Math.sin(elapsed*.2)*2.62,0);renderer!.render(scene,camera);};
   frame=requestAnimationFrame(render);setReady(true);
   const contextLost=(event:Event)=>{event.preventDefault();setFailed(true);};renderer.domElement.addEventListener('webglcontextlost',contextLost);
   cleanup=()=>{cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();container.removeEventListener('pointerdown',down);container.removeEventListener('pointermove',move);container.removeEventListener('pointerup',up);container.removeEventListener('pointercancel',up);container.removeEventListener('pointerleave',leave);container.removeEventListener('keydown',keydown);container.removeEventListener('dblclick',toggleMotion);renderer!.domElement.removeEventListener('webglcontextlost',contextLost);geometry.dispose();surface.dispose();orbitGeometry.dispose();orbitMaterial.dispose();satelliteGeometry.dispose();satelliteMaterial.dispose();dustGeometry.dispose();dustMaterial.dispose();environment.dispose();renderer!.dispose();renderer!.domElement.remove();};
  }).catch(()=>{renderer?.dispose();if(!stopped)setFailed(true);});
  return()=>{stopped=true;cleanup?.();};
 },[]);
 return <div ref={host} className={`sculpture ${ready?'is-ready':''} ${failed?'is-failed':''}`} role="img" tabIndex={0} aria-label="Interaktiv 3D haykal. Sudrab yoki yo‘nalish tugmalari bilan aylantiring. Harakatni to‘xtatish uchun ikki marta bosing yoki bo‘sh joy tugmasini bosing." title="Sudrab aylantiring · Ikki marta bosib harakatni to‘xtating">{failed&&<img className="sculpture-fallback" src="/orbit.webp" alt=""/>}{(!ready||failed)&&<div className="sculpture-status">{failed?'Bu qurilmada statik ko‘rinish.':'3D olam uyg‘onmoqda…'}</div>}</div>;
}
