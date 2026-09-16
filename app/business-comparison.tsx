'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Slider } from '@base-ui/react/slider';
import { ArrowRight, Check, ChevronRight, Clock3, FileText, LayoutDashboard, MessageCircle, Phone, ReceiptText, Send, Utensils, Wallet } from 'lucide-react';

const orders = [
 { id: '1048', name: 'Aziza K.', initials: 'AK', items: '2 × Burger · 1 × Limonad', total: 76000, source: 'Telegram', status: 'Tayyorlanmoqda', tone: 'preparing' },
 { id: '1049', name: 'Javohir A.', initials: 'JA', items: '1 × Lavash · 1 × Cola', total: 40000, source: 'Sayt', status: 'Yangi', tone: 'new' },
 { id: '1050', name: 'Madina S.', initials: 'MS', items: '2 × Pizza', total: 116000, source: 'Telegram', status: 'Yetkazilmoqda', tone: 'delivery' },
];
const money = (value: number) => new Intl.NumberFormat('ru-RU').format(value);
const total = orders.reduce((sum, order) => sum + order.total, 0);
const changes = [
 { icon: ReceiptText, title: 'Buyurtmalar', before: 'Turli chat va yozuvlarda', after: 'Barchasi bitta ro‘yxatda' },
 { icon: Clock3, title: 'Buyurtma holati', before: 'Har safar so‘rab aniqlash', after: 'Har bir bosqich ekranda' },
 { icon: Wallet, title: 'Hisob-kitob', before: 'Summalarni qo‘lda jamlash', after: 'Avtomatik hisoblangan jami' },
];

