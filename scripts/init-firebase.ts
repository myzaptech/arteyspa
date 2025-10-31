/**
 * Script para inicializar Firebase con datos de Arte y Spa
 * Ejecutar: npx tsx scripts/init-firebase.ts
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA5bYwm-ZloEdpnAZAtLRNMHYGs9O8Yezg",
  authDomain: "data-spa.firebaseapp.com",
  projectId: "data-spa",
  storageBucket: "data-spa.firebasestorage.app",
  messagingSenderId: "1036421671504",
  appId: "1:1036421671504:web:a173fa80cafb2f67b87f55",
  measurementId: "G-EB260DTHVM",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ==================== SECCIONES DE PRODUCTOS ====================
const sections = [
  {
    id: 'arcangeles',
    name: 'Arcángeles',
    slug: 'arcangeles',
    description: 'Velas dedicadas a los arcángeles protectores',
    order: 1,
    active: true,
    createdAt: new Date(),
  },
  {
    id: 'terapeuticas',
    name: 'Terapéuticas',
    slug: 'terapeuticas',
    description: 'Velas con propiedades terapéuticas y aromáticas',
    order: 2,
    active: true,
    createdAt: new Date(),
  },
  {
    id: 'chakras',
    name: 'Chakras',
    slug: 'chakras',
    description: 'Velas para equilibrar los chakras',
    order: 3,
    active: true,
    createdAt: new Date(),
  },
  {
    id: 'proteccion',
    name: 'Protección',
    slug: 'proteccion',
    description: 'Velas para protección energética',
    order: 4,
    active: true,
    createdAt: new Date(),
  },
  {
    id: 'abundancia',
    name: 'Abundancia y Prosperidad',
    slug: 'abundancia',
    description: 'Velas para atraer abundancia y prosperidad',
    order: 5,
    active: true,
    createdAt: new Date(),
  },
  {
    id: 'amor',
    name: 'Amor y Relaciones',
    slug: 'amor',
    description: 'Velas para el amor y las relaciones',
    order: 6,
    active: true,
    createdAt: new Date(),
  },
];

// ==================== PRODUCTOS (VELAS) ====================
const products = [
  // Arcángeles
  {
    name: 'Vela Arcángel Miguel',
    subtitle: 'PROTECCIÓN - Escudo divino',
    description: 'Vela especial dedicada al Arcángel Miguel, protector y guerrero de la luz. Perfecta para rituales de protección y limpieza energética. Con aroma a cedro y salvia.',
    image: '/images/yellow-candle.png',
    category: 'arcangeles',
    sectionId: 'arcangeles',
    price: 25000,
    stock: 15,
    active: true,
    tags: ['protección', 'arcángel', 'ritual', 'energía'],
    createdAt: new Date(),
  },
  {
    name: 'Vela Arcángel Rafael',
    subtitle: 'SANACIÓN - Medicina divina',
    description: 'Dedicada al Arcángel Rafael, sanador divino. Ideal para rituales de sanación física y emocional. Aroma a eucalipto y menta.',
    image: '/images/green-candle.png',
    category: 'arcangeles',
    sectionId: 'arcangeles',
    price: 25000,
    stock: 12,
    active: true,
    tags: ['sanación', 'arcángel', 'salud', 'bienestar'],
    createdAt: new Date(),
  },
  {
    name: 'Vela Arcángel Gabriel',
    subtitle: 'COMUNICACIÓN - Mensajero celestial',
    description: 'Vela del Arcángel Gabriel, mensajero divino. Para mejorar la comunicación y claridad mental. Aroma a jazmín y lavanda.',
    image: '/images/blue-candle.png',
    category: 'arcangeles',
    sectionId: 'arcangeles',
    price: 25000,
    stock: 10,
    active: true,
    tags: ['comunicación', 'arcángel', 'claridad', 'intuición'],
    createdAt: new Date(),
  },

  // Terapéuticas
  {
    name: 'Vela Terapéutica Relajación',
    subtitle: 'CALMA - Paz interior',
    description: 'Vela aromática con esencias naturales diseñada para promover la relajación y el bienestar mental. Ideal para momentos de meditación. Aroma a lavanda y vainilla.',
    image: '/images/orange-candle.png',
    category: 'terapeuticas',
    sectionId: 'terapeuticas',
    price: 22000,
    stock: 20,
    active: true,
    tags: ['relajación', 'meditación', 'calma', 'lavanda'],
    createdAt: new Date(),
  },
  {
    name: 'Vela Energizante',
    subtitle: 'VITALIDAD - Renovación de energía',
    description: 'Vela energizante con cítricos y menta. Perfecta para comenzar el día con vitalidad y energía positiva.',
    image: '/images/orange-candle.png',
    category: 'terapeuticas',
    sectionId: 'terapeuticas',
    price: 22000,
    stock: 18,
    active: true,
    tags: ['energía', 'vitalidad', 'cítricos', 'mañana'],
    createdAt: new Date(),
  },

  // Chakras
  {
    name: 'Vela Chakra Raíz',
    subtitle: 'ENRAIZAMIENTO - Conexión con la tierra',
    description: 'Vela roja para equilibrar el primer chakra. Proporciona estabilidad, seguridad y conexión con la tierra. Aroma a sándalo.',
    image: '/images/red-candle.png',
    category: 'chakras',
    sectionId: 'chakras',
    price: 20000,
    stock: 15,
    active: true,
    tags: ['chakra', 'raíz', 'estabilidad', 'enraizamiento'],
    createdAt: new Date(),
  },
  {
    name: 'Vela Chakra Sacro',
    subtitle: 'CREATIVIDAD - Energía vital',
    description: 'Vela naranja para el segundo chakra. Estimula la creatividad, pasión y energía vital. Aroma a naranja dulce.',
    image: '/images/orange-candle.png',
    category: 'chakras',
    sectionId: 'chakras',
    price: 20000,
    stock: 15,
    active: true,
    tags: ['chakra', 'sacro', 'creatividad', 'pasión'],
    createdAt: new Date(),
  },
  {
    name: 'Vela Chakra Corazón',
    subtitle: 'AMOR - Compasión y equilibrio',
    description: 'Vela verde para el chakra del corazón. Promueve el amor, la compasión y el equilibrio emocional. Aroma a rosa.',
    image: '/images/green-candle.png',
    category: 'chakras',
    sectionId: 'chakras',
    price: 20000,
    stock: 15,
    active: true,
    tags: ['chakra', 'corazón', 'amor', 'compasión'],
    createdAt: new Date(),
  },
  {
    name: 'Vela Chakra Corona',
    subtitle: 'ESPIRITUALIDAD - Conexión divina',
    description: 'Vela violeta para el séptimo chakra. Facilita la conexión espiritual y la iluminación. Aroma a incienso y mirra.',
    image: '/images/purple-candle.png',
    category: 'chakras',
    sectionId: 'chakras',
    price: 20000,
    stock: 15,
    active: true,
    tags: ['chakra', 'corona', 'espiritualidad', 'iluminación'],
    createdAt: new Date(),
  },

  // Protección
  {
    name: 'Vela Protección Total',
    subtitle: 'ESCUDO - Barrera energética',
    description: 'Vela de protección con ruda y romero. Crea un escudo energético contra energías negativas. Ideal para el hogar.',
    image: '/images/blue-candle.png',
    category: 'proteccion',
    sectionId: 'proteccion',
    price: 23000,
    stock: 12,
    active: true,
    tags: ['protección', 'ruda', 'romero', 'hogar'],
    createdAt: new Date(),
  },

  // Abundancia
  {
    name: 'Vela Abundancia',
    subtitle: 'PROSPERIDAD - Atrae la riqueza',
    description: 'Vela dorada para atraer abundancia y prosperidad. Con canela y naranja. Perfecta para rituales de prosperidad.',
    image: '/images/abundance-candle.png',
    category: 'abundancia',
    sectionId: 'abundancia',
    price: 24000,
    stock: 10,
    active: true,
    tags: ['abundancia', 'prosperidad', 'dinero', 'éxito'],
    createdAt: new Date(),
  },
  {
    name: 'Vela Bendición Financiera',
    subtitle: 'ÉXITO - Oportunidades de negocio',
    description: 'Vela especial para bendecir negocios y atraer oportunidades financieras. Aroma a menta y albahaca.',
    image: '/images/blessing-candle.png',
    category: 'abundancia',
    sectionId: 'abundancia',
    price: 24000,
    stock: 8,
    active: true,
    tags: ['negocio', 'éxito', 'finanzas', 'oportunidad'],
    createdAt: new Date(),
  },

  // Amor
  {
    name: 'Vela Amor Verdadero',
    subtitle: 'ROMANCE - Atrae el amor',
    description: 'Vela rosa para atraer el amor verdadero y fortalecer las relaciones. Con aroma a rosas y jazmín.',
    image: '/images/purple-candle.png',
    category: 'amor',
    sectionId: 'amor',
    price: 22000,
    stock: 14,
    active: true,
    tags: ['amor', 'romance', 'relaciones', 'pareja'],
    createdAt: new Date(),
  },
];

// ==================== SERVICIOS ====================
const services = [
  {
    id: 'crochet',
    name: 'Artesanías en Crochet',
    slug: 'crochet',
    shortDescription: 'Piezas únicas tejidas a mano con amor y dedicación',
    fullDescription: 'Creamos piezas únicas tejidas a mano, que reflejan tradición, dedicación y creatividad. Cada creación representa el amor y la calidez de nuestro trabajo artesanal, utilizando técnicas transmitidas de generación en generación.',
    features: [
      'Amigurumi personalizados',
      'Ramos decorativos',
      'Decoración para el hogar',
      'Detalles personalizados',
    ],
    details: 'Se aceptan pedidos especiales adaptados a tus gustos y necesidades. Cada pieza es única y está hecha con hilos de la más alta calidad.',
    icon: 'palette',
    image: '/images/arte-spa-hero.png',
    priceRange: '15000-50000',
    estimatedTime: '3-7 días',
    active: true,
    order: 1,
    createdAt: new Date(),
  },
  {
    id: 'tattoo',
    name: 'Estudio de Tatuajes',
    slug: 'tatuajes',
    shortDescription: 'Diseños personalizados que cuentan tu historia',
    fullDescription: 'Un espacio creativo y seguro donde transformamos tus ideas en arte sobre la piel. Trabajamos con diseños personalizados que plasman historias únicas en cada tatuaje.',
    features: [
      'Diseños personalizados',
      'Realismo y minimalismo',
      'Arte botánico',
      'Lettering artístico',
    ],
    details: 'Cumplimos con todas las normas de higiene y bioseguridad. Reserva tu cita para diseñar el tatuaje de tus sueños con nuestros artistas profesionales.',
    icon: 'scissors',
    image: '/images/spa-treatment.png',
    priceRange: '80000-500000',
    estimatedTime: 'Según diseño',
    active: true,
    order: 2,
    createdAt: new Date(),
  },
  {
    id: 'wood',
    name: 'Taller de Madera Artesanal',
    slug: 'madera',
    shortDescription: 'Muebles y decoración en madera de calidad',
    fullDescription: 'Elaboramos piezas únicas en madera, combinando tradición y diseño contemporáneo. Cada creación es hecha a mano, con materiales de calidad y acabados especiales.',
    features: [
      'Mobiliario pequeño',
      'Decoración artesanal',
      'Accesorios en madera',
      'Cabañas en madera',
    ],
    details: 'Opciones personalizadas a pedido. Utilizamos maderas nobles seleccionadas cuidadosamente para crear piezas que duran generaciones.',
    icon: 'hammer',
    image: '/images/spa-room.png',
    priceRange: '50000-2000000',
    estimatedTime: '7-30 días',
    active: true,
    order: 3,
    createdAt: new Date(),
  },
  {
    id: 'spa',
    name: 'Spa y Bienestar',
    slug: 'spa',
    shortDescription: 'Experiencias de relajación y bienestar',
    fullDescription: 'Un lugar diseñado para la relajación y el equilibrio interior. Ofrecemos experiencias de bienestar que nutren tu cuerpo, mente y espíritu en un ambiente de paz y tranquilidad.',
    features: [
      'Masajes relajantes y terapéuticos',
      'Faciales con productos naturales',
      'Terapias de bienestar',
      'Aromaterapia y experiencias sensoriales',
    ],
    details: 'Reserva tu momento de calma y reconecta contigo mismo. Nuestros terapeutas utilizan técnicas ancestrales y productos naturales.',
    icon: 'sparkles',
    image: '/images/spa-treatment.png',
    priceRange: '40000-150000',
    estimatedTime: '1-2 horas',
    active: true,
    order: 4,
    createdAt: new Date(),
  },
];

// ==================== CONFIGURACIÓN GENERAL ====================
const siteConfig = {
  id: 'general',
  siteName: 'Arte & Spa',
  tagline: 'Un espacio donde el arte y el bienestar se encuentran',
  description: 'Emprendimiento familiar que une creatividad, tradición y bienestar en Zapatoca, Santander',
  
  // Contacto
  whatsapp: '573124202504',
  email: 'info@arteyspa.com',
  
  // Ubicación
  address: {
    street: 'Carrera 12 # 17-51',
    city: 'Zapatoca',
    state: 'Santander',
    country: 'Colombia',
    fullAddress: 'Carrera 12 # 17-51, Zapatoca, Santander',
  },
  
  // Horarios
  schedule: {
    weekdays: {
      morning: '9:00 AM - 12:00 PM',
      afternoon: '3:00 PM - 6:00 PM',
    },
    closedDay: 'Martes',
    note: 'Atención personalizada - Citas especiales disponibles',
  },
  
  // Redes sociales
  social: {
    facebook: '',
    instagram: '',
    youtube: '',
    tiktok: '',
  },
  
  // Políticas
  policies: {
    payments: 'Se aceptan transferencias, efectivo y medios digitales.',
    shipping: 'Cobertura nacional, tiempos de entrega entre 3 y 5 días hábiles.',
    returns: 'Cambios y devoluciones aplican solo en productos físicos, no en servicios.',
    privacy: 'Los datos de nuestros clientes son confidenciales.',
  },
  
  // Sobre nosotros
  about: {
    mission: 'Brindar experiencias de bienestar y productos artesanales que integren el arte, la naturaleza y la relajación.',
    vision: 'Ser un referente en la región como un espacio integral donde conviven el arte, la creatividad y la salud.',
    values: ['Familia', 'Creatividad', 'Autenticidad', 'Bienestar', 'Respeto por la naturaleza'],
    story: 'Somos una familia emprendedora que cree en la unión del arte con la salud y el bienestar. Nuestro proyecto nació de la pasión por crear con las manos y el corazón, ofreciendo experiencias que alimentan los sentidos y productos que conectan con la naturaleza.',
  },
  
  updatedAt: new Date(),
};

// ==================== FUNCIÓN PRINCIPAL ====================
async function initializeFirebase() {
  console.log('🚀 Iniciando migración de datos a Firebase...\n');
  
  try {
    // 1. Crear configuración general
    console.log('📝 Creando configuración general del sitio...');
    await setDoc(doc(db, 'siteConfig', 'general'), siteConfig);
    console.log('✅ Configuración general creada\n');
    
    // 2. Crear secciones de productos
    console.log('📂 Creando secciones de productos...');
    for (const section of sections) {
      await setDoc(doc(db, 'productSections', section.id), section);
      console.log(`  ✓ Sección: ${section.name}`);
    }
    console.log(`✅ ${sections.length} secciones creadas\n`);
    
    // 3. Crear productos
    console.log('🕯️  Creando productos...');
    for (const product of products) {
      await addDoc(collection(db, 'products'), product);
      console.log(`  ✓ Producto: ${product.name}`);
    }
    console.log(`✅ ${products.length} productos creados\n`);
    
    // 4. Crear servicios
    console.log('💼 Creando servicios...');
    for (const service of services) {
      await setDoc(doc(db, 'services', service.id), service);
      console.log(`  ✓ Servicio: ${service.name}`);
    }
    console.log(`✅ ${services.length} servicios creados\n`);
    
    console.log('🎉 ¡Migración completada exitosamente!');
    console.log('\n📊 Resumen:');
    console.log(`  - Configuración: 1 documento`);
    console.log(`  - Secciones: ${sections.length} documentos`);
    console.log(`  - Productos: ${products.length} documentos`);
    console.log(`  - Servicios: ${services.length} documentos`);
    console.log(`\n🔥 Tu base de datos Firebase está lista!`);
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    throw error;
  }
}

// Ejecutar
initializeFirebase()
  .then(() => {
    console.log('\n✨ Proceso finalizado');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Error fatal:', error);
    process.exit(1);
  });
