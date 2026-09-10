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
   <nav aria-label="Asosiy navigatsiya"><a href="#laboratoriya">Imkoniyatlar <span>04</span></a><a href="#haqimda">Men haqimda</a></nav>
   <a className="header-contact" href="#aloqa">Keling, gaplashamiz <ArrowUpRight size={17}/></a>
  </header>
  <section className="hero wrap" id="top" aria-labelledby="hero-title">
   <div className="hero-topline"><span className="eyebrow"><span className="availability-dot"/> G‘OYANGIZ UCHUN TAYYORMAN</span><span className="mono">FULLSTACK DEVELOPER / UZ</span></div>
   <div className="hero-layout">
    <div className="hero-copy"><div className="hero-name"><span>⌘</span> SALOM, MEN ABUBAKR</div><h1 id="hero-title">Siz o‘ylang.<br/>Men <em>yarataman.</em></h1><p>Restoran uchun buyurtma tizimidan<br className="desktop-break"/> Telegram bot va katta platformagacha.<br className="desktop-break"/> G‘oyangizning har bir qatorida — mening kodim.</p><a className="primary-button" href="#laboratoriya">Imkoniyatlarni sinab ko‘ring <ArrowUpRight size={20}/></a><div className="hero-footnote"><span className="code-bracket">&lt;/&gt;</span><span>FRONTEND + BACKEND<br/><strong>Bitta dasturchi. Butun yechim.</strong></span></div></div>
    <div className="ecosystem-shell"><div className="scene-grid" aria-hidden="true"/><div className="scene-corner top-left"/><div className="scene-corner bottom-right"/><div className="scene-kicker mono">ABU / DIGITAL ECOSYSTEM</div><Ecosystem active={index} paused={paused} reset={reset}/><div className="core-caption" aria-hidden="true"><span>A<span className="core-caption-dot">.</span></span><small>IDEA → REALITY</small></div>
     <div className="node-selectors" role="group" aria-label="3D tizim yo‘nalishini tanlash">{services.map((service,i)=>{const Icon=icons[i];return <button key={service.id} className={`service-node node-${i} ${active===service.id?'is-active':''}`} style={{'--node-color':service.color} as CSSProperties} aria-pressed={active===service.id} onClick={()=>setActive(service.id)}><span className="node-icon"><Icon size={19}/></span><span><small>{service.number} / MODUL</small><strong>{service.label}</strong></span><span className="node-indicator">{active===service.id?'●':'↗'}</span></button>})}</div>
     <div className="scene-bottom"><span className="scene-hint">YO‘NALISHNI TANLANG. TIZIM JONLANADI.</span><div className="scene-controls"><button aria-label={paused?'3D harakatni yoqish':'3D harakatni to‘xtatish'} aria-pressed={paused} title={paused?'Davom ettirish':'To‘xtatish'} onClick={()=>setPaused(!paused)}>{paused?<Play size={15}/>:<Pause size={15}/>}</button><button aria-label="3D ko‘rinishni tiklash" title="Ko‘rinishni tiklash" onClick={()=>setReset(v=>v+1)}><RotateCcw size={15}/></button></div></div>
    </div>
   </div>
   <div className="hero-footer"><a href="#laboratoriya"><ArrowDown size={16}/> SHUNCHAKI KO‘RMANG. SINAB KO‘RING.</a><span className="mono"><span className="tiny-cross">+</span> IDEAS IN. POSSIBILITIES OUT.</span></div>
  </section>
  <div className="capability-ticker" aria-label="Xizmatlar"><div><span>ONLINE BUYURTMA</span><Plus/><span>TELEGRAM BOTLAR</span><Plus/><span>WEB TAJRIBALAR</span><Plus/><span>MAXSUS TIZIMLAR</span><Plus/><span>FRONTEND + BACKEND</span><Plus/></div></div>
  <span id="ishlar" aria-hidden="true"/>
  <section id="laboratoriya" className="lab-section wrap" aria-labelledby="lab-heading">
   <div className="section-heading"><div><span className="eyebrow">01 / IMKONIYATLAR LABORATORIYASI</span><h2 id="lab-heading">Gapirish oson.<br/><em>Ishlatib ko‘ring.</em></h2></div><p>Har bir yo‘nalishning kichik ishlaydigan demosi.<br/>Bosing, buyurtma tuzing, bot bilan yozishing.</p></div>
   <Tabs value={active} onValueChange={value=>setActive(value as ServiceId)} className="service-tabs"><TabsList className="service-tabs-list" aria-label="Xizmat demosi">{services.map((service,i)=>{const Icon=icons[i];return <TabsTrigger key={service.id} value={service.id} className="service-tab"><Icon size={18}/><span>{service.label}</span><small>0{i+1}</small></TabsTrigger>})}</TabsList>
   {services.map((service,i)=>{const Demo=demos[i];return <TabsContent key={service.id} value={service.id} keepMounted className="service-panel"><div className="service-story"><span className="module-id"><span/> {service.short}</span><h3>{service.title}</h3><p>{service.description}</p><div className="feature-list">{service.features.map(feature=><span key={feature}><Check size={15}/>{feature}</span>)}</div><a href="#aloqa" className="text-link">Menga shunday tizim kerak <ArrowUpRight size={18}/></a><div className="demo-disclaimer"><Code2 size={15}/><span>Bu imkoniyatlar namoyishi.<br/>Haqiqiy buyurtma va xabar yuborilmaydi.</span></div></div><div className="demo-window"><div className="window-bar"><span className="window-dots"><i/><i/><i/></span><span>{service.short.toLowerCase().replaceAll(' / ','://')}</span><span className="demo-badge">DEMO</span></div><Demo/></div></TabsContent>})}</Tabs>
  </section>
  <section className="connection-section" aria-label="Bir-biriga ulangan xizmatlar"><div className="wrap connection-inner"><span className="eyebrow">ALOHIDA QISMLAR. BITTA KUCHLI TIZIM.</span><p><span>Saytingiz</span><ArrowRight/><span>Botingiz</span><ArrowRight/><span>Biznesingiz</span></p><span className="connection-note">Hammasi bir-birini tushunadi.</span></div></section>
  <section id="haqimda" className="about-section wrap"><div className="about-visual"><img src="/orbit.webp" alt="Bir yadro atrofida birlashgan metall shakllar" width={1536} height={1024} loading="lazy"/><div className="about-visual-overlay"><span className="mono">ONE DEVELOPER / EVERY LAYER</span><span className="layer-word">FRONT<span>+</span>BACK</span><span className="visual-signature">abubakr.</span></div></div><div className="about-copy"><span className="eyebrow">02 / KOD ORTIDAGI INSON</span><h2>Men — Abubakr.<br/><em>Fullstack developer.</em></h2><p>G‘oyani chiroyli interfeysga, interfeysni esa ishlaydigan tizimga aylantiraman. Tashqi ko‘rinishdan ichki mantiqqacha — barcha qatlamlarni birlashtiraman.</p><p className="secondary-copy">Restoran, savdo, xizmat ko‘rsatish yoki butunlay yangi g‘oya. Siz biznesingizni bilasiz, men unga mos raqamli yechimni yarataman.</p><div className="layers-list"><div><Code2/><span>Ko‘rinadigan qism<strong>Qulay interfeys & responsive dizayn</strong></span></div><div><Layers3/><span>Ko‘rinmaydigan kuch<strong>Backend, ma’lumotlar & integratsiyalar</strong></span></div></div></div></section>
  <section id="aloqa" className="contact-section"><div className="wrap"><div className="contact-top"><span className="eyebrow">03 / KEYINGI LOYIHA — SIZNIKI</span><span className="contact-orbit" aria-hidden="true">↗</span></div><h2>Noodatiy g‘oyami?<br/><em>Juda yaxshi.</em></h2><div className="contact-bottom"><p>Restoran, bot, sayt yoki hali nomi yo‘q tizim.<br/>Gaplashamiz. Birga shakl beramiz.</p><div className="phone-group"><a href={`tel:${profile.phone}`} className="phone-link"><Phone size={23}/>{profile.displayPhone}</a><button className="copy-button" onClick={copyPhone} aria-label="Telefon raqamini nusxalash">{copied?<Check size={18}/>:<Copy size={18}/>}</button><span className="copy-feedback" role="status">{copied?'Raqam nusxalandi':copyFailed?'Raqamni belgilab nusxalashingiz mumkin.':''}</span></div></div><div className="contact-signoff"><span>ABUBAKR</span><ArrowUpRight strokeWidth={1}/></div></div></section>
  <footer className="site-footer wrap"><span>© 2026 Abubakr. G‘oyadan ishlaydigan tizimgacha.</span><a href="#top">Yuqoriga <ArrowUpRight size={16}/></a></footer>
 </main>;
}

