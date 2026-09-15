'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Pause, Play } from 'lucide-react';

const companies = [
 { name: 'MUSA', image: '/clients/musa.png', width: 1254, height: 1254, color: '#00813b', tilt: '-3deg', offset: '23px' },
 { name: 'V7', image: '/clients/v7.png', width: 1448, height: 1086, color: '#ffffff', tilt: '2deg', offset: '-13px' },
 { name: 'Fresh Express', image: '/clients/fresh-express.jpg', width: 640, height: 640, color: '#ffffff', tilt: '-2deg', offset: '-13px' },
 { name: 'Afsona', image: '/clients/afsona.jpg', width: 640, height: 640, color: '#751a31', tilt: '3deg', offset: '23px' },
];

export default function ClientGallery() {
 const section = useRef<HTMLElement>(null);
 const [entered, setEntered] = useState(false);
 const [visible, setVisible] = useState(false);
 const [paused, setPaused] = useState(false);
 const [reduced, setReduced] = useState(false);

 useEffect(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const updatePreference = () => setReduced(preference.matches);
  updatePreference();
  preference.addEventListener('change', updatePreference);
  const observer = new IntersectionObserver(([entry]) => {
   setVisible(entry.isIntersecting);
   if (entry.isIntersecting) setEntered(true);
  }, { threshold: .12 });
  if (section.current) observer.observe(section.current);
  return () => { observer.disconnect(); preference.removeEventListener('change', updatePreference); };
 }, []);

 return <section ref={section} id="hamkorlar" className="clients-section" aria-labelledby="clients-title" data-entered={entered} data-moving={visible && !paused && !reduced}>
  <div className="wrap">
   <div className="clients-heading"><span className="eyebrow">HAMKORLAR</span><h2 id="clients-title">Xizmat ko‘rsatgan<br/><em>kompaniyalarim.</em></h2></div>
   <div className="clients-stage">
    <div className="clients-orbits" aria-hidden="true"><span/><span/></div>
    <ul className="clients-grid">{companies.map((company, index) => <li key={company.name} className="client-item" style={{ '--client-color': company.color, '--client-tilt': company.tilt, '--client-offset': company.offset, '--client-delay': `${index * 100}ms`, '--float-delay': `${index * -1.7}s` } as CSSProperties}>
     <div className="client-reveal"><figure className="client-card"><div className="client-logo-surface"><img src={company.image} alt={`${company.name} logotipi`} width={company.width} height={company.height} loading="lazy" decoding="async"/></div><figcaption><span className="client-index" aria-hidden="true">0{index + 1}</span><span>{company.name}</span><span className="client-caption-line" aria-hidden="true"/></figcaption></figure></div>
    </li>)}</ul>
   </div>
   <div className="clients-bottom"><span className="clients-count">04 <span>kompaniya</span></span><span className="clients-bottom-line" aria-hidden="true"/>{!reduced && <button type="button" className="clients-motion" onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? 'Logolar animatsiyasini davom ettirish' : 'Logolar animatsiyasini to‘xtatish'}>{paused ? <Play size={15}/> : <Pause size={15}/>}<span>{paused ? 'Davom ettirish' : 'Harakatni to‘xtatish'}</span></button>}</div>
  </div>
 </section>;
}
