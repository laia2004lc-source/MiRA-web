import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, MessageCircle, Shield, Maximize2, X, User, Check, Sliders, ChevronLeft, ChevronRight, Heart, CreditCard, Package, Image as ImageIcon, Info, Trash2, Menu } from 'lucide-react';

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

// Tipus de dades per a una arquitectura neta
interface PerfilCompleter {
  nom: string;
  email: string;
  telefon: string;
  adreca: string;
  fotoRA: string | null;
  alcada: string;
  pes: string;
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
    nom: 'Pantalons Línia Essence',
    preu: 50.00,
    descripcio: 'Pantalons estil jogger de la línia Essence, dissenyats per a oferir el maxim confort i llibertat de movimento. Teixit de cotó orgànic d\'alta qualitat, suau al tacte i ideal per a un stile diari relaxat. Desenvolupat mitjançant patronatge digital sostenible.',
    imatges: [
      '/assets/pantalons_essence_1.jpg',
      '/assets/pantalons_essence_2.jpg',
      '/assets/pantalons_essence_3.jpg',
      '/assets/pantalons_essence_4.jpg'
    ],
    teixit: '95% Cotó Orgànic Certificat, 5% Elastà',
    model3d: '/assets/pantalons_essence.glb'
  },
  {
    id: 'pantalons-tailor',
    nom: 'Pantalons Línia Tailor',
    preu: 70.00,
    descripcio: 'Pantalons de la línia Tailor amb un tall més estructurat, elegant i formal, sans renunciar a la comoditat de la nostra marca. Una peça clau de sastreria contemporània digitalitzada, optimitzada per a una producció conscient i residu zero.',
    imatges: [
      '/assets/pantalons_tailor_1.jpg',
      '/assets/pantalons_tailor_2.jpg',
      '/assets/pantalons_tailor_3.jpg',
      '/assets/pantalons_tailor_4.jpg'
    ],
    teixit: '100% Cotó Orgànic Premium d\'alta densitat',
    model3d: '/assets/pantalons_tailor.glb'
  }
];

