'use client';
import { useState, useEffect, useRef, type CSSProperties } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, Code2, Layers3, Phone, Copy, Check, Pause, Play, RotateCcw, Utensils, Send, Globe2, Boxes, Plus } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { profile, services, type ServiceId } from './portfolio-data';
import Ecosystem from './ecosystem';
import { RestaurantDemo, TelegramDemo, WebsiteDemo, SystemDemo } from './service-demos';

const icons = [Utensils, Send, Globe2, Boxes];
const demos = [RestaurantDemo, TelegramDemo, WebsiteDemo, SystemDemo];
export default function Portfolio() {
 const [active,setActive] = useState<ServiceId>('restaurant');
 const [paused,setPaused] = useState(false);
 const [reset,setReset] = useState(0);
 const [copied,setCopied] = useState(false);
 const [copyFailed,setCopyFailed] = useState(false);
 const copyTimer = useRef<ReturnType<typeof setTimeout>|null>(null);
 const current = services.find(s=>s.id===active)!;
 const index = services.indexOf(current);
 useEffect(()=>()=>{if(copyTimer.current)clearTimeout(copyTimer.current)},[]);
 const copyPhone=async()=>{try{await navigator.clipboard.writeText(profile.phone);setCopied(true);setCopyFailed(false);if(copyTimer.current)clearTimeout(copyTimer.current);copyTimer.current=setTimeout(()=>setCopied(false),2400);}catch{setCopyFailed(true);}};
 return <main style={{'--active':current.color} as CSSProperties}>
  <a className="skip-link" href="#laboratoriya">Interaktiv demoga o‘tish</a>
  <header className="site-header wrap">
   <a className="wordmark" href="#top" aria-label="Abubakr bosh sahifa"><span className="logo-glyph">a<span>↗</span></span><span>abubakr<span className="wordmark-dev">.dev</span></span></a>
   <nav aria-label="Asosiy navigatsiya"><a href="#laboratoriya">Xizmatlar <span>04</span></a><a href="#haqimda">Men haqimda</a></nav>
   <a className="header-contact" href="#aloqa">Keling, gaplashamiz <ArrowUpRight size={17}/></a>
  </header>
  <section className="hero hero-clear wrap" id="top" aria-labelledby="hero-title">
   <div className="hero-clear-layout">
    <div className="hero-clear-copy"><div className="developer-label"><span/> ABUBAKR · FULLSTACK DEVELOPER</div><h1 id="hero-title">Biznesingiz uchun<br/><span>sayt, bot va tizim.</span></h1><p>Restoranlar uchun onlayn buyurtma, Telegram botlar, veb-saytlar va maxsus biznes tizimlarini yarataman.</p><p className="hero-clear-note">Dizayndan backendgacha — loyihangizni to‘liq ishlab chiqaman.</p><div className="hero-actions"><a className="primary-button" href="#laboratoriya">Xizmatlarni ko‘rish <ArrowDown size={18}/></a><a className="hero-secondary" href="#aloqa">Bog‘lanish <ArrowUpRight size={18}/></a></div><div className="hero-clear-skills"><span><Check size={15}/> Frontend</span><span><Check size={15}/> Backend</span><span><Check size={15}/> Integratsiya</span></div></div>
    <div className="hero-studio"><div className="studio-heading"><span><Code2 size={19}/> Nimalar yarataman</span><div className="scene-controls"><button aria-label={paused?'3D harakatni yoqish':'3D harakatni to‘xtatish'} aria-pressed={paused} title={paused?'Davom ettirish':'To‘xtatish'} onClick={()=>setPaused(!paused)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button><button aria-label="3D ko‘rinishni tiklash" title="Ko‘rinishni tiklash" onClick={()=>setReset(v=>v+1)}><RotateCcw size={15}/></button></div></div><div className="studio-scene"><Ecosystem active={index} paused={paused} reset={reset}/></div>
     <div className="studio-services" role="group" aria-label="Xizmat turini tanlang">{services.map((service,i)=>{const Icon=icons[i];return <button key={service.id} className={active===service.id?'is-active':''} style={{'--service-color':service.color} as CSSProperties} aria-pressed={active===service.id} onClick={()=>setActive(service.id)}><Icon size={18}/><span>{service.label}</span>{active===service.id&&<Check className="studio-check" size={14}/>}</button>})}</div>
     <div className="studio-footer"><span>{current.label}</span><a href="#laboratoriya">Namunasini ko‘rish <ArrowRight size={16}/></a></div>
    </div>
   </div>
  </section>
  <div className="capability-ticker" aria-label="Xizmatlar"><div><span>ONLINE BUYURTMA</span><Plus/><span>TELEGRAM BOTLAR</span><Plus/><span>WEB TAJRIBALAR</span><Plus/><span>MAXSUS TIZIMLAR</span><Plus/><span>FRONTEND + BACKEND</span><Plus/></div></div>
  <span id="ishlar" aria-hidden="true"/>
  <section id="laboratoriya" className="lab-section wrap" aria-labelledby="lab-heading">
   <div className="section-heading section-heading-clear"><div><span className="eyebrow">01 / XIZMATLAR VA NAMUNALAR</span><h2 id="lab-heading">Sizga kerakli yechimlar.</h2></div><p>Xizmatni tanlang va uning ishlashini sinab ko‘ring: buyurtma tuzing, botga yozing yoki sayt ko‘rinishini o‘zgartiring.</p></div>
   <Tabs value={active} onValueChange={value=>setActive(value as ServiceId)} className="service-tabs"><TabsList className="service-tabs-list" aria-label="Xizmat demosi">{services.map((service,i)=>{const Icon=icons[i];return <TabsTrigger key={service.id} value={service.id} className="service-tab"><Icon size={18}/><span>{service.label}</span><small>0{i+1}</small></TabsTrigger>})}</TabsList>
   {services.map((service,i)=>{const Demo=demos[i];return <TabsContent key={service.id} value={service.id} keepMounted className="service-panel"><div className="service-story"><span className="module-id"><span/> {service.short}</span><h3>{service.title}</h3><p>{service.description}</p><div className="feature-list">{service.features.map(feature=><span key={feature}><Check size={15}/>{feature}</span>)}</div><a href="#aloqa" className="text-link">Menga shunday tizim kerak <ArrowUpRight size={18}/></a><div className="demo-disclaimer"><Code2 size={15}/><span>Bu imkoniyatlar namoyishi.<br/>Haqiqiy buyurtma va xabar yuborilmaydi.</span></div></div><div className="demo-window"><div className="window-bar"><span className="window-dots"><i/><i/><i/></span><span>{service.short.toLowerCase().replaceAll(' / ','://')}</span><span className="demo-badge">DEMO</span></div><Demo/></div></TabsContent>})}</Tabs>
  </section>
  <section className="connection-section" aria-label="Bir-biriga ulangan xizmatlar"><div className="wrap connection-inner"><span className="eyebrow">ALOHIDA QISMLAR. BITTA KUCHLI TIZIM.</span><p><span>Saytingiz</span><ArrowRight/><span>Botingiz</span><ArrowRight/><span>Biznesingiz</span></p><span className="connection-note">Hammasi bir-birini tushunadi.</span></div></section>
  <section id="haqimda" className="about-section wrap"><div className="about-visual"><img src="/orbit.webp" alt="Bir yadro atrofida birlashgan metall shakllar" width={1536} height={1024} loading="lazy"/><div className="about-visual-overlay"><span className="mono">ONE DEVELOPER / EVERY LAYER</span><span className="layer-word">FRONT<span>+</span>BACK</span><span className="visual-signature">abubakr.</span></div></div><div className="about-copy"><span className="eyebrow">02 / KOD ORTIDAGI INSON</span><h2>Men — Abubakr.<br/><em>Fullstack developer.</em></h2><p>G‘oyani chiroyli interfeysga, interfeysni esa ishlaydigan tizimga aylantiraman. Tashqi ko‘rinishdan ichki mantiqqacha — barcha qatlamlarni birlashtiraman.</p><p className="secondary-copy">Restoran, savdo, xizmat ko‘rsatish yoki butunlay yangi g‘oya. Siz biznesingizni bilasiz, men unga mos raqamli yechimni yarataman.</p><div className="layers-list"><div><Code2/><span>Ko‘rinadigan qism<strong>Qulay interfeys & responsive dizayn</strong></span></div><div><Layers3/><span>Ko‘rinmaydigan kuch<strong>Backend, ma’lumotlar & integratsiyalar</strong></span></div></div></div></section>
  <section id="aloqa" className="contact-section"><div className="wrap"><div className="contact-top"><span className="eyebrow">03 / KEYINGI LOYIHA — SIZNIKI</span><span className="contact-orbit" aria-hidden="true">↗</span></div><h2>Noodatiy g‘oyami?<br/><em>Juda yaxshi.</em></h2><div className="contact-bottom"><p>Restoran, bot, sayt yoki hali nomi yo‘q tizim.<br/>Gaplashamiz. Birga shakl beramiz.</p><div className="phone-group"><a href={`tel:${profile.phone}`} className="phone-link"><Phone size={23}/>{profile.displayPhone}</a><button className="copy-button" onClick={copyPhone} aria-label="Telefon raqamini nusxalash">{copied?<Check size={18}/>:<Copy size={18}/>}</button><span className="copy-feedback" role="status">{copied?'Raqam nusxalandi':copyFailed?'Raqamni belgilab nusxalashingiz mumkin.':''}</span></div></div><div className="contact-signoff"><span>ABUBAKR</span><ArrowUpRight strokeWidth={1}/></div></div></section>
  <footer className="site-footer wrap"><span>© 2026 Abubakr. G‘oyadan ishlaydigan tizimgacha.</span><a href="#top">Yuqoriga <ArrowUpRight size={16}/></a></footer>
 </main>;
}