function ManualOrders() {
 return <div className="comparison-scene comparison-manual" aria-hidden="true">
  <div className="manual-scene-heading"><span className="manual-app-icon"><FileText size={20}/></span><div><strong>Buyurtma yozuvlari</strong><span>Qo‘ng‘iroq, chat, alohida qaydlar</span></div><span className="manual-time">12:40</span></div>
  <div className="manual-workspace">
   <div className="manual-order-sheet"><div className="manual-sheet-heading"><span>Bugungi buyurtmalar</span><span>15 / 09</span></div>{orders.map(order => <div className="manual-order" key={order.id}><div><span>#{order.id}</span><strong>{order.name}</strong></div><p>{order.items}</p><span className="manual-order-sum">{money(order.total)} so‘m</span></div>)}<div className="manual-sheet-total"><span>Jami: qo‘lda hisoblash</span><strong>{money(total)} so‘m</strong></div></div>
   <div className="manual-inbox"><div className="manual-message"><span><MessageCircle size={15}/> Xodimlar guruhi</span><p>Madina buyurtmasi tayyormi?</p><small>12:38 · Javob kutilmoqda</small></div><div className="manual-call"><Phone size={18}/><div><strong>Yana bir qo‘ng‘iroq</strong><span>Buyurtma holatini so‘rashmoqda</span></div></div><div className="manual-reminder"><span>ESLATMA</span><p>Buyurtmalarni oshxonaga aytish kerak.</p><span className="manual-reminder-rule"/></div></div>
  </div>
 </div>;
}

function DigitalOrders() {
 return <div className="comparison-scene comparison-digital" aria-hidden="true">
  <div className="digital-scene-heading"><span className="digital-app-icon"><LayoutDashboard size={21}/></span><div><strong>Buyurtmalar markazi</strong><span>Sayt, bot va oshxona — bir tizimda</span></div><span className="digital-system-label"><span/> NAMUNA</span></div>
  <div className="digital-workspace"><div className="digital-metrics"><div><span>Buyurtmalar</span><strong>{String(orders.length).padStart(2, '0')}<small>ta</small></strong></div><div><span>Buyurtmalar summasi</span><strong>{money(total)}<small>so‘m</small></strong></div><span className="digital-metric-icon"><ReceiptText size={29}/></span></div>
   <div className="digital-order-list"><div className="digital-list-heading"><span>Buyurtma / mijoz</span><span>Summa</span><span>Holat</span></div>{orders.map(order => <div className="digital-order" key={order.id}><span className="digital-avatar">{order.initials}</span><div className="digital-order-person"><strong>{order.name}<small>#{order.id}</small></strong><span>{order.items}</span><small className="digital-source">{order.source}</small></div><span className="digital-order-total">{money(order.total)}<small>so‘m</small></span><span className={`digital-order-status status-${order.tone}`}><span/>{order.status}</span></div>)}</div>
   <div className="digital-flow"><span><Check size={15}/> Buyurtma</span><ChevronRight size={15}/><span><Utensils size={15}/> Oshxona</span><ChevronRight size={15}/><span><Send size={15}/> Mijozga xabar</span></div>
  </div>
 </div>;
}

export default function BusinessComparison() {
 const [position, setPosition] = useState(50);
 const interacted = useRef(false);
 const selectView = (value: number) => { interacted.current = true; setPosition(value); };
 useEffect(() => {
  const phone = window.matchMedia('(max-width: 700px)');
  const updateDefault = () => { if (!interacted.current) setPosition(phone.matches ? 0 : 50); };
  updateDefault();
  phone.addEventListener('change', updateDefault);
  return () => phone.removeEventListener('change', updateDefault);
 }, []);

 return <section id="oldin-keyin" className="transformation-section wrap" aria-labelledby="transformation-title">
  <div className="transformation-heading"><div><span className="eyebrow">BOSHQARUVDAGI FARQ</span><h2 id="transformation-title">Biznesning<br/><em>oldin va keyini.</em></h2></div><p>Bir xil buyurtmalar qo‘lda va yagona tizimda qanday boshqarilishini ko‘ring. Ajratgichni surib, farqni oching.</p></div>
  <div className="comparison-board">
   <div className="comparison-toolbar"><span className="comparison-example"><Utensils size={17}/> Restoran buyurtmalari</span><div className="comparison-presets" role="group" aria-label="Taqqoslash ko‘rinishi"><button type="button" aria-pressed={position === 100} onClick={() => selectView(100)}>Oldin</button><button type="button" aria-pressed={position > 0 && position < 100} onClick={() => selectView(50)}>Taqqoslash</button><button type="button" aria-pressed={position === 0} onClick={() => selectView(0)}>Keyin</button></div></div>
   <div className="comparison-body" style={{ '--comparison-position': `${position}%` } as CSSProperties}>
    <div className="comparison-viewport"><ManualOrders/><div className="comparison-after-layer" style={{ clipPath: `inset(0 0 0 ${position}%)` }}><DigitalOrders/></div><span className="comparison-side-label is-before" style={{ opacity: position === 0 ? 0 : 1 }}>OLDIN <span>Qo‘lda boshqaruv</span></span><span className="comparison-side-label is-after" style={{ opacity: position === 100 ? 0 : 1 }}>KEYIN <span>Yagona tizim</span></span></div>
    <div className="comparison-divider" aria-hidden="true" style={{ opacity: position === 0 || position === 100 ? 0 : 1 }}/>
    <div className="comparison-field"><Slider.Root data-slot="slider" className="comparison-slider" value={position} onValueChange={value => selectView(Math.round(value))} min={0} max={100} step={1} largeStep={10} thumbAlignment="center"><Slider.Control className="comparison-slider-control"><Slider.Track data-slot="slider-track"/><Slider.Thumb data-slot="slider-thumb" aria-label="Oldin va keyin ko‘rinishlarini taqqoslash" getAriaValueText={(_, value) => `Qo‘lda boshqaruv ${value} foiz, raqamli tizim ${100 - value} foiz ochiq`}/></Slider.Control></Slider.Root></div>
   </div>
   <div className="comparison-footnote"><span><span className="comparison-demo-dot"/> Namunaviy demo · bir xil 3 ta buyurtma</span><span className="comparison-drag-hint">← Ajratgichni suring →</span></div>
  </div>
  <div className="comparison-accessible-orders sr-only"><h3>Namuna buyurtmalari</h3><ul>{orders.map(order => <li key={order.id}>#{order.id}, {order.name}: {order.items}, {money(order.total)} so‘m. Tizimdagi holati: {order.status}.</li>)}</ul><p>Jami {money(total)} so‘m. Slayderda chap va o‘ng strelkalardan foydalaning. Home raqamli tizimni, End qo‘lda boshqaruvni ochadi.</p></div>
  <div className="transformation-benefits">{changes.map(change => <div className="transformation-benefit" key={change.title}><div><change.icon size={20}/><h3>{change.title}</h3></div><p>{change.before}</p><span><ArrowRight size={17}/>{change.after}</span></div>)}</div>
 </section>;
}
