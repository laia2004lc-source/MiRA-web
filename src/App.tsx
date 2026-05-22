import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, MessageCircle, Shield, Maximize2, X, User, Check, Sliders, ChevronLeft, ChevronRight, Heart, CreditCard, Package, Image as ImageIcon, Info, Trash2, Menu, Star, Tag, Sparkles } from 'lucide-react';

// ─── Hook de responsivitat ──────────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

interface PerfilCompleter {
  nom: string;
  email: string;
  telefon: string;
  adreca: string;
  fotoRA: string | null;
  alcada: string;
  pit: string;
  cintura: string;
  maluc: string;
  looksProvats: string[];
  comandes: { id: string; data: string; productes: string; total: string }[];
}

interface ItemCarret {
  producte: typeof PRODUCTES[0];
  talla: string;
  quantitat: number;
}

const PRODUCTES = [
  {
    id: 'pantalons-essence',
    nom: 'Pantaló fluid Essence',
    preu: 50.00,
    descripcio: "Pantaló d'estil urbà amb tall wide leg i teixit fluid que s'adapta perfectament al teu moviment. Confeccionat de manera sostenible en tallers locals. Una peça còmoda, versàtil i en tendència per al teu dia a dia.",
    imatges: [
      '/assets/pantalons_essence_1.jpg',
      '/assets/pantalons_essence_2.jpg',
      '/assets/pantalons_essence_3.jpg',
      '/assets/pantalons_essence_4.jpg'
    ],
    teixit: '95% Cotó Orgànic Certificat, 5% Elastà',
    model3d: '/assets/pantalons_essence.glb',
    isNou: false,
    isSales: true,
    descompte: 0.20
  },
  {
    id: 'pantalons-tailor',
    nom: 'Pantaló sastre Tailor',
    preu: 70.00,
    descripcio: 'Elegància clàssica i sastreria contemporània. Aquest pantaló destaca pel seu tall estructurat de tir alt que defineix la silueta amb la màxima comoditat. Creat a Barcelona amb materials responsables i sota criteris de residu zero.',
    imatges: [
      '/assets/pantalons_tailor_1.jpg',
      '/assets/pantalons_tailor_2.jpg',
      '/assets/pantalons_tailor_3.jpg',
      '/assets/pantalons_tailor_4.jpg'
    ],
    teixit: '100% Cotó Orgànic Premium d\'alta densitat',
    model3d: '/assets/pantalons_tailor.glb',
    isNou: true,
    isSales: false,
    descompte: 0
  },
  {
    id: 'camiseta-essence',
    nom: 'Top drapejat Essence',
    preu: 40.00,
    descripcio: 'Disseny conscient i sofisticació minimalista. Aquest top destaca pel seu escot creuat i un drapejat elegant que afavoreix la silueta amb una caiguda molt fluida. Dissenyada de proximitat i amb residu zero.',
    imatges: [
      '/assets/camiseta_essence_1.png',
      '/assets/camiseta_essence_2.png',
      '/assets/camiseta_essence_3.png'
    ],
    teixit: '100% Cotó Orgànic Certificat de primera qualitat',
    model3d: '/assets/camiseta_essence.glb',
    isNou: false,
    isSales: true,
    descompte: 0.15
  },
  {
    id: 'camiseta-tailor',
    nom: 'Brusa sastre Tailor',
    preu: 50.00,
    descripcio: 'Elegància i sofisticació minimalista per al teu dia a dia. Aquesta brusa destaca per les seves línies pures, un escot refinat i una caiguda fluida de màxima comoditat. Confeccionada a Barcelona sota criteris de disseny conscient i residu zero.',
    imatges: [
      '/assets/camiseta_tailor_1.png',
      '/assets/camiseta_tailor_2.jpg',
      '/assets/camiseta_tailor_3.png',
      '/assets/camiseta_tailor_4.jpg'
    ],
    teixit: '100% Cotó Orgànic Premium d\'alta densitat i tissatge fi',
    model3d: '/assets/camiseta_tailor.glb',
    isNou: true,
    isSales: false,
    descompte: 0
  }
];

// ─── RESSENYES DE CLIENTS ──────────────────────────────────────────────────
const RESSENYES = [
  {
    id: 1,
    nom: 'Laia Puigdomènech',
    lloc: 'Mataró',
    valoracio: 5,
    producte: 'Pantaló sastre Tailor',
    text: "El probador virtual és una passada! Vaig poder veure exactament com em quedaria el pantaló Tailor abans de comprar. La talla que em van recomanar és perfecta. Mai havia tingut una experiència de compra online tan segura i sense sorpreses."
  },
  {
    id: 2,
    nom: 'Marta Espinosa',
    lloc: 'Barcelona',
    valoracio: 5,
    producte: 'Top drapejat Essence',
    text: "La qualitat del cotó orgànic és molt millor del que esperava. Saber que la roba es fabrica a Barcelona amb residu zero fa que la compra tingui un significat diferent. El top és còmode i elegant alhora. Repetiré segur!"
  },
  {
    id: 3,
    nom: 'Núria Calvet',
    lloc: 'Premià de Mar',
    valoracio: 5,
    producte: 'Brusa sastre Tailor',
    text: "Sempre tinc dubtes entre dues talles, però el recomanador de MiRA encerta a la primera. La brusa Tailor és preciosa en persona i la caiguda del teixit és exactament com apareix a l'emprovador 3D. Molt recomanable!"
  }
];

// Preu amb descompte
const preuSales = (prod: typeof PRODUCTES[0]) =>
  prod.descompte > 0 ? +(prod.preu * (1 - prod.descompte)).toFixed(2) : prod.preu;

// ─── Estreles de valoració ─────────────────────────────────────────────────
function Estrelles({ n }: { n: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={14} fill={i <= n ? '#111' : 'none'} color={i <= n ? '#111' : '#ccc'} />
      ))}
    </div>
  );
}

