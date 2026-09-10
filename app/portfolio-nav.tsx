'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Phone, Plus, X } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { profile } from './portfolio-data';

const links = [
 { id: 'laboratoriya', label: 'Xizmatlar', number: '01' },
 { id: 'haqimda', label: 'Men haqimda', number: '02' },
 { id: 'aloqa', label: 'Aloqa', number: '03' },
];

export default function PortfolioNav() {
 const [current, setCurrent] = useState('top');
 const [compact, setCompact] = useState(false);
 const [open, setOpen] = useState(false);
 const destination = useRef<string | null>(null);

 useEffect(() => {
  let frame = 0;
  const update = () => {
   frame = 0;
   setCompact(window.scrollY > 24);
   let section = 'top';
   const threshold = Math.max(110, Math.min(240, window.innerHeight * .3));
   for (const link of links) {
    const element = document.getElementById(link.id);
    if (element && element.getBoundingClientRect().top <= threshold) section = link.id;
   }
   if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) section = 'aloqa';
   setCurrent(section);
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  window.addEventListener('hashchange', schedule);
  const desktop = window.matchMedia('(min-width: 901px)');
  const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
  desktop.addEventListener('change', closeOnDesktop);
  return () => {
   cancelAnimationFrame(frame);
   window.removeEventListener('scroll', schedule);
   window.removeEventListener('resize', schedule);
   window.removeEventListener('hashchange', schedule);
   desktop.removeEventListener('change', closeOnDesktop);
  };
 }, []);

 const finishNavigation = (isOpen: boolean) => {
  if (isOpen || !destination.current) return;
  const target = document.getElementById(destination.current);
  destination.current = null;
  if (target) {
   target.tabIndex = -1;
   target.focus({ preventScroll: true });
   target.scrollIntoView({ block: 'start' });
  }
 };
 const selectedIndex = links.findIndex(link => link.id === current);

 return <header className={`orbit-header wrap${compact ? ' is-compact' : ''}`}>
  <div className="orbit-header-frame">
   <a className="wordmark orbit-wordmark" href="#top" aria-label="Abubakr bosh sahifa"><span className="logo-glyph" aria-hidden="true">a<span>↗</span></span><span>abubakr<span className="wordmark-dev">.dev</span></span></a>
   <nav className="orbit-navigation" aria-label="Asosiy navigatsiya" style={{ '--nav-index': Math.max(0, selectedIndex) } as CSSProperties}>
    <span className={`orbit-nav-cursor${selectedIndex < 0 ? ' is-hidden' : ''}`} aria-hidden="true"/>
    {links.map(link => <a key={link.id} href={`#${link.id}`} aria-current={current === link.id ? 'location' : undefined}><span className="orbit-link-number">{link.number}</span><span>{link.label}</span></a>)}
   </nav>
   <a className="orbit-contact" href="#aloqa"><span>Loyihani boshlaymiz</span><span className="orbit-contact-arrow"><ArrowUpRight size={21}/></span></a>
   <Dialog open={open} onOpenChange={setOpen} onOpenChangeComplete={finishNavigation}>
    <DialogTrigger className="orbit-menu-trigger">Menyu <Plus size={20}/></DialogTrigger>
    <DialogContent className="orbit-mobile-menu" showCloseButton={false}>
     <div className="orbit-menu-top"><DialogTitle className="orbit-menu-title">Navigatsiya</DialogTitle><DialogClose className="orbit-menu-close" aria-label="Menyuni yopish"><X size={23}/></DialogClose></div>
     <nav className="orbit-mobile-links" aria-label="Mobil navigatsiya">{links.map(link => <a key={link.id} href={`#${link.id}`} aria-current={current === link.id ? 'location' : undefined} onClick={() => { destination.current = link.id; setOpen(false); }}><span>{link.number}</span><strong>{link.label}</strong><ArrowUpRight size={27}/></a>)}</nav>
     <a className="orbit-menu-phone" href={`tel:${profile.phone}`}><Phone size={19}/>{profile.displayPhone}<ArrowUpRight size={19}/></a>
    </DialogContent>
   </Dialog>
  </div>
 </header>;
}
