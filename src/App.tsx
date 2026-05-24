import React, { useState, useEffect } from 'react';
import { ShoppingBag, ArrowLeft, MessageCircle, Shield, Maximize2, X, User, Check, Sliders, ChevronLeft, ChevronRight, Heart, CreditCard, Package, Image as ImageIcon, Info, Trash2, Menu, Star, Tag, Sparkles, MapPin, Cpu, Leaf, UserCheck } from 'lucide-react';

const translations = {
  cat: {
    common: {
      brand: 'MiRA',
      cat: 'CAT',
      esp: 'ESP',
      size: 'Talla',
      total: 'TOTAL',
      free: 'Gratuit',
      shipping: 'Enviament',
      subtotal: 'Subtotal',
      remove: 'Eliminar',
      cancel: 'Cancelar',
      recommendedSize: 'La teva talla recomanada:',
      cart: 'CARRETÓ',
      composition: 'Composició:',
      viewCollection: 'Veure la col·lecció',
      addToCart: 'AFEGIR AL CARRETÓ',
      exploreCollection: 'EXPLORAR COL·LECCIÓ',
      exploreProducts: 'EXPLORAR PRODUCTES',
    },
    nav: { about: 'SOBRE MiRA', news: 'NOVETATS', sales: 'MID-SEASON SALES', collection: 'COL·LECCIÓ', profile: 'EL MEU PERFIL' },
    productes: {
      'pantalons-essence': { nom: 'Pantaló fluid Essence', descripcio: "Pantaló d'estil urbà amb tall wide leg i teixit fluid que s'adapta perfectament al teu moviment. Confeccionat de manera sostenible en tallers locals. Una peça còmoda, versàtil i en tendència per al teu dia a dia.", teixit: '100% Cotó Orgànic Certificat' },
      'pantalons-tailor': { nom: 'Pantaló sastre Tailor', descripcio: 'Elegància clàssica i sastreria contemporània. Aquest pantaló destaca pel seu tall estructurat de tir alt que defineix la silueta amb la màxima comoditat. Creat a Barcelona amb materials responsables i sota criteris de residu zero.', teixit: "98% Cotó Orgànic Premium, 2% Elastà" },
      'camiseta-essence': { nom: 'Top drapejat Essence', descripcio: 'Disseny conscient i sofisticació minimalista. Aquest top destaca pel seu escot creuat i un drapejat elegant que afavoreix la silueta amb una caiguda molt fluida. Dissenyada de proximitat i amb residu zero.', teixit: '100% Cotó Orgànic Certificat de primera qualitat' },
      'camiseta-tailor': { nom: 'Brusa sastre Tailor', descripcio: 'Elegància i sofisticació minimalista per al teu dia a dia. Aquesta brusa destaca per les seves línies pures, un escot refinat i una caiguda fluida de màxima comoditat. Confeccionada a Barcelona sota criteris de disseny conscient i residu zero.', teixit: "100% Cotó Orgànic Premium" },
    },
    reviews: {
      eyebrow: 'EL QUE DIU LA COMUNITAT',
      title: 'OPINIONS REALS',
      items: [
        { nom: 'Laia Puigdomenech', lloc: 'Mataró', producte: 'Pantaló sastre Tailor', text: 'El provador virtual és una passada! Vaig poder veure exactament com em quedaria el pantaló Tailor abans de comprar. La talla que em van recomanar és perfecta. Mai havia tingut una experiència de compra online tan segura i sense sorpreses.' },
        { nom: 'Marta Espinosa', lloc: 'Barcelona', producte: 'Top drapejat Essence', text: 'La qualitat del cotó orgànic és molt millor del que esperava. Saber que la roba es fabrica a Barcelona amb residu zero fa que la compra tingui un significat diferent. El top és còmode i elegant alhora. Repetiré segur!' },
        { nom: 'Núria Calvet', lloc: 'Premià de Mar', producte: 'Brusa sastre Tailor', text: "Sempre tinc dubtes entre dues talles, però el recomanador de MiRA encerta a la primera. La brusa Tailor és preciosa en persona i la caiguda del teixit és exactament com apareix a l'emprovador 3D. Molt recomanable!" },
        { nom: 'Carla Valls', lloc: 'Girona', producte: 'Pantaló fluid Essence', text: "Molt contenta amb l'atenció al client. Vaig tenir un petit problema amb l'enviament i em van respondre molt ràpid per resoldre-ho. Es nota que és una marca que es preocupa per cuidar els detalls i a la clienta." },
      ],
    },
    collection: {
      newBadge: 'NOU', explorePiece: 'EXPLORAR PECA I PROVAR EN 3D', heroEyebrow: 'NOVA TEMPORADA · BARCELONA', heroTitle: 'EXPLORA LES LINIES', heroDescription: 'Dissenys atemporals de proximitat. Emprovador virtual en 3D. Talla exacta a la primera.',
      essenceEyebrow: 'COL·LECCIÓ CASUAL ESSENTIALS', essenceTitle: 'LÍNIA ESSENCE', essenceSubtitle: 'Comoditat i fluidesa per al teu dia a dia', essenceAlt: 'Mosaic Línia Essence',
      tailorEyebrow: 'ALTA SASTRERIA ESTRUCTURAL', tailorTitle: 'LÍNIA TAILOR', tailorSubtitle: 'Elegància clàssica i sastreria contemporània', tailorAlt: 'Mosaic Línia Tailor',
      piecesOf: 'PECES DE LA', heroAlt: 'Col·lecció MiRA, Essence i Tailor', back: 'TORNAR A LA COL·LECCIÓ', try3d: 'PROVAR EN EMPROVADOR 3D',
      officialSizeChart: 'Taula de mides oficial', recommenderTitle: "RECOMANADOR D'ALTA PRECISIÓ", recommendPrefix: 'Et recomanem la talla', recommendSuffix: 'per a aquesta peça.',
      modifyMeasures: 'Modificar mesures', missingMeasuresPrefix: 'Per calcular la teva talla necessitem:', enterMissingMeasures: 'Introduir les mesures que falten',
      configureMeasures: 'Configura les teves mesures al perfil per activar el recomanador.', selectSize: 'SELECCIONAR TALLA', addToCartLong: 'AFEGIR AL CARRETÓ DE COMPRA',
      whatsapp: 'CONSULTA RÀPIDA PER WHATSAPP', altWalking: 'Model MiRA caminant amb sastreria urbana', altCapsule: 'Armari càpsula MiRA amb peces seleccionades',
    },
    news: { eyebrow: 'Edició recent', title: 'Novetats de la Temporada', latest: 'ÚLTIMES INCORPORACIONS', description: 'Peces noves pensades per vestir amb intenció, moviment i una elegància serena.', empty: 'Aviat arribaran noves peces. Manten-te a prop de MiRA.' },
    sales: { eyebrow: 'Selecció conscient', title: 'Mid-Season Sales', description: "Una tria precisa de peces d'armari càpsula, amb descompte aplicat sense soroll i amb estoc limitat.", note: "Els preus especials s'apliquen automàticament al carretó. Sense codis, sense urgència artificial." },
    about: {
      medIdentitat: { subtitulo: 'IDENTITAT MEDITERRÀNIA', titulo: 'CREACIÓ DES DEL MARESME', texto: 'MiRA neix entre la llum clara del Maresme i el ritme pausat de la costa. Una firma de moda digital, local i conscient que dissenya peces per vestir amb seguretat, calma i presència, sense renunciar a la precisió tecnològica.' },
      medMissio: { subtitulo: 'MISSIÓ I VISIÓ', titulo: 'Comprar online amb la confiança d\'una peça feta per a tu.', p1: 'La nostra missió és eliminar el dubte de la talla i acostar la moda responsable a una experiència digital més humana, precisa i transparent.', p2: 'Aspirem a convertir MiRA en l\'e-commerce de referència per a una nova generació de consumidores: dones que busquen disseny local, tecnologia útil i un armari més petit, però millor pensat.' },
      medValors: { subtitulo: 'VALORS', titulo: 'Disseny que respira, tecnologia que acompanya.', v1_tit: 'INNOVACIÓ ACCESSIBLE', v1_txt: 'La realitat augmentada i els patrons 3D es posen al servei d\'una compra clara, intuïtiva i sense barreres.', v2_tit: 'TRANSPARÈNCIA', v2_txt: 'Materials, origen, preus i processos explicats amb honestedat perquè cada decisió tingui context.', v3_tit: 'SOSTENIBILITAT REAL', v3_txt: 'Producció local, lots limitats i residu zero per evitar sobreestoc i allargar el valor de cada peça.' },
      medInnovacio: { subtitulo: 'INNOVACIÓ DIGITAL', titulo: 'L\'emprovador AR com a nova forma de confiança.', texto: 'MiRA combina patrons digitals, recomanació de talla i realitat augmentada perquè puguis veure com s\'adapta cada peça abans de comprar. Una experiència tècnica, però dissenyada per sentir-se natural.' },
      medLookbook: { eyebrow: 'Lookbook MiRA', titulo: 'Explora la dualitat de la nostra col·lecció', btn: 'VEURE LA COL·LECCIÓ' },
      alts: { altBeach: 'Platja del Maresme, origen de MiRA', altLifestyle: 'Estil de vida MiRA al Maresme', altFabric: 'Textura de teixit MiRA', altModels: 'Dues models MiRA amb peces de la col·lecció', altCapsule: 'Armari càpsula i selecció conscient MiRA', altDesign: 'Disseny tècnic digital i patrons 3D MiRA', altLookbook: 'Lookbook MiRA amb dues models' },
      valors: [
        { tit: 'PROXIMITAT', desc: 'Disseny i producció local a Barcelona' },
        { tit: 'TECNOLOGIA', desc: 'Realitat augmentada aplicada al patronatge' },
        { tit: 'CONSCIÈNCIA', desc: 'Residu zero: producció per lots' },
        { tit: 'EXPERIÈNCIA', desc: 'Compra digital humana i precisa' },
      ],
      instagramText: 'SEGUEIX-NOS A @mira.maresme',
    },
    cart: { title: 'EL TEU CARRETÓ DE COMPRA', empty: 'El teu carretó està buit actualment.', summary: 'RESUM DE COMPRA', shippingCosts: "Despeses d'enviament", addForFreeShippingPrefix: 'Afegeix', addForFreeShippingSuffix: 'més per obtenir enviament gratuit!', freeShippingApplied: 'Enviament gratuit aplicat', continuePayment: 'CONTINUAR AL PAGAMENT', backToCart: 'TORNAR AL CARRETÓ', paymentData: 'DADES DE PAGAMENT', cardholder: 'TITULAR DE LA TARGETA', cardholderPlaceholder: 'Nom i cognoms del titular', cardNumber: 'NÚMERO DE TARGETA', expiry: "DATA D'EXPIRACIÓ", ssl: 'Les teves dades estan protegides amb xifratge SSL de 256 bits.', finalSummary: 'RESUM FINAL', confirmPay: 'CONFIRMAR I PAGAR', orderCode: 'Codi de Comanda', date: 'Data', purchasedProducts: 'Productes comprats', paidTotal: 'Total Pagat' },
    profile: { title: 'EL MEU PERFIL', tabData: 'Dades', tabRA: 'RA', tabLooks: 'Looks', tabFavorites: 'Preferits', tabOrders: 'Comandes', menuData: 'Les meves dades i mides', menuRA: 'Fotografies per a la RA', menuLooks: 'Els meus looks provats', menuFavorites: 'Els meus preferits', menuOrders: 'Les meves comandes', personalInfo: 'Informació Personal', fullName: 'Nom Complet', email: 'Correu Electrònic', phone: 'Número de Telèfon', address: "Direcció d'Enviament", myMeasures: 'Les teves mesures', height: 'Alçada (cm)', chest: 'Contorn de Pit (cm)', waist: 'Contorn de Cintura (cm)', hip: 'Contorn de Maluc (cm)', recommendedByPiece: 'TALLES RECOMANADES PER A CADA PEÇA', raFiles: 'Arxius per a Realitat Augmentada', previewRA: 'Preview RA', deleteSelectedPhoto: 'BORRAR FOTO SELECCIONADA', looksTitle: "Looks provats a l'emprovador 3D", emptyLooks: "Encara no has provat cap peça a l'emprovador virtual.", deleteLook: 'Eliminar look', favoritesTitle: 'Els meus preferits', emptyFavorites: 'Encara no has afegit cap peça als preferits.', viewPiece: 'VEURE PEÇA', ordersTitle: 'Historial de les meves comandes', emptyOrders: 'Encara no has realitzat cap comanda anteriorment a la nostra plataforma.', exploreCollection: 'EXPLORAR COL·LECCIÓ' },
    favoritesCart: { title: 'ELS TEUS PREFERITS', oneSaved: 'peca guardada', manySaved: 'peces guardades', deleteTitle: 'Eliminar de preferits' },
    virtualFitting: { system: 'SISTEMA INTERACTIU MIRA', title: 'EMPROVADOR 3D', selectedSize: 'TALLA SELECCIONADA', selected: 'seleccionada', recommendedForProfile: 'Recomanada per al teu perfil', close: 'TANCAR VISUALITZACIÓ', photoTitle: 'Fotografia necessària', photoText: "Per poder activar l'emprovador conceptual, primer cal una fotografia de referència corporal.", choosePhoto: 'Selecciona una fotografia del teu dispositiu' },
    quickMeasures: { title: 'Les meves mesures', savedInfo: 'Les mesures es guardaran al teu perfil i actualitzaran el recomanador automàticament.', missingPrefix: 'Per calcular la talla de', missingMiddle: 'necessitem:', heightPlaceholder: 'Ex: 168', chestPlaceholder: 'Ex: 90', waistPlaceholder: 'Ex: 70', hipPlaceholder: 'Ex: 96', save: 'GUARDAR MESURES' },
    sizeGuide: { title: 'TAULA DE MIDES OFICIALS', tshirtEssence: 'CAMISETA ESSENCE', trousersEssence: 'PANTALONS ESSENCE', tshirtTailor: 'CAMISETA TAILOR', trousersTailor: 'PANTALONS TAILOR', waist: 'Cintura (cm)', elasticWaist: 'Cintura elàstica (cm)', fixedWaist: 'Cintura fixa (cm)', chest: 'Pit (cm)', chestContour: 'Contorn de Pit (cm)', hip: 'Maluc (cm)', tailorNote: 'Sastreria de cintura fixa · Si estàs entre dues talles, agafa la més gran.', recommendedPrefix: 'La teva talla recomanada per a aquesta peça és la' },
    messages: { photoRASaved: 'Fotografia de RA guardada correctament al perfil.', photoSavedFitting: 'Fotografia guardada al perfil. Emprovador activat!', selectSizeBeforeAdd: "Si us plau, selecciona una talla abans d'afegir.", selectSize: 'Si us plau, selecciona una talla.', addedToCart: 'afegit al carretó.', addedToCartBang: 'afegit al carretó!', sizeLabel: 'Talla', removedFavorite: 'Eliminat de preferits.', addedFavorite: 'Afegit a la llista de preferits.', lookDeleted: 'Look eliminat de la teva galeria.', fillPayment: 'Si us plau, omple totes les dades de la targeta.', purchaseSuccess: 'Compra realitzada amb èxit! Codi:', photoDeletedRA: 'Fotografia eliminada de la Realitat Augmentada.', measuresSaved: 'Mesures guardades al perfil. Recomanador activat!' },
  },
  esp: {
    common: { brand: 'MiRA', cat: 'CAT', esp: 'ESP', size: 'Talla', total: 'TOTAL', free: 'Gratis', shipping: 'Envío', subtotal: 'Subtotal', remove: 'Eliminar', cancel: 'Cancelar', recommendedSize: 'Tu talla recomendada:', cart: 'CARRITO', composition: 'Composición:', viewCollection: 'Ver la colección', addToCart: 'AÑADIR AL CARRITO', exploreCollection: 'EXPLORAR COLECCIÓN', exploreProducts: 'EXPLORAR PRODUCTOS' },
    nav: { about: 'SOBRE MiRA', news: 'NOVEDADES', sales: 'MID-SEASON SALES', collection: 'COLECCIÓN', profile: 'MI PERFIL' },
    productes: {
      'pantalons-essence': { nom: 'Pantalón fluido Essence', descripcio: 'Pantalón de estilo urbano con corte wide leg y tejido fluido que se adapta perfectamente a tu movimiento. Confeccionado de forma sostenible en talleres locales. Una prenda cómoda, versátil y en tendencia para tu día a día.', teixit: '100% Algodón Orgánico Certificado' },
      'pantalons-tailor': { nom: 'Pantalón sastre Tailor', descripcio: 'Elegancia clásica y sastrería contemporánea. Este pantalón destaca por su corte estructurado de tiro alto que define la silueta con la máxima comodidad. Creado en Barcelona con materiales responsables y bajo criterios de residuo cero.', teixit: '98% Algodón Orgánico Premium, 2% Elastano' },
      'camiseta-essence': { nom: 'Top drapeado Essence', descripcio: 'Diseño consciente y sofisticación minimalista. Este top destaca por su escote cruzado y un drapeado elegante que favorece la silueta con una caída muy fluida. Diseñado de proximidad y con residuo cero.', teixit: '100% Algodón Orgánico Certificado de primera calidad' },
      'camiseta-tailor': { nom: 'Blusa sastre Tailor', descripcio: 'Elegancia y sofisticación minimalista para tu día a día. Esta blusa destaca por sus líneas puras, un escote refinado y una caída fluida de máxima comodidad. Confeccionada en Barcelona bajo criterios de diseño consciente y residuo cero.', teixit: '100% Algodón Orgánico Premium' },
    },
    reviews: { eyebrow: 'LO QUE DICE LA COMUNIDAD', title: 'OPINIONES REALES', items: [
      { nom: 'Laia Puigdomenech', lloc: 'Mataró', producte: 'Pantalón sastre Tailor', text: 'El probador virtual ¡es una pasada! Pude ver exactamente cómo me quedaría el pantalón Tailor antes de comprar. La talla que me recomendaron es perfecta. Nunca había tenido una experiencia de compra online tan segura y sin sorpresas.' },
      { nom: 'Marta Espinosa', lloc: 'Barcelona', producte: 'Top drapeado Essence', text: 'La calidad del algodón orgánico es mucho mejor de lo que esperaba. Saber que la ropa se fabrica en Barcelona con residuo cero hace que la compra tenga un significado distinto. El top es cómodo y elegante a la vez. ¡Repetiré seguro!' },
      { nom: 'Núria Calvet', lloc: 'Premià de Mar', producte: 'Blusa sastre Tailor', text: 'Siempre tengo dudas entre dos tallas, pero el recomendador de MiRA acierta a la primera. La blusa Tailor es preciosa en persona y la caída del tejido es exactamente como aparece en el probador 3D. ¡Muy recomendable!' },
      { nom: 'Carla Valls', lloc: 'Girona', producte: 'Pantalón fluido Essence', text: 'Muy contenta con la atención al cliente. Tuve un pequeño problema con el envío y me respondieron muy rápido para resolverlo. Se nota que es una marca que se preocupa por cuidar los detalles y a la clienta.' },
    ] },
    collection: { newBadge: 'NUEVO', explorePiece: 'EXPLORAR PRENDA Y PROBAR EN 3D', heroEyebrow: 'NUEVA TEMPORADA · BARCELONA', heroTitle: 'EXPLORA LAS LÍNEAS', heroDescription: 'Diseños atemporales de proximidad. Probador virtual en 3D. Talla exacta a la primera.', essenceEyebrow: 'COLECCIÓN CASUAL ESSENTIALS', essenceTitle: 'LÍNEA ESSENCE', essenceSubtitle: 'Comodidad y fluidez para tu día a día', essenceAlt: 'Mosaico Línea Tailor', tailorEyebrow: 'ALTA SASTRERÍA ESTRUCTURAL', tailorTitle: 'LÍNEA TAILOR', tailorSubtitle: 'Elegancia clásica y sastrería contemporánea', tailorAlt: 'Mosaico Línea Tailor', piecesOf: 'PRENDAS DE LA', heroAlt: 'Colección MiRA, Essence y Tailor', back: 'VOLVER A LA COLECCIÓN', try3d: 'PROBAR EN PROBADOR 3D', officialSizeChart: 'Tabla de tallas oficial', recommenderTitle: 'RECOMENDADOR DE ALTA PRECISIÓN', recommendPrefix: 'Te recomendamos la talla', recommendSuffix: 'para esta prenda.', modifyMeasures: 'Modificar medidas', missingMeasuresPrefix: 'Para calcular tu talla necesitamos:', enterMissingMeasures: 'Introducir las medidas que faltan', configureMeasures: 'Configura tus medidas en el perfil para activar el recomendador.', selectSize: 'SELECCIONAR TALLA', addToCartLong: 'AÑADIR AL CARRITO DE COMPRA', whatsapp: 'CONSULTA RÁPIDA POR WHATSAPP', altWalking: 'Modelo MiRA caminando con sastrería urbana', altCapsule: 'Armario cápsula MiRA con prendas seleccionadas' },
    news: { eyebrow: 'Edición reciente', title: 'Novedades de la Temporada', latest: 'ÚLTIMAS INCORPORACIONES', description: 'Prendas nuevas pensadas para vestir con intención, movimiento y una elegancia serena.', empty: 'Pronto llegarán nuevas prendas. Mantente cerca de MiRA.' },
    sales: { eyebrow: 'Selección consciente', title: 'Mid-Season Sales', description: 'Una selección precisa de prendas de armario cápsula, con descuento aplicado sin ruido y con stock limitado.', note: 'Los precios especiales se aplican automáticamente al carrito. Sin códigos, sin urgencia artificial.' },
    about: { medIdentitat: { subtitulo: 'IDENTIDAD MEDITERRÁNEA', titulo: 'BORN IN THE MARESME', texto: 'MiRA nace entre la luz clara del Maresme y el ritmo pausado de la costa. Una firma de moda digital, local y consciente que diseña prendas para vestir con seguridad, calma y presencia, sin renunciar a la precisión tecnológica.' }, medMissio: { subtitulo: 'MISIÓN Y VISIÓN', titulo: 'Comprar online con la confianza de una prenda hecha para ti.', p1: 'Nuestra misión es eliminar la duda de la talla y acercar la moda responsable a una experiencia digital más humana, precisa y transparente.', p2: 'Aspiramos a convertir MiRA en el e-commerce de referencia para una nueva generación de consumidoras: mujeres que buscan diseño local, tecnología útil y un armario más pequeño, pero mejor pensado.' }, medValors: { subtitulo: 'VALORES', titulo: 'Diseño que respira, tecnología que acompaña.', v1_tit: 'INNOVACIÓN ACCESIBLE', v1_txt: 'La realidad aumentada y los patrones 3D se ponen al servicio de una compra clara, intuitiva y sin barreras.', v2_tit: 'TRANSPARENCIA', v2_txt: 'Materiales, origen, precios y procesos explicados con honestidad para que cada decisión tenga contexto.', v3_tit: 'SOSTENIBILIDAD REAL', v3_txt: 'Producción local, lotes limitados y residuo cero para evitar sobrestock y alargar el valor de cada prenda.' }, medInnovacio: { subtitulo: 'INNOVACIÓN DIGITAL', titulo: 'El probador AR como nueva forma de confianza.', texto: 'MiRA combina patrones digitales, recomendación de talla y realidad aumentada para que puedas ver cómo se adapta cada prenda antes de comprar. Una experiencia técnica, pero diseñada para sentirse natural.' }, medLookbook: { eyebrow: 'Lookbook MiRA', titulo: 'Explora la dualidad de nuestra colección', btn: 'VER LA COLECCIÓN' }, alts: { altBeach: 'Playa del Maresme, origen de MiRA', altLifestyle: 'Estilo de vida MiRA en el Maresme', altFabric: 'Textura de tejido MiRA', altModels: 'Dos modelos MiRA con prendas de la colección', altCapsule: 'Armario cápsula y selección consciente MiRA', altDesign: 'Diseño técnico digital y patrones 3D MiRA', altLookbook: 'Lookbook MiRA con dos modelos' }, valors: [ { tit: 'PROXIMIDAD', desc: 'Diseño y producción local en el Maresme' }, { tit: 'TECNOLOGÍA', desc: 'Realidad aumentada aplicada al patronaje' }, { tit: 'CONCIENCIA', desc: 'Residuo cero: producción por lotes' }, { tit: 'EXPERIENCIA', desc: 'Compra digital humana y precisa' }, ], instagramText: 'SÍGUENOS EN @mira.maresme', },
    cart: { title: 'TU CARRITO DE COMPRA', empty: 'Tu carrito está vacío actualmente.', summary: 'RESUMEN DE COMPRA', shippingCosts: 'Gastos de envío', addForFreeShippingPrefix: 'Añade', addForFreeShippingSuffix: 'más para obtener envío gratis!', freeShippingApplied: 'Envío gratis aplicado', continuePayment: 'CONTINUAR AL PAGO', backToCart: 'VOLVER AL CARRITO', paymentData: 'DATOS DE PAGO', cardholder: 'TITULAR DE LA TARJETA', cardholderPlaceholder: 'Nombre y apellidos del titular', cardNumber: 'NÚMERO DE TARJETA', expiry: 'FECHA DE CADUCIDAD', ssl: 'Tus datos están protegidos con cifrado SSL de 256 bits.', finalSummary: 'RESUMEN FINAL', confirmPay: 'CONFIRMAR Y PAGAR', orderCode: 'Código de pedido', date: 'Fecha', purchasedProducts: 'Productos comprados', paidTotal: 'Total pagado' },
    profile: { title: 'MI PERFIL', tabData: 'Datos', tabRA: 'RA', tabLooks: 'Looks', tabFavorites: 'Favoritos', tabOrders: 'Pedidos', menuData: 'Mis datos y medidas', menuRA: 'Fotografías para la RA', menuLooks: 'Mis looks probados', menuFavorites: 'Mis favoritos', menuOrders: 'Mis pedidos', personalInfo: 'Información personal', fullName: 'Nombre completo', email: 'Correo electrónico', phone: 'Número de teléfono', address: 'Dirección de envío', myMeasures: 'Tus medidas', height: 'Altura (cm)', chest: 'Contorno de pecho (cm)', waist: 'Contorno de cintura (cm)', hip: 'Contorno de cadera (cm)', recommendedByPiece: 'TALLAS RECOMENDADAS PARA CADA PRENDA', raFiles: 'Archivos para Realidad Aumentada', previewRA: 'Vista previa RA', deleteSelectedPhoto: 'BORRAR FOTO SELECCIONADA', looksTitle: 'Looks probados en el probador 3D', emptyLooks: 'Aún no has probado ninguna prenda en el probador virtual.', deleteLook: 'Eliminar look', favoritesTitle: 'Mis favoritos', emptyFavorites: 'Aún no has añadido ninguna prenda a favoritos.', viewPiece: 'VER PRENDA', ordersTitle: 'Historial de mis pedidos', emptyOrders: 'Aún no has realizado ningún pedido anteriormente en nuestra plataforma.', exploreCollection: 'EXPLORAR COLECCIÓN' },
    favoritesCart: { title: 'TUS FAVORITOS', oneSaved: 'prenda guardada', manySaved: 'prendas guardadas', deleteTitle: 'Eliminar de favoritos' },
    virtualFitting: { system: 'SISTEMA INTERACTIVO MIRA', title: 'PROBADOR 3D', selectedSize: 'TALLA SELECCIONADA', selected: 'seleccionada', recommendedForProfile: 'Recomendada para tu perfil', close: 'CERRAR VISUALIZACIÓN', photoTitle: 'Fotografía necesaria', photoText: 'Para poder activar el probador conceptual, primero hace falta una fotografía de referencia corporal.', choosePhoto: 'Selecciona una fotografía de tu dispositivo' },
    quickMeasures: { title: 'Mis medidas', savedInfo: 'Las medidas se guardarán en tu perfil y actualizarán el recomendador automáticamente.', missingPrefix: 'Para calcular la talla de', missingMiddle: 'necesitamos:', heightPlaceholder: 'Ej: 168', chestPlaceholder: 'Ej: 90', waistPlaceholder: 'Ej: 70', hipPlaceholder: 'Ej: 96', save: 'GUARDAR MEDIDAS' },
    sizeGuide: { title: 'TABLA DE TALLAS OFICIAL', tshirtEssence: 'CAMISETA ESSENCE', trousersEssence: 'PANTALÓN ESSENCE', tshirtTailor: 'CAMISETA TAILOR', trousersTailor: 'PANTALÓN TAILOR', waist: 'Cintura (cm)', elasticWaist: 'Cintura elástica (cm)', fixedWaist: 'Cintura fija (cm)', chest: 'Pecho (cm)', chestContour: 'Contorno de pecho (cm)', hip: 'Cadera (cm)', tailorNote: 'Sastrería de cintura fija · Si estás entre dos tallas, elige la más grande.', recommendedPrefix: 'Tu talla recomendada para esta prenda es la' },
    messages: { photoRASaved: 'Fotografía de RA guardada correctamente en el perfil.', photoSavedFitting: 'Fotografía guardada en el perfil. ¡Probador activado!', selectSizeBeforeAdd: 'Por favor, selecciona una talla antes de añadir.', selectSize: 'Por favor, selecciona una talla.', addedToCart: 'añadido al carrito.', addedToCartBang: '¡añadido al carrito!', sizeLabel: 'Talla', removedFavorite: 'Eliminado de favoritos.', addedFavorite: 'Añadido a la lista de favoritos.', lookDeleted: 'Look eliminado de tu galería.', fillPayment: 'Por favor, completa todos los datos de la tarjeta.', purchaseSuccess: 'Compra realizada con éxito! Código:', photoDeletedRA: 'Fotografía eliminada de la Realidad Aumentada.', measuresSaved: 'Medidas guardadas en el perfil. ¡Recomendador activado!' },
  },
} as const;