// Component inline de preferits al carretó amb selector de talla
function PreferitsCarret({ preferits, tallaRecomanada, onAfegir, onEliminarPreferit, isMobile }: {
  preferits: typeof PRODUCTES;
  tallaRecomanada: string | null;
  onAfegir: (prod: typeof PRODUCTES[0], talla: string) => void;
  onEliminarPreferit: (prod: typeof PRODUCTES[0]) => void;
  isMobile: boolean;
}) {
  const [tallesSeleccionades, setTallesSeleccionades] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    preferits.forEach(p => { init[p.id] = tallaRecomanada || 'M'; });
    return init;
  });

  return (
    <div style={{ marginTop: '50px' }}>
      <div style={{ borderTop: '1px solid #eceae4', paddingTop: '40px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '18px' : '22px', fontWeight: '300', margin: 0, letterSpacing: '2px' }}>
          <Heart size={18} style={{ display: 'inline', marginRight: '10px', verticalAlign: 'middle' }} fill="#111" />
          ELS TEUS PREFERITS
        </h2>
        <span style={{ fontSize: '12px', color: '#6d6b64', letterSpacing: '1px' }}>{preferits.length} {preferits.length === 1 ? 'peça guardada' : 'peces guardades'}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
        {preferits.map((prod) => {
          const tallaActual = tallesSeleccionades[prod.id] || tallaRecomanada || 'M';
          return (
            <div key={prod.id} style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '70px', height: '90px', backgroundColor: '#f5f5f3', overflow: 'hidden', border: '1px solid #eceae4', flexShrink: 0 }}>
                <img src={prod.imatges[0]} alt={prod.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=' + prod.nom }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ margin: '0 0 3px 0', fontSize: '14px', fontWeight: '400', letterSpacing: '0.5px' }}>{prod.nom}</h4>
                <p style={{ margin: '0 0 10px 0', fontSize: '13px', fontWeight: 'bold' }}>{prod.preu.toFixed(2)} €</p>

                {/* Selector de talla inline */}
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#6d6b64', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>
                    TALLA{tallaRecomanada ? ` · Recomanada: ${tallaRecomanada}` : ''}
                  </span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {['XS', 'S', 'M', 'L', 'XL'].map(t => (
                      <button
                        key={t}
                        onClick={() => setTallesSeleccionades(prev => ({ ...prev, [prod.id]: t }))}
                        style={{
                          width: '34px', height: '34px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer',
                          border: tallaActual === t ? '2px solid #111' : '1px solid #ccc',
                          backgroundColor: tallaActual === t ? '#111' : t === tallaRecomanada ? '#e8f5e9' : '#fff',
                          color: tallaActual === t ? '#fff' : '#111'
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onAfegir(prod, tallaActual)}
                  style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '9px 14px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', width: '100%' }}
                >
                  AFEGIR AL CARRETÓ
                </button>
              </div>

              {/* Creu: elimina de preferits sense afegir */}
              <button
                onClick={() => onEliminarPreferit(prod)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', flexShrink: 0, padding: '2px' }}
                title="Eliminar de preferits"
              >
                <X size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  // ─── Responsivitat ─────────────────────────────────────────────────────────
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 768;
  const [menuMobilObert, setMenuMobilObert] = useState(false);

  // Navegació principal de la app: 'colleccio' | 'sobre-mira' | 'perfil' | 'carreto'
  const [seccioActiva, setSeccioActiva] = useState<'colleccio' | 'sobre-mira' | 'perfil' | 'carreto'>('colleccio');
  const [producteSeleccionat, setProducteSeleccionat] = useState<typeof PRODUCTES[0] | null>(null);
  const [imatgeActiva, setImatgeActiva] = useState(0);
  const [tallaSeleccionada, setTallaSeleccionada] = useState<string | null>(null);
  
  // Subgrup actiu dins de la pàgina de Perfil
  const [subgrupPerfil, setSubgrupPerfil] = useState<'dades' | 'ra' | 'looks' | 'compres' | 'preferits'>('dades');

  // Missatges interns integrats a la interfície
  const [missatgeWeb, setMissatgeWeb] = useState<{ text: string; tipus: 'exit' | 'info' } | null>(null);

  // Estats de llistes (Carretó i Preferits)
  const [carret, setCarret] = useState<ItemCarret[]>([]);
  const [preferits, setPreferits] = useState<typeof PRODUCTES>([]);

  // Modals de flux intern
  const [emprovadorObert, setEmprovadorObert] = useState(false);
  const [pasFotoObligatori, setPasFotoObligatori] = useState(false);
  const [guiaMidesOberta, setGuiaMidesOberta] = useState(false);

  // Modal de mesures ràpides des de la fitxa de producte
  const [mesuresRapidesObertes, setMesuresRapidesObertes] = useState(false);
  const [mesuresTemp, setMesuresTemp] = useState({ alcada: '', pes: '', pit: '', cintura: '', maluc: '' });

  // Pas de pagament al carretó
  const [pasCheckout, setPasCheckout] = useState<'carret' | 'pagament'>('carret');
  const [dadesPagament, setDadesPagament] = useState({ numero: '', expiracio: '', titular: '', cvv: '' });

  // Perfil d'Usuari Persistent
  const [perfil, setPerfil] = useState<PerfilCompleter>(() => {
    const salvat = localStorage.getItem('mira_perfil_v2');
    return salvat ? JSON.parse(salvat) : {
      nom: 'Maria Soler',
      email: 'mariasoler@gmail.com',
      telefon: '600 123 456',
      adreca: 'Carrer de la Moda, 45, Barcelona',
      fotoRA: null,
      alcada: '168',
      pes: '',
      pit: '88',
      cintura: '70',
      maluc: '96',
      looksProvats: [],
      comandes: []
    };
  });

  useEffect(() => {
    localStorage.setItem('mira_perfil_v2', JSON.stringify(perfil));
  }, [perfil]);

  // Autoneteja de missatges de la web
  useEffect(() => {
    if (missatgeWeb) {
      const timer = setTimeout(() => setMissatgeWeb(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [missatgeWeb]);

  // Tanca el menú mòbil quan es canvia de secció
  useEffect(() => {
    setMenuMobilObert(false);
  }, [seccioActiva]);

  // Recomanador lògic basat en la cintura
  const recomanarTalla = () => {
    if (!perfil.cintura) return null;
    const c = parseInt(perfil.cintura);
    if (!c || c <= 0) return null;
    if (c < 65) return 'XS';
    if (c >= 65 && c < 72) return 'S';
    if (c >= 72 && c < 80) return 'M';
    if (c >= 80 && c < 88) return 'L';
    return 'XL';
  };
  const tallaRecomanada = recomanarTalla();

  useEffect(() => {
    if (tallaRecomanada && producteSeleccionat) {
      setTallaSeleccionada(tallaRecomanada);
    }
  }, [producteSeleccionat, tallaRecomanada]);

  // Funcions de galeria d'imatges
  const seguentImatge = () => producteSeleccionat && setImatgeActiva((prev) => (prev + 1) % producteSeleccionat.imatges.length);
  const anteriorImatge = () => producteSeleccionat && setImatgeActiva((prev) => (prev - 1 + producteSeleccionat.imatges.length) % producteSeleccionat.imatges.length);

  // Pujada de fitxer RA
  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPerfil(prev => ({ ...prev, fotoRA: event.target?.result as string }));
        setMissatgeWeb({ text: 'Fotografia de RA guardada correctament al perfil.', tipus: 'exit' });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Pujada de foto RA des del modal d'emprovador (sense anar al perfil)
  const handleFotoUploadDesDeEmprovador = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPerfil(prev => ({ ...prev, fotoRA: event.target?.result as string }));
        setPasFotoObligatori(false);
        if (producteSeleccionat && !perfil.looksProvats.includes(producteSeleccionat.id)) {
          setPerfil(prev => ({ ...prev, looksProvats: [...prev.looksProvats, producteSeleccionat.id] }));
        }
        setEmprovadorObert(true);
        setMissatgeWeb({ text: 'Fotografia guardada al perfil. Emprovador activat!', tipus: 'exit' });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Intentar obrir el model 3D controlant que hi hagi foto prèvia
  const intentarObrirEmprovador = () => {
    if (!perfil.fotoRA) {
      setPasFotoObligatori(true);
    } else {
      if (producteSeleccionat && !perfil.looksProvats.includes(producteSeleccionat.id)) {
        setPerfil(prev => ({ ...prev, looksProvats: [...prev.looksProvats, producteSeleccionat.id] }));
      }
      setEmprovadorObert(true);
    }
  };

  // Accions de llistes (Afegir)
  const afegirAlCarret = () => {
    if (!producteSeleccionat) return;
    if (!tallaSeleccionada) {
      setMissatgeWeb({ text: "Si us plau, selecciona una talla abans d'afegir.", tipus: 'info' });
      return;
    }
    setCarret(prev => {
      const existent = prev.find(item => item.producte.id === producteSeleccionat.id && item.talla === tallaSeleccionada);
      if (existent) {
        return prev.map(item => item.producte.id === producteSeleccionat.id && item.talla === tallaSeleccionada ? { ...item, quantitat: item.quantitat + 1 } : item);
      }
      return [...prev, { producte: producteSeleccionat, talla: tallaSeleccionada, quantitat: 1 }];
    });
    setMissatgeWeb({ text: `${producteSeleccionat.nom} (Talla ${tallaSeleccionada}) afegit al carretó.`, tipus: 'exit' });
  };

  // Afegir al carret des de l'emprovador
  const afegirAlCarretDesDeEmprovador = () => {
    if (!producteSeleccionat) return;
    if (!tallaSeleccionada) {
      setMissatgeWeb({ text: "Si us plau, selecciona una talla abans d'afegir.", tipus: 'info' });
      return;
    }
    setCarret(prev => {
      const existent = prev.find(item => item.producte.id === producteSeleccionat.id && item.talla === tallaSeleccionada);
      if (existent) {
        return prev.map(item => item.producte.id === producteSeleccionat.id && item.talla === tallaSeleccionada ? { ...item, quantitat: item.quantitat + 1 } : item);
      }
      return [...prev, { producte: producteSeleccionat, talla: tallaSeleccionada, quantitat: 1 }];
    });
    setEmprovadorObert(false);
    setMissatgeWeb({ text: `${producteSeleccionat.nom} (Talla ${tallaSeleccionada}) afegit al carretó!`, tipus: 'exit' });
  };

  const commutarPreferit = (prod: typeof PRODUCTES[0]) => {
    setPreferits(prev => prev.find(p => p.id === prod.id) ? prev.filter(p => p.id !== prod.id) : [...prev, prod]);
    setMissatgeWeb({ text: preferits.find(p => p.id === prod.id) ? 'Eliminat de preferits.' : 'Afegit a la llista de preferits.', tipus: 'exit' });
  };

  // Càlcul de totals de comanda
  const subtotalCarret = carret.reduce((sum, item) => sum + (item.producte.preu * item.quantitat), 0);
  const costEnviament = subtotalCarret >= 60 || subtotalCarret === 0 ? 0 : 3.95;
  const totalGlobal = subtotalCarret + costEnviament;
  const faltaPerEnviamentGratis = subtotalCarret > 0 && subtotalCarret < 60 ? (60 - subtotalCarret) : 0;

  return (
    <div style={{ fontFamily: '"Didot", "Playfair Display", "Helvetica Neue", sans-serif', color: '#111', backgroundColor: '#faf9f6', minHeight: '100vh', margin: 0, padding: 0, position: 'relative' }}>
      
      {/* ALERTA DINÀMICA */}
      {missatgeWeb && (
        <div style={{ position: 'fixed', top: '90px', right: isMobile ? '10px' : '30px', left: isMobile ? '10px' : 'auto', backgroundColor: missatgeWeb.tipus === 'exit' ? '#111' : '#bd1c1c', color: '#fff', padding: '15px 25px', zIndex: 200, fontSize: '13px', letterSpacing: '1px', boxShadow: '0 5px 20px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          {missatgeWeb.tipus === 'exit' ? <Check size={16} /> : <Info size={16} />}
          <span>{missatgeWeb.text}</span>
        </div>
      )}

      {/* ── CAPÇALERA ── */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '18px 20px' : '25px 50px', backgroundColor: '#ffffff', borderBottom: '1px solid #eceae4', position: 'sticky', top: 0, zIndex: 90 }}>
        <div style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 'bold', letterSpacing: '6px', cursor: 'pointer', fontFamily: '"Didot", serif' }} onClick={() => { setProducteSeleccionat(null); setSeccioActiva('colleccio'); }}>
          MiRA
        </div>

        {/* Nav d'escriptori */}
        {!isMobile && (
          <nav style={{ display: 'flex', gap: '40px', fontWeight: 400, fontSize: '13px', letterSpacing: '2px' }}>
            <span style={{ cursor: 'pointer', borderBottom: seccioActiva === 'colleccio' ? '1px solid #111' : 'none', paddingBottom: '4px' }} onClick={() => { setSeccioActiva('colleccio'); setProducteSeleccionat(null); }}>COL·LECCIÓ</span>
            <span style={{ cursor: 'pointer', borderBottom: seccioActiva === 'sobre-mira' ? '1px solid #111' : 'none', paddingBottom: '4px' }} onClick={() => setSeccioActiva('sobre-mira')}>SOBRE MIRA</span>
            <span style={{ cursor: 'pointer', borderBottom: seccioActiva === 'perfil' ? '1px solid #111' : 'none', paddingBottom: '4px' }} onClick={() => setSeccioActiva('perfil')}>EL MEU PERFIL</span>
          </nav>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '15px' : '25px' }}>
          <div 
            onClick={() => { setSeccioActiva('carreto'); setPasCheckout('carret'); }} 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', letterSpacing: '1px', borderBottom: seccioActiva === 'carreto' ? '1px solid #111' : 'none', paddingBottom: '4px' }}
          >
            <ShoppingBag size={18} />
            {!isMobile && <span>CARRETÓ ({carret.reduce((a, b) => a + b.quantitat, 0)})</span>}
            {isMobile && carret.reduce((a, b) => a + b.quantitat, 0) > 0 && (
              <span style={{ backgroundColor: '#111', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                {carret.reduce((a, b) => a + b.quantitat, 0)}
              </span>
            )}
          </div>

          {/* Botó hamburguesa mòbil */}
          {isMobile && (
            <button onClick={() => setMenuMobilObert(!menuMobilObert)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <Menu size={22} />
            </button>
          )}
        </div>
      </header>

      {/* ── MENÚ MÒBIL DESPLEGABLE ── */}
      {isMobile && menuMobilObert && (
        <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #eceae4', padding: '10px 0', zIndex: 89, position: 'sticky', top: '57px' }}>
          {[
            { label: 'COL·LECCIÓ', acc: () => { setSeccioActiva('colleccio'); setProducteSeleccionat(null); } },
            { label: 'SOBRE MIRA', acc: () => setSeccioActiva('sobre-mira') },
            { label: 'EL MEU PERFIL', acc: () => setSeccioActiva('perfil') },
          ].map(({ label, acc }) => (
            <button key={label} onClick={acc} style={{ display: 'block', width: '100%', padding: '14px 24px', background: 'none', border: 'none', textAlign: 'left', fontSize: '13px', letterSpacing: '2px', cursor: 'pointer', fontWeight: '400', borderBottom: '1px solid #f0ede6' }}>
              {label}
            </button>
          ))}
        </div>
      )}

      {/* SECCIÓ A: COL·LECCIÓ GENERAL AMB SEPARACIÓ DE LÍNIES */}
      {seccioActiva === 'colleccio' && !producteSeleccionat && (
        <main style={{ padding: isMobile ? '30px 16px' : '60px 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '700px', margin: '0 auto 60px auto' }}>
            <h1 style={{ fontSize: isMobile ? '26px' : '38px', fontWeight: '300', letterSpacing: isMobile ? '2px' : '4px', marginBottom: '20px', fontFamily: '"Didot", serif' }}>EXPLORA LES LÍNIES</h1>
            <p style={{ color: '#6d6b64', fontSize: '15px', lineHeight: '1.8', letterSpacing: '0.5px' }}>
              Un estudi analític i conceptual entre el patronatge d'alta sastreria estructural i l'ergonomia relaxada del loungewear. Descobreix la teva forma ideal amb l'assistent tridimensional interactiu.
            </p>
          </div>

          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {PRODUCTES.map((prod) => (
              <div key={prod.id} style={{ borderTop: '1px solid #eceae4', paddingTop: '40px' }}>
                <div style={{ marginBottom: '25px' }}>
                  <span style={{ fontSize: '12px', letterSpacing: '3px', color: '#6d6b64', fontWeight: 'bold' }}>
                    {prod.id === 'pantalons-essence' ? 'COL·LECCIÓ CASUAL ESSENTIALS' : 'ALTA SASTRERIA ESTRUCTURAL'}
                  </span>
                  <h2 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '22px' : '28px', margin: '5px 0 0 0', fontWeight: '300', letterSpacing: '1px' }}>
                    {prod.id === 'pantalons-essence' ? 'LÍNIA ESSENCE' : 'LÍNIA TAILOR'}
                  </h2>
                </div>

                {/* Layout: horitzontal en escriptori, vertical en mòbil */}
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #eae8e1', overflow: 'hidden', cursor: 'pointer', position: 'relative', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'center' }}>
                  <div onClick={() => { setProducteSeleccionat(prod); setImatgeActiva(0); }} style={{ width: '100%', height: isMobile ? '320px' : '550px', backgroundColor: '#f5f5f3', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <img src={prod.imatges[0]} alt={prod.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x550?text=' + prod.nom }} />
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); commutarPreferit(prod); }}
                    style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: '#fff', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}
                  >
                    <Heart size={18} fill={preferits.find(p => p.id === prod.id) ? '#111' : 'none'} color={preferits.find(p => p.id === prod.id) ? '#111' : '#888'} />
                  </button>

                  <div style={{ padding: isMobile ? '24px' : '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' }} onClick={() => { setProducteSeleccionat(prod); setImatgeActiva(0); }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: isMobile ? '18px' : '22px', fontWeight: '400', letterSpacing: '1px' }}>{prod.nom}</h3>
                    <p style={{ margin: '0 0 20px 0', color: '#6d6b64', fontSize: '14px', lineHeight: '1.6' }}>{prod.descripcio}</p>
                    <p style={{ margin: '0 0 30px 0', fontWeight: 'bold', fontSize: '18px', color: '#111' }}>{prod.preu.toFixed(2)} €</p>
                    <span style={{ fontSize: '13px', letterSpacing: '2px', textDecoration: 'underline', fontWeight: 'bold' }}>EXPLORAR PEÇA I PROVAR EN 3D</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* SECCIÓ B: FITXA DE PRODUCTE */}
      {seccioActiva === 'colleccio' && producteSeleccionat && (
        <main style={{ maxWidth: '1200px', margin: '40px auto', padding: isMobile ? '0 16px' : '0 30px' }}>
          <button onClick={() => setProducteSeleccionat(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', marginBottom: '30px', color: '#6d6b64', letterSpacing: '1px' }}>
            <ArrowLeft size={14} /> TORNAR A LA COL·LECCIÓ
          </button>

          {/* Grid horitzontal en escriptori, columna única en mòbil */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? '30px' : '60px', alignItems: 'start' }}>
            <div>
              <div style={{ width: '100%', height: isMobile ? '360px' : '620px', backgroundColor: '#f5f5f3', overflow: 'hidden', marginBottom: '20px', position: 'relative', border: '1px solid #eae8e1' }}>
                <img src={producteSeleccionat.imatges[imatgeActiva]} alt={producteSeleccionat.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x700?text=' + producteSeleccionat.nom }} />
                
                <button onClick={anteriorImatge} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <ChevronLeft size={20} />
                </button>
                <button onClick={seguentImatge} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <ChevronRight size={20} />
                </button>

                <button onClick={intentarObrirEmprovador} style={{ position: 'absolute', bottom: '15px', right: '15px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#111111', color: '#ffffff', border: 'none', padding: isMobile ? '11px 14px' : '14px 24px', fontWeight: 'bold', cursor: 'pointer', fontSize: isMobile ? '11px' : '13px', letterSpacing: '1px' }}>
                  <Maximize2 size={14} /> PROVAR EN EMPROVADOR 3D
                </button>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {producteSeleccionat.imatges.map((img, index) => (
                  <div key={index} onClick={() => setImatgeActiva(index)} style={{ width: isMobile ? '60px' : '75px', height: isMobile ? '76px' : '95px', backgroundColor: '#f5f5f3', cursor: 'pointer', border: imatgeActiva === index ? '1px solid #111' : '1px solid transparent', padding: '2px' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=' + (index + 1) }} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h1 style={{ fontSize: isMobile ? '26px' : '36px', margin: '0 0 10px 0', fontWeight: '300', letterSpacing: '2px', fontFamily: '"Didot", serif' }}>{producteSeleccionat.nom}</h1>
                <button onClick={() => commutarPreferit(producteSeleccionat)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
                  <Heart size={24} fill={preferits.find(p => p.id === producteSeleccionat.id) ? '#111' : 'none'} color={preferits.find(p => p.id === producteSeleccionat.id) ? '#111' : '#444'} />
                </button>
              </div>
              <p style={{ fontSize: '22px', fontWeight: '400', margin: '0 0 30px 0', color: '#444' }}>{producteSeleccionat.preu.toFixed(2)} €</p>
              
              <div style={{ borderTop: '1px solid #eae8e1', borderBottom: '1px solid #eae8e1', padding: '25px 0', marginBottom: '30px' }}>
                <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '14px', lineHeight: '1.8' }}>{producteSeleccionat.descripcio}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#7c7a72' }}><strong>Composició:</strong> {producteSeleccionat.teixit}</p>
              </div>

              {/* RECOMANADOR DE TALLES */}
              <div style={{ backgroundColor: '#f4f3ee', padding: '20px', marginBottom: '30px', border: '1px solid #eae8e1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>RECOMANADOR D'ALTA PRECISIÓ</span>
                  <span onClick={() => setGuiaMidesOberta(true)} style={{ fontSize: '12px', color: '#111', textDecoration: 'underline', cursor: 'pointer' }}>Taula de mides oficial</span>
                </div>
                {tallaRecomanada ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#2e7d32', fontSize: '14px' }}>
                    <Check size={18} />
                    <span>Basat en el teu perfil, et recomanem la talla <strong>{tallaRecomanada}</strong>.</span>
                  </div>
                ) : (
                  <div>
                    <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#6d6b64' }}>Falta configurar les mides corporals per activar l'assistent de talles automàtic.</p>
                    <button
                      onClick={() => {
                        setMesuresTemp({ alcada: perfil.alcada, pes: perfil.pes, pit: perfil.pit, cintura: perfil.cintura, maluc: perfil.maluc });
                        setMesuresRapidesObertes(true);
                      }}
                      style={{ background: 'none', border: 'none', padding: 0, fontSize: '13px', color: '#111', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Introduir les meves mesures ara
                    </button>
                  </div>
                )}
                {tallaRecomanada && (
                  <button
                    onClick={() => {
                      setMesuresTemp({ alcada: perfil.alcada, pes: perfil.pes, pit: perfil.pit, cintura: perfil.cintura, maluc: perfil.maluc });
                      setMesuresRapidesObertes(true);
                    }}
                    style={{ background: 'none', border: 'none', padding: '8px 0 0 0', fontSize: '12px', color: '#6d6b64', textDecoration: 'underline', cursor: 'pointer', display: 'block' }}
                  >
                    Modificar mesures
                  </button>
                )}
              </div>

              {/* SELECCIÓ MANUAL */}
              <div style={{ marginBottom: '35px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1.5px', display: 'block', marginBottom: '15px' }}>SELECCIONAR TALLA</span>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['XS', 'S', 'M', 'L', 'XL'].map((talla) => (
                    <button
                      key={talla}
                      onClick={() => setTallaSeleccionada(talla)}
                      style={{ width: '50px', height: '50px', border: tallaSeleccionada === talla ? '2px solid #111' : '1px solid #ccc', backgroundColor: tallaSeleccionada === talla ? '#111' : talla === tallaRecomanada ? '#e8f5e9' : '#fff', color: tallaSeleccionada === talla ? '#fff' : '#111', fontWeight: 'bold', cursor: 'pointer' }}
                    >
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

      {/* SECCIÓ C: SOBRE MIRA */}
      {seccioActiva === 'sobre-mira' && (
        <main style={{ maxWidth: '800px', margin: '60px auto', padding: isMobile ? '0 16px' : '0 30px', textAlign: 'center' }}>
          <h1 style={{ fontSize: isMobile ? '26px' : '36px', fontWeight: '300', letterSpacing: '4px', marginBottom: '30px', fontFamily: '"Didot", serif' }}>SOBRE MIRA</h1>
          <p style={{ fontSize: '16px', lineHeight: '2', color: '#444', textAlign: 'justify', marginBottom: '30px' }}>
            MiRA neix com un projecte conceptual de transformació digital en l'àmbit del patronatge industrial i el disseny de moda. La nostra filosofia es recolza en la fusió de dos mons aparentment oposats: la precisió de la sastreria tradicional estructurada i la comoditat d'ús diari de les col·leccions contemporànies.
          </p>
          <div style={{ backgroundColor: '#ffffff', padding: isMobile ? '24px' : '40px', border: '1px solid #eae8e1', textAlign: 'left', marginBottom: '40px' }}>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '20px', marginBottom: '15px', letterSpacing: '1px' }}>El Manifest de Sostenibilitat Digital</h3>
            <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#6d6b64', margin: 0 }}>
              Mitjançant la implementació d'emprovadors tridimensionals interactius basats en Realitat Augmentada (RA), reduïm preventivament l'índex de devolució de peces de roba. Això minimitza l'impacte i la petjada de carboni de la logística inversa, assegurant una producció conscient, sota comanda i optimitzada amb zero residus tèxtils en els marcatges de tall.
            </p>
          </div>
          <button onClick={() => setSeccioActiva('colleccio')} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '15px 35px', fontSize: '13px', letterSpacing: '2px', cursor: 'pointer' }}>
            TORNAR AL CATÀLEG
          </button>
        </main>
      )}

      {/* SECCIÓ D: PERFIL D'USUARI */}
      {seccioActiva === 'perfil' && (
        <main style={{ maxWidth: '1100px', margin: '40px auto', padding: isMobile ? '0 16px' : '0 30px' }}>
          <h1 style={{ fontSize: isMobile ? '24px' : '34px', fontWeight: '300', letterSpacing: '3px', marginBottom: '30px', fontFamily: '"Didot", serif' }}>EL MEU PERFIL DE LUXE</h1>
          
          {/* En mòbil: pestanyes horitzontals a dalt. En escriptori: sidebar lateral */}
          {isMobile ? (
            <>
              {/* Pestanyes horitzontals per a mòbil */}
              <div style={{ display: 'flex', overflowX: 'auto', gap: '0', borderBottom: '2px solid #eae8e1', marginBottom: '24px', WebkitOverflowScrolling: 'touch' }}>
                {([
                  { key: 'dades', icon: <User size={14} />, label: 'Dades' },
                  { key: 'ra', icon: <ImageIcon size={14} />, label: 'RA' },
                  { key: 'looks', icon: <Sliders size={14} />, label: 'Looks' },
                  { key: 'preferits', icon: <Heart size={14} />, label: `Preferits${preferits.length > 0 ? ` (${preferits.length})` : ''}` },
                  { key: 'compres', icon: <Package size={14} />, label: 'Comandes' },
                ] as const).map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setSubgrupPerfil(tab.key as any)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '12px 14px', border: 'none', background: 'none', cursor: 'pointer', fontSize: '12px', letterSpacing: '0.5px', whiteSpace: 'nowrap', borderBottom: subgrupPerfil === tab.key ? '2px solid #111' : '2px solid transparent', marginBottom: '-2px', fontWeight: subgrupPerfil === tab.key ? 'bold' : 'normal', color: subgrupPerfil === tab.key ? '#111' : '#6d6b64' }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>
              {/* Contingut del perfil (mòbil) */}
              <div style={{ backgroundColor: '#ffffff', padding: '24px', border: '1px solid #eae8e1' }}>
                {renderContingutPerfil()}
              </div>
            </>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '50px', alignItems: 'start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#fff', padding: '20px', border: '1px solid #eae8e1' }}>
                <button onClick={() => setSubgrupPerfil('dades')} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '15px', border: 'none', background: subgrupPerfil === 'dades' ? '#f4f3ee' : 'none', textAlign: 'left', cursor: 'pointer', fontWeight: subgrupPerfil === 'dades' ? 'bold' : 'normal', fontSize: '14px' }}>
                  <User size={16} /> Les meves dades i mides
                </button>
                <button onClick={() => setSubgrupPerfil('ra')} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '15px', border: 'none', background: subgrupPerfil === 'ra' ? '#f4f3ee' : 'none', textAlign: 'left', cursor: 'pointer', fontWeight: subgrupPerfil === 'ra' ? 'bold' : 'normal', fontSize: '14px' }}>
                  <ImageIcon size={16} /> Fotografies per a la RA
                </button>
                <button onClick={() => setSubgrupPerfil('looks')} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '15px', border: 'none', background: subgrupPerfil === 'looks' ? '#f4f3ee' : 'none', textAlign: 'left', cursor: 'pointer', fontWeight: subgrupPerfil === 'looks' ? 'bold' : 'normal', fontSize: '14px' }}>
                  <Sliders size={16} /> Els meus looks provats
                </button>
                <button onClick={() => setSubgrupPerfil('preferits')} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '15px', border: 'none', background: subgrupPerfil === 'preferits' ? '#f4f3ee' : 'none', textAlign: 'left', cursor: 'pointer', fontWeight: subgrupPerfil === 'preferits' ? 'bold' : 'normal', fontSize: '14px' }}>
                  <Heart size={16} /> Els meus preferits {preferits.length > 0 && `(${preferits.length})`}
                </button>
                <button onClick={() => setSubgrupPerfil('compres')} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '15px', border: 'none', background: subgrupPerfil === 'compres' ? '#f4f3ee' : 'none', textAlign: 'left', cursor: 'pointer', fontWeight: subgrupPerfil === 'compres' ? 'bold' : 'normal', fontSize: '14px' }}>
                  <Package size={16} /> Les meves comandes
                </button>
              </div>

              <div style={{ backgroundColor: '#ffffff', padding: '40px', border: '1px solid #eae8e1', minHeight: '400px' }}>
                {renderContingutPerfil()}
              </div>
            </div>
          )}
        </main>
      )}

      {/* SECCIÓ E: CARRETÓ DE COMPRA */}
      {seccioActiva === 'carreto' && (
        <main style={{ maxWidth: '900px', margin: '40px auto', padding: isMobile ? '0 16px' : '0 30px' }}>
          <h1 style={{ fontSize: isMobile ? '24px' : '34px', fontWeight: '300', letterSpacing: '3px', marginBottom: '40px', fontFamily: '"Didot", serif', textAlign: 'center' }}>EL TEU CARRETÓ DE COMPRA</h1>
          
          {carret.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', border: '1px solid #eae8e1', backgroundColor: '#fff' }}>
              <ShoppingBag size={40} style={{ marginBottom: '15px', strokeWidth: 1, color: '#6d6b64' }} />
              <p style={{ color: '#6d6b64', fontSize: '15px', marginBottom: '25px' }}>El teu carretó està buit actualment.</p>
              <button onClick={() => setSeccioActiva('colleccio')} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '13px', letterSpacing: '1px', cursor: 'pointer' }}>EXPLORAR PRODUCTES</button>
            </div>
          ) : pasCheckout === 'carret' ? (
            /* Columna única en mòbil, grid en escriptori */
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 340px', gap: '30px', alignItems: 'start' }}>
              {/* Llista d'ítems afegits */}
              <div style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: isMobile ? '16px' : '25px' }}>
                {carret.map((item, index) => (
                  <div key={`${item.producte.id}-${item.talla}`} style={{ display: 'flex', gap: '16px', padding: '20px 0', borderBottom: index === carret.length - 1 ? 'none' : '1px solid #eceae4', alignItems: 'center' }}>
                    <div style={{ width: '65px', height: '82px', backgroundColor: '#f5f5f3', overflow: 'hidden', border: '1px solid #eceae4', flexShrink: 0 }}>
                      <img src={item.producte.imatges[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: isMobile ? '14px' : '16px', fontWeight: '400' }}>{item.producte.nom}</h4>
                      <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#6d6b64' }}>Talla: <strong>{item.talla}</strong></p>
                      <p style={{ margin: 0, fontSize: '13px', color: '#111' }}>{item.quantitat} x {item.producte.preu.toFixed(2)} €</p>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '15px' }}>{(item.producte.preu * item.quantitat).toFixed(2)} €</p>
                      <button 
                        onClick={() => setCarret(prev => {
                          const item = prev[index];
                          if (item.quantitat > 1) {
                            return prev.map((it, i) => i === index ? { ...it, quantitat: it.quantitat - 1 } : it);
                          }
                          return prev.filter((_, i) => i !== index);
                        })}
                        style={{ background: 'none', border: 'none', color: '#bd1c1c', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline', padding: 0 }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Resum de compra */}
              <div style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: isMobile ? '20px' : '30px' }}>
                <h3 style={{ fontFamily: '"Didot", serif', fontSize: '20px', margin: '0 0 20px 0', fontWeight: '300', borderBottom: '1px solid #eceae4', paddingBottom: '15px' }}>RESUM DE COMPRA</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px', color: '#444' }}>
                  <span>Subtotal</span>
                  <span>{subtotalCarret.toFixed(2)} €</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: '#444' }}>
                  <span>Despeses d'enviament</span>
                  <span>{costEnviament === 0 ? 'Gratuït' : `${costEnviament.toFixed(2)} €`}</span>
                </div>
                {faltaPerEnviamentGratis > 0 && (
                  <div style={{ backgroundColor: '#f4f3ee', border: '1px solid #eae8e1', padding: '10px 12px', marginBottom: '20px', fontSize: '12px', color: '#444', lineHeight: '1.5' }}>
                    <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>✓ Afegeix {faltaPerEnviamentGratis.toFixed(2)} € més</span> per obtenir enviament gratuït!
                  </div>
                )}
                {costEnviament === 0 && subtotalCarret > 0 && (
                  <p style={{ fontSize: '11px', color: '#2e7d32', margin: '-4px 0 16px 0', fontWeight: 'bold' }}>✓ Enviament gratuït aplicat</p>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', borderTop: '1px solid #eceae4', paddingTop: '15px', marginBottom: '30px' }}>
                  <span>TOTAL</span>
                  <span>{totalGlobal.toFixed(2)} €</span>
                </div>

                <button 
                  onClick={() => setPasCheckout('pagament')}
                  style={{ width: '100%', backgroundColor: '#111', color: '#fff', border: 'none', padding: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}
                >
                  CONTINUAR AL PAGAMENT
                </button>
              </div>
            </div>
          ) : (
            /* Checkout - columna única en mòbil */
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 340px', gap: '30px', alignItems: 'start' }}>
              <div style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: isMobile ? '20px' : '35px' }}>
                <button onClick={() => setPasCheckout('carret')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', marginBottom: '25px', color: '#6d6b64', letterSpacing: '1px' }}>
                  <ArrowLeft size={14} /> TORNAR AL CARRETÓ
                </button>
                <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CreditCard size={20} /> DADES DE PAGAMENT
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>TITULAR DE LA TARGETA</label>
                    <input
                      type="text"
                      placeholder="Nom i cognoms del titular"
                      value={dadesPagament.titular}
                      onChange={e => setDadesPagament({...dadesPagament, titular: e.target.value})}
                      style={{ width: '100%', padding: '14px', border: '1px solid #ccc', backgroundColor: '#fafafa', fontSize: '14px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>NÚMERO DE TARGETA</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      value={dadesPagament.numero}
                      onChange={e => {
                        const val = e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
                        setDadesPagament({...dadesPagament, numero: val});
                      }}
                      style={{ width: '100%', padding: '14px', border: '1px solid #ccc', backgroundColor: '#fafafa', fontSize: '14px', letterSpacing: '2px', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>DATA D'EXPIRACIÓ</label>
                      <input
                        type="text"
                        placeholder="MM/AA"
                        maxLength={5}
                        value={dadesPagament.expiracio}
                        onChange={e => {
                          let val = e.target.value.replace(/\D/g, '');
                          if (val.length >= 3) val = val.slice(0,2) + '/' + val.slice(2,4);
                          setDadesPagament({...dadesPagament, expiracio: val});
                        }}
                        style={{ width: '100%', padding: '14px', border: '1px solid #ccc', backgroundColor: '#fafafa', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength={4}
                        value={dadesPagament.cvv}
                        onChange={e => setDadesPagament({...dadesPagament, cvv: e.target.value.replace(/\D/g, '')})}
                        style={{ width: '100%', padding: '14px', border: '1px solid #ccc', backgroundColor: '#fafafa', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '25px', padding: '15px', backgroundColor: '#f4f3ee', border: '1px solid #eae8e1', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#6d6b64' }}>
                  <Shield size={16} color="#2e7d32" />
                  <span>Les teves dades estan protegides amb xifratge SSL de 256 bits.</span>
                </div>
              </div>

              {/* Resum final de la comanda */}
              <div style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: isMobile ? '20px' : '30px' }}>
                <h3 style={{ fontFamily: '"Didot", serif', fontSize: '20px', margin: '0 0 20px 0', fontWeight: '300', borderBottom: '1px solid #eceae4', paddingBottom: '15px' }}>RESUM FINAL</h3>
                {carret.map((item) => (
                  <div key={`${item.producte.id}-${item.talla}`} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px', color: '#444' }}>
                    <span style={{ maxWidth: '60%' }}>{item.producte.nom} ({item.talla}) x{item.quantitat}</span>
                    <span>{(item.producte.preu * item.quantitat).toFixed(2)} €</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #eceae4', paddingTop: '12px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#444' }}>
                    <span>Enviament</span>
                    <span>{costEnviament === 0 ? 'Gratuït' : `${costEnviament.toFixed(2)} €`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', borderTop: '1px solid #eceae4', paddingTop: '12px', marginTop: '8px' }}>
                    <span>TOTAL</span>
                    <span>{totalGlobal.toFixed(2)} €</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!dadesPagament.titular || !dadesPagament.numero || !dadesPagament.expiracio || !dadesPagament.cvv) {
                      setMissatgeWeb({ text: 'Si us plau, omple totes les dades de la targeta.', tipus: 'info' });
                      return;
                    }
                    const codiRandom = 'CMD-' + Math.floor(100000 + Math.random() * 900000);
                    const novaComanda = {
                      id: codiRandom,
                      data: new Date().toLocaleDateString('ca-ES'),
                      productes: carret.map(i => `${i.producte.nom} (${i.talla})`).join(', '),
                      total: `${totalGlobal.toFixed(2)} €`
                    };
                    setPerfil(prev => ({ ...prev, comandes: [novaComanda, ...prev.comandes] }));
                    setCarret([]);
                    setDadesPagament({ numero: '', expiracio: '', titular: '', cvv: '' });
                    setPasCheckout('carret');
                    setMissatgeWeb({ text: `Compra realitzada amb èxit! Codi: ${codiRandom}`, tipus: 'exit' });
                    setSeccioActiva('perfil');
                    setSubgrupPerfil('compres');
                  }}
                  style={{ width: '100%', backgroundColor: '#111', color: '#fff', border: 'none', padding: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', marginTop: '20px' }}
                >
                  CONFIRMAR I PAGAR {totalGlobal.toFixed(2)} €
                </button>
              </div>
            </div>
          )}

          {/* PREFERITS AL CARRETÓ */}
          {preferits.length > 0 && pasCheckout === 'carret' && (
            <PreferitsCarret
              preferits={preferits}
              tallaRecomanada={tallaRecomanada}
              isMobile={isMobile}
              onAfegir={(prod, talla) => {
                setCarret(prev => {
                  const existent = prev.find(item => item.producte.id === prod.id && item.talla === talla);
                  if (existent) return prev.map(item => item.producte.id === prod.id && item.talla === talla ? { ...item, quantitat: item.quantitat + 1 } : item);
                  return [...prev, { producte: prod, talla, quantitat: 1 }];
                });
                setMissatgeWeb({ text: `${prod.nom} (Talla ${talla}) afegit al carretó!`, tipus: 'exit' });
              }}
              onEliminarPreferit={commutarPreferit}
            />
          )}
        </main>
      )}

      {/* MODAL: EMPROVADOR 3D INTERACTIU */}
      {emprovadorObert && producteSeleccionat && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#ffffff', width: '95%', maxWidth: '1000px', height: isMobile ? '95vh' : '85vh', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 380px', gridTemplateRows: isMobile ? '1fr auto' : undefined, position: 'relative', overflow: 'hidden' }}>
            <button onClick={() => setEmprovadorObert(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#111', zIndex: 510 }}>
              <X size={24} />
            </button>
            
            {/* Àrea del Model 3D Real */}
            <div style={{ backgroundColor: '#f5f5f3', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: isMobile ? '240px' : undefined }}>
              {React.createElement('model-viewer' as any, {
                src: producteSeleccionat.model3d,
                'camera-controls': '',
                'auto-rotate': '',
                style: { width: '100%', height: '100%' }
              })}
            </div>

            {/* Lateral del control de l'emprovador */}
            <div style={{ padding: isMobile ? '20px' : '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: isMobile ? 'none' : '1px solid #eceae4', borderTop: isMobile ? '1px solid #eceae4' : 'none', backgroundColor: '#fff', overflowY: 'auto' }}>
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '2px', color: '#6d6b64', fontWeight: 'bold' }}>SISTEMA INTERACTIU MIRA</span>
                <h3 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '20px' : '24px', margin: '5px 0 15px 0', fontWeight: '300' }}>EMPROVADOR 3D</h3>
                {!isMobile && <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', marginBottom: '20px' }}>Estàs visualitzant l'adaptació digital en tres dimensions de la peça. Pots rotar, fer zoom i analitzar la caiguda estructural del teixit de forma interactiva.</p>}

                {/* TALLA SELECCIONADA I SELECTOR */}
                <div style={{ backgroundColor: '#f4f3ee', padding: '16px', border: '1px solid #eae8e1', marginBottom: '20px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>TALLA SELECCIONADA</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['XS', 'S', 'M', 'L', 'XL'].map((talla) => (
                      <button
                        key={talla}
                        onClick={() => setTallaSeleccionada(talla)}
                        style={{ width: '42px', height: '42px', border: tallaSeleccionada === talla ? '2px solid #111' : '1px solid #ccc', backgroundColor: tallaSeleccionada === talla ? '#111' : talla === tallaRecomanada ? '#e8f5e9' : '#fff', color: tallaSeleccionada === talla ? '#fff' : '#111', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                      >
                        {talla}
                      </button>
                    ))}
                  </div>
                  {tallaSeleccionada && (
                    <p style={{ margin: '10px 0 0 0', fontSize: '12px', color: '#2e7d32', fontWeight: 'bold' }}>
                      <Check size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      Talla {tallaSeleccionada} seleccionada
                      {tallaRecomanada === tallaSeleccionada && ' · Recomanada per al teu perfil'}
                    </p>
                  )}
                </div>
                
                {perfil.fotoRA && !isMobile && (
                  <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', marginBottom: '15px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>MODEL RA ASSOCIAT:</span>
                    <img src={perfil.fotoRA} alt="RA Model" style={{ width: '80px', height: 'auto', border: '1px solid #eae8e1' }} />
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <button
                  onClick={afegirAlCarretDesDeEmprovador}
                  style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '15px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
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

      {/* MODAL FOTO OBLIGATÒRIA - AMB PUJADA RÀPIDA DES D'AQUÍ */}
      {pasFotoObligatori && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: isMobile ? '28px 20px' : '40px', maxWidth: '480px', width: '90%', border: '1px solid #eae8e1', textAlign: 'center' }}>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 15px 0', fontWeight: '300' }}>Fotografia necessària</h3>
            <p style={{ fontSize: '14px', color: '#6d6b64', lineHeight: '1.6', marginBottom: '25px' }}>Per poder activar l'emprovador conceptual, primer cal una fotografia de referència corporal. Puja-la ara directament:</p>
            
            <div style={{ border: '2px dashed #eae8e1', padding: '25px', backgroundColor: '#faf9f6', marginBottom: '20px', textAlign: 'center' }}>
              <ImageIcon size={28} color="#aaa" style={{ marginBottom: '10px' }} />
              <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#6d6b64' }}>Selecciona una fotografia del teu dispositiu</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFotoUploadDesDeEmprovador}
                style={{ cursor: 'pointer', fontSize: '13px' }}
              />
            </div>
            <p style={{ fontSize: '11px', color: '#aaa', marginBottom: '20px' }}>La fotografia es guardarà automàticament al teu perfil.</p>

            <button onClick={() => setPasFotoObligatori(false)} style={{ background: 'none', border: '1px solid #ccc', padding: '12px 20px', fontSize: '13px', cursor: 'pointer' }}>Cancel·lar</button>
          </div>
        </div>
      )}

      {/* MODAL MESURES RÀPIDES DES DE LA FITXA DE PRODUCTE */}
      {mesuresRapidesObertes && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 650, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: isMobile ? '28px 20px' : '40px', maxWidth: '460px', width: '90%', border: '1px solid #eae8e1', position: 'relative' }}>
            <button onClick={() => setMesuresRapidesObertes(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' }}>
              <X size={20} />
            </button>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 8px 0', fontWeight: '300' }}>Les meves mesures</h3>
            <p style={{ fontSize: '13px', color: '#6d6b64', margin: '0 0 25px 0' }}>Les mesures es guardaran al teu perfil i activaran el recomanador de talles automàticament.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Alçada (cm)</label>
                <input type="number" value={mesuresTemp.alcada} onChange={e => setMesuresTemp({...mesuresTemp, alcada: e.target.value})} placeholder="Ej: 168" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Pes (kg)</label>
                <input type="number" value={mesuresTemp.pes} onChange={e => setMesuresTemp({...mesuresTemp, pes: e.target.value})} placeholder="Ej: 62" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Pit (cm)</label>
                <input type="number" value={mesuresTemp.pit} onChange={e => setMesuresTemp({...mesuresTemp, pit: e.target.value})} placeholder="Ej: 88" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Cintura (cm)</label>
                <input type="number" value={mesuresTemp.cintura} onChange={e => setMesuresTemp({...mesuresTemp, cintura: e.target.value})} placeholder="Ej: 70" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Maluc (cm)</label>
                <input type="number" value={mesuresTemp.maluc} onChange={e => setMesuresTemp({...mesuresTemp, maluc: e.target.value})} placeholder="Ej: 96" style={{ width: '100%', padding: '12px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setMesuresRapidesObertes(false)} style={{ flex: 1, background: 'none', border: '1px solid #ccc', padding: '13px', fontSize: '13px', cursor: 'pointer' }}>Cancel·lar</button>
              <button
                onClick={() => {
                  setPerfil(prev => ({ ...prev, alcada: mesuresTemp.alcada, pes: mesuresTemp.pes, pit: mesuresTemp.pit, cintura: mesuresTemp.cintura, maluc: mesuresTemp.maluc }));
                  setMesuresRapidesObertes(false);
                  setMissatgeWeb({ text: 'Mesures guardades al perfil. Recomanador activat!', tipus: 'exit' });
                }}
                style={{ flex: 2, backgroundColor: '#111', color: '#fff', border: 'none', padding: '13px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}
              >
                GUARDAR MESURES
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAULA DE MIDES OFICIALS */}
      {guiaMidesOberta && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: isMobile ? '28px 16px' : '40px', maxWidth: '480px', width: '92%', position: 'relative', border: '1px solid #eae8e1', overflowX: 'auto' }}>
            <button onClick={() => setGuiaMidesOberta(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#111' }}>
              <X size={20} />
            </button>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '24px', margin: '0 0 25px 0', fontWeight: '300', textAlign: 'center' }}>TAULA DE MIDES OFICIALS</h3>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '14px', textAlign: 'center' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #111', fontWeight: 'bold' }}>
                  <th style={{ padding: '12px 5px' }}>Talla</th>
                  <th style={{ padding: '12px 5px' }}>Cintura (cm)</th>
                  <th style={{ padding: '12px 5px' }}>Pit (cm)</th>
                  <th style={{ padding: '12px 5px' }}>Maluc (cm)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eceae4' }}><td style={{ padding: '12px 5px', fontWeight: 'bold' }}>XS</td><td style={{ padding: '12px 5px' }}>&lt; 65</td><td style={{ padding: '12px 5px' }}>80-84</td><td style={{ padding: '12px 5px' }}>88-92</td></tr>
                <tr style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === 'S' ? '#f4f3ee' : 'transparent' }}><td style={{ padding: '12px 5px', fontWeight: 'bold' }}>S {tallaRecomanada === 'S' && '•'}</td><td style={{ padding: '12px 5px' }}>65 - 71</td><td style={{ padding: '12px 5px' }}>85-89</td><td style={{ padding: '12px 5px' }}>93-97</td></tr>
                <tr style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === 'M' ? '#f4f3ee' : 'transparent' }}><td style={{ padding: '12px 5px', fontWeight: 'bold' }}>M {tallaRecomanada === 'M' && '•'}</td><td style={{ padding: '12px 5px' }}>72 - 79</td><td style={{ padding: '12px 5px' }}>90-94</td><td style={{ padding: '12px 5px' }}>98-102</td></tr>
                <tr style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === 'L' ? '#f4f3ee' : 'transparent' }}><td style={{ padding: '12px 5px', fontWeight: 'bold' }}>L {tallaRecomanada === 'L' && '•'}</td><td style={{ padding: '12px 5px' }}>80 - 87</td><td style={{ padding: '12px 5px' }}>95-99</td><td style={{ padding: '12px 5px' }}>103-107</td></tr>
                <tr style={{ borderBottom: '1px solid #111', backgroundColor: tallaRecomanada === 'XL' ? '#f4f3ee' : 'transparent' }}><td style={{ padding: '12px 5px', fontWeight: 'bold' }}>XL {tallaRecomanada === 'XL' && '•'}</td><td style={{ padding: '12px 5px' }}>&gt;= 88</td><td style={{ padding: '12px 5px' }}>100-105</td><td style={{ padding: '12px 5px' }}>108-113</td></tr>
              </tbody>
            </table>
            {tallaRecomanada && (
              <p style={{ fontSize: '12px', color: '#2e7d32', marginTop: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                • La teva talla recomanada actual és la {tallaRecomanada}.
              </p>
            )}
          </div>
        </div>
      )}

    </div>
  );

  // ─── Funció auxiliar: contingut intern del Perfil (compartit entre mòbil i escriptori) ──
  function renderContingutPerfil() {
    return (
      <>
        {subgrupPerfil === 'dades' && (
          <div>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300' }}>Informació Personal i Atributs</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: '35px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Nom Complet</label>
                <input type="text" value={perfil.nom} onChange={e => setPerfil({...perfil, nom: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', backgroundColor: '#fafafa', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Correu Electrònic</label>
                <input type="email" value={perfil.email} onChange={e => setPerfil({...perfil, email: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', backgroundColor: '#fafafa', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Número de Telèfon</label>
                <input type="text" value={perfil.telefon} onChange={e => setPerfil({...perfil, telefon: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', backgroundColor: '#fafafa', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>Direcció d'Enviament</label>
                <input type="text" value={perfil.adreca} onChange={e => setPerfil({...perfil, adreca: e.target.value})} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', backgroundColor: '#fafafa', boxSizing: 'border-box' }} />
              </div>
            </div>

            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '300', borderTop: '1px solid #eee', paddingTop: '25px' }}>Mesures del Cos per al Recomanador</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>Alçada (cm)</label>
                <input type="number" value={perfil.alcada} onChange={e => setPerfil({...perfil, alcada: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>Pes (kg)</label>
                <input type="number" value={perfil.pes} onChange={e => setPerfil({...perfil, pes: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>Pit (cm)</label>
                <input type="number" value={perfil.pit} onChange={e => setPerfil({...perfil, pit: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>Cintura (cm)</label>
                <input type="number" value={perfil.cintura} onChange={e => setPerfil({...perfil, cintura: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>Maluc (cm)</label>
                <input type="number" value={perfil.maluc} onChange={e => setPerfil({...perfil, maluc: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>
        )}

        {subgrupPerfil === 'ra' && (
          <div>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 20px 0', fontWeight: '300' }}>Arxius per a Realitat Augmentada</h3>
            <div style={{ border: '2px dashed #eae8e1', padding: '40px', textAlign: 'center', backgroundColor: '#faf9f6', marginBottom: '25px' }}>
              <input type="file" accept="image/*" onChange={handleFotoUpload} style={{ cursor: 'pointer' }} />
            </div>
            {perfil.fotoRA && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <img src={perfil.fotoRA} alt="Preview RA" style={{ maxWidth: '200px', height: 'auto', border: '1px solid #eae8e1', display: 'block', margin: '0 auto 15px auto' }} />
                <button 
                  onClick={() => {
                    setPerfil(prev => ({ ...prev, fotoRA: null }));
                    setMissatgeWeb({ text: 'Fotografia eliminada de la Realitat Augmentada.', tipus: 'info' });
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#bd1c1c', color: '#fff', border: 'none', padding: '10px 18px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}
                >
                  <Trash2 size={14} /> BORRAR FOTO SELECCIONADA
                </button>
              </div>
            )}
          </div>
        )}

        {subgrupPerfil === 'looks' && (
          <div>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 20px 0', fontWeight: '300' }}>Looks provats a l'emprovador 3D</h3>
            {perfil.looksProvats.length === 0 ? (
              <p style={{ color: '#6d6b64', fontSize: '14px' }}>Encara no has provat cap peça a l'emprovador virtual.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '30px' }}>
                {perfil.looksProvats.map((lookId) => {
                  const prodAsociat = PRODUCTES.find(p => p.id === lookId);
                  if (!prodAsociat) return null;
                  return (
                    <div key={lookId} style={{ border: '1px solid #eae8e1', padding: '20px', backgroundColor: '#faf9f6' }}>
                      <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', letterSpacing: '1px' }}>{prodAsociat.nom}</h4>
                      <div style={{ width: '100%', height: '300px', backgroundColor: '#f5f5f3', border: '1px solid #ddd', position: 'relative' }}>
                        {React.createElement('model-viewer' as any, {
                          src: prodAsociat.model3d,
                          'camera-controls': '',
                          'auto-rotate': '',
                          style: { width: '100%', height: '100%' }
                        })}
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
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300' }}>Els meus preferits</h3>
            {preferits.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#6d6b64' }}>
                <Heart size={32} style={{ marginBottom: '10px', strokeWidth: 1 }} />
                <p style={{ fontSize: '14px', margin: '0 0 20px 0' }}>Encara no has afegit cap peça als preferits.</p>
                <button onClick={() => { setSeccioActiva('colleccio'); setProducteSeleccionat(null); }} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '13px', letterSpacing: '1px', cursor: 'pointer' }}>EXPLORAR COL·LECCIÓ</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {preferits.map((prod) => (
                  <div key={prod.id} style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid #eae8e1', backgroundColor: '#faf9f6', alignItems: 'center' }}>
                    <div style={{ width: '80px', height: '100px', backgroundColor: '#f5f5f3', overflow: 'hidden', border: '1px solid #eceae4', flexShrink: 0 }}>
                      <img src={prod.imatges[0]} alt={prod.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=' + prod.nom }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '400', letterSpacing: '0.5px' }}>{prod.nom}</h4>
                      <p style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>{prod.preu.toFixed(2)} €</p>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => { setSeccioActiva('colleccio'); setProducteSeleccionat(prod); setImatgeActiva(0); }}
                          style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '9px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}
                        >
                          VEURE PEÇA
                        </button>
                        <button
                          onClick={() => commutarPreferit(prod)}
                          style={{ backgroundColor: 'transparent', color: '#bd1c1c', border: '1px solid #bd1c1c', padding: '9px 16px', fontSize: '12px', cursor: 'pointer', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <Trash2 size={13} /> ELIMINAR
                        </button>
                      </div>
                    </div>
                    <div style={{ flexShrink: 0 }}>
                      <Heart size={20} fill="#111" color="#111" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {subgrupPerfil === 'compres' && (
          <div>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300' }}>Historial de les meves comandes</h3>
            {perfil.comandes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#6d6b64' }}>
                <Package size={32} style={{ marginBottom: '10px', strokeWidth: 1 }} />
                <p style={{ fontSize: '14px', margin: 0 }}>Encara no has realitzat cap comanda anteriorment a la nostra plataforma.</p>
              </div>
            ) : isMobile ? (
              /* Comandes en mòbil: targetes verticals en lloc de taula */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {perfil.comandes.map((cmd) => (
                  <div key={cmd.id} style={{ border: '1px solid #eae8e1', padding: '16px', backgroundColor: '#faf9f6', fontSize: '13px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 'bold' }}>{cmd.id}</span>
                      <span style={{ fontWeight: 'bold' }}>{cmd.total}</span>
                    </div>
                    <p style={{ margin: '0 0 4px 0', color: '#6d6b64' }}>{cmd.data}</p>
                    <p style={{ margin: 0, color: '#444' }}>{cmd.productes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', letterSpacing: '0.5px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #111', textAlign: 'left' }}>
                    <th style={{ padding: '12px 8px' }}>Codi de Comanda</th>
                    <th style={{ padding: '12px 8px' }}>Data</th>
                    <th style={{ padding: '12px 8px' }}>Productes comprats</th>
                    <th style={{ padding: '12px 8px', textAlign: 'right' }}>Total Pagat</th>
                  </tr>
                </thead>
                <tbody>
                  {perfil.comandes.map((cmd) => (
                    <tr key={cmd.id} style={{ borderBottom: '1px solid #eceae4' }}>
                      <td style={{ padding: '14px 8px', fontWeight: 'bold' }}>{cmd.id}</td>
                      <td style={{ padding: '14px 8px', color: '#555' }}>{cmd.data}</td>
                      <td style={{ padding: '14px 8px' }}>{cmd.productes}</td>
                      <td style={{ padding: '14px 8px', textAlign: 'right', fontWeight: 'bold' }}>{cmd.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </>
    );
  }
}