// ─── Bloc de Ressenyes ──────────────────────────────────────────────────────
function SeccioRessenyes({ isMobile }: { isMobile: boolean }) {
  return (
    <section style={{ borderTop: '1px solid #eceae4', paddingTop: '60px', marginTop: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#444', fontWeight: 'bold' }}>EL QUE DIU LA COMUNITAT</span>
        <h2 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '22px' : '28px', fontWeight: '300', letterSpacing: '2px', margin: '8px 0 0 0', color: '#111' }}>
          OPINIONS REALS
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
        {RESSENYES.map((r) => (
          <div key={r.id} style={{ backgroundColor: '#ffffff', border: '1px solid #eae8e1', padding: '28px 24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <Estrelles n={r.valoracio} />
            <p style={{ margin: 0, fontSize: '14px', color: '#444', lineHeight: '1.75', fontStyle: 'italic' }}>
              "{r.text}"
            </p>
            <div style={{ borderTop: '1px solid #eceae4', paddingTop: '14px', marginTop: 'auto' }}>
              <p style={{ margin: '0 0 2px 0', fontWeight: 'bold', fontSize: '13px', letterSpacing: '0.5px', color: '#111' }}>{r.nom}</p>
              <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#666' }}>{r.lloc}</p>
              <span style={{ fontSize: '11px', letterSpacing: '1px', color: '#444', backgroundColor: '#f4f3ee', padding: '3px 8px', border: '1px solid #eae8e1' }}>
                {r.producte}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Component PreferitsCarret ─────────────────────────────────────────────
function PreferitsCarret({ preferits, tallaRecomanadaPerProducte, onAfegir, onEliminarPreferit, isMobile }: {
  preferits: typeof PRODUCTES;
  tallaRecomanadaPerProducte: (prodId: string) => string | null;
  onAfegir: (prod: typeof PRODUCTES[0], talla: string) => void;
  onEliminarPreferit: (prod: typeof PRODUCTES[0]) => void;
  isMobile: boolean;
}) {
  const [tallesSeleccionades, setTallesSeleccionades] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    preferits.forEach(p => {
      const rec = tallaRecomanadaPerProducte(p.id);
      init[p.id] = rec || 'M';
    });
    return init;
  });

  return (
    <div style={{ marginTop: '50px' }}>
      <div style={{ borderTop: '1px solid #eceae4', paddingTop: '40px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '18px' : '22px', fontWeight: '300', margin: 0, letterSpacing: '2px', color: '#111' }}>
          <Heart size={18} style={{ display: 'inline', marginRight: '10px', verticalAlign: 'middle' }} fill="#111" />
          ELS TEUS PREFERITS
        </h2>
        <span style={{ fontSize: '12px', color: '#444', letterSpacing: '1px' }}>{preferits.length} {preferits.length === 1 ? 'peça guardada' : 'peces guardades'}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
        {preferits.map((prod) => {
          const tallaRec = tallaRecomanadaPerProducte(prod.id);
          const tallaActual = tallesSeleccionades[prod.id] || tallaRec || 'M';
          return (
            <div key={prod.id} style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '70px', height: '90px', backgroundColor: '#f5f5f3', overflow: 'hidden', border: '1px solid #eceae4', flexShrink: 0 }}>
                <img src={prod.imatges[0]} alt={prod.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=' + prod.nom }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ margin: '0 0 3px 0', fontSize: '14px', fontWeight: '400', letterSpacing: '0.5px', color: '#111' }}>{prod.nom}</h4>
                <p style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: 'bold' }}>{prod.preu.toFixed(2)} €</p>
                {tallaRec && (
                  <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#2e7d32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={12} /> La teva talla recomanada: {tallaRec}
                  </p>
                )}
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#444', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>TALLA</span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['XS', 'S', 'M', 'L', 'XL'].map(t => (
                      <button key={t} onClick={() => setTallesSeleccionades(prev => ({ ...prev, [prod.id]: t }))}
                        style={{ width: '34px', height: '34px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', border: tallaActual === t ? '2px solid #111' : '1px solid #ccc', backgroundColor: tallaActual === t ? '#111' : t === tallaRec ? '#e8f5e9' : '#fff', color: tallaActual === t ? '#fff' : '#111' }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => onAfegir(prod, tallaActual)}
                  style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '9px 14px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', width: '100%' }}>
                  AFEGIR AL CARRETÓ
                </button>
              </div>
              <button onClick={() => onEliminarPreferit(prod)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', flexShrink: 0, padding: '2px' }} title="Eliminar de preferits">
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
export default function App() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const [menuMobilObert, setMenuMobilObert] = useState(false);

  const [seccioActiva, setSeccioActiva] = useState<'colleccio' | 'sobre-mira' | 'perfil' | 'carreto' | 'novetats' | 'mid-season'>('sobre-mira');
  const [producteSeleccionat, setProducteSeleccionat] = useState<typeof PRODUCTES[0] | null>(null);
  const [imatgeActiva, setImatgeActiva] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string | null>(null);
  const [subgrupPerfil, setSubgrupPerfil] = useState<'dades' | 'ra' | 'looks' | 'compres' | 'preferits'>('dades');
  const [missatgeWeb, setMissatgeWeb] = useState<{ text: string; tipus: 'exit' | 'info' } | null>(null);
  const [carret, setCarret] = useState<ItemCarret[]>([]);
  const [preferits, setPreferits] = useState<typeof PRODUCTES>([]);
  const [emprovadorObert, setEmprovadorObert] = useState(false);
  const [pasFotoObligatori, setPasFotoObligatori] = useState(false);
  const [guiaMidesOberta, setGuiaMidesOberta] = useState(false);
  const [mesuresRapidesObertes, setMesuresRapidesObertes] = useState(false);
  const [mesuresTemp, setMesuresTemp] = useState({ alcada: '', pit: '', cintura: '', maluc: '' });
  const [pasCheckout, setPasCheckout] = useState<'carret' | 'pagament'>('carret');
  const [dadesPagament, setDadesPagament] = useState({ numero: '', expiracio: '', titular: '', cvv: '' });

  const [perfil, setPerfil] = useState<PerfilCompleter>(() => {
    const salvat = localStorage.getItem('mira_perfil_v2');
    return salvat ? JSON.parse(salvat) : {
      nom: 'Maria Soler', email: 'mariasoler@gmail.com', telefon: '600 123 456',
      adreca: 'Carrer de la Moda, 45, Barcelona', fotoRA: null,
      alcada: '168', pit: '88', cintura: '70', maluc: '96',
      looksProvats: [], comandes: []
    };
  });

  useEffect(() => { localStorage.setItem('mira_perfil_v2', JSON.stringify(perfil)); }, [perfil]);
  useEffect(() => { if (missatgeWeb) { const t = setTimeout(() => setMissatgeWeb(null), 4000); return () => clearTimeout(t); } }, [missatgeWeb]);
  useEffect(() => { setMenuMobilObert(false); }, [seccioActiva]);

  const CAMPS_PER_PRODUCTE: Record<string, Array<'pit' | 'cintura' | 'maluc'>> = {
    'camiseta-essence':  ['cintura', 'pit'],
    'pantalons-essence': ['cintura', 'maluc'],
    'camiseta-tailor':   ['pit'],
    'pantalons-tailor':  ['cintura', 'maluc'],
  };
  const LABELS_CAMP: Record<string, string> = {
    pit: 'Contorn de Pit (cm)', cintura: 'Contorn de Cintura (cm)', maluc: 'Contorn de Maluc (cm)',
  };

  const recomanarTallaPerProducte = (prodId: string | undefined): string | null => {
    if (!prodId) return null;
    const cintura = parseInt(perfil.cintura) || 0;
    const pit     = parseInt(perfil.pit)     || 0;
    switch (prodId) {
      case 'camiseta-essence':
        if (!perfil.cintura || !perfil.pit) return null;
        if (cintura < 64) return 'XS'; if (cintura < 68) return 'S'; if (cintura < 72) return 'M'; if (cintura < 76) return 'L'; return 'XL';
      case 'pantalons-essence':
        if (!perfil.cintura || !perfil.maluc) return null;
        if (cintura < 64) return 'XS'; if (cintura < 70) return 'S'; if (cintura < 76) return 'M'; if (cintura < 82) return 'L'; return 'XL';
      case 'camiseta-tailor':
        if (!perfil.pit) return null;
        if (pit < 88) return 'XS'; if (pit < 92) return 'S'; if (pit < 96) return 'M'; if (pit < 100) return 'L'; return 'XL';
      case 'pantalons-tailor':
        if (!perfil.cintura || !perfil.maluc) return null;
        if (cintura <= 65) return 'XS'; if (cintura <= 69) return 'S'; if (cintura <= 73) return 'M'; if (cintura <= 77) return 'L'; return 'XL';
      default: return null;
    }
  };

  const tallaRecomanada = recomanarTallaPerProducte(producteSeleccionat?.id);
  const campsFaltants: Array<'pit' | 'cintura' | 'maluc'> = producteSeleccionat
    ? (CAMPS_PER_PRODUCTE[producteSeleccionat.id] || []).filter(camp => !perfil[camp]) : [];

  useEffect(() => {
    if (tallaRecomanada && producteSeleccionat) setTallaSeleccionada(tallaRecomanada);
  }, [producteSeleccionat, tallaRecomanada]);

  const seguentImatge = () => producteSeleccionat && setImatgeActiva(p => (p + 1) % producteSeleccionat.imatges.length);
  const anteriorImatge = () => producteSeleccionat && setImatgeActiva(p => (p - 1 + producteSeleccionat.imatges.length) % producteSeleccionat.imatges.length);

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => { setPerfil(prev => ({ ...prev, fotoRA: ev.target?.result as string })); setMissatgeWeb({ text: 'Fotografia de RA guardada correctament al perfil.', tipus: 'exit' }); };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleFotoUploadDesDeEmprovador = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPerfil(prev => ({ ...prev, fotoRA: ev.target?.result as string }));
        setPasFotoObligatori(false);
        if (producteSeleccionat && !perfil.looksProvats.includes(producteSeleccionat.id))
          setPerfil(prev => ({ ...prev, looksProvats: [...prev.looksProvats, producteSeleccionat.id] }));
        setEmprovadorObert(true);
        setMissatgeWeb({ text: 'Fotografia guardada al perfil. Emprovador activat!', tipus: 'exit' });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const intentarObrirEmprovador = () => {
    if (!perfil.fotoRA) { setPasFotoObligatori(true); }
    else {
      if (producteSeleccionat && !perfil.looksProvats.includes(producteSeleccionat.id))
        setPerfil(prev => ({ ...prev, looksProvats: [...prev.looksProvats, producteSeleccionat.id] }));
      setEmprovadorObert(true);
    }
  };

  const afegirAlCarret = () => {
    if (!producteSeleccionat) return;
    if (!tallaSeleccionada) { setMissatgeWeb({ text: "Si us plau, selecciona una talla abans d'afegir.", tipus: 'info' }); return; }
    setCarret(prev => {
      const ex = prev.find(i => i.producte.id === producteSeleccionat.id && i.talla === tallaSeleccionada);
      if (ex) return prev.map(i => i.producte.id === producteSeleccionat.id && i.talla === tallaSeleccionada ? { ...i, quantitat: i.quantitat + 1 } : i);
      return [...prev, { producte: producteSeleccionat, talla: tallaSeleccionada, quantitat: 1 }];
    });
    setMissatgeWeb({ text: `${producteSeleccionat.nom} (Talla ${tallaSeleccionada}) afegit al carretó.`, tipus: 'exit' });
  };

  const afegirAlCarretDesDeEmprovador = () => {
    if (!producteSeleccionat || !tallaSeleccionada) { setMissatgeWeb({ text: "Si us plau, selecciona una talla.", tipus: 'info' }); return; }
    setCarret(prev => {
      const ex = prev.find(i => i.producte.id === producteSeleccionat.id && i.talla === tallaSeleccionada);
      if (ex) return prev.map(i => i.producte.id === producteSeleccionat.id && i.talla === tallaSeleccionada ? { ...i, quantitat: i.quantitat + 1 } : i);
      return [...prev, { producte: producteSeleccionat, talla: tallaSeleccionada, quantitat: 1 }];
    });
    setEmprovadorObert(false);
    setMissatgeWeb({ text: `${producteSeleccionat.nom} (Talla ${tallaSeleccionada}) afegit al carretó!`, tipus: 'exit' });
  };

  const commutarPreferit = (prod: typeof PRODUCTES[0]) => {
    setPreferits(prev => prev.find(p => p.id === prod.id) ? prev.filter(p => p.id !== prod.id) : [...prev, prod]);
    setMissatgeWeb({ text: preferits.find(p => p.id === prod.id) ? 'Eliminat de preferits.' : 'Afegit a la llista de preferits.', tipus: 'exit' });
  };

  const handleDeleteLook = (lookId: string) => {
    setPerfil(prev => ({ ...prev, looksProvats: prev.looksProvats.filter(id => id !== lookId) }));
    setMissatgeWeb({ text: 'Look eliminat de la teva galeria.', tipus: 'info' });
  };

  const subtotalCarret = carret.reduce((sum, item) => sum + (item.producte.preu * item.quantitat), 0);
  const costEnviament = subtotalCarret >= 60 || subtotalCarret === 0 ? 0 : 3.95;
  const totalGlobal = subtotalCarret + costEnviament;
  const faltaPerEnviamentGratis = subtotalCarret > 0 && subtotalCarret < 60 ? (60 - subtotalCarret) : 0;

  const NAV_ITEMS = [
    { label: 'SOBRE MiRA',        key: 'sobre-mira' as const, acc: () => setSeccioActiva('sobre-mira') },
    { label: 'NOVETATS',          key: 'novetats' as const,   acc: () => setSeccioActiva('novetats') },
    { label: 'MID-SEASON SALES',  key: 'mid-season' as const, acc: () => setSeccioActiva('mid-season') },
    { label: 'COL·LECCIÓ',        key: 'colleccio' as const,  acc: () => { setSeccioActiva('colleccio'); setProducteSeleccionat(null); } },
    { label: 'EL MEU PERFIL',     key: 'perfil' as const,     acc: () => setSeccioActiva('perfil') },
  ];

  // ─── Targeta de producte reutilitzable ───────────────────────────────────
  const TarjetaProducte = ({ prod, mostrarPreuSales = false }: { prod: typeof PRODUCTES[0]; mostrarPreuSales?: boolean }) => {
    const preuFinal = mostrarPreuSales ? preuSales(prod) : prod.preu;
    return (
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #eae8e1', overflow: 'hidden', position: 'relative', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'center' }}>
        {prod.isNou && !mostrarPreuSales && (
          <span style={{ position: 'absolute', top: '14px', right: '14px', backgroundColor: '#111', color: '#fff', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', padding: '4px 10px', zIndex: 10 }}>NOU</span>
        )}
        {prod.isSales && mostrarPreuSales && (
          <span style={{ position: 'absolute', top: '14px', right: '14px', backgroundColor: '#bd1c1c', color: '#fff', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', padding: '4px 10px', zIndex: 10 }}>
            -{Math.round(prod.descompte * 100)}%
          </span>
        )}

        <div onClick={() => { setProducteSeleccionat(prod); setImatgeActiva(0); setSeccioActiva('colleccio'); }}
          style={{ width: '100%', height: isMobile ? '300px' : '420px', backgroundColor: '#f5f5f3', overflow: 'hidden', cursor: 'pointer' }}>
          <img src={prod.imatges[0]} alt={prod.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x420?text=' + prod.nom }} />
        </div>

        <button onClick={(e) => { e.stopPropagation(); commutarPreferit(prod); }}
          style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#fff', border: 'none', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
          <Heart size={16} fill={preferits.find(p => p.id === prod.id) ? '#111' : 'none'} color={preferits.find(p => p.id === prod.id) ? '#111' : '#888'} />
        </button>

        <div onClick={() => { setProducteSeleccionat(prod); setImatgeActiva(0); setSeccioActiva('colleccio'); }}
          style={{ padding: isMobile ? '22px' : '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box', cursor: 'pointer' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '17px' : '20px', fontWeight: '400', letterSpacing: '1px', color: '#111' }}>{prod.nom}</h3>
          <p style={{ margin: '0 0 16px 0', color: '#444', fontSize: '14px', lineHeight: '1.6' }}>{prod.descripcio}</p>
          <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            {mostrarPreuSales && prod.descompte > 0 ? (
              <>
                <span style={{ fontWeight: 'bold', fontSize: '19px', color: '#bd1c1c' }}>{preuFinal.toFixed(2)} €</span>
                <span style={{ fontSize: '14px', color: '#999', textDecoration: 'line-through' }}>{prod.preu.toFixed(2)} €</span>
              </>
            ) : (
              <span style={{ fontWeight: 'bold', fontSize: '17px', color: '#111' }}>{prod.preu.toFixed(2)} €</span>
            )}
          </div>
          <span style={{ fontSize: '12px', letterSpacing: '2px', textDecoration: 'underline', fontWeight: 'bold', color: '#111' }}>EXPLORAR PEÇA I PROVAR EN 3D</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: '"Didot", "Playfair Display", "Helvetica Neue", sans-serif', color: '#111', backgroundColor: '#faf9f6', minHeight: '100vh', margin: 0, padding: 0, position: 'relative', colorScheme: 'light' } as React.CSSProperties}>

      {/* ALERTA DINÀMICA */}
      {missatgeWeb && (
        <div style={{ position: 'fixed', top: '90px', right: isMobile ? '10px' : '30px', left: isMobile ? '10px' : 'auto', backgroundColor: missatgeWeb.tipus === 'exit' ? '#111' : '#bd1c1c', color: '#fff', padding: '15px 25px', zIndex: 200, fontSize: '13px', letterSpacing: '1px', boxShadow: '0 5px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {missatgeWeb.tipus === 'exit' ? <Check size={16} /> : <Info size={16} />}
          <span>{missatgeWeb.text}</span>
        </div>
      )}

      {/* ── CAPÇALERA ── */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '18px 20px' : '25px 50px', backgroundColor: '#ffffff', borderBottom: '1px solid #eceae4', position: 'sticky', top: 0, zIndex: 90 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          onClick={() => { setProducteSeleccionat(null); setSeccioActiva('sobre-mira'); }}>
          <img src="/assets/logo.png" alt="MiRA logo" style={{ height: isMobile ? '32px' : '40px', width: 'auto', objectFit: 'contain' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <span style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 'bold', letterSpacing: '6px', fontFamily: '"Didot", serif' }}>MiRA</span>
        </div>

        {!isMobile && (
          <nav style={{ display: 'flex', gap: '30px', fontWeight: 400, fontSize: '13px', letterSpacing: '2px', color: '#111' }}>
            {NAV_ITEMS.map(({ label, key, acc }) => (
              <span key={key} onClick={acc}
                style={{ cursor: 'pointer', borderBottom: seccioActiva === key ? '1px solid #111' : 'none', paddingBottom: '4px', color: key === 'mid-season' ? '#bd1c1c' : '#111', fontWeight: key === 'mid-season' ? 'bold' : 400 }}>
                {label}
              </span>
            ))}
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '15px' : '25px' }}>
          <div onClick={() => { setSeccioActiva('carreto'); setPasCheckout('carret'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', letterSpacing: '1px', borderBottom: seccioActiva === 'carreto' ? '1px solid #111' : 'none', paddingBottom: '4px' }}>
            <ShoppingBag size={18} />
            {!isMobile && <span>CARRETÓ ({carret.reduce((a, b) => a + b.quantitat, 0)})</span>}
            {isMobile && carret.reduce((a, b) => a + b.quantitat, 0) > 0 && (
              <span style={{ backgroundColor: '#111', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {carret.reduce((a, b) => a + b.quantitat, 0)}
              </span>
            )}
          </div>
          {isMobile && (
            <button onClick={() => setMenuMobilObert(!menuMobilObert)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <Menu size={22} />
            </button>
          )}
        </div>
      </header>

      {/* ── MENÚ MÒBIL ── */}
      {isMobile && menuMobilObert && (
        <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eceae4', padding: '10px 0', zIndex: 89, position: 'sticky', top: '57px' }}>
          {NAV_ITEMS.map(({ label, key, acc }) => (
            <button key={key} onClick={acc}
              style={{ display: 'block', width: '100%', padding: '14px 24px', background: 'none', border: 'none', textAlign: 'left', fontSize: '13px', letterSpacing: '2px', cursor: 'pointer', fontWeight: key === 'mid-season' ? 'bold' : '400', borderBottom: '1px solid #f0ede6', color: key === 'mid-season' ? '#bd1c1c' : '#111' }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* ═══ SECCIÓ A: COL·LECCIÓ GENERAL ═══ */}
      {seccioActiva === 'colleccio' && !producteSeleccionat && (() => {
        const LINIES = [
          {
            key: 'essence',
            etiqueta: 'COL·LECCIÓ CASUAL ESSENTIALS',
            titol: 'LÍNIA ESSENCE',
            subtitol: 'Comoditat i fluidesa per al teu dia a dia',
            mosaicImg: '/assets/linia_essence.png',
            mosaicAlt: 'Mosaïc Línia Essence',
            productes: PRODUCTES.filter(p => p.id.includes('essence')),
          },
          {
            key: 'tailor',
            etiqueta: 'ALTA SASTRERIA ESTRUCTURAL',
            titol: 'LÍNIA TAILOR',
            subtitol: 'Elegància clàssica i sastreria contemporània',
            mosaicImg: '/assets/linia_tailor.png',
            mosaicAlt: 'Mosaïc Línia Tailor',
            productes: PRODUCTES.filter(p => p.id.includes('tailor')),
          },
        ];

        return (
          <main style={{ padding: 0 }}>

            {/* ── BANNER HERO A TOT AMPLE ── */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: isMobile ? '420px' : '620px',
              overflow: 'hidden',
              backgroundColor: '#111',
            }}>
              <img
                src="/assets/linia_essence_tailor.png"
                alt="Col·lecció MiRA — Essence i Tailor"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  opacity: 0.88,
                }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              {/* Gradient fosc a la part inferior per al text */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '55%',
                background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 100%)',
              }} />
              {/* Text sobre el banner */}
              <div style={{
                position: 'absolute',
                bottom: isMobile ? '32px' : '52px',
                left: isMobile ? '24px' : '60px',
                right: isMobile ? '24px' : '60px',
              }}>
                <span style={{
                  display: 'block',
                  fontSize: '11px',
                  letterSpacing: '4px',
                  color: 'rgba(255,255,255,0.65)',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }}>NOVA TEMPORADA · BARCELONA</span>
                <h1 style={{
                  fontFamily: '"Didot", "Playfair Display", serif',
                  fontSize: isMobile ? '32px' : '58px',
                  fontWeight: '300',
                  letterSpacing: isMobile ? '3px' : '6px',
                  margin: '0 0 14px 0',
                  color: '#ffffff',
                  lineHeight: 1.1,
                }}>EXPLORA LES LÍNIES</h1>
                <p style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: isMobile ? '13px' : '15px',
                  lineHeight: '1.7',
                  letterSpacing: '0.5px',
                  maxWidth: '560px',
                  margin: 0,
                }}>
                  Dissenys atemporals de proximitat. Emprovador virtual en 3D. Talla exacta a la primera.
                </p>
              </div>
            </div>

            {/* ── BLOCS PER LÍNIA ── */}
            <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '50px 16px' : '80px 40px', display: 'flex', flexDirection: 'column', gap: '90px' }}>
              {LINIES.map((linia) => (
                <div key={linia.key}>

                  {/* Capçalera de línia */}
                  <div style={{ borderTop: '1px solid #eceae4', paddingTop: '40px', marginBottom: '36px' }}>
                    <span style={{
                      display: 'block',
                      fontSize: '11px',
                      letterSpacing: '3px',
                      color: '#888',
                      fontWeight: 'bold',
                      marginBottom: '8px',
                    }}>{linia.etiqueta}</span>
                    <h2 style={{
                      fontFamily: '"Didot", "Playfair Display", serif',
                      fontSize: isMobile ? '28px' : '40px',
                      fontWeight: '300',
                      letterSpacing: isMobile ? '2px' : '4px',
                      margin: '0 0 6px 0',
                      color: '#111',
                      lineHeight: 1.1,
                    }}>{linia.titol}</h2>
                    <p style={{
                      fontSize: '14px',
                      color: '#666',
                      letterSpacing: '1px',
                      margin: 0,
                      fontStyle: 'italic',
                    }}>{linia.subtitol}</p>
                  </div>

                  {/* Mosaïc d'imatge */}
                  <div style={{
                    width: '100%',
                    marginBottom: '32px',
                    overflow: 'hidden',
                    border: '1px solid #eae8e1',
                    backgroundColor: '#f5f5f3',
                    // Lleuger arrodoniment per suavitzar
                    borderRadius: '2px',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                  }}>
                    <img
                      src={linia.mosaicImg}
                      alt={linia.mosaicAlt}
                      style={{
                        width: '100%',
                        height: isMobile ? '280px' : '480px',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                        transition: 'transform 0.6s ease',
                      }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.02)'; }}
                      onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
                    />
                  </div>

                  {/* Separador de text entre mosaïc i productes */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '24px',
                  }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#eceae4' }} />
                    <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#aaa', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                      PECES DE LA {linia.titol.split(' ')[1].toUpperCase()}
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#eceae4' }} />
                  </div>

                  {/* Grid de productes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {linia.productes.map(prod => <TarjetaProducte key={prod.id} prod={prod} />)}
                  </div>

                </div>
              ))}

              {/* Ressenyes al final */}
              <SeccioRessenyes isMobile={isMobile} />
            </div>
          </main>
        );
      })()}

      {/* ═══ SECCIÓ A2: NOVETATS ═══ */}
      {seccioActiva === 'novetats' && (
        <main style={{ padding: isMobile ? '30px 16px' : '60px 40px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '50px', borderBottom: '1px solid #eceae4', paddingBottom: '30px' }}>
              <Sparkles size={22} />
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#444', fontWeight: 'bold', display: 'block' }}>ÚLTIMES INCORPORACIONS</span>
                <h1 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '26px' : '34px', fontWeight: '300', margin: '4px 0 0 0', letterSpacing: '2px', color: '#111' }}>NOVETATS</h1>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {PRODUCTES.filter(p => p.isNou).map(prod => (
                <TarjetaProducte key={prod.id} prod={prod} />
              ))}
            </div>
            {PRODUCTES.filter(p => p.isNou).length === 0 && (
              <p style={{ textAlign: 'center', color: '#555', padding: '60px 0', fontSize: '15px' }}>Aviat noves incorporacions. Estigues atenta!</p>
            )}
          </div>
        </main>
      )}

      {/* ═══ SECCIÓ A3: MID-SEASON SALES ═══ */}
      {seccioActiva === 'mid-season' && (
        <main style={{ padding: isMobile ? '30px 16px' : '60px 40px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ backgroundColor: '#111', color: '#fff', padding: isMobile ? '28px 24px' : '40px 50px', marginBottom: '50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)' }} />
              <span style={{ fontSize: '11px', letterSpacing: '4px', color: '#aaa', display: 'block', marginBottom: '8px' }}>TEMPORADA ACTUAL</span>
              <h1 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '30px' : '46px', fontWeight: '300', margin: '0 0 10px 0', letterSpacing: '3px' }}>MID-SEASON SALES</h1>
              <p style={{ fontSize: '14px', color: '#bbb', margin: '0 0 16px 0', letterSpacing: '1px' }}>Peces seleccionades amb fins al 20% de descompte · Estoc limitat</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#fff' }}>–15%</span>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#999', letterSpacing: '1px' }}>TOPS</p>
                </div>
                <div style={{ width: '1px', backgroundColor: '#333' }} />
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: 'bold', color: '#bd1c1c' }}>–20%</span>
                  <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#999', letterSpacing: '1px' }}>PANTALONS</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {PRODUCTES.filter(p => p.isSales).map(prod => (
                <TarjetaProducte key={prod.id} prod={prod} mostrarPreuSales />
              ))}
            </div>
            <div style={{ marginTop: '40px', padding: '16px 20px', backgroundColor: '#fff', border: '1px solid #eae8e1', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#444' }}>
              <Tag size={16} />
              <span>Els preus de rebaixa s'apliquen automàticament al carretó. Sense codis addicionals.</span>
            </div>
          </div>
        </main>
      )}

      {/* ═══ SECCIÓ B: FITXA DE PRODUCTE ═══ */}
      {seccioActiva === 'colleccio' && producteSeleccionat && (
        <main style={{ maxWidth: '1200px', margin: '40px auto', padding: isMobile ? '0 16px' : '0 30px' }}>
          <button onClick={() => setProducteSeleccionat(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', marginBottom: '30px', color: '#444', letterSpacing: '1px' }}>
            <ArrowLeft size={14} /> TORNAR A LA COL·LECCIÓ
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? '30px' : '60px', alignItems: 'start' }}>
            <div>
              <div style={{ width: '100%', height: isMobile ? '360px' : '620px', backgroundColor: '#f5f5f3', overflow: 'hidden', marginBottom: '20px', position: 'relative', border: '1px solid #eae8e1' }}>
                <img src={producteSeleccionat.imatges[imatgeActiva]} alt={producteSeleccionat.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x700?text=' + producteSeleccionat.nom }} />
                <button onClick={anteriorImatge} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
                <button onClick={seguentImatge} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronRight size={20} /></button>
                <button onClick={intentarObrirEmprovador} style={{ position: 'absolute', bottom: '15px', right: '15px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#111111', color: '#ffffff', border: 'none', padding: isMobile ? '11px 14px' : '14px 24px', fontWeight: 'bold', cursor: 'pointer', fontSize: isMobile ? '11px' : '13px', letterSpacing: '1px' }}>
                  <Maximize2 size={14} /> PROVAR EN EMPROVADOR 3D
                </button>
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {producteSeleccionat.imatges.map((img, index) => (
                  <div key={index} onClick={() => setImatgeActiva(index)} style={{ width: isMobile ? '60px' : '75px', height: isMobile ? '76px' : '95px', backgroundColor: '#f5f5f3', cursor: 'pointer', border: imatgeActiva === index ? '1px solid #111' : '1px solid transparent', padding: '2px' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=' + (index + 1) }} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h1 style={{ fontSize: isMobile ? '26px' : '36px', margin: '0 0 10px 0', fontWeight: '300', letterSpacing: '2px', fontFamily: '"Didot", serif', color: '#111' }}>{producteSeleccionat.nom}</h1>
                <button onClick={() => commutarPreferit(producteSeleccionat)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
                  <Heart size={24} fill={preferits.find(p => p.id === producteSeleccionat.id) ? '#111' : 'none'} color={preferits.find(p => p.id === producteSeleccionat.id) ? '#111' : '#444'} />
                </button>
              </div>
              <p style={{ fontSize: '22px', fontWeight: '400', margin: '0 0 30px 0', color: '#444' }}>{producteSeleccionat.preu.toFixed(2)} €</p>

              <div style={{ borderTop: '1px solid #eae8e1', borderBottom: '1px solid #eae8e1', padding: '25px 0', marginBottom: '30px' }}>
                <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '14px', lineHeight: '1.8' }}>{producteSeleccionat.descripcio}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#444' }}><strong>Composició:</strong> {producteSeleccionat.teixit}</p>
              </div>

              {/* RECOMANADOR */}
              <div style={{ backgroundColor: '#f4f3ee', padding: '20px', marginBottom: '30px', border: '1px solid #eae8e1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>RECOMANADOR D'ALTA PRECISIÓ</span>
                  <span onClick={() => setGuiaMidesOberta(true)} style={{ fontSize: '12px', color: '#111', textDecoration: 'underline', cursor: 'pointer' }}>Taula de mides oficial</span>
                </div>
                {tallaRecomanada ? (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#2e7d32', fontSize: '14px', marginBottom: '6px' }}>
                      <Check size={18} /><span>Et recomanem la talla <strong>{tallaRecomanada}</strong> per a aquesta peça.</span>
                    </div>
                    <button onClick={() => { setMesuresTemp({ alcada: perfil.alcada, pit: perfil.pit, cintura: perfil.cintura, maluc: perfil.maluc }); setMesuresRapidesObertes(true); }}
                      style={{ background: 'none', border: 'none', padding: 0, fontSize: '12px', color: '#444', textDecoration: 'underline', cursor: 'pointer' }}>
                      Modificar mesures
                    </button>
                  </div>
                ) : campsFaltants.length > 0 ? (
                  <div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#444' }}>
                      Per calcular la teva talla necessitem: <strong>{campsFaltants.map(c => LABELS_CAMP[c]).join(' i ')}</strong>.
                    </p>
                    <button onClick={() => { setMesuresTemp({ alcada: perfil.alcada, pit: perfil.pit, cintura: perfil.cintura, maluc: perfil.maluc }); setMesuresRapidesObertes(true); }}
                      style={{ background: 'none', border: 'none', padding: 0, fontSize: '13px', color: '#111', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>
                      Introduir les mesures que falten
                    </button>
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: '13px', color: '#444' }}>Configura les teves mesures al perfil per activar el recomanador.</p>
                )}
              </div>

              {/* TALLA */}
              <div style={{ marginBottom: '35px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1.5px', display: 'block', marginBottom: '15px' }}>SELECCIONAR TALLA</span>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['XS', 'S', 'M', 'L', 'XL'].map((talla) => (
                    <button key={talla} onClick={() => setTallaSeleccionada(talla)}
                      style={{ width: '50px', height: '50px', border: tallaSeleccionada === talla ? '2px solid #111' : '1px solid #ccc', backgroundColor: tallaSeleccionada === talla ? '#111' : talla === tallaRecomanada ? '#e8f5e9' : '#fff', color: tallaSeleccionada === talla ? '#fff' : '#111', fontWeight: 'bold', cursor: 'pointer' }}>
                      {talla}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', flexDirection: 'column' }}>
                <button onClick={afegirAlCarret} style={{ width: '100%', backgroundColor: '#111111', color: '#fff', border: 'none', padding: '18px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '2px' }}>
                  AFEGIR AL CARRETÓ DE COMPRA
                </button>
                <button onClick={() => window.open('https://wa.me/34600000000', '_blank')} style={{ width: '100%', backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '18px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <MessageCircle size={18} /> CONSULTA RÀPIDA PER WHATSAPP
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ═══ SECCIÓ C: SOBRE MiRA ═══ */}
      {seccioActiva === 'sobre-mira' && (
        <main style={{ maxWidth: '1000px', margin: '0 auto', padding: isMobile ? '40px 16px' : '60px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
            <img src="/assets/logo.png" alt="MiRA logo" style={{ height: isMobile ? '48px' : '64px', width: 'auto', objectFit: 'contain' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <h1 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: '300', letterSpacing: '4px', margin: 0, fontFamily: '"Didot", serif', color: '#111' }}>SOBRE MiRA</h1>
          </div>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p style={{ fontSize: isMobile ? '18px' : '22px', fontStyle: 'italic', color: '#444', letterSpacing: '2px', fontFamily: '"Didot", serif', margin: 0 }}>
              Born in the Maresme.
            </p>
          </div>

          <div style={{ width: '100%', marginBottom: '0' }}>
            <img src="/assets/esencia.png" alt="Models MiRA" style={{ width: '100%', height: isMobile ? '320px' : '520px', objectFit: 'cover', display: 'block' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #eae8e1', borderTop: 'none', padding: isMobile ? '28px 24px' : '40px 48px', marginBottom: '60px' }}>
            <p style={{ fontSize: isMobile ? '14px' : '16px', lineHeight: '2', color: '#444', margin: 0 }}>
              MiRA és la unió de disseny conscient, comoditat i innovació digital. Creada al cor del Maresme, MiRA dissenya col·leccions atemporals de proximitat que s'integren perfectament en el teu armari diari. Cada detall dels seus dissenys està pensat per oferir el màxim confort, utilitzant la tecnologia per connectar de manera més directa i transparent amb la clienta.
            </p>
          </div>

          <div style={{ borderTop: '1px solid #eceae4', paddingTop: '50px', marginBottom: '60px' }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#444', fontWeight: 'bold' }}>IDENTITAT DE MARCA</span>
              <h2 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '22px' : '28px', fontWeight: '300', letterSpacing: '2px', margin: '8px 0 0 0', color: '#111' }}>MISSIÓ, VISIÓ I VALORS</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '0' }}>
              <div style={{ padding: isMobile ? '28px 0' : '40px 36px', borderBottom: isMobile ? '1px solid #eceae4' : 'none', borderRight: !isMobile ? '1px solid #eceae4' : 'none' }}>
                <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#bd1c1c', fontWeight: 'bold', display: 'block', marginBottom: '14px' }}>MISSIÓ</span>
                <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#444', margin: 0 }}>
                  MiRA neix per eliminar els dubtes en la compra de moda online. A través del seu emprovador virtual de realitat augmentada, ofereix a la clienta la certesa de trobar la talla exacta a la primera, reduint devolucions i millorant l'experiència de compra de manera accessible i transparent.
                </p>
              </div>
              <div style={{ padding: isMobile ? '28px 0' : '40px 36px', borderBottom: isMobile ? '1px solid #eceae4' : 'none', borderRight: !isMobile ? '1px solid #eceae4' : 'none' }}>
                <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#bd1c1c', fontWeight: 'bold', display: 'block', marginBottom: '14px' }}>VISIÓ</span>
                <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#444', margin: 0 }}>
                  Convertir-se en l'e-commerce de moda de referència a Catalunya: un espai on tecnologia, sostenibilitat i disseny local s'integren de manera natural per oferir una alternativa conscient i innovadora a la moda de consum ràpid.
                </p>
              </div>
              <div style={{ padding: isMobile ? '28px 0' : '40px 36px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#bd1c1c', fontWeight: 'bold', display: 'block', marginBottom: '14px' }}>VALORS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { v: 'Innovació accessible', d: 'La tecnologia de RA no és un luxe: és una eina per a tothom.' },
                    { v: 'Transparència', d: 'Materials, origen i preus clars, sense lletra petita.' },
                    { v: 'Sostenibilitat real', d: 'Producció local, lots limitats i residu zero com a compromís permanent.' },
                  ].map(({ v, d }) => (
                    <div key={v}>
                      <p style={{ margin: '0 0 3px 0', fontWeight: 'bold', fontSize: '13px', letterSpacing: '0.5px', color: '#111' }}>{v}</p>
                      <p style={{ margin: 0, fontSize: '13px', color: '#555', lineHeight: '1.6' }}>{d}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #eceae4', paddingTop: '50px', marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0', alignItems: 'stretch' }}>
              <div style={{ overflow: 'hidden' }}>
                <img src="/assets/realitat_augmentada.png" alt="Emprovador de realitat augmentada MiRA" style={{ width: '100%', height: isMobile ? '260px' : '420px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #eae8e1', borderLeft: isMobile ? '1px solid #eae8e1' : 'none', padding: isMobile ? '28px 24px' : '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#444', fontWeight: 'bold', display: 'block', marginBottom: '12px' }}>TECNOLOGIA</span>
                <h2 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '20px' : '26px', fontWeight: '300', letterSpacing: '1px', margin: '0 0 20px 0', color: '#111' }}>LA NOSTRA INNOVACIÓ DIGITAL</h2>
                <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#555', margin: 0 }}>
                  MiRA vol transformar la manera de comprar online. Gràcies al seu emprovador virtual de realitat augmentada, la clienta pot comprovar com s'ajusta cada peça al seu cos abans de triar. Aquesta tecnologia ajuda a trobar la talla ideal a la primera, eliminant els dubtes i evitant l'impacte de les devolucions innecessàries.
                </p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #eceae4', paddingTop: '50px', marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '0', alignItems: 'stretch' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #eae8e1', borderRight: isMobile ? '1px solid #eae8e1' : 'none', padding: isMobile ? '28px 24px' : '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: isMobile ? 1 : 0 }}>
                <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#444', fontWeight: 'bold', display: 'block', marginBottom: '12px' }}>COMPROMÍS</span>
                <h2 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '20px' : '26px', fontWeight: '300', letterSpacing: '1px', margin: '0 0 20px 0', color: '#111' }}>SOSTENIBILITAT I RESIDU ZERO</h2>
                <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#555', margin: 0 }}>
                  MiRA aposta per una producció de proximitat i conscient en lots limitats de 50 peces, passant al model sota comanda un cop esgotat l'estoc inicial. Treballa amb un criteri de residu zero, assegurant-se que cada disseny es fabriqui de manera local a Barcelona, evitant la sobreproducció i sense malgastar teixit.
                </p>
              </div>
              <div style={{ overflow: 'hidden', order: isMobile ? 0 : 1 }}>
                <img src="/assets/tela.png" alt="Teixit de cotó orgànic MiRA" style={{ width: '100%', height: isMobile ? '260px' : '420px', objectFit: 'cover', display: 'block' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            </div>
          </div>

          <SeccioRessenyes isMobile={isMobile} />

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button onClick={() => setSeccioActiva('colleccio')} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '15px 35px', fontSize: '13px', letterSpacing: '2px', cursor: 'pointer' }}>
              EXPLORAR LA COL·LECCIÓ
            </button>
          </div>
        </main>
      )}

      {/* ═══ SECCIÓ D: PERFIL ═══ */}
      {seccioActiva === 'perfil' && (
        <main style={{ maxWidth: '1100px', margin: '40px auto', padding: isMobile ? '0 16px' : '0 30px' }}>
          <h1 style={{ fontSize: isMobile ? '24px' : '34px', fontWeight: '300', letterSpacing: '3px', marginBottom: '30px', fontFamily: '"Didot", serif', color: '#111' }}>EL MEU PERFIL</h1>

          {isMobile ? (
            <>
              <div style={{ display: 'flex', overflowX: 'auto', gap: '0', borderBottom: '2px solid #eae8e1', marginBottom: '24px', WebkitOverflowScrolling: 'touch' }}>
                {([
                  { key: 'dades',    icon: <User size={14} />,     label: 'Dades' },
                  { key: 'ra',       icon: <ImageIcon size={14} />, label: 'RA' },
                  { key: 'looks',    icon: <Sliders size={14} />,   label: 'Looks' },
                  { key: 'preferits',icon: <Heart size={14} />,     label: `Preferits${preferits.length > 0 ? ` (${preferits.length})` : ''}` },
                  { key: 'compres',  icon: <Package size={14} />,   label: 'Comandes' },
                ] as const).map(tab => (
                  <button key={tab.key} onClick={() => setSubgrupPerfil(tab.key as any)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 14px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', letterSpacing: '0.5px', whiteSpace: 'nowrap', borderBottom: subgrupPerfil === tab.key ? '2px solid #111' : '2px solid transparent', marginBottom: '-2px', fontWeight: subgrupPerfil === tab.key ? 'bold' : 'normal', color: subgrupPerfil === tab.key ? '#111' : '#444' }}>
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '24px', border: '1px solid #eae8e1' }}>
                {renderContingutPerfil()}
              </div>
            </>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '50px', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#fff', padding: '20px', border: '1px solid #eae8e1' }}>
                {[
                  { key: 'dades',     icon: <User size={16} />,     label: 'Les meves dades i mides' },
                  { key: 'ra',        icon: <ImageIcon size={16} />, label: 'Fotografies per a la RA' },
                  { key: 'looks',     icon: <Sliders size={16} />,   label: 'Els meus looks provats' },
                  { key: 'preferits', icon: <Heart size={16} />,     label: `Els meus preferits${preferits.length > 0 ? ` (${preferits.length})` : ''}` },
                  { key: 'compres',   icon: <Package size={16} />,   label: 'Les meves comandes' },
                ].map(({ key, icon, label }) => (
                  <button key={key} onClick={() => setSubgrupPerfil(key as any)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '15px', border: 'none', background: subgrupPerfil === key ? '#f4f3ee' : 'none', textAlign: 'left', cursor: 'pointer', fontWeight: subgrupPerfil === key ? 'bold' : 'normal', fontSize: '14px', color: '#111' }}>
                    {icon} {label}
                  </button>
                ))}
              </div>
              <div style={{ backgroundColor: '#ffffff', padding: '40px', border: '1px solid #eae8e1', minHeight: '400px' }}>
                {renderContingutPerfil()}
              </div>
            </div>
          )}
        </main>
      )}

      {/* ═══ SECCIÓ E: CARRETÓ ═══ */}
      {seccioActiva === 'carreto' && (
        <main style={{ maxWidth: '900px', margin: '40px auto', padding: isMobile ? '0 16px' : '0 30px' }}>
          <h1 style={{ fontSize: isMobile ? '24px' : '34px', fontWeight: '300', letterSpacing: '3px', marginBottom: '40px', fontFamily: '"Didot", serif', textAlign: 'center', color: '#111' }}>EL TEU CARRETÓ DE COMPRA</h1>

          {carret.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', border: '1px solid #eae8e1', backgroundColor: '#fff' }}>
              <ShoppingBag size={40} style={{ marginBottom: '15px', strokeWidth: 1, color: '#444' }} />
              <p style={{ color: '#444', fontSize: '15px', marginBottom: '25px' }}>El teu carretó està buit actualment.</p>
              <button onClick={() => setSeccioActiva('colleccio')} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '13px', letterSpacing: '1px', cursor: 'pointer' }}>EXPLORAR PRODUCTES</button>
            </div>
          ) : pasCheckout === 'carret' ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 340px', gap: '30px', alignItems: 'start' }}>
              <div style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: isMobile ? '16px' : '25px' }}>
                {carret.map((item, index) => {
                  const tallaRecItem = recomanarTallaPerProducte(item.producte.id);
                  return (
                    <div key={`${item.producte.id}-${item.talla}`} style={{ display: 'flex', gap: '16px', padding: '20px 0', borderBottom: index === carret.length - 1 ? 'none' : '1px solid #eceae4', alignItems: 'center' }}>
                      <div style={{ width: '65px', height: '82px', backgroundColor: '#f5f5f3', overflow: 'hidden', border: '1px solid #eceae4', flexShrink: 0 }}>
                        <img src={item.producte.imatges[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ margin: '0 0 5px 0', fontSize: isMobile ? '14px' : '16px', fontWeight: '400', color: '#111' }}>{item.producte.nom}</h4>
                        <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#444' }}>Talla: <strong>{item.talla}</strong></p>
                        {tallaRecItem && (
                          <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#2e7d32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Check size={11} /> La teva talla recomanada: {tallaRecItem}
                          </p>
                        )}
                        <p style={{ margin: 0, fontSize: '13px', color: '#111' }}>{item.quantitat} x {item.producte.preu.toFixed(2)} €</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '15px' }}>{(item.producte.preu * item.quantitat).toFixed(2)} €</p>
                        <button onClick={() => setCarret(prev => { const it = prev[index]; if (it.quantitat > 1) return prev.map((x, i) => i === index ? { ...x, quantitat: x.quantitat - 1 } : x); return prev.filter((_, i) => i !== index); })}
                          style={{ background: 'none', border: 'none', color: '#bd1c1c', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline', padding: 0 }}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: isMobile ? '20px' : '30px' }}>
                <h3 style={{ fontFamily: '"Didot", serif', fontSize: '20px', margin: '0 0 20px 0', fontWeight: '300', borderBottom: '1px solid #eceae4', paddingBottom: '15px', color: '#111' }}>RESUM DE COMPRA</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px', color: '#444' }}><span>Subtotal</span><span>{subtotalCarret.toFixed(2)} €</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: '#444' }}><span>Despeses d'enviament</span><span>{costEnviament === 0 ? 'Gratuït' : `${costEnviament.toFixed(2)} €`}</span></div>
                {faltaPerEnviamentGratis > 0 && (
                  <div style={{ backgroundColor: '#f4f3ee', border: '1px solid #eae8e1', padding: '10px 12px', marginBottom: '20px', fontSize: '12px', color: '#444', lineHeight: '1.5' }}>
                    <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>✓ Afegeix {faltaPerEnviamentGratis.toFixed(2)} € més</span> per obtenir enviament gratuït!
                  </div>
                )}
                {costEnviament === 0 && subtotalCarret > 0 && <p style={{ fontSize: '11px', color: '#2e7d32', margin: '-4px 0 16px 0', fontWeight: 'bold' }}>✓ Enviament gratuït aplicat</p>}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', borderTop: '1px solid #eceae4', paddingTop: '15px', marginBottom: '30px' }}><span>TOTAL</span><span>{totalGlobal.toFixed(2)} €</span></div>
                <button onClick={() => setPasCheckout('pagament')} style={{ width: '100%', backgroundColor: '#111', color: '#fff', border: 'none', padding: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}>
                  CONTINUAR AL PAGAMENT
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 340px', gap: '30px', alignItems: 'start' }}>
              <div style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: isMobile ? '20px' : '35px' }}>
                <button onClick={() => setPasCheckout('carret')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', marginBottom: '25px', color: '#444', letterSpacing: '1px' }}>
                  <ArrowLeft size={14} /> TORNAR AL CARRETÓ
                </button>
                <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300', display: 'flex', alignItems: 'center', gap: '10px', color: '#111' }}>
                  <CreditCard size={20} /> DADES DE PAGAMENT
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { label: 'TITULAR DE LA TARGETA', key: 'titular', type: 'text', placeholder: 'Nom i cognoms del titular', maxLength: undefined },
                    { label: 'NÚMERO DE TARGETA', key: 'numero', type: 'text', placeholder: '1234 5678 9012 3456', maxLength: 19 },
                  ].map(({ label, key, type, placeholder, maxLength }) => (
                    <div key={key}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>{label}</label>
                      <input type={type} placeholder={placeholder} maxLength={maxLength}
                        value={(dadesPagament as any)[key]}
                        onChange={e => {
                          let val = e.target.value;
                          if (key === 'numero') val = val.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                          setDadesPagament({ ...dadesPagament, [key]: val });
                        }}
                        style={{ width: '100%', padding: '14px', border: '1px solid #ccc', backgroundColor: '#fafafa', fontSize: '14px', boxSizing: 'border-box' as const }} />
                    </div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>DATA D'EXPIRACIÓ</label>
                      <input type="text" placeholder="MM/AA" maxLength={5} value={dadesPagament.expiracio}
                        onChange={e => { let v = e.target.value.replace(/\D/g, ''); if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2,4); setDadesPagament({...dadesPagament, expiracio: v}); }}
                        style={{ width: '100%', padding: '14px', border: '1px solid #ccc', backgroundColor: '#fafafa', fontSize: '14px', boxSizing: 'border-box' as const }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>CVV</label>
                      <input type="text" placeholder="123" maxLength={4} value={dadesPagament.cvv}
                        onChange={e => setDadesPagament({...dadesPagament, cvv: e.target.value.replace(/\D/g, '')})}
                        style={{ width: '100%', padding: '14px', border: '1px solid #ccc', backgroundColor: '#fafafa', fontSize: '14px', boxSizing: 'border-box' as const }} />
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#f4f3ee', border: '1px solid #eae8e1', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#444' }}>
                  <Shield size={16} color="#2e7d32" />
                  <span>Les teves dades estan protegides amb xifratge SSL de 256 bits.</span>
                </div>
              </div>

              <div style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: isMobile ? '20px' : '30px' }}>
                <h3 style={{ fontFamily: '"Didot", serif', fontSize: '20px', margin: '0 0 20px 0', fontWeight: '300', borderBottom: '1px solid #eceae4', paddingBottom: '15px', color: '#111' }}>RESUM FINAL</h3>
                {carret.map((item) => (
                  <div key={`${item.producte.id}-${item.talla}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px', color: '#444' }}>
                    <span style={{ maxWidth: '60%' }}>{item.producte.nom} ({item.talla}) x{item.quantitat}</span>
                    <span>{(item.producte.preu * item.quantitat).toFixed(2)} €</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #eceae4', paddingTop: '12px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#444' }}><span>Enviament</span><span>{costEnviament === 0 ? 'Gratuït' : `${costEnviament.toFixed(2)} €`}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', borderTop: '1px solid #eceae4', paddingTop: '12px', marginTop: '8px' }}><span>TOTAL</span><span>{totalGlobal.toFixed(2)} €</span></div>
                </div>
                <button onClick={() => {
                  if (!dadesPagament.titular || !dadesPagament.numero || !dadesPagament.expiracio || !dadesPagament.cvv) { setMissatgeWeb({ text: 'Si us plau, omple totes les dades de la targeta.', tipus: 'info' }); return; }
                  const codiRandom = 'CMD-' + Math.floor(100000 + Math.random() * 900000);
                  const novaComanda = { id: codiRandom, data: new Date().toLocaleDateString('ca-ES'), productes: carret.map(i => `${i.producte.nom} (${i.talla})`).join(', '), total: `${totalGlobal.toFixed(2)} €` };
                  setPerfil(prev => ({ ...prev, comandes: [novaComanda, ...prev.comandes] }));
                  setCarret([]); setDadesPagament({ numero: '', expiracio: '', titular: '', cvv: '' }); setPasCheckout('carret');
                  setMissatgeWeb({ text: `Compra realitzada amb èxit! Codi: ${codiRandom}`, tipus: 'exit' });
                  setSeccioActiva('perfil'); setSubgrupPerfil('compres');
                }} style={{ width: '100%', backgroundColor: '#111', color: '#fff', border: 'none', padding: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', marginTop: '20px' }}>
                  CONFIRMAR I PAGAR {totalGlobal.toFixed(2)} €
                </button>
              </div>
            </div>
          )}

          {preferits.length > 0 && pasCheckout === 'carret' && (
            <PreferitsCarret preferits={preferits} tallaRecomanadaPerProducte={recomanarTallaPerProducte} isMobile={isMobile}
              onAfegir={(prod, talla) => {
                setCarret(prev => { const ex = prev.find(i => i.producte.id === prod.id && i.talla === talla); if (ex) return prev.map(i => i.producte.id === prod.id && i.talla === talla ? { ...i, quantitat: i.quantitat + 1 } : i); return [...prev, { producte: prod, talla, quantitat: 1 }]; });
                setMissatgeWeb({ text: `${prod.nom} (Talla ${talla}) afegit al carretó!`, tipus: 'exit' });
              }}
              onEliminarPreferit={commutarPreferit}
            />
          )}
        </main>
      )}

      {/* ═══ MODAL: EMPROVADOR 3D ═══ */}
      {emprovadorObert && producteSeleccionat && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#ffffff', width: '95%', maxWidth: '1000px', height: isMobile ? '95vh' : '85vh', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gridTemplateRows: isMobile ? '1fr auto' : undefined, position: 'relative', overflow: 'hidden' }}>
            <button onClick={() => setEmprovadorObert(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#111', zIndex: 510 }}><X size={24} /></button>
            <div style={{ backgroundColor: '#f5f5f3', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: isMobile ? '240px' : undefined }}>
              {React.createElement('model-viewer' as any, { src: producteSeleccionat.model3d, 'camera-controls': '', 'auto-rotate': '', style: { width: '100%', height: '100%' } })}
            </div>
            <div style={{ padding: isMobile ? '20px' : '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: isMobile ? 'none' : '1px solid #eceae4', borderTop: isMobile ? '1px solid #eceae4' : 'none', backgroundColor: '#fff', overflowY: 'auto' }}>
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '2px', color: '#444', fontWeight: 'bold' }}>SISTEMA INTERACTIU MIRA</span>
                <h3 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '20px' : '24px', margin: '5px 0 15px 0', fontWeight: '300', color: '#111' }}>EMPROVADOR 3D</h3>
                <div style={{ backgroundColor: '#f4f3ee', padding: '16px', border: '1px solid #eae8e1', marginBottom: '20px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>TALLA SELECCIONADA</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['XS', 'S', 'M', 'L', 'XL'].map((talla) => (
                      <button key={talla} onClick={() => setTallaSeleccionada(talla)}
                        style={{ width: '42px', height: '42px', border: tallaSeleccionada === talla ? '2px solid #111' : '1px solid #ccc', backgroundColor: tallaSeleccionada === talla ? '#111' : talla === tallaRecomanada ? '#e8f5e9' : '#fff', color: tallaSeleccionada === talla ? '#fff' : '#111', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                        {talla}
                      </button>
                    ))}
                  </div>
                  {tallaSeleccionada && (
                    <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#2e7d32', fontWeight: 'bold' }}>
                      <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Talla {tallaSeleccionada} seleccionada{tallaRecomanada === tallaSeleccionada && ' · Recomanada per al teu perfil'}
                    </p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <button onClick={afegirAlCarretDesDeEmprovador} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '15px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <ShoppingBag size={16} /> AFEGIR AL CARRETÓ
                </button>
                <button onClick={() => setEmprovadorObert(false)} style={{ backgroundColor: '#fff', color: '#111', border: '1px solid #ccc', padding: '13px', fontSize: '13px', cursor: 'pointer', letterSpacing: '1px' }}>
                  TANCAR VISUALITZACIÓ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ MODAL FOTO OBLIGATÒRIA ═══ */}
      {pasFotoObligatori && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: isMobile ? '28px 20px' : '40px', maxWidth: '480px', width: '90%', border: '1px solid #eae8e1', textAlign: 'center' }}>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 15px 0', fontWeight: '300', color: '#111' }}>Fotografia necessària</h3>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.6', marginBottom: '25px' }}>Per poder activar l'emprovador conceptual, primer cal una fotografia de referència corporal.</p>
            <div style={{ border: '2px dashed #eae8e1', padding: '25px', backgroundColor: '#faf9f6', marginBottom: '20px', textAlign: 'center' }}>
              <ImageIcon size={28} color="#aaa" style={{ marginBottom: '10px' }} />
              <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#444' }}>Selecciona una fotografia del teu dispositiu</p>
              <input type="file" accept="image/*" onChange={handleFotoUploadDesDeEmprovador} style={{ cursor: 'pointer', fontSize: '13px' }} />
            </div>
            <button onClick={() => setPasFotoObligatori(false)} style={{ background: 'none', border: '1px solid #ccc', padding: '12px 20px', fontSize: '13px', cursor: 'pointer' }}>Cancel·lar</button>
          </div>
        </div>
      )}

      {/* ═══ MODAL MESURES RÀPIDES ═══ */}
      {mesuresRapidesObertes && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 650, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: isMobile ? '28px 20px' : '40px', maxWidth: '460px', width: '90%', border: '1px solid #eae8e1', position: 'relative' }}>
            <button onClick={() => setMesuresRapidesObertes(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 8px 0', fontWeight: '300', color: '#111' }}>Les meves mesures</h3>
            {producteSeleccionat && campsFaltants.length > 0 ? (
              <p style={{ fontSize: '13px', color: '#bd1c1c', margin: '0 0 20px 0', fontWeight: 'bold' }}>
                Per calcular la talla de <em>{producteSeleccionat.nom}</em> necessitem: {campsFaltants.map(c => LABELS_CAMP[c]).join(' i ')}.
              </p>
            ) : (
              <p style={{ fontSize: '13px', color: '#444', margin: '0 0 20px 0' }}>Les mesures es guardaran al teu perfil i actualitzaran el recomanador automàticament.</p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Alçada (cm)</label>
                <input type="number" value={mesuresTemp.alcada} onChange={e => setMesuresTemp({...mesuresTemp, alcada: e.target.value})} placeholder="Ej: 168" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', boxSizing: 'border-box' as const }} />
              </div>
              {(!producteSeleccionat || (CAMPS_PER_PRODUCTE[producteSeleccionat.id] || []).includes('pit')) && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Contorn de Pit (cm){campsFaltants.includes('pit') && <span style={{ color: '#bd1c1c', marginLeft: '4px' }}>*</span>}</label>
                  <input type="number" value={mesuresTemp.pit} onChange={e => setMesuresTemp({...mesuresTemp, pit: e.target.value})} placeholder="Ej: 90" style={{ width: '100%', padding: '12px', border: campsFaltants.includes('pit') ? '1px solid #bd1c1c' : '1px solid #ccc', boxSizing: 'border-box' as const }} />
                </div>
              )}
              {(!producteSeleccionat || (CAMPS_PER_PRODUCTE[producteSeleccionat.id] || []).includes('cintura')) && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Contorn de Cintura (cm){campsFaltants.includes('cintura') && <span style={{ color: '#bd1c1c', marginLeft: '4px' }}>*</span>}</label>
                  <input type="number" value={mesuresTemp.cintura} onChange={e => setMesuresTemp({...mesuresTemp, cintura: e.target.value})} placeholder="Ej: 70" style={{ width: '100%', padding: '12px', border: campsFaltants.includes('cintura') ? '1px solid #bd1c1c' : '1px solid #ccc', boxSizing: 'border-box' as const }} />
                </div>
              )}
              {(!producteSeleccionat || (CAMPS_PER_PRODUCTE[producteSeleccionat.id] || []).includes('maluc')) && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Contorn de Maluc (cm){campsFaltants.includes('maluc') && <span style={{ color: '#bd1c1c', marginLeft: '4px' }}>*</span>}</label>
                  <input type="number" value={mesuresTemp.maluc} onChange={e => setMesuresTemp({...mesuresTemp, maluc: e.target.value})} placeholder="Ej: 96" style={{ width: '100%', padding: '12px', border: campsFaltants.includes('maluc') ? '1px solid #bd1c1c' : '1px solid #ccc', boxSizing: 'border-box' as const }} />
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setMesuresRapidesObertes(false)} style={{ flex: 1, background: 'none', border: '1px solid #ccc', padding: '13px', fontSize: '13px', cursor: 'pointer' }}>Cancel·lar</button>
              <button onClick={() => { setPerfil(prev => ({ ...prev, alcada: mesuresTemp.alcada, pit: mesuresTemp.pit, cintura: mesuresTemp.cintura, maluc: mesuresTemp.maluc })); setMesuresRapidesObertes(false); setMissatgeWeb({ text: 'Mesures guardades al perfil. Recomanador activat!', tipus: 'exit' }); }}
                style={{ flex: 2, backgroundColor: '#111', color: '#fff', border: 'none', padding: '13px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}>
                GUARDAR MESURES
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ MODAL TAULA DE MIDES ═══ */}
      {guiaMidesOberta && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: isMobile ? '28px 16px' : '40px', maxWidth: '520px', width: '92%', position: 'relative', border: '1px solid #eae8e1', overflowX: 'auto', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setGuiaMidesOberta(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#111' }}><X size={20} /></button>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 4px 0', fontWeight: '300', textAlign: 'center', color: '#111' }}>TAULA DE MIDES OFICIALS</h3>
            {producteSeleccionat && <p style={{ fontSize: '12px', color: '#444', textAlign: 'center', margin: '0 0 22px 0', letterSpacing: '1px' }}>{producteSeleccionat.nom.toUpperCase()}</p>}

            {(!producteSeleccionat || producteSeleccionat.id === 'camiseta-essence') && (
              <><h4 style={{ fontSize: '13px', letterSpacing: '1px', margin: '0 0 10px 0', color: '#111' }}>CAMISETA ESSENCE</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '13px', textAlign: 'center', marginBottom: '24px' }}>
                <thead><tr style={{ borderBottom: '2px solid #111', fontWeight: 'bold' }}><th style={{ padding: '10px 6px' }}>Talla</th><th style={{ padding: '10px 6px' }}>Cintura (cm)</th><th style={{ padding: '10px 6px' }}>Pit (cm)</th></tr></thead>
                <tbody>{[['XS','60 – 64','84 – 88'],['S','64 – 68','88 – 92'],['M','68 – 72','92 – 96'],['L','72 – 76','96 – 100'],['XL','76 – 80','100 – 104']].map(([t,c,p]) => (
                  <tr key={t} style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === t && producteSeleccionat?.id === 'camiseta-essence' ? '#e8f5e9' : 'transparent' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 'bold' }}>{t}</td><td style={{ padding: '10px 6px' }}>{c}</td><td style={{ padding: '10px 6px' }}>{p}</td>
                  </tr>))}</tbody>
              </table></>
            )}
            {(!producteSeleccionat || producteSeleccionat.id === 'pantalons-essence') && (
              <><h4 style={{ fontSize: '13px', letterSpacing: '1px', margin: '0 0 10px 0', color: '#111' }}>PANTALONS ESSENCE</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '13px', textAlign: 'center', marginBottom: '24px' }}>
                <thead><tr style={{ borderBottom: '2px solid #111', fontWeight: 'bold' }}><th style={{ padding: '10px 6px' }}>Talla</th><th style={{ padding: '10px 6px' }}>Cintura elàstica (cm)</th><th style={{ padding: '10px 6px' }}>Maluc (cm)</th></tr></thead>
                <tbody>{[['XS','60 – 68','86 – 92'],['S','64 – 72','90 – 96'],['M','70 – 78','94 – 100'],['L','76 – 84','98 – 104'],['XL','82 – 90','102 – 108']].map(([t,c,m]) => (
                  <tr key={t} style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === t && producteSeleccionat?.id === 'pantalons-essence' ? '#e8f5e9' : 'transparent' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 'bold' }}>{t}</td><td style={{ padding: '10px 6px' }}>{c}</td><td style={{ padding: '10px 6px' }}>{m}</td>
                  </tr>))}</tbody>
              </table></>
            )}
            {(!producteSeleccionat || producteSeleccionat.id === 'camiseta-tailor') && (
              <><h4 style={{ fontSize: '13px', letterSpacing: '1px', margin: '0 0 10px 0', color: '#111' }}>CAMISETA TAILOR</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '13px', textAlign: 'center', marginBottom: '24px' }}>
                <thead><tr style={{ borderBottom: '2px solid #111', fontWeight: 'bold' }}><th style={{ padding: '10px 6px' }}>Talla</th><th style={{ padding: '10px 6px' }}>Contorn de Pit (cm)</th></tr></thead>
                <tbody>{[['XS','84 – 88'],['S','88 – 92'],['M','92 – 96'],['L','96 – 100'],['XL','100 – 104']].map(([t,p]) => (
                  <tr key={t} style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === t && producteSeleccionat?.id === 'camiseta-tailor' ? '#e8f5e9' : 'transparent' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 'bold' }}>{t}</td><td style={{ padding: '10px 6px' }}>{p}</td>
                  </tr>))}</tbody>
              </table></>
            )}
            {(!producteSeleccionat || producteSeleccionat.id === 'pantalons-tailor') && (
              <><h4 style={{ fontSize: '13px', letterSpacing: '1px', margin: '0 0 10px 0', color: '#111' }}>PANTALONS TAILOR</h4>
              <p style={{ fontSize: '11px', color: '#444', margin: '-4px 0 10px 0', fontStyle: 'italic' }}>Sastreria de cintura fixa · Si estàs entre dues talles, agafa la més gran.</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '13px', textAlign: 'center', marginBottom: '8px' }}>
                <thead><tr style={{ borderBottom: '2px solid #111', fontWeight: 'bold' }}><th style={{ padding: '10px 6px' }}>Talla</th><th style={{ padding: '10px 6px' }}>Cintura fixa (cm)</th><th style={{ padding: '10px 6px' }}>Maluc (cm)</th></tr></thead>
                <tbody>{[['XS','62 – 65','88 – 92'],['S','66 – 69','92 – 96'],['M','70 – 73','96 – 100'],['L','74 – 77','100 – 104'],['XL','78 – 81','104 – 108']].map(([t,c,m]) => (
                  <tr key={t} style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === t && producteSeleccionat?.id === 'pantalons-tailor' ? '#e8f5e9' : 'transparent' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 'bold' }}>{t}</td><td style={{ padding: '10px 6px' }}>{c}</td><td style={{ padding: '10px 6px' }}>{m}</td>
                  </tr>))}</tbody>
              </table></>
            )}
            {tallaRecomanada && producteSeleccionat && (
              <p style={{ fontSize: '12px', color: '#2e7d32', marginTop: '16px', textAlign: 'center', fontWeight: 'bold' }}>
                • La teva talla recomanada per a aquesta peça és la <strong>{tallaRecomanada}</strong>.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // ─── Contingut intern del Perfil ──────────────────────────────────────────
  function renderContingutPerfil() {
    return (
      <>
        {subgrupPerfil === 'dades' && (
          <div>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300', color: '#111' }}>Informació Personal</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: '35px' }}>
              {[
                { label: 'Nom Complet', key: 'nom', type: 'text' },
                { label: 'Correu Electrònic', key: 'email', type: 'email' },
                { label: 'Número de Telèfon', key: 'telefon', type: 'text' },
                { label: "Direcció d'Enviament", key: 'adreca', type: 'text' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>{label}</label>
                  <input type={type} value={(perfil as any)[key]} onChange={e => setPerfil({...perfil, [key]: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', backgroundColor: '#fafafa', boxSizing: 'border-box' as const }} />
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '300', borderTop: '1px solid #eee', paddingTop: '25px', color: '#111' }}>Les teves mesures</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(2, 1fr)', gap: '15px', marginBottom: '25px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>Alçada (cm)</label>
                <input type="number" value={perfil.alcada} onChange={e => setPerfil({...perfil, alcada: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' as const }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>Contorn de Pit (cm)</label>
                <input type="number" value={perfil.pit} onChange={e => setPerfil({...perfil, pit: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' as const }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>Contorn de Cintura (cm)</label>
                <input type="number" value={perfil.cintura} onChange={e => setPerfil({...perfil, cintura: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' as const }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>Contorn de Maluc (cm)</label>
                <input type="number" value={perfil.maluc} onChange={e => setPerfil({...perfil, maluc: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' as const }} />
              </div>
            </div>
            {(perfil.pit || perfil.cintura || perfil.maluc) && (
              <div style={{ backgroundColor: '#f4f3ee', border: '1px solid #eae8e1', padding: '16px', fontSize: '13px' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', letterSpacing: '0.5px', fontSize: '12px' }}>TALLES RECOMANADES PER A CADA PEÇA</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {PRODUCTES.map(p => {
                    const t = recomanarTallaPerProducte(p.id);
                    return (
                      <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', backgroundColor: '#fff', border: '1px solid #eceae4' }}>
                        <span style={{ fontSize: '12px', color: '#555' }}>{p.nom}</span>
                        {t ? <strong style={{ color: '#2e7d32' }}>{t}</strong> : <span style={{ color: '#555', fontSize: '11px' }}>—</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {subgrupPerfil === 'ra' && (
          <div>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 20px 0', fontWeight: '300', color: '#111' }}>Arxius per a Realitat Augmentada</h3>
            <div style={{ border: '2px dashed #eae8e1', padding: '40px', textAlign: 'center', backgroundColor: '#faf9f6', marginBottom: '25px' }}>
              <input type="file" accept="image/*" onChange={handleFotoUpload} style={{ cursor: 'pointer' }} />
            </div>
            {perfil.fotoRA && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <img src={perfil.fotoRA} alt="Preview RA" style={{ maxWidth: '200px', height: 'auto', border: '1px solid #eae8e1', display: 'block', margin: '0 auto 15px auto' }} />
                <button onClick={() => { setPerfil(prev => ({ ...prev, fotoRA: null })); setMissatgeWeb({ text: 'Fotografia eliminada de la Realitat Augmentada.', tipus: 'info' }); }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#bd1c1c', color: '#fff', border: 'none', padding: '10px 18px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}>
                  <Trash2 size={14} /> BORRAR FOTO SELECCIONADA
                </button>
              </div>
            )}
          </div>
        )}

        {subgrupPerfil === 'looks' && (
          <div>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 20px 0', fontWeight: '300', color: '#111' }}>Looks provats a l'emprovador 3D</h3>
            {perfil.looksProvats.length === 0 ? (
              <p style={{ color: '#444', fontSize: '14px' }}>Encara no has provat cap peça a l'emprovador virtual.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '30px' }}>
                {perfil.looksProvats.map((lookId) => {
                  const prod = PRODUCTES.find(p => p.id === lookId);
                  if (!prod) return null;
                  return (
                    <div key={lookId} style={{ border: '1px solid #eae8e1', backgroundColor: '#faf9f6', position: 'relative', overflow: 'hidden' }}>
                      <button onClick={() => handleDeleteLook(lookId)} title="Eliminar look"
                        style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, background: 'rgba(255,255,255,0.92)', border: '1px solid #eae8e1', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,0,0,0.10)' }}>
                        <X size={14} color="#888" />
                      </button>
                      <div style={{ padding: '20px 20px 12px 20px' }}>
                        <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', letterSpacing: '1px', paddingRight: '32px', color: '#111' }}>{prod.nom}</h4>
                      </div>
                      <div style={{ width: '100%', height: '300px', backgroundColor: '#f5f5f3', border: '1px solid #ddd', position: 'relative' }}>
                        {React.createElement('model-viewer' as any, { src: prod.model3d, 'camera-controls': '', 'auto-rotate': '', style: { width: '100%', height: '100%' } })}
                      </div>
                      <div style={{ padding: '14px 20px' }}>
                        <button onClick={() => handleDeleteLook(lookId)}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'none', border: '1px solid #ccc', padding: '8px 14px', fontSize: '12px', cursor: 'pointer', color: '#444', letterSpacing: '0.5px' }}>
                          <Trash2 size={13} /> Eliminar look
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {subgrupPerfil === ('preferits' as any) && (
          <div>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300', color: '#111' }}>Els meus preferits</h3>
            {preferits.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#444' }}>
                <Heart size={32} style={{ marginBottom: '10px', strokeWidth: 1 }} />
                <p style={{ fontSize: '14px', margin: '0 0 20px 0' }}>Encara no has afegit cap peça als preferits.</p>
                <button onClick={() => { setSeccioActiva('colleccio'); setProducteSeleccionat(null); }} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '13px', letterSpacing: '1px', cursor: 'pointer' }}>EXPLORAR COL·LECCIÓ</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {preferits.map((prod) => {
                  const tallaRecPref = recomanarTallaPerProducte(prod.id);
                  return (
                    <div key={prod.id} style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid #eae8e1', backgroundColor: '#faf9f6', alignItems: 'center' }}>
                      <div style={{ width: '80px', height: '100px', backgroundColor: '#f5f5f3', overflow: 'hidden', border: '1px solid #eceae4', flexShrink: 0 }}>
                        <img src={prod.imatges[0]} alt={prod.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=' + prod.nom }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '400', letterSpacing: '0.5px', color: '#111' }}>{prod.nom}</h4>
                        <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold' }}>{prod.preu.toFixed(2)} €</p>
                        {tallaRecPref && (
                          <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#2e7d32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Check size={13} /> La teva talla recomanada: {tallaRecPref}
                          </p>
                        )}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          <button onClick={() => { setSeccioActiva('colleccio'); setProducteSeleccionat(prod); setImatgeActiva(0); }}
                            style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '9px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}>
                            VEURE PEÇA
                          </button>
                          <button onClick={() => commutarPreferit(prod)}
                            style={{ backgroundColor: 'transparent', color: '#bd1c1c', border: '1px solid #bd1c1c', padding: '9px 16px', fontSize: '12px', cursor: 'pointer', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Trash2 size={13} /> ELIMINAR
                          </button>
                        </div>
                      </div>
                      <Heart size={20} fill="#111" color="#111" style={{ flexShrink: 0 }} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {subgrupPerfil === 'compres' && (
          <div>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300', color: '#111' }}>Historial de les meves comandes</h3>
            {perfil.comandes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#444' }}>
                <Package size={32} style={{ marginBottom: '10px', strokeWidth: 1 }} />
                <p style={{ fontSize: '14px', margin: 0 }}>Encara no has realitzat cap comanda anteriorment a la nostra plataforma.</p>
              </div>
            ) : isMobile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {perfil.comandes.map(cmd => (
                  <div key={cmd.id} style={{ border: '1px solid #eae8e1', padding: '16px', backgroundColor: '#faf9f6', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 'bold' }}>{cmd.id}</span>
                      <span style={{ fontWeight: 'bold' }}>{cmd.total}</span>
                    </div>
                    <p style={{ margin: '0 0 4px 0', color: '#444' }}>{cmd.data}</p>
                    <p style={{ margin: 0, color: '#444' }}>{cmd.productes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', letterSpacing: '0.5px' }}>
                <thead><tr style={{ borderBottom: '2px solid #111', textAlign: 'left' }}>
                  <th style={{ padding: '12px 8px' }}>Codi de Comanda</th>
                  <th style={{ padding: '12px 8px' }}>Data</th>
                  <th style={{ padding: '12px 8px' }}>Productes comprats</th>
                  <th style={{ padding: '12px 8px', textAlign: 'right' }}>Total Pagat</th>
                </tr></thead>
                <tbody>{perfil.comandes.map(cmd => (
                  <tr key={cmd.id} style={{ borderBottom: '1px solid #eceae4' }}>
                    <td style={{ padding: '14px 8px', fontWeight: 'bold' }}>{cmd.id}</td>
                    <td style={{ padding: '14px 8px', color: '#555' }}>{cmd.data}</td>
                    <td style={{ padding: '14px 8px' }}>{cmd.productes}</td>
                    <td style={{ padding: '14px 8px', textAlign: 'right', fontWeight: 'bold' }}>{cmd.total}</td>
                  </tr>
                ))}</tbody>
              </table>
            )}
          </div>
        )}
      </>
    );
  }
}