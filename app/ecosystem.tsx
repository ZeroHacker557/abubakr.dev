'use client';
import { useEffect, useRef, useState } from 'react';
import type { WebGLRenderer, BufferGeometry, LineBasicMaterial, MeshBasicMaterial, Mesh, QuadraticBezierCurve3 } from 'three';
export default function Ecosystem({active,paused,reset}:{active:number;paused:boolean;reset:number}) {
 const host=useRef<HTMLDivElement>(null),state=useRef({active,paused,reset});
 const [ready,setReady]=useState(false),[failed,setFailed]=useState(false);
 state.current={active,paused,reset};
 useEffect(()=>{
  const container=host.current!;
  let disposed=false,cleanup:(()=>void)|undefined,renderer:WebGLRenderer|undefined;
  import('three').then(T=>{
   if(disposed)return;
   renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
   renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.setClearColor(0,0);container.appendChild(renderer.domElement);
   const scene=new T.Scene(),camera=new T.PerspectiveCamera(43,1,.1,100);camera.position.set(0,0,8.5);
   const root=new T.Group();scene.add(root);root.rotation.set(.22,-.3,-.18);
   const count=6000,positions=new Float32Array(count*3),targets=Array.from({length:4},()=>new Float32Array(count*3));
   for(let i=0;i<count;i++){
    const u=(i*.61803398875)%1,v=(i*.41421356237)%1,w=(i*.73205080756)%1,a=u*Math.PI*2,b=v*Math.PI*2;
    targets[0].set([(1.31+.43*Math.cos(b))*Math.cos(a),(1.31+.43*Math.cos(b))*Math.sin(a),.43*Math.sin(b)],i*3);
    const y=1-2*u,r=Math.sqrt(1-y*y),phi=i*2.39996;
    targets[1].set([1.6*r*Math.cos(phi),1.6*y,1.6*r*Math.sin(phi)],i*3);
    const face=i%6,xyz=[(u-.5)*2.7,(v-.5)*2.7,(w-.5)*2.7];xyz[Math.floor(face/2)]=(face%2?1:-1)*1.35;targets[2].set(xyz,i*3);
    const phase=u*Math.PI*6+(i%2)*Math.PI,rad=.8+v*.24;targets[3].set([Math.cos(phase)*rad,(u-.5)*3.7,Math.sin(phase)*rad],i*3);
   }
   positions.set(targets[state.current.active]);
   const pointGeo=new T.BufferGeometry();pointGeo.setAttribute('position',new T.BufferAttribute(positions,3));
   const colors=[new T.Color('#ff835d'),new T.Color('#a69aff'),new T.Color('#bce78b'),new T.Color('#8cd7e9')];
   const pointMat=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,uniforms:{uColor:{value:colors[state.current.active].clone()},uSize:{value:renderer.getPixelRatio()*14}},vertexShader:'uniform float uSize; void main(){ vec4 mv=modelViewMatrix*vec4(position,1.0); gl_PointSize=clamp(uSize/-mv.z,1.0,5.0); gl_Position=projectionMatrix*mv; }',fragmentShader:'uniform vec3 uColor; void main(){float d=length(gl_PointCoord-.5);if(d>.5)discard;float a=smoothstep(.5,.03,d);gl_FragColor=vec4(uColor,a*.9);}' });
   root.add(new T.Points(pointGeo,pointMat));
   const innerGeo=new T.IcosahedronGeometry(.86,1),innerMat=new T.MeshBasicMaterial({color:0x111218,transparent:true,opacity:.82});root.add(new T.Mesh(innerGeo,innerMat));
   const wireGeo=new T.EdgesGeometry(new T.IcosahedronGeometry(.94,1)),wireMat=new T.LineBasicMaterial({color:0xe3dfdf,transparent:true,opacity:.2});root.add(new T.LineSegments(wireGeo,wireMat));
   const ringGroup=new T.Group();scene.add(ringGroup);ringGroup.rotation.set(1.1,.25,-.2);
   const ringGeo=new T.BufferGeometry().setFromPoints(Array.from({length:193},(_,i)=>new T.Vector3(Math.cos(i/192*Math.PI*2)*2.42,Math.sin(i/192*Math.PI*2)*2.42,0))),ringMat=new T.LineBasicMaterial({color:0x777684,transparent:true,opacity:.33});ringGroup.add(new T.Line(ringGeo,ringMat));
   const ring2=new T.Line(ringGeo,ringMat);ring2.rotation.set(.68,-.25,.3);scene.add(ring2);
   const anchors=[new T.Vector3(-2.15,1.15,0),new T.Vector3(2.15,1.15,0),new T.Vector3(-2.15,-1.25,0),new T.Vector3(2.15,-1.25,0)];
   const nodeGeo=new T.IcosahedronGeometry(.065,1);
   const pathGeos:BufferGeometry[]=[],pathMats:LineBasicMaterial[]=[],nodeMats:MeshBasicMaterial[]=[],packets:Mesh[]=[],curves:QuadraticBezierCurve3[]=[];
   anchors.forEach((anchor,i)=>{const curve=new T.QuadraticBezierCurve3(new T.Vector3(0,0,-.15),new T.Vector3(anchor.x*.8,anchor.y*.05,-.2),anchor);curves.push(curve);const geo=new T.BufferGeometry().setFromPoints(curve.getPoints(60)),mat=new T.LineBasicMaterial({color:colors[i],transparent:true,opacity:.18});pathGeos.push(geo);pathMats.push(mat);scene.add(new T.Line(geo,mat));const nm=new T.MeshBasicMaterial({color:colors[i]});nodeMats.push(nm);const node=new T.Mesh(nodeGeo,nm);node.position.copy(anchor);scene.add(node);const packet=new T.Mesh(nodeGeo,nm);packets.push(packet);scene.add(packet);});
   const dustGeo=new T.BufferGeometry(),dust=new Float32Array(95*3);for(let i=0;i<95;i++){dust[i*3]=Math.sin(i*31.79)*3.9;dust[i*3+1]=Math.cos(i*83.11)*2.8;dust[i*3+2]=-2-(i%5)*.2;}dustGeo.setAttribute('position',new T.BufferAttribute(dust,3));const dustMat=new T.PointsMaterial({color:0xadabb5,transparent:true,opacity:.35,size:.015});scene.add(new T.Points(dustGeo,dustMat));
   const resize=()=>{const {width,height}=container.getBoundingClientRect();if(width&&height){renderer!.setSize(width,height);camera.aspect=width/height;camera.position.z=width<400?10:8.5;camera.updateProjectionMatrix();}};const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(container);resize();
   let visible=true,dragging=false,lastX=0,lastY=0,targetX=.22,targetY=-.3,elapsed=0,previous=0,lastReset=state.current.reset,frame=0;
   const visibilityObserver=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});visibilityObserver.observe(container);
   const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
   const down=(e:PointerEvent)=>{dragging=true;lastX=e.clientX;lastY=e.clientY;container.setPointerCapture(e.pointerId);};
   const move=(e:PointerEvent)=>{if(!dragging)return;targetX+=(e.clientY-lastY)*.007;targetY+=(e.clientX-lastX)*.007;lastX=e.clientX;lastY=e.clientY;};
   const up=()=>{dragging=false;};
   const keydown=(e:KeyboardEvent)=>{if(!e.key.startsWith('Arrow'))return;e.preventDefault();targetX+=e.key==='ArrowUp'?-.18:e.key==='ArrowDown'?.18:0;targetY+=e.key==='ArrowLeft'?-.18:e.key==='ArrowRight'?.18:0;};
   container.addEventListener('pointerdown',down);container.addEventListener('pointermove',move);container.addEventListener('pointerup',up);container.addEventListener('pointercancel',up);container.addEventListener('keydown',keydown);
   const draw=(now:number)=>{if(disposed)return;frame=requestAnimationFrame(draw);if(now-previous<30)return;const dt=Math.min((now-previous)/1000,.06);previous=now;if(!visible||document.hidden)return;const moving=!state.current.paused&&!reduce.matches;if(moving){elapsed+=dt;if(!dragging)targetY+=dt*.085;}if(lastReset!==state.current.reset){targetX=.22;targetY=-.3;lastReset=state.current.reset;}root.rotation.x+=(targetX-root.rotation.x)*.12;root.rotation.y+=(targetY-root.rotation.y)*.12;const target=targets[state.current.active],lerp=reduce.matches?1:.075;for(let i=0;i<positions.length;i++)positions[i]+=(target[i]-positions[i])*lerp;pointGeo.attributes.position.needsUpdate=true;pointMat.uniforms.uColor.value.lerp(colors[state.current.active],.1);root.position.y=Math.sin(elapsed*.7)*.06;ringGroup.rotation.z=elapsed*.045;packets.forEach((packet,i)=>{packet.position.copy(curves[i].getPoint((elapsed*.22+i*.25)%1));packet.visible=i===state.current.active;pathMats[i].opacity=i===state.current.active?.55:.12;});renderer!.render(scene,camera);};
   frame=requestAnimationFrame(draw);setReady(true);
   const lost=(e:Event)=>{e.preventDefault();setFailed(true);};renderer.domElement.addEventListener('webglcontextlost',lost);
   cleanup=()=>{cancelAnimationFrame(frame);resizeObserver.disconnect();visibilityObserver.disconnect();container.removeEventListener('pointerdown',down);container.removeEventListener('pointermove',move);container.removeEventListener('pointerup',up);container.removeEventListener('pointercancel',up);container.removeEventListener('keydown',keydown);renderer!.domElement.removeEventListener('webglcontextlost',lost);pointGeo.dispose();pointMat.dispose();innerGeo.dispose();innerMat.dispose();wireGeo.dispose();wireMat.dispose();ringGeo.dispose();ringMat.dispose();nodeGeo.dispose();dustGeo.dispose();dustMat.dispose();pathGeos.forEach(g=>g.dispose());pathMats.forEach(m=>m.dispose());nodeMats.forEach(m=>m.dispose());renderer!.dispose();renderer!.domElement.remove();};
  }).catch(()=>{renderer?.dispose();if(!disposed)setFailed(true);});
  return()=>{disposed=true;cleanup?.();};
 },[]);
 return <div ref={host} className={`ecosystem-canvas ${ready?'is-ready':''} ${failed?'has-failed':''}`} tabIndex={0} role="img" aria-label="To‘rtta xizmatga bog‘langan interaktiv 3D markaz. Sudrab yoki yo‘nalish tugmalari bilan aylantiring.">{failed&&<img src="/orbit.webp" className="ecosystem-fallback" alt=""/>}{!ready&&!failed&&<span className="scene-loading">Tizim uyg‘onmoqda…</span>}</div>;
}