type Lang = keyof typeof translations;
type ProducteId = keyof typeof translations.cat.productes;

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
    preu: 80.00,
    descripcio: "Pantaló d'estil urbà amb tall wide leg i teixit fluid que s'adapta perfectament al teu moviment. Confeccionat de manera sostenible en tallers locals. Una peça còmoda, versàtil i en tendència per al teu dia a dia.",
    imatges: [
      '/assets/pantalons_essence_1.jpg',
      '/assets/pantalons_essence_2.jpg',
      '/assets/pantalons_essence_3.jpg',
      '/assets/pantalons_essence_4.jpg'
    ],
    teixit: '100% Cotó Orgànic Certificat',
    model3d: '/assets/pantalons_essence.glb',
    isNou: false,
    isSales: false,
    descompte: 0
  },
  {
    id: 'pantalons-tailor',
    nom: 'Pantaló sastre Tailor',
    preu: 90.00,
    descripcio: 'Elegància clàssica i sastreria contemporània. Aquest pantaló destaca pel seu tall estructurat de tir alt que defineix la silueta amb la màxima comoditat. Creat a Barcelona amb materials responsables i sota criteris de residu zero.',
    imatges: [
      '/assets/pantalons_tailor_1.jpg',
      '/assets/pantalons_tailor_2.jpg',
      '/assets/pantalons_tailor_3.jpg',
      '/assets/pantalons_tailor_4.jpg'
    ],
    teixit: '98% Cotó Orgànic Premium, 2% Elastà',
    model3d: '/assets/pantalons_tailor.glb',
    isNou: true,
    isSales: false,
    descompte: 0
  },
  {
    id: 'camiseta-essence',
    nom: 'Top drapejat Essence',
    preu: 50.00,
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
    preu: 60.00,
    descripcio: 'Elegància i sofisticació minimalista per al teu dia a dia. Aquesta brusa destaca per les seves línies pures, un escot refinat i una caiguda fluida de màxima comoditat. Confeccionada a Barcelona sota criteris de disseny conscient i residu zero.',
    imatges: [
      '/assets/camiseta_tailor_1.png',
      '/assets/camiseta_tailor_2.jpg',
      '/assets/camiseta_tailor_3.png',
      '/assets/camiseta_tailor_4.jpg'
    ],
    teixit: '100% Cotó Orgànic Premium',
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
    valoracio: 4,
    producte: 'Top drapejat Essence',
    text: "La qualitat del cotó orgànic és molt millor del que esperava. Saber que la roba es fabrica a Barcelona amb residu zero fa que la compra tingui un significat diferent. El top és còmode i elegant alhora. Repetiré segur!"
  },
  {
    id: 3,
    nom: 'Núria Calvet',
    lloc: 'Premià de Mar',
    valoracio: 5,
    producte: 'Pantaló fluid Essence',
    text: "Sempre tinc dubtes entre dues talles, però el recomanador de MiRA encerta a la primera. La brusa Tailor és preciosa en persona i la caiguda del teixit és exactament com apareix a l'emprovador 3D. Molt recomanable!"
  },
  {
    id: 4,
    nom: 'Carla Valls',
    lloc: 'Girona',
    valoracio: 5,
    producte: 'Brusa sastre Tailor',
    text: "Molt contenta amb l'atenció al client. Vaig tenir un petit problema amb l'enviament i em van respondre molt ràpid per resoldre-ho. Es nota que és una marca que es preocupa per cuidar els detalls i a la clienta." 
  },
  {
    id: 5,
    nom: 'Marta Riera',
    lloc: 'Vilanova i la Geltrú',
    valoracio: 4,
    producte: 'Pantaló sastre Tailor',
    text: "El disseny sastre és molt elegant i es nota la qualitat del teixit local. L'emprovador 3D m'ha ajudat molt a decidir-me, encara que m'agradaria que hi hagués encara més varietat de colors disponibles en el futur."
  },
  {
    id: 6,
    nom: 'Laura Ferran',
    lloc: 'Manresa',
    valoracio: 4,
    producte: 'Top Drapejat Essence',
    text: "La tecnologia de l'emprovador 3D ha clavat la meva talla a la primera, cosa que em dona molta seguretat al comprar online. L'única pega és que vaig haver d'esperar un parell de dies més del previst, però la qualitat del cotó orgànic compensa l'espera."
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
function SeccioRessenyes({ isMobile, lang }: { isMobile: boolean; lang: Lang }) {
  const t = translations[lang];
  return (
    <section style={{ borderTop: '1px solid #eceae4', paddingTop: '60px', marginTop: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#444', fontWeight: 'bold' }}>{t.reviews.eyebrow}</span>
        <h2 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '22px' : '28px', fontWeight: '300', letterSpacing: '2px', margin: '8px 0 0 0', color: '#111' }}>
          {t.reviews.title}
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
function PreferitsCarret({ preferits, tallaRecomanadaPerProducte, onAfegir, onEliminarPreferit, isMobile, lang }: {
  preferits: typeof PRODUCTES;
  tallaRecomanadaPerProducte: (prodId: string) => string | null;
  onAfegir: (prod: typeof PRODUCTES[0], talla: string) => void;
  onEliminarPreferit: (prod: typeof PRODUCTES[0]) => void;
  isMobile: boolean;
  lang: Lang;
}) {
  const t = translations[lang];
  const productText = (prod: typeof PRODUCTES[0]) => t.productes[prod.id as ProducteId];
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
          {t.favoritesCart.title}
        </h2>
        <span style={{ fontSize: '12px', color: '#444', letterSpacing: '1px' }}>{preferits.length} {preferits.length === 1 ? t.favoritesCart.oneSaved : t.favoritesCart.manySaved}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px' }}>
        {preferits.map((prod) => {
          const tallaRec = tallaRecomanadaPerProducte(prod.id);
          const tallaActual = tallesSeleccionades[prod.id] || tallaRec || 'M';
          return (
            <div key={prod.id} style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: '20px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '70px', height: '90px', backgroundColor: '#f5f5f3', overflow: 'hidden', border: '1px solid #eceae4', flexShrink: 0 }}>
                <img src={prod.imatges[0]} alt={productText(prod).nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=' + productText(prod).nom }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ margin: '0 0 3px 0', fontSize: '14px', fontWeight: '400', letterSpacing: '0.5px', color: '#111' }}>{productText(prod).nom}</h4>
                <p style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: 'bold' }}>{prod.preu.toFixed(2)} €</p>
                {tallaRec && (
                  <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#2e7d32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={12} /> {t.common.recommendedSize} {tallaRec}
                  </p>
                )}
                <div style={{ marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', color: '#444', display: 'block', marginBottom: '6px', letterSpacing: '0.5px' }}>{t.common.size.toUpperCase()}</span>
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
                  {t.collection.addToCartLong}
                </button>
              </div>
              <button onClick={() => onEliminarPreferit(prod)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#555', flexShrink: 0, padding: '2px' }} title={t.favoritesCart.deleteTitle}>
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
  const [lang, setLang] = useState<Lang>('cat');
  const t = translations[lang];
  const productText = (prod: typeof PRODUCTES[0]) => t.productes[prod.id as ProducteId];
  const [menuMobilObert, setMenuMobilObert] = useState(false);

  const [seccioActiva, setSeccioActiva] = useState<'colleccio' | 'sobre-mira' | 'perfil' | 'carretó' | 'novetats' | 'mid-season'>('sobre-mira');
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
    pit: t.profile.chest, cintura: t.profile.waist, maluc: t.profile.hip,
  };

  const valors = [
    { Icon: MapPin, tit: t.about.valors[0].tit, desc: t.about.valors[0].desc },
    { Icon: Cpu, tit: t.about.valors[1].tit, desc: t.about.valors[1].desc },
    { Icon: Leaf, tit: t.about.valors[2].tit, desc: t.about.valors[2].desc },
    { Icon: UserCheck, tit: t.about.valors[3].tit, desc: t.about.valors[3].desc },
  ];

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
      reader.onload = (ev) => { setPerfil(prev => ({ ...prev, fotoRA: ev.target?.result as string })); setMissatgeWeb({ text: t.messages.photoRASaved, tipus: 'exit' }); };
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
        setMissatgeWeb({ text: t.messages.photoSavedFitting, tipus: 'exit' });
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
    if (!tallaSeleccionada) { setMissatgeWeb({ text: t.messages.selectSizeBeforeAdd, tipus: 'info' }); return; }
    setCarret(prev => {
      const ex = prev.find(i => i.producte.id === producteSeleccionat.id && i.talla === tallaSeleccionada);
      if (ex) return prev.map(i => i.producte.id === producteSeleccionat.id && i.talla === tallaSeleccionada ? { ...i, quantitat: i.quantitat + 1 } : i);
      return [...prev, { producte: producteSeleccionat, talla: tallaSeleccionada, quantitat: 1 }];
    });
    setMissatgeWeb({ text: `${productText(producteSeleccionat).nom} (${t.messages.sizeLabel} ${tallaSeleccionada}) ${t.messages.addedToCart}`, tipus: 'exit' });
  };

  const afegirAlCarretDesDeEmprovador = () => {
    if (!producteSeleccionat || !tallaSeleccionada) { setMissatgeWeb({ text: t.messages.selectSize, tipus: 'info' }); return; }
    setCarret(prev => {
      const ex = prev.find(i => i.producte.id === producteSeleccionat.id && i.talla === tallaSeleccionada);
      if (ex) return prev.map(i => i.producte.id === producteSeleccionat.id && i.talla === tallaSeleccionada ? { ...i, quantitat: i.quantitat + 1 } : i);
      return [...prev, { producte: producteSeleccionat, talla: tallaSeleccionada, quantitat: 1 }];
    });
    setEmprovadorObert(false);
    setMissatgeWeb({ text: `${productText(producteSeleccionat).nom} (${t.messages.sizeLabel} ${tallaSeleccionada}) ${t.messages.addedToCartBang}`, tipus: 'exit' });
  };

  const commutarPreferit = (prod: typeof PRODUCTES[0]) => {
    setPreferits(prev => prev.find(p => p.id === prod.id) ? prev.filter(p => p.id !== prod.id) : [...prev, prod]);
    setMissatgeWeb({ text: preferits.find(p => p.id === prod.id) ? t.messages.removedFavorite : t.messages.addedFavorite, tipus: 'exit' });
  };

  const handleDeleteLook = (lookId: string) => {
    setPerfil(prev => ({ ...prev, looksProvats: prev.looksProvats.filter(id => id !== lookId) }));
    setMissatgeWeb({ text: t.messages.lookDeleted, tipus: 'info' });
  };

  const subtotalOriginal = carret.reduce((sum, item) => sum + (item.producte.preu * item.quantitat), 0);
  const descompteCarret = carret.reduce((sum, item) => sum + ((item.producte.preu - preuSales(item.producte)) * item.quantitat), 0);
  const subtotalCarret = subtotalOriginal - descompteCarret;
  const costEnviament = subtotalCarret >= 60 || subtotalCarret === 0 ? 0 : 3.95;
  const totalGlobal = subtotalCarret + costEnviament;
  const faltaPerEnviamentGratis = subtotalCarret > 0 && subtotalCarret < 60 ? (60 - subtotalCarret) : 0;

  const NAV_ITEMS = [
    { label: t.nav.about,      key: 'sobre-mira' as const, acc: () => setSeccioActiva('sobre-mira') },
    { label: t.nav.news,       key: 'novetats' as const,   acc: () => setSeccioActiva('novetats') },
    { label: t.nav.sales,      key: 'mid-season' as const, acc: () => setSeccioActiva('mid-season') },
    { label: t.nav.collection, key: 'colleccio' as const,  acc: () => { setSeccioActiva('colleccio'); setProducteSeleccionat(null); } },
    { label: t.nav.profile,    key: 'perfil' as const,     acc: () => setSeccioActiva('perfil') },
  ];

  // ─── Targeta de producte reutilitzable ───────────────────────────────────
  const TarjetaProducte = ({ prod, mostrarPreuSales = false }: { prod: typeof PRODUCTES[0]; mostrarPreuSales?: boolean }) => {
    const preuFinal = mostrarPreuSales ? preuSales(prod) : prod.preu;
    const prodText = productText(prod);
    return (
      <div style={{ backgroundColor: '#ffffff', border: '1px solid #eae8e1', overflow: 'hidden', position: 'relative', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', alignItems: 'center' }}>
        {prod.isNou && !mostrarPreuSales && (
          <span style={{ position: 'absolute', top: '14px', right: '14px', backgroundColor: '#111', color: '#fff', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', padding: '4px 10px', zIndex: 10 }}>{t.collection.newBadge}</span>
        )}
        {prod.isSales && mostrarPreuSales && (
          <span style={{ position: 'absolute', top: '14px', right: '14px', backgroundColor: '#bd1c1c', color: '#fff', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', padding: '4px 10px', zIndex: 10 }}>
            -{Math.round(prod.descompte * 100)}%
          </span>
        )}

        <div onClick={() => { setProducteSeleccionat(prod); setImatgeActiva(0); setSeccioActiva('colleccio'); }}
          style={{ width: '100%', height: isMobile ? '300px' : '420px', backgroundColor: '#f5f5f3', overflow: 'hidden', cursor: 'pointer' }}>
          <img src={prod.imatges[0]} alt={prodText.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x420?text=' + prodText.nom }} />
        </div>

        <button onClick={(e) => { e.stopPropagation(); commutarPreferit(prod); }}
          style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: '#fff', border: 'none', width: '34px', height: '34px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
          <Heart size={16} fill={preferits.find(p => p.id === prod.id) ? '#111' : 'none'} color={preferits.find(p => p.id === prod.id) ? '#111' : '#888'} />
        </button>

        <div onClick={() => { setProducteSeleccionat(prod); setImatgeActiva(0); setSeccioActiva('colleccio'); }}
          style={{ padding: isMobile ? '22px' : '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box', cursor: 'pointer' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: isMobile ? '17px' : '20px', fontWeight: '400', letterSpacing: '1px', color: '#111' }}>{prodText.nom}</h3>
          <p style={{ margin: '0 0 16px 0', color: '#444', fontSize: '14px', lineHeight: '1.6' }}>{prodText.descripcio}</p>
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
          <span style={{ fontSize: '12px', letterSpacing: '2px', textDecoration: 'underline', fontWeight: 'bold', color: '#111' }}>{t.collection.explorePiece}</span>
        </div>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: '"Montserrat", "Inter", "Avenir Next", system-ui, sans-serif', color: '#111', backgroundColor: '#faf9f6', minHeight: '100vh', margin: 0, padding: 0, position: 'relative', colorScheme: 'light' } as React.CSSProperties}>

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
          <img src="/assets/logo.png" alt={t.common.brand} style={{ height: isMobile ? '32px' : '40px', width: 'auto', objectFit: 'contain' }}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <span style={{ fontSize: isMobile ? '22px' : '28px', fontWeight: 'bold', letterSpacing: '6px', fontFamily: '"Didot", serif' }}>{t.common.brand}</span>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', letterSpacing: '1px' }}>
            <button onClick={() => setLang('cat')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: lang === 'cat' ? 'bold' : 'normal', opacity: lang === 'cat' ? 1 : 0.5 }}>
              {t.common.cat}
            </button>
            <span>|</span>
            <button onClick={() => setLang('esp')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontWeight: lang === 'esp' ? 'bold' : 'normal', opacity: lang === 'esp' ? 1 : 0.5 }}>
              {t.common.esp}
            </button>
          </div>
          <div onClick={() => { setSeccioActiva('carretó'); setPasCheckout('carret'); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', letterSpacing: '1px', borderBottom: seccioActiva === 'carretó' ? '1px solid #111' : 'none', paddingBottom: '4px' }}>
            <ShoppingBag size={18} />
            {!isMobile && <span>{t.common.cart} ({carret.reduce((a, b) => a + b.quantitat, 0)})</span>}
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
            etiqueta: t.collection.essenceEyebrow,
            titol: t.collection.essenceTitle,
            subtitol: t.collection.essenceSubtitle,
            mosaicImg: '/assets/linia_essence.png',
            mosaicAlt: t.collection.essenceAlt,
            productes: PRODUCTES.filter(p => p.id.includes('essence')),
          },
          {
            key: 'tailor',
            etiqueta: t.collection.tailorEyebrow,
            titol: t.collection.tailorTitle,
            subtitol: t.collection.tailorSubtitle,
            mosaicImg: '/assets/linia_tailor.png',
            mosaicAlt: t.collection.tailorAlt,
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
                alt={t.collection.heroAlt}
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
                }}>{t.collection.heroEyebrow}</span>
                <h1 style={{
                  fontFamily: '"Didot", "Playfair Display", serif',
                  fontSize: isMobile ? '32px' : '58px',
                  fontWeight: '300',
                  letterSpacing: isMobile ? '3px' : '6px',
                  margin: '0 0 14px 0',
                  color: '#ffffff',
                  lineHeight: 1.1,
                }}>{t.collection.heroTitle}</h1>
                <p style={{
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: isMobile ? '13px' : '15px',
                  lineHeight: '1.7',
                  letterSpacing: '0.5px',
                  maxWidth: '560px',
                  margin: 0,
                }}>
                  {t.collection.heroDescription}
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
                      {t.collection.piecesOf} {linia.titol.split(' ')[1].toUpperCase()}
                    </span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#eceae4' }} />
                  </div>

                  {/* Grid de productes */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {linia.productes.map(prod => <TarjetaProducte key={prod.id} prod={prod} mostrarPreuSales={prod.isSales} />)}
                  </div>

                </div>
              ))}

              {/* Ressenyes al final */}
              <SeccioRessenyes isMobile={isMobile} lang={lang} />
            </div>
          </main>
        );
      })()}

      {/* ═══ SECCIÓ A2: NOVETATS ═══ */}
      {seccioActiva === 'novetats' && (
        <main style={{ padding: isMobile ? '0 16px 40px' : '0 40px 70px', backgroundColor: '#FBF9F6' }}>
          <section style={{ width: 'calc(100% + ' + (isMobile ? '32px' : '80px') + ')', marginLeft: isMobile ? '-16px' : '-40px', marginRight: isMobile ? '-16px' : '-40px', marginBottom: isMobile ? '34px' : '56px', position: 'relative', overflow: 'hidden' }}>
            <img src="/assets/modelo_caminant.png" alt={t.collection.altWalking} style={{ width: '100%', height: isMobile ? '360px' : '520px', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(17,17,17,0.58), rgba(17,17,17,0.18) 45%, rgba(251,249,246,0.12))' }} />
            <div style={{ position: 'absolute', left: isMobile ? '24px' : '64px', bottom: isMobile ? '34px' : '62px', maxWidth: isMobile ? '78%' : '520px', color: '#fff' }}>
              <span style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>{t.news.eyebrow}</span>
              <h1 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '34px' : '58px', lineHeight: '1', fontWeight: '300', letterSpacing: '2px', margin: 0, color: '#fff' }}>{t.news.title}</h1>
            </div>
          </section>

          <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px', borderBottom: '1px solid #e5ded2', paddingBottom: '24px' }}>
              <Sparkles size={20} />
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '3px', color: '#6d6256', fontWeight: 'bold', display: 'block' }}>{t.news.latest}</span>
                <p style={{ fontSize: isMobile ? '13px' : '14px', color: '#5f574f', margin: '6px 0 0 0', lineHeight: '1.7' }}>{t.news.description}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {PRODUCTES.filter(p => p.isNou).map(prod => (
                <TarjetaProducte key={prod.id} prod={prod} />
              ))}
            </div>
            {PRODUCTES.filter(p => p.isNou).length === 0 && (
              <p style={{ textAlign: 'center', color: '#555', padding: '60px 0', fontSize: '15px' }}>{t.news.empty}</p>
            )}
          </div>
        </main>
      )}

      {/* ═══ SECCIÓ A3: MID-SEASON SALES ═══ */}
      {seccioActiva === 'mid-season' && (
        <main style={{ padding: isMobile ? '0 16px 44px' : '0 40px 72px', backgroundColor: '#FBF9F6' }}>
          <section style={{ width: 'calc(100% + ' + (isMobile ? '32px' : '80px') + ')', marginLeft: isMobile ? '-16px' : '-40px', marginRight: isMobile ? '-16px' : '-40px', marginBottom: isMobile ? '34px' : '56px', position: 'relative', overflow: 'hidden' }}>
            <img src="/assets/colleccio.png" alt={t.collection.altCapsule} style={{ width: '100%', height: isMobile ? '360px' : '500px', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(251,249,246,0.92), rgba(251,249,246,0.62) 42%, rgba(17,17,17,0.18))' }} />
            <div style={{ position: 'absolute', left: isMobile ? '24px' : '64px', bottom: isMobile ? '34px' : '58px', maxWidth: isMobile ? '82%' : '500px' }}>
              <span style={{ fontSize: '11px', letterSpacing: '4px', color: '#6d6256', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>{t.sales.eyebrow}</span>
              <h1 style={{ fontFamily: '"Didot", serif', fontSize: isMobile ? '34px' : '56px', lineHeight: '1', fontWeight: '300', margin: '0 0 14px 0', letterSpacing: '2px', color: '#111' }}>{t.sales.title}</h1>
              <p style={{ fontSize: isMobile ? '13px' : '15px', color: '#4b433d', margin: 0, lineHeight: '1.8' }}>{t.sales.description}</p>
            </div>
          </section>

          <div style={{ maxWidth: '1040px', margin: '0 auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {PRODUCTES.filter(p => p.isSales).map(prod => (
                <TarjetaProducte key={prod.id} prod={prod} mostrarPreuSales />
              ))}
            </div>
            <div style={{ marginTop: '40px', padding: '18px 22px', backgroundColor: '#fff', border: '1px solid #e5ded2', borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#4b433d' }}>
              <Tag size={16} />
              <span>Els preus especials s'apliquen automàticament al carretó. Sense codis, sense urgència artificial.</span>
            </div>
          </div>
        </main>
      )}

      {/* ═══ SECCIÓ B: FITXA DE PRODUCTE ═══ */}
      {seccioActiva === 'colleccio' && producteSeleccionat && (
        <main style={{ maxWidth: '1200px', margin: '40px auto', padding: isMobile ? '0 16px' : '0 30px' }}>
          <button onClick={() => setProducteSeleccionat(null)} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', marginBottom: '30px', color: '#444', letterSpacing: '1px' }}>
            <ArrowLeft size={14} /> {t.collection.back}
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? '30px' : '60px', alignItems: 'start' }}>
            <div>
              <div style={{ width: '100%', height: isMobile ? '360px' : '620px', backgroundColor: '#f5f5f3', overflow: 'hidden', marginBottom: '20px', position: 'relative', border: '1px solid #eae8e1' }}>
                <img src={producteSeleccionat.imatges[imatgeActiva]} alt={productText(producteSeleccionat).nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x700?text=' + productText(producteSeleccionat).nom }} />
                <button onClick={anteriorImatge} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
                <button onClick={seguentImatge} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.8)', border: 'none', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><ChevronRight size={20} /></button>
                <button onClick={intentarObrirEmprovador} style={{ position: 'absolute', bottom: '15px', right: '15px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#111111', color: '#ffffff', border: 'none', padding: isMobile ? '11px 14px' : '14px 24px', fontWeight: 'bold', cursor: 'pointer', fontSize: isMobile ? '11px' : '13px', letterSpacing: '1px' }}>
                  <Maximize2 size={14} /> {t.collection.try3d}
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
                <h1 style={{ fontSize: isMobile ? '26px' : '36px', margin: '0 0 10px 0', fontWeight: '300', letterSpacing: '2px', fontFamily: '"Didot", serif', color: '#111' }}>{productText(producteSeleccionat).nom}</h1>
                <button onClick={() => commutarPreferit(producteSeleccionat)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}>
                  <Heart size={24} fill={preferits.find(p => p.id === producteSeleccionat.id) ? '#111' : 'none'} color={preferits.find(p => p.id === producteSeleccionat.id) ? '#111' : '#444'} />
                </button>
              </div>
              <p style={{ fontSize: '22px', fontWeight: '400', margin: '0 0 30px 0', color: '#444' }}>{producteSeleccionat.preu.toFixed(2)} €</p>

              <div style={{ borderTop: '1px solid #eae8e1', borderBottom: '1px solid #eae8e1', padding: '25px 0', marginBottom: '30px' }}>
                <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '14px', lineHeight: '1.8' }}>{productText(producteSeleccionat).descripcio}</p>
                <p style={{ margin: 0, fontSize: '13px', color: '#444' }}><strong>{t.common.composition}</strong> {productText(producteSeleccionat).teixit}</p>
              </div>

              {/* RECOMANADOR */}
              <div style={{ backgroundColor: '#f4f3ee', padding: '20px', marginBottom: '30px', border: '1px solid #eae8e1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px' }}>{t.collection.recommenderTitle}</span>
                  <span onClick={() => setGuiaMidesOberta(true)} style={{ fontSize: '12px', color: '#111', textDecoration: 'underline', cursor: 'pointer' }}>{t.collection.officialSizeChart}</span>
                </div>
                {tallaRecomanada ? (
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#2e7d32', fontSize: '14px', marginBottom: '6px' }}>
                      <Check size={18} /><span>{t.collection.recommendPrefix} <strong>{tallaRecomanada}</strong> {t.collection.recommendSuffix}</span>
                    </div>
                    <button onClick={() => { setMesuresTemp({ alcada: perfil.alcada, pit: perfil.pit, cintura: perfil.cintura, maluc: perfil.maluc }); setMesuresRapidesObertes(true); }}
                      style={{ background: 'none', border: 'none', padding: 0, fontSize: '12px', color: '#444', textDecoration: 'underline', cursor: 'pointer' }}>
                      {t.collection.modifyMeasures}
                    </button>
                  </div>
                ) : campsFaltants.length > 0 ? (
                  <div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#444' }}>
                      {t.collection.missingMeasuresPrefix} <strong>{campsFaltants.map(c => LABELS_CAMP[c]).join(' i ')}</strong>.
                    </p>
                    <button onClick={() => { setMesuresTemp({ alcada: perfil.alcada, pit: perfil.pit, cintura: perfil.cintura, maluc: perfil.maluc }); setMesuresRapidesObertes(true); }}
                      style={{ background: 'none', border: 'none', padding: 0, fontSize: '13px', color: '#111', fontWeight: 'bold', textDecoration: 'underline', cursor: 'pointer' }}>
                      {t.collection.enterMissingMeasures}
                    </button>
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: '13px', color: '#444' }}>{t.collection.configureMeasures}</p>
                )}
              </div>

              {/* TALLA */}
              <div style={{ marginBottom: '35px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', letterSpacing: '1.5px', display: 'block', marginBottom: '15px' }}>{t.collection.selectSize}</span>
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
                  {t.collection.addToCartLong}
                </button>
                <button onClick={() => window.open('https://wa.me/34600000000', '_blank')} style={{ width: '100%', backgroundColor: '#25D366', color: '#fff', border: 'none', padding: '18px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <MessageCircle size={18} /> {t.collection.whatsapp}
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ═══ SECCIÓ C: SOBRE MiRA ═══ */}
      {seccioActiva === 'sobre-mira' && (
        <main style={{ backgroundColor: '#FBF9F6', padding: isMobile ? '34px 16px 54px' : '58px 40px 82px', fontFamily: '"Montserrat", "Inter", "Avenir Next", system-ui, sans-serif' }}>
          <section style={{ maxWidth: '1180px', margin: '0 auto 92px', backgroundColor: '#FBF9F6', borderRadius: '2rem', padding: isMobile ? '0' : '28px' }}>
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              gap: isMobile ? '28px' : '2rem',
            }}>
              <div style={{ flex: '1', width: isMobile ? '100%' : 'auto', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: '1rem', backgroundColor: '#eee5d9', boxShadow: isMobile ? 'none' : '0 20px 55px rgba(70,55,38,0.10)' }}>
                <img src="/platja_maresme.png" alt={t.about.alts.altBeach} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/assets/platja_maresme.png'; }} />
              </div>

              <div style={{
                flex: '1',
                width: isMobile ? '100%' : 'auto',
                aspectRatio: isMobile ? 'auto' : '1 / 1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: isMobile ? 'center' : 'flex-start',
                padding: isMobile ? '2px 4px' : '0',
                textAlign: isMobile ? 'center' : 'left',
                color: '#111',
              }}>
                <span style={{ display: 'block', fontSize: '10px', letterSpacing: '5px', color: '#8a7665', textTransform: 'uppercase', marginBottom: isMobile ? '16px' : '18px', fontFamily: '"Montserrat", "Inter", "Avenir Next", system-ui, sans-serif', fontWeight: 700 }}>{t.about.medIdentitat.subtitulo}</span>
                <h1 style={{ fontFamily: '"Playfair Display", "Cinzel Decorative", "Didot", "Bodoni 72", Georgia, serif', fontSize: isMobile ? '39px' : '50px', lineHeight: '0.98', fontWeight: '400', letterSpacing: isMobile ? '4px' : '6px', color: '#111', margin: 0, textTransform: 'uppercase' }}>{t.about.medIdentitat.titulo}</h1>
                <p style={{ margin: isMobile ? '22px auto 0' : '26px 0 0', maxWidth: isMobile ? '520px' : '330px', fontSize: isMobile ? '14px' : '14px', lineHeight: '1.82', color: '#4b433d', letterSpacing: '0.25px', fontWeight: 300, fontFamily: '"Montserrat", "Inter", "Avenir Next", system-ui, sans-serif' }}>
                  {t.about.medIdentitat.texto}
                </p>
              </div>

              <div style={{ flex: '1', width: isMobile ? '100%' : 'auto', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: '1rem', backgroundColor: '#d8cec2', boxShadow: isMobile ? 'none' : '0 20px 55px rgba(70,55,38,0.10)' }}>
                <video src="/mar.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  onError={(e) => { (e.currentTarget as HTMLVideoElement).src = '/assets/mar.mp4'; }} />
              </div>
            </div>
          </section>

          {/* VALORS (moved below to sit above Instagram) */}
          <section style={{ maxWidth: '1120px', margin: '0 auto 72px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.05fr 0.95fr', gap: isMobile ? '24px' : '36px', alignItems: 'stretch' }}>
              <div style={{ backgroundColor: '#fff', border: '1px solid #e8dfd4', borderRadius: '28px', padding: isMobile ? '30px 24px' : '48px 46px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', letterSpacing: '4px', color: '#8a7665', fontWeight: 'bold', display: 'block', marginBottom: '12px' }}>{t.about.medMissio.subtitulo}</span>
                <h2 style={{ fontFamily: '"Playfair Display", "Cinzel Decorative", "Didot", "Bodoni 72", Georgia, serif', fontSize: isMobile ? '28px' : '42px', lineHeight: '1.08', fontWeight: '400', letterSpacing: '0.6px', color: '#111', margin: '0 0 24px 0' }}>{t.about.medMissio.titulo}</h2>
                <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#4b433d', margin: '0 0 18px 0' }}>
                  {t.about.medMissio.p1}
                </p>
                <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#4b433d', margin: 0 }}>
                  {t.about.medMissio.p2}
                </p>
              </div>
              <div style={{ overflow: 'hidden', borderRadius: '28px', minHeight: isMobile ? '360px' : '520px' }}>
                <img src="/assets/balco_maremse.png" alt={t.about.alts.altLifestyle} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            </div>
          </section>

          <section style={{ maxWidth: '1120px', margin: '0 auto 78px', position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '0.7fr 1.3fr', gridTemplateRows: isMobile ? 'auto' : '190px 390px', gap: isMobile ? '18px' : '22px', alignItems: 'stretch' }}>
              <div style={{ overflow: 'hidden', borderRadius: '26px', minHeight: isMobile ? '220px' : '190px', alignSelf: 'stretch' }}>
                <img src="/assets/tela.png" alt={t.about.alts.altFabric} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div style={{ overflow: 'hidden', borderRadius: '30px', minHeight: isMobile ? '420px' : '100%', gridRow: isMobile ? 'auto' : '1 / span 2', gridColumn: isMobile ? 'auto' : '2' }}>
                <img src="/assets/esencia.png" alt={t.about.alts.altModels} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: isMobile ? 'center' : 'center 42%', display: 'block' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div style={{ overflow: 'hidden', borderRadius: '26px', minHeight: isMobile ? '240px' : '390px' }}>
                <img src="/assets/realitat_augmentada.png" alt={t.about.alts.altCapsule} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', border: '1px solid #e8dfd4', borderRadius: '30px', padding: isMobile ? '34px 26px' : '56px 56px', width: isMobile ? 'auto' : '52%', margin: isMobile ? '20px 0 0' : '-255px 0 0 34%', position: 'relative', zIndex: 3, boxShadow: isMobile ? 'none' : '0 28px 70px rgba(78,62,47,0.12)' }}>
              <span style={{ fontSize: '11px', letterSpacing: '3.6px', color: '#8a7665', fontWeight: 700, display: 'block', marginBottom: '14px', fontFamily: 'Montserrat, Inter, system-ui' }}>{t.about.medValors.subtitulo}</span>
              <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: isMobile ? '30px' : '44px', lineHeight: '1.02', fontWeight: 400, letterSpacing: '0.6px', margin: '0 0 26px 0', color: '#111' }}>{t.about.medValors.titulo}</h2>
              <div style={{ display: 'grid', gap: '18px' }}>
                {[
                  { v: t.about.medValors.v1_tit, d: t.about.medValors.v1_txt },
                  { v: t.about.medValors.v2_tit, d: t.about.medValors.v2_txt },
                  { v: t.about.medValors.v3_tit, d: t.about.medValors.v3_txt },
                ].map(({ v, d }) => (
                  <div key={v} style={{ borderTop: '1px solid #f0ebe6', paddingTop: '18px' }}>
                    <p style={{ margin: '0 0 8px 0', fontWeight: 800, fontSize: '13px', letterSpacing: '1.6px', color: '#111', textTransform: 'uppercase', fontFamily: 'Montserrat, Inter, system-ui' }}>{v}</p>
                    <p style={{ margin: 0, fontSize: '15px', color: '#6b5f56', lineHeight: '1.85', fontFamily: 'Montserrat, Inter, system-ui' }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section style={{ maxWidth: '1120px', margin: '0 auto 72px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '0', alignItems: 'stretch' }}>
              <div style={{ backgroundColor: '#111', color: '#fff', borderRadius: isMobile ? '28px' : '28px 0 0 28px', padding: isMobile ? '32px 24px' : '54px 50px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', letterSpacing: '4px', color: '#c9b9a8', fontWeight: 'bold', display: 'block', marginBottom: '12px' }}>{t.about.medInnovacio.subtitulo}</span>
                <h2 style={{ fontFamily: '"Playfair Display", "Cinzel Decorative", "Didot", "Bodoni 72", Georgia, serif', fontSize: isMobile ? '28px' : '42px', lineHeight: '1.08', fontWeight: '400', letterSpacing: '0.6px', margin: '0 0 24px 0', color: '#fff' }}>{t.about.medInnovacio.titulo}</h2>
                <p style={{ fontSize: '14px', lineHeight: '1.9', color: '#ddd4cb', margin: 0 }}>
                  {t.about.medInnovacio.texto}
                </p>
              </div>
              <div style={{ overflow: 'hidden', borderRadius: isMobile ? '28px' : '0 28px 28px 0', minHeight: isMobile ? '340px' : '500px' }}>
                <img src="/assets/disseny.png" alt={t.about.alts.altDesign} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
            </div>
          </section>

          <section style={{ maxWidth: '1120px', margin: '0 auto 64px', position: 'relative', overflow: 'hidden', borderRadius: '32px', minHeight: isMobile ? '420px' : '520px' }}>
            <img src="/assets/image_081884.jpg" alt={t.about.alts.altLookbook} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
              onError={(e) => { (e.target as HTMLImageElement).src = '/assets/esencia.png'; }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(17,17,17,0.66), rgba(17,17,17,0.24) 52%, rgba(251,249,246,0.10))' }} />
            <div style={{ position: 'relative', zIndex: 1, minHeight: isMobile ? '420px' : '520px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-start', padding: isMobile ? '34px 24px' : '54px 60px', color: '#fff' }}>
              <span style={{ fontSize: '11px', letterSpacing: '4px', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>{t.about.medLookbook.eyebrow}</span>
              <h2 style={{ fontFamily: '"Playfair Display", "Cinzel Decorative", "Didot", "Bodoni 72", Georgia, serif', fontSize: isMobile ? '34px' : '56px', lineHeight: '1.04', fontWeight: '400', letterSpacing: '0.8px', maxWidth: '680px', margin: '0 0 26px 0', color: '#fff' }}>{t.about.medLookbook.titulo}</h2>
              <button onClick={() => setSeccioActiva('colleccio')} style={{ backgroundColor: '#fff', color: '#111', border: 'none', borderRadius: '999px', padding: isMobile ? '14px 24px' : '16px 34px', fontSize: '12px', letterSpacing: '2px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' }}>
                {t.about.medLookbook.btn}
              </button>
            </div>
          </section>

          {/* ─── SECCIÓ DE VALORS (Re-disseny: minimal, molt espai) ─── */}
          <section style={{ maxWidth: '1180px', margin: '0 auto 64px', backgroundColor: '#FBF9F6', borderRadius: '10px', padding: isMobile ? '40px 20px' : '80px 96px', paddingBottom: '24px' }}>
            <div style={{ display: 'flex', gap: isMobile ? '20px' : '56px', justifyContent: 'space-between', alignItems: 'stretch' }}>
              {valors.map(({ Icon, tit, desc }, i) => (
                <div key={i} style={{ flex: '1 1 0', padding: isMobile ? '20px' : '36px', textAlign: 'center', fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', color: '#111' }}>
                  <div style={{ width: isMobile ? '68px' : '84px', height: isMobile ? '68px' : '84px', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '999px', backgroundColor: 'rgba(0,0,0,0.03)' }}>
                    <Icon size={isMobile ? 34 : 44} strokeWidth={1.1} />
                  </div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: isMobile ? '13px' : '14px', letterSpacing: '1.6px', textTransform: 'uppercase', fontFamily: 'Montserrat, Inter, system-ui' }}>{tit}</p>
                  <p style={{ margin: '12px 0 0 0', fontSize: '14px', color: '#6b5f56', lineHeight: '1.78', maxWidth: '320px', marginLeft: 'auto', marginRight: 'auto' }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── SECCIÓ D'INSTAGRAM (senzilla i elegant) ─── */}
          <section style={{ maxWidth: '1180px', margin: '0 auto 64px', backgroundColor: '#FBF9F6', borderRadius: '12px', padding: isMobile ? '30px 20px' : '48px 96px', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? '18px' : '24px' }}>
              <p style={{ margin: 0, fontSize: isMobile ? '13px' : '15px', letterSpacing: '1.6px', fontWeight: 800, textTransform: 'uppercase', color: '#8a7665', fontFamily: 'Montserrat, Inter, system-ui' }}>{t.about.instagramText}</p>
              <a href="https://www.instagram.com/mira.maresme" target="_blank" rel="noreferrer" aria-label="Instagram mira.maresme" style={{ display: 'inline-flex', marginTop: '6px', color: '#111', textDecoration: 'none', opacity: 1, width: isMobile ? '56px' : '64px', height: isMobile ? '56px' : '64px', alignItems: 'center', justifyContent: 'center', borderRadius: '999px', backgroundColor: '#fff', boxShadow: '0 8px 30px rgba(17,17,17,0.06)', border: '1px solid rgba(17,17,17,0.04)', transition: 'transform 160ms ease, box-shadow 160ms ease' }}>
                <svg width={isMobile ? 28 : 32} height={isMobile ? 28 : 32} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <rect x="3" y="3" width="18" height="18" rx="5" stroke="#111" strokeWidth="1.2" fill="none" />
                  <circle cx="12" cy="12" r="3.6" stroke="#111" strokeWidth="1.2" fill="none" />
                  <circle cx="17.4" cy="6.6" r="0.7" fill="#111" />
                </svg>
              </a>
            </div>
          </section>

          <SeccioRessenyes isMobile={isMobile} lang={lang} />
        </main>
      )}

      {/* ═══ SECCIÓ D: PERFIL ═══ */}
      {seccioActiva === 'perfil' && (
        <main style={{ maxWidth: '1100px', margin: '40px auto', padding: isMobile ? '0 16px' : '0 30px' }}>
          <h1 style={{ fontSize: isMobile ? '24px' : '34px', fontWeight: '300', letterSpacing: '3px', marginBottom: '30px', fontFamily: '"Didot", serif', color: '#111' }}>{t.profile.title}</h1>

          {isMobile ? (
            <>
              <div style={{ display: 'flex', overflowX: 'auto', gap: '0', borderBottom: '2px solid #eae8e1', marginBottom: '24px', WebkitOverflowScrolling: 'touch' }}>
                {([
                  { key: 'dades',    icon: <User size={14} />,     label: t.profile.tabData },
                  { key: 'ra',       icon: <ImageIcon size={14} />, label: t.profile.tabRA },
                  { key: 'looks',    icon: <Sliders size={14} />,   label: t.profile.tabLooks },
                  { key: 'preferits',icon: <Heart size={14} />,     label: `${t.profile.tabFavorites}${preferits.length > 0 ? ` (${preferits.length})` : ''}` },
                  { key: 'compres',  icon: <Package size={14} />,   label: t.profile.tabOrders },
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
                  { key: 'dades',     icon: <User size={16} />,     label: t.profile.menuData },
                  { key: 'ra',        icon: <ImageIcon size={16} />, label: t.profile.menuRA },
                  { key: 'looks',     icon: <Sliders size={16} />,   label: t.profile.menuLooks },
                  { key: 'preferits', icon: <Heart size={16} />,     label: `${t.profile.menuFavorites}${preferits.length > 0 ? ` (${preferits.length})` : ''}` },
                  { key: 'compres',   icon: <Package size={16} />,   label: t.profile.menuOrders },
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
      {seccioActiva === 'carretó' && (
        <main style={{ maxWidth: '900px', margin: '40px auto', padding: isMobile ? '0 16px' : '0 30px' }}>
          <h1 style={{ fontSize: isMobile ? '24px' : '34px', fontWeight: '300', letterSpacing: '3px', marginBottom: '40px', fontFamily: '"Didot", serif', textAlign: 'center', color: '#111' }}>{t.cart.title}</h1>

          {carret.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', border: '1px solid #eae8e1', backgroundColor: '#fff' }}>
              <ShoppingBag size={40} style={{ marginBottom: '15px', strokeWidth: 1, color: '#444' }} />
              <p style={{ color: '#444', fontSize: '15px', marginBottom: '25px' }}>{t.cart.empty}</p>
              <button onClick={() => setSeccioActiva('colleccio')} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '13px', letterSpacing: '1px', cursor: 'pointer' }}>{t.common.exploreProducts}</button>
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
                        <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#444' }}>{t.common.size}: <strong>{item.talla}</strong></p>
                        {tallaRecItem && (
                          <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#2e7d32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Check size={11} /> {t.common.recommendedSize} {tallaRecItem}
                          </p>
                        )}
                        <p style={{ margin: 0, fontSize: '13px', color: '#111' }}>{item.quantitat} x {preuSales(item.producte).toFixed(2)} €</p>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '15px' }}>{(preuSales(item.producte) * item.quantitat).toFixed(2)} €</p>
                        <button onClick={() => setCarret(prev => { const it = prev[index]; if (it.quantitat > 1) return prev.map((x, i) => i === index ? { ...x, quantitat: x.quantitat - 1 } : x); return prev.filter((_, i) => i !== index); })}
                          style={{ background: 'none', border: 'none', color: '#bd1c1c', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline', padding: 0 }}>
                          {t.common.remove}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: isMobile ? '20px' : '30px' }}>
                <h3 style={{ fontFamily: '"Didot", serif', fontSize: '20px', margin: '0 0 20px 0', fontWeight: '300', borderBottom: '1px solid #eceae4', paddingBottom: '15px', color: '#111' }}>{t.cart.summary}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px', color: '#444' }}><span>{t.common.subtotal}</span><span>{subtotalOriginal.toFixed(2)} €</span></div>
                {descompteCarret > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '12px', color: '#bd1c1c' }}><span>{t.sales.title}</span><span>-{descompteCarret.toFixed(2)} €</span></div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px', color: '#444' }}><span>{t.cart.shippingCosts}</span><span>{costEnviament === 0 ? t.common.free : `${costEnviament.toFixed(2)} €`}</span></div>
                {faltaPerEnviamentGratis > 0 && (
                  <div style={{ backgroundColor: '#f4f3ee', border: '1px solid #eae8e1', padding: '10px 12px', marginBottom: '20px', fontSize: '12px', color: '#444', lineHeight: '1.5' }}>
                    <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>✓ {t.cart.addForFreeShippingPrefix} {faltaPerEnviamentGratis.toFixed(2)} €</span> {t.cart.addForFreeShippingSuffix}
                  </div>
                )}
                {costEnviament === 0 && subtotalCarret > 0 && <p style={{ fontSize: '11px', color: '#2e7d32', margin: '-4px 0 16px 0', fontWeight: 'bold' }}>✓ {t.cart.freeShippingApplied}</p>}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', borderTop: '1px solid #eceae4', paddingTop: '15px', marginBottom: '30px' }}><span>{t.common.total}</span><span>{totalGlobal.toFixed(2)} €</span></div>
                <button onClick={() => setPasCheckout('pagament')} style={{ width: '100%', backgroundColor: '#111', color: '#fff', border: 'none', padding: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}>
                  {t.cart.continuePayment}
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 340px', gap: '30px', alignItems: 'start' }}>
              <div style={{ backgroundColor: '#fff', border: '1px solid #eae8e1', padding: isMobile ? '20px' : '35px' }}>
                <button onClick={() => setPasCheckout('carret')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', marginBottom: '25px', color: '#444', letterSpacing: '1px' }}>
                  <ArrowLeft size={14} /> {t.cart.backToCart}
                </button>
                <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300', display: 'flex', alignItems: 'center', gap: '10px', color: '#111' }}>
                  <CreditCard size={20} /> {t.cart.paymentData}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { label: t.cart.cardholder, key: 'titular', type: 'text', placeholder: t.cart.cardholderPlaceholder, maxLength: undefined },
                    { label: t.cart.cardNumber, key: 'numero', type: 'text', placeholder: '1234 5678 9012 3456', maxLength: 19 },
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
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>{t.cart.expiry}</label>
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
                    <span>{(preuSales(item.producte) * item.quantitat).toFixed(2)} €</span>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #eceae4', paddingTop: '12px', marginTop: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: '#444' }}><span>{t.common.shipping}</span><span>{costEnviament === 0 ? t.common.free : `${costEnviament.toFixed(2)} €`}</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 'bold', borderTop: '1px solid #eceae4', paddingTop: '12px', marginTop: '8px' }}><span>{t.common.total}</span><span>{totalGlobal.toFixed(2)} €</span></div>
                </div>
                <button onClick={() => {
                  if (!dadesPagament.titular || !dadesPagament.numero || !dadesPagament.expiracio || !dadesPagament.cvv) { setMissatgeWeb({ text: t.messages.fillPayment, tipus: 'info' }); return; }
                  const codiRandom = 'CMD-' + Math.floor(100000 + Math.random() * 900000);
                  const novaComanda = { id: codiRandom, data: new Date().toLocaleDateString(lang === 'cat' ? 'ca-ES' : 'es-ES'), productes: carret.map(i => `${i.producte.nom} (${i.talla})`).join(', '), total: `${totalGlobal.toFixed(2)} €` };
                  setPerfil(prev => ({ ...prev, comandes: [novaComanda, ...prev.comandes] }));
                  setCarret([]); setDadesPagament({ numero: '', expiracio: '', titular: '', cvv: '' }); setPasCheckout('carret');
                  setMissatgeWeb({ text: `${t.messages.purchaseSuccess} ${codiRandom}`, tipus: 'exit' });
                  setSeccioActiva('perfil'); setSubgrupPerfil('compres');
                }} style={{ width: '100%', backgroundColor: '#111', color: '#fff', border: 'none', padding: '16px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', marginTop: '20px' }}>
                  {t.cart.confirmPay} {totalGlobal.toFixed(2)} €
                </button>
              </div>
            </div>
          )}

          {preferits.length > 0 && pasCheckout === 'carret' && (
            <PreferitsCarret preferits={preferits} tallaRecomanadaPerProducte={recomanarTallaPerProducte} isMobile={isMobile} lang={lang}
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
                  <span style={{ fontSize: '11px', fontWeight: 'bold', letterSpacing: '1px', display: 'block', marginBottom: '10px' }}>{t.virtualFitting.selectedSize}</span>
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
                      {t.common.size} {tallaSeleccionada} {t.virtualFitting.selected}{tallaRecomanada === tallaSeleccionada ? ` · ${t.virtualFitting.recommendedForProfile}` : ''}
                    </p>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <button onClick={afegirAlCarretDesDeEmprovador} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '15px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <ShoppingBag size={16} /> {t.collection.addToCartLong}
                </button>
                <button onClick={() => setEmprovadorObert(false)} style={{ backgroundColor: '#fff', color: '#111', border: '1px solid #ccc', padding: '13px', fontSize: '13px', cursor: 'pointer', letterSpacing: '1px' }}>
                  {t.virtualFitting.close}
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
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 15px 0', fontWeight: '300', color: '#111' }}>{t.virtualFitting.photoTitle}</h3>
            <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.6', marginBottom: '25px' }}>{t.virtualFitting.photoText}</p>
            <div style={{ border: '2px dashed #eae8e1', padding: '25px', backgroundColor: '#faf9f6', marginBottom: '20px', textAlign: 'center' }}>
              <ImageIcon size={28} color="#aaa" style={{ marginBottom: '10px' }} />
              <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#444' }}>{t.virtualFitting.choosePhoto}</p>
              <input type="file" accept="image/*" onChange={handleFotoUploadDesDeEmprovador} style={{ cursor: 'pointer', fontSize: '13px' }} />
            </div>
            <button onClick={() => setPasFotoObligatori(false)} style={{ background: 'none', border: '1px solid #ccc', padding: '12px 20px', fontSize: '13px', cursor: 'pointer' }}>{t.common.cancel}</button>
          </div>
        </div>
      )}

      {/* ═══ MODAL MESURES RÀPIDES ═══ */}
      {mesuresRapidesObertes && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 650, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#fff', padding: isMobile ? '28px 20px' : '40px', maxWidth: '460px', width: '90%', border: '1px solid #eae8e1', position: 'relative' }}>
            <button onClick={() => setMesuresRapidesObertes(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 8px 0', fontWeight: '300', color: '#111' }}>{t.quickMeasures.title}</h3>
            {producteSeleccionat && campsFaltants.length > 0 ? (
              <p style={{ fontSize: '13px', color: '#bd1c1c', margin: '0 0 20px 0', fontWeight: 'bold' }}>
                {t.quickMeasures.missingPrefix} <em>{producteSeleccionat.nom}</em> {t.quickMeasures.missingMiddle} {campsFaltants.map(c => LABELS_CAMP[c]).join(' i ')}.
              </p>
            ) : (
              <p style={{ fontSize: '13px', color: '#444', margin: '0 0 20px 0' }}>{t.quickMeasures.savedInfo}</p>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>{t.profile.height}</label>
                <input type="number" value={mesuresTemp.alcada} onChange={e => setMesuresTemp({...mesuresTemp, alcada: e.target.value})} placeholder={t.quickMeasures.heightPlaceholder} style={{ width: '100%', padding: '12px', border: '1px solid #ccc', boxSizing: 'border-box' as const }} />
              </div>
              {(!producteSeleccionat || (CAMPS_PER_PRODUCTE[producteSeleccionat.id] || []).includes('pit')) && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>{t.profile.chest}{campsFaltants.includes('pit') && <span style={{ color: '#bd1c1c', marginLeft: '4px' }}>*</span>}</label>
                  <input type="number" value={mesuresTemp.pit} onChange={e => setMesuresTemp({...mesuresTemp, pit: e.target.value})} placeholder={t.quickMeasures.chestPlaceholder} style={{ width: '100%', padding: '12px', border: campsFaltants.includes('pit') ? '1px solid #bd1c1c' : '1px solid #ccc', boxSizing: 'border-box' as const }} />
                </div>
              )}
              {(!producteSeleccionat || (CAMPS_PER_PRODUCTE[producteSeleccionat.id] || []).includes('cintura')) && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>{t.profile.waist}{campsFaltants.includes('cintura') && <span style={{ color: '#bd1c1c', marginLeft: '4px' }}>*</span>}</label>
                  <input type="number" value={mesuresTemp.cintura} onChange={e => setMesuresTemp({...mesuresTemp, cintura: e.target.value})} placeholder={t.quickMeasures.waistPlaceholder} style={{ width: '100%', padding: '12px', border: campsFaltants.includes('cintura') ? '1px solid #bd1c1c' : '1px solid #ccc', boxSizing: 'border-box' as const }} />
                </div>
              )}
              {(!producteSeleccionat || (CAMPS_PER_PRODUCTE[producteSeleccionat.id] || []).includes('maluc')) && (
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>{t.profile.hip}{campsFaltants.includes('maluc') && <span style={{ color: '#bd1c1c', marginLeft: '4px' }}>*</span>}</label>
                  <input type="number" value={mesuresTemp.maluc} onChange={e => setMesuresTemp({...mesuresTemp, maluc: e.target.value})} placeholder={t.quickMeasures.hipPlaceholder} style={{ width: '100%', padding: '12px', border: campsFaltants.includes('maluc') ? '1px solid #bd1c1c' : '1px solid #ccc', boxSizing: 'border-box' as const }} />
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setMesuresRapidesObertes(false)} style={{ flex: 1, background: 'none', border: '1px solid #ccc', padding: '13px', fontSize: '13px', cursor: 'pointer' }}>{t.common.cancel}</button>
              <button onClick={() => { setPerfil(prev => ({ ...prev, alcada: mesuresTemp.alcada, pit: mesuresTemp.pit, cintura: mesuresTemp.cintura, maluc: mesuresTemp.maluc })); setMesuresRapidesObertes(false); setMissatgeWeb({ text: t.messages.measuresSaved, tipus: 'exit' }); }}
                style={{ flex: 2, backgroundColor: '#111', color: '#fff', border: 'none', padding: '13px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}>
                {t.quickMeasures.save}
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
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 4px 0', fontWeight: '300', textAlign: 'center', color: '#111' }}>{t.sizeGuide.title}</h3>
            {producteSeleccionat && <p style={{ fontSize: '12px', color: '#444', textAlign: 'center', margin: '0 0 22px 0', letterSpacing: '1px' }}>{producteSeleccionat.nom.toUpperCase()}</p>}

            {(!producteSeleccionat || producteSeleccionat.id === 'camiseta-essence') && (
              <><h4 style={{ fontSize: '13px', letterSpacing: '1px', margin: '0 0 10px 0', color: '#111' }}>{t.sizeGuide.tshirtEssence}</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '13px', textAlign: 'center', marginBottom: '24px' }}>
                <thead><tr style={{ borderBottom: '2px solid #111', fontWeight: 'bold' }}><th style={{ padding: '10px 6px' }}>Talla</th><th style={{ padding: '10px 6px' }}>{t.sizeGuide.waist}</th><th style={{ padding: '10px 6px' }}>{t.sizeGuide.chest}</th></tr></thead>
                <tbody>{[['XS','60 – 64','84 – 88'],['S','64 – 68','88 – 92'],['M','68 – 72','92 – 96'],['L','72 – 76','96 – 100'],['XL','76 – 80','100 – 104']].map(([t,c,p]) => (
                  <tr key={t} style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === t && producteSeleccionat?.id === 'camiseta-essence' ? '#e8f5e9' : 'transparent' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 'bold' }}>{t}</td><td style={{ padding: '10px 6px' }}>{c}</td><td style={{ padding: '10px 6px' }}>{p}</td>
                  </tr>))}</tbody>
              </table></>
            )}
            {(!producteSeleccionat || producteSeleccionat.id === 'pantalons-essence') && (
              <><h4 style={{ fontSize: '13px', letterSpacing: '1px', margin: '0 0 10px 0', color: '#111' }}>{t.sizeGuide.trousersEssence}</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '13px', textAlign: 'center', marginBottom: '24px' }}>
                <thead><tr style={{ borderBottom: '2px solid #111', fontWeight: 'bold' }}><th style={{ padding: '10px 6px' }}>Talla</th><th style={{ padding: '10px 6px' }}>{t.sizeGuide.elasticWaist}</th><th style={{ padding: '10px 6px' }}>{t.sizeGuide.hip}</th></tr></thead>
                <tbody>{[['XS','60 – 68','86 – 92'],['S','64 – 72','90 – 96'],['M','70 – 78','94 – 100'],['L','76 – 84','98 – 104'],['XL','82 – 90','102 – 108']].map(([t,c,m]) => (
                  <tr key={t} style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === t && producteSeleccionat?.id === 'pantalons-essence' ? '#e8f5e9' : 'transparent' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 'bold' }}>{t}</td><td style={{ padding: '10px 6px' }}>{c}</td><td style={{ padding: '10px 6px' }}>{m}</td>
                  </tr>))}</tbody>
              </table></>
            )}
            {(!producteSeleccionat || producteSeleccionat.id === 'camiseta-tailor') && (
              <><h4 style={{ fontSize: '13px', letterSpacing: '1px', margin: '0 0 10px 0', color: '#111' }}>{t.sizeGuide.tshirtTailor}</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '13px', textAlign: 'center', marginBottom: '24px' }}>
                <thead><tr style={{ borderBottom: '2px solid #111', fontWeight: 'bold' }}><th style={{ padding: '10px 6px' }}>Talla</th><th style={{ padding: '10px 6px' }}>{t.sizeGuide.chestContour}</th></tr></thead>
                <tbody>{[['XS','84 – 88'],['S','88 – 92'],['M','92 – 96'],['L','96 – 100'],['XL','100 – 104']].map(([t,p]) => (
                  <tr key={t} style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === t && producteSeleccionat?.id === 'camiseta-tailor' ? '#e8f5e9' : 'transparent' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 'bold' }}>{t}</td><td style={{ padding: '10px 6px' }}>{p}</td>
                  </tr>))}</tbody>
              </table></>
            )}
            {(!producteSeleccionat || producteSeleccionat.id === 'pantalons-tailor') && (
              <><h4 style={{ fontSize: '13px', letterSpacing: '1px', margin: '0 0 10px 0', color: '#111' }}>{t.sizeGuide.trousersTailor}</h4>
              <p style={{ fontSize: '11px', color: '#444', margin: '-4px 0 10px 0', fontStyle: 'italic' }}>{t.sizeGuide.tailorNote}</p>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: isMobile ? '12px' : '13px', textAlign: 'center', marginBottom: '8px' }}>
                <thead><tr style={{ borderBottom: '2px solid #111', fontWeight: 'bold' }}><th style={{ padding: '10px 6px' }}>Talla</th><th style={{ padding: '10px 6px' }}>{t.sizeGuide.fixedWaist}</th><th style={{ padding: '10px 6px' }}>{t.sizeGuide.hip}</th></tr></thead>
                <tbody>{[['XS','62 – 65','88 – 92'],['S','66 – 69','92 – 96'],['M','70 – 73','96 – 100'],['L','74 – 77','100 – 104'],['XL','78 – 81','104 – 108']].map(([t,c,m]) => (
                  <tr key={t} style={{ borderBottom: '1px solid #eceae4', backgroundColor: tallaRecomanada === t && producteSeleccionat?.id === 'pantalons-tailor' ? '#e8f5e9' : 'transparent' }}>
                    <td style={{ padding: '10px 6px', fontWeight: 'bold' }}>{t}</td><td style={{ padding: '10px 6px' }}>{c}</td><td style={{ padding: '10px 6px' }}>{m}</td>
                  </tr>))}</tbody>
              </table></>
            )}
            {tallaRecomanada && producteSeleccionat && (
              <p style={{ fontSize: '12px', color: '#2e7d32', marginTop: '16px', textAlign: 'center', fontWeight: 'bold' }}>
                • {t.sizeGuide.recommendedPrefix} <strong>{tallaRecomanada}</strong>.
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
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300', color: '#111' }}>{t.profile.personalInfo}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: '35px' }}>
              {[
                { label: t.profile.fullName, key: 'nom', type: 'text' },
                { label: t.profile.email, key: 'email', type: 'email' },
                { label: t.profile.phone, key: 'telefon', type: 'text' },
                { label: t.profile.address, key: 'adreca', type: 'text' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', marginBottom: '6px' }}>{label}</label>
                  <input type={type} value={(perfil as any)[key]} onChange={e => setPerfil({...perfil, [key]: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '1px solid #ccc', backgroundColor: '#fafafa', boxSizing: 'border-box' as const }} />
                </div>
              ))}
            </div>

            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '18px', margin: '0 0 20px 0', fontWeight: '300', borderTop: '1px solid #eee', paddingTop: '25px', color: '#111' }}>{t.profile.myMeasures}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(2, 1fr)', gap: '15px', marginBottom: '25px' }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>{t.profile.height}</label>
                <input type="number" value={perfil.alcada} onChange={e => setPerfil({...perfil, alcada: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' as const }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>{t.profile.chest}</label>
                <input type="number" value={perfil.pit} onChange={e => setPerfil({...perfil, pit: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' as const }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>{t.profile.waist}</label>
                <input type="number" value={perfil.cintura} onChange={e => setPerfil({...perfil, cintura: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' as const }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '12px', marginBottom: '6px' }}>{t.profile.hip}</label>
                <input type="number" value={perfil.maluc} onChange={e => setPerfil({...perfil, maluc: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', boxSizing: 'border-box' as const }} />
              </div>
            </div>
            {(perfil.pit || perfil.cintura || perfil.maluc) && (
              <div style={{ backgroundColor: '#f4f3ee', border: '1px solid #eae8e1', padding: '16px', fontSize: '13px' }}>
                <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', letterSpacing: '0.5px', fontSize: '12px' }}>{t.profile.recommendedByPiece}</p>
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
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 20px 0', fontWeight: '300', color: '#111' }}>{t.profile.raFiles}</h3>
            <div style={{ border: '2px dashed #eae8e1', padding: '40px', textAlign: 'center', backgroundColor: '#faf9f6', marginBottom: '25px' }}>
              <input type="file" accept="image/*" onChange={handleFotoUpload} style={{ cursor: 'pointer' }} />
            </div>
            {perfil.fotoRA && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <img src={perfil.fotoRA} alt={t.profile.previewRA} style={{ maxWidth: '200px', height: 'auto', border: '1px solid #eae8e1', display: 'block', margin: '0 auto 15px auto' }} />
                <button onClick={() => { setPerfil(prev => ({ ...prev, fotoRA: null })); setMissatgeWeb({ text: t.messages.photoDeletedRA, tipus: 'info' }); }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#bd1c1c', color: '#fff', border: 'none', padding: '10px 18px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}>
                  <Trash2 size={14} /> {t.profile.deleteSelectedPhoto}
                </button>
              </div>
            )}
          </div>
        )}

        {subgrupPerfil === 'looks' && (
          <div>
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 20px 0', fontWeight: '300', color: '#111' }}>{t.profile.looksTitle}</h3>
            {perfil.looksProvats.length === 0 ? (
              <p style={{ color: '#444', fontSize: '14px' }}>{t.profile.emptyLooks}</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '30px' }}>
                {perfil.looksProvats.map((lookId) => {
                  const prod = PRODUCTES.find(p => p.id === lookId);
                  if (!prod) return null;
                  return (
                    <div key={lookId} style={{ border: '1px solid #eae8e1', backgroundColor: '#faf9f6', position: 'relative', overflow: 'hidden' }}>
                      <button onClick={() => handleDeleteLook(lookId)} title={t.profile.deleteLook}
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
                          <Trash2 size={13} /> {t.profile.deleteLook}
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
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300', color: '#111' }}>{t.profile.favoritesTitle}</h3>
            {preferits.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#444' }}>
                <Heart size={32} style={{ marginBottom: '10px', strokeWidth: 1 }} />
                <p style={{ fontSize: '14px', margin: '0 0 20px 0' }}>{t.profile.emptyFavorites}</p>
                <button onClick={() => { setSeccioActiva('colleccio'); setProducteSeleccionat(null); }} style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '12px 28px', fontSize: '13px', letterSpacing: '1px', cursor: 'pointer' }}>{t.profile.exploreCollection}</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {preferits.map((prod) => {
                  const tallaRecPref = recomanarTallaPerProducte(prod.id);
                  return (
                    <div key={prod.id} style={{ display: 'flex', gap: '20px', padding: '20px', border: '1px solid #eae8e1', backgroundColor: '#faf9f6', alignItems: 'center' }}>
                      <div style={{ width: '80px', height: '100px', backgroundColor: '#f5f5f3', overflow: 'hidden', border: '1px solid #eceae4', flexShrink: 0 }}>
                        <img src={prod.imatges[0]} alt={productText(prod).nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=' + productText(prod).nom }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h4 style={{ margin: '0 0 6px 0', fontSize: '16px', fontWeight: '400', letterSpacing: '0.5px', color: '#111' }}>{productText(prod).nom}</h4>
                        <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold' }}>{prod.preu.toFixed(2)} €</p>
                        {tallaRecPref && (
                          <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#2e7d32', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Check size={13} /> La teva talla recomanada: {tallaRecPref}
                          </p>
                        )}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          <button onClick={() => { setSeccioActiva('colleccio'); setProducteSeleccionat(prod); setImatgeActiva(0); }}
                            style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '9px 16px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '1px' }}>
                            {t.profile.viewPiece}
                          </button>
                          <button onClick={() => commutarPreferit(prod)}
                            style={{ backgroundColor: 'transparent', color: '#bd1c1c', border: '1px solid #bd1c1c', padding: '9px 16px', fontSize: '12px', cursor: 'pointer', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Trash2 size={13} /> {t.common.remove}
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
            <h3 style={{ fontFamily: '"Didot", serif', fontSize: '22px', margin: '0 0 25px 0', fontWeight: '300', color: '#111' }}>{t.profile.ordersTitle}</h3>
            {perfil.comandes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', color: '#444' }}>
                <Package size={32} style={{ marginBottom: '10px', strokeWidth: 1 }} />
                <p style={{ fontSize: '14px', margin: 0 }}>{t.profile.emptyOrders}</p>
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
                  <th style={{ padding: '12px 8px' }}>{t.cart.orderCode}</th>
                  <th style={{ padding: '12px 8px' }}>{t.cart.date}</th>
                  <th style={{ padding: '12px 8px' }}>{t.cart.purchasedProducts}</th>
                  <th style={{ padding: '12px 8px', textAlign: 'right' }}>{t.cart.paidTotal}</th>
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
