"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getProducts, getSections, type Product, type ProductSection } from "@/lib/products"

const MessageCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const Clock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <polyline points="12,6 12,12 16,14" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const Palette = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="13.5" cy="6.5" r=".5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <circle cx="17.5" cy="10.5" r=".5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <circle cx="8.5" cy="7.5" r=".5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <circle cx="6.5" cy="12.5" r=".5" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path
      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
)

const Scissors = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="6" cy="6" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <circle cx="6" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="20" y1="4" x2="8.12" y2="15.88" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="14.47" y1="14.48" x2="20" y2="20" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <line x1="8.12" y1="8.12" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const Hammer = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="m15 12-8.5-8.5c-.83-.83-2.17-.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 0 0 3L12 15"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <path d="M17.64 15 22 10.64" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path
      d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91-.82.83Z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
)

const Sparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="m12 3-1.912 5.813a2 2 0 01-1.275 1.275L3 12l5.813 1.912a2 2 0 011.275 1.275L12 21l1.912-5.813a2 2 0 011.275-1.275L21 12l-5.813-1.912a2 2 0 01-1.275-1.275L12 3z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
    <path d="M5 3v4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path d="M19 17v4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path d="M3 5h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path d="M17 19h4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="8" cy="21" r="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <circle cx="19" cy="21" r="1" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <path
      d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
)

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </svg>
)

const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <circle cx="12" cy="12" r="6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
    <circle cx="12" cy="12" r="2" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
  </svg>
)

export default function ArteSpaLanding() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isVisible, setIsVisible] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [sections, setSections] = useState<ProductSection[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Generar posiciones aleatorias solo una vez en el cliente
  const floatingParticles = useState(() => 
    Array.from({ length: 8 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 10
    }))
  )[0]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [productsData, sectionsData] = await Promise.all([getProducts(), getSections()])
        setProducts(productsData)
        setSections(sectionsData)
        if (activeCategory !== "all") {
          const sectionExists = sectionsData.some((section) => section.slug === activeCategory)
          if (!sectionExists) {
            setActiveCategory("all")
          }
        }
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [activeCategory])

  const handleScroll = useCallback(() => {
    const elements = document.querySelectorAll(".animate-on-scroll:not(.animated)")
    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("animate-fade-in-up", "animated")
      }
    })
  }, [])

  useEffect(() => {
    const triggerInitialAnimations = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")
      elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top
        if (elementTop < window.innerHeight - 50) {
          setTimeout(() => {
            element.classList.add("animate-fade-in-up", "animated")
          }, index * 100)
        }
      })
    }

    triggerInitialAnimations()

    let ticking = false
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", throttledScroll, { passive: true })
    return () => window.removeEventListener("scroll", throttledScroll)
  }, [handleScroll])

  const services = [
    {
      id: "crochet",
      title: "Artesanías en Crochet",
      description:
        "Creamos piezas únicas tejidas a mano, que reflejan tradición, dedicación y creatividad. Cada creación representa el amor y la calidez de nuestro trabajo artesanal, utilizando técnicas transmitidas de generación en generación.",
      features: [
        "Amigurumi personalizados",
        "Ramos decorativos",
        "Decoración para el hogar",
        "Detalles personalizados",
      ],
      details:
        "Se aceptan pedidos especiales adaptados a tus gustos y necesidades. Cada pieza es única y está hecha con hilos de la más alta calidad.",
      icon: <Palette className="h-6 w-6" />,
      image: "/images/arte-spa-hero.png",
    },
    {
      id: "tattoo",
      title: "Estudio de Tatuajes",
      description:
        "Un espacio creativo y seguro donde transformamos tus ideas en arte sobre la piel. Trabajamos con diseños personalizados que plasman historias únicas en cada tatuaje.",
      features: ["Diseños personalizados", "Realismo y minimalismo", "Arte botánico", "Lettering artístico"],
      details:
        "Cumplimos con todas las normas de higiene y bioseguridad. Reserva tu cita para diseñar el tatuaje de tus sueños con nuestros artistas profesionales.",
      icon: <Scissors className="h-6 w-6" />,
      image: "/images/spa-treatment.png",
    },
    {
      id: "wood",
      title: "Taller de Madera Artesanal",
      description:
        "Elaboramos piezas únicas en madera, combinando tradición y diseño contemporáneo. Cada creación es hecha a mano, con materiales de calidad y acabados especiales.",
      features: ["Mobiliario pequeño", "Decoración artesanal", "Accesorios en madera", "Cabañas en madera"],
      details:
        "Opciones personalizadas a pedido. Utilizamos maderas nobles seleccionadas cuidadosamente para crear piezas que duran generaciones.",
      icon: <Hammer className="h-6 w-6" />,
      image: "/images/spa-room.png",
    },
    {
      id: "spa",
      title: "Spa y Bienestar",
      description:
        "Un lugar diseñado para la relajación y el equilibrio interior. Ofrecemos experiencias de bienestar que nutren tu cuerpo, mente y espíritu en un ambiente de paz y tranquilidad.",
      features: [
        "Masajes relajantes y terapéuticos",
        "Faciales con productos naturales",
        "Terapias de bienestar",
        "Aromaterapia y experiencias sensoriales",
      ],
      details:
        "Reserva tu momento de calma y reconecta contigo mismo. Nuestros terapeutas utilizan técnicas ancestrales y productos naturales.",
      icon: <Sparkles className="h-6 w-6" />,
      image: "/images/spa-treatment.png",
    },
  ]

  const categories = [
    { id: "all", name: "Todos los Productos" },
    ...sections.map((section) => ({
      id: section.slug,
      name: section.name,
    })),
  ]

  const whatsappNumber = "573124202504"

  const openWhatsApp = useCallback(
    (product?: string, isService?: boolean) => {
      const message = product
        ? `Hola! Me interesa conocer más sobre ${product} de Arte y Spa. ¿Podrían darme información sobre precios y disponibilidad?`
        : "Hola! Me interesa conocer más sobre los servicios y productos de Arte y Spa"
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank")
    },
    [whatsappNumber],
  )

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((product) => {
          const section = sections.find((s) => s.id === product.sectionId)
          return section?.slug === activeCategory
        })

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/spa-massage-background.jpeg')`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, 
            rgba(64, 101, 119, 0.9) 0%, 
            rgba(132, 174, 188, 0.85) 50%, 
            rgba(199, 209, 216, 0.8) 100%)`,
          }}
        ></div>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, 
            rgba(64, 101, 119, 0.6) 0%, 
            transparent 50%, 
            rgba(132, 174, 188, 0.4) 100%)`,
          }}
        ></div>
      </div>

      {mounted && (
        <div className="fixed inset-0 z-5 pointer-events-none">
          {floatingParticles.map((particle, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-[#C7D1D8]/20 rounded-full animate-float"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b" style={{
        background: 'linear-gradient(135deg, rgba(199, 209, 216, 0.95) 0%, rgba(132, 174, 188, 0.9) 100%)',
        borderColor: 'rgba(199, 209, 216, 0.3)'
      }}>
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <img src="/logo-optimized.png" alt="Logo" className="h-8 w-8 md:h-10 md:w-10 object-contain" />
              <span className="text-[#406577] font-bold text-lg md:text-xl drop-shadow-lg">Arte & Spa</span>
            </div>
            <div className="flex gap-2 md:gap-4 overflow-x-auto">
              {[
                { id: 'about', name: 'Nosotros' },
                { id: 'services', name: 'Servicios' },
                { id: 'products', name: 'Tienda' },
                { id: 'contact', name: 'Contacto' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="px-3 md:px-4 py-2 text-sm md:text-base font-medium text-[#406577] hover:text-white hover:bg-[#406577]/80 rounded-lg transition-all duration-300 whitespace-nowrap"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section className="relative z-10 py-16 md:py-32 px-4 pt-24 md:pt-36">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-left animate-fade-in-up">
              <div className="mb-6 md:mb-8 flex justify-start">
                <img 
                  src="/logo-optimized.png" 
                  alt="Arte y Spa Logo" 
                  className="h-20 w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 object-contain drop-shadow-2xl hover:scale-110 transition-transform duration-500 animate-pulse-slow"
                />
              </div>

              <div
                className="inline-block px-4 md:px-6 py-2 md:py-3 rounded-full mb-6 md:mb-8 border shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{
                  background: `linear-gradient(to right, 
                    rgba(199, 209, 216, 0.2) 0%, 
                    rgba(132, 174, 188, 0.15) 100%)`,
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(199, 209, 216, 0.3)",
                }}
              >
                <span
                  className="text-sm md:text-base font-semibold tracking-wide drop-shadow-lg"
                  style={{ color: "#406577" }}
                >
                  Emprendimiento Familiar • Zapatoca, Santander
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-6 md:mb-8 leading-tight tracking-tight">
                <span className="text-[#406577] drop-shadow-2xl hover:text-[#84AEBC] transition-colors duration-500">
                  Arte
                </span>
                <span className="block text-[#84AEBC] drop-shadow-2xl hover:text-[#C7D1D8] transition-colors duration-500">
                  & Spa
                </span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 font-medium leading-relaxed">
                <span className="text-[#406577] drop-shadow-lg">"Un espacio donde el arte</span>
                <span className="block text-[#84AEBC] drop-shadow-lg">y el bienestar se encuentran"</span>
              </p>

              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-[#406577] max-w-2xl leading-relaxed font-medium drop-shadow-lg">
                Bienvenido a Arte y Spa, un emprendimiento familiar en el que unimos la creatividad, la tradición y el
                bienestar. Aquí encontrarás artesanías únicas, tatuajes personalizados, trabajos en madera artesanal, un
                espacio de spa para la relajación y una tienda de productos naturales elaborados con plantas
                medicinales.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Button
                  size="lg"
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-gradient-to-r from-[#C7D1D8] to-white hover:from-white hover:to-[#C7D1D8] text-[#406577] px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium border-0 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  Conocer Más
                </Button>
                <Button
                  size="lg"
                  onClick={() => openWhatsApp()}
                  className="bg-transparent border-2 border-[#C7D1D8]/60 hover:bg-[#C7D1D8]/30 hover:border-[#C7D1D8] text-[#C7D1D8] px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                >
                  <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                  Contactar
                </Button>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div
                className="relative rounded-3xl p-4 md:p-8 border shadow-2xl hover:shadow-3xl transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(199, 209, 216, 0.15) 0%, 
                    rgba(132, 174, 188, 0.1) 100%)`,
                  backdropFilter: "blur(12px)",
                  borderColor: "rgba(199, 209, 216, 0.3)",
                }}
              >
                <div className="grid grid-cols-2 gap-3 md:gap-6">
                  <div className="space-y-3 md:space-y-4">
                    <img
                      src="/images/tattoo-studio.png"
                      alt="Estudio de Tatuajes"
                      className="w-full h-40 md:h-56 object-contain rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    />
                    <img
                      src="/images/crochet-frogs.png"
                      alt="Artesanías en Crochet"
                      className="w-full h-32 md:h-44 object-contain rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-3 md:space-y-4 pt-4 md:pt-8">
                    <img
                      src="/images/wood-cabin.jpeg"
                      alt="Trabajos en Madera"
                      className="w-full h-32 md:h-44 object-contain rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    />
                    <img
                      src="/images/spa-massage-background.jpeg"
                      alt="Spa y Bienestar"
                      className="w-full h-40 md:h-56 object-contain rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="relative z-10 py-16 md:py-24 px-4 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#406577] mb-6 md:mb-8 drop-shadow-2xl animate-on-scroll">
              Quiénes Somos
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-[#84AEBC] to-[#C7D1D8] mx-auto mb-6 md:mb-8 rounded-full animate-pulse"></div>
            <p className="text-base sm:text-lg md:text-xl text-[#406577] max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg mb-6 md:mb-8 animate-on-scroll px-2">
              Somos una familia emprendedora que cree en la unión del arte con la salud y el bienestar. Nuestro proyecto
              nació de la pasión por crear con las manos y el corazón, ofreciendo experiencias que alimentan los
              sentidos y productos que conectan con la naturaleza.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#84AEBC] max-w-3xl mx-auto leading-relaxed mb-8 md:mb-12 drop-shadow-lg animate-on-scroll px-2">
              En Arte y Spa cada miembro aporta su talento para crear un espacio integral donde conviven el arte, la
              creatividad y la salud.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {[
              {
                icon: Target,
                title: "Misión",
                content:
                  "Brindar experiencias de bienestar y productos artesanales que integren el arte, la naturaleza y la relajación.",
              },
              {
                icon: Sparkles,
                title: "Visión",
                content:
                  "Ser un referente en la región como un espacio integral donde conviven el arte, la creatividad y la salud.",
              },
              {
                icon: Heart,
                title: "Valores",
                content: "Familia, creatividad, autenticidad, bienestar, respeto por la naturaleza.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border backdrop-blur-md hover:scale-105 hover:shadow-2xl animate-on-scroll group transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(199, 209, 216, 0.12) 0%, 
                    rgba(132, 174, 188, 0.08) 100%)`,
                  borderColor: "rgba(199, 209, 216, 0.3)",
                }}
              >
                <CardHeader className="text-center pb-4 md:pb-6">
                  <div className="bg-gradient-to-br from-[#84AEBC] to-[#406577] p-3 md:p-4 rounded-full w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                    <item.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <CardTitle className="text-[#406577] text-xl md:text-2xl font-bold drop-shadow-lg">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center px-4">
                  <p className="text-[#406577] leading-relaxed font-medium drop-shadow-lg text-sm md:text-base">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#406577] mb-6 md:mb-8 drop-shadow-2xl">
              Nuestros Servicios
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-[#84AEBC] to-[#C7D1D8] mx-auto mb-6 md:mb-8 rounded-full animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {services.map((service, index) => (
              <Card
                key={service.id}
                className={`border backdrop-blur-md hover:transform hover:scale-105 hover:shadow-2xl animate-on-scroll group transition-all duration-700 ${
                  index % 2 === 0 ? "hover:rotate-1" : "hover:-rotate-1"
                }`}
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(199, 209, 216, 0.1) 0%, 
                    rgba(132, 174, 188, 0.05) 100%)`,
                  borderColor: "rgba(199, 209, 216, 0.3)",
                  animationDelay: `${index * 200}ms`,
                }}
              >
                <CardHeader className="pb-4 md:pb-6">
                  <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                    <div className="bg-gradient-to-br from-[#406577] to-[#84AEBC] p-3 md:p-4 rounded-2xl text-white shadow-xl group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      {service.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg sm:text-xl md:text-2xl text-[#406577] mb-2 md:mb-3 font-bold drop-shadow-lg group-hover:text-[#84AEBC] transition-colors duration-300 leading-tight">
                        {service.title}
                      </CardTitle>
                      <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-[#84AEBC] to-[#C7D1D8] rounded-full group-hover:w-24 md:group-hover:w-32 transition-all duration-500"></div>
                    </div>
                  </div>
                  <CardDescription className="text-[#406577] text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-6 font-medium drop-shadow-sm">
                    {service.description}
                  </CardDescription>

                  <div className="mb-4 md:mb-6">
                    <h4 className="text-[#406577] font-semibold mb-2 md:mb-3 text-base md:text-lg drop-shadow-sm">
                      Productos y servicios:
                    </h4>
                    <div className="grid grid-cols-1 gap-1 md:gap-2">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300"
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-[#84AEBC] to-[#C7D1D8] rounded-full group-hover:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                          <span className="text-[#84AEBC] text-xs sm:text-sm font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[#84AEBC] text-xs sm:text-sm leading-relaxed font-medium mb-3 md:mb-4 drop-shadow-sm">
                    {service.details}
                  </p>
                </CardHeader>
                <CardContent className="px-4 md:px-6">
                  <Button
                    className="w-full bg-gradient-to-r from-[#84AEBC] to-[#406577] hover:from-[#406577] hover:to-[#84AEBC] text-white border-0 py-3 md:py-4 text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    onClick={() => openWhatsApp(service.title, true)}
                  >
                    <MessageCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    Consultar Información
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#406577] mb-6 md:mb-8 drop-shadow-2xl">
              Tienda Natural
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-[#84AEBC] to-[#C7D1D8] mx-auto mb-6 md:mb-8 rounded-full animate-pulse"></div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#84AEBC] mb-4 md:mb-6 drop-shadow-lg">
              Aroma_Ticas
            </h3>
            <p className="text-base sm:text-lg md:text-xl text-[#406577] mb-4 md:mb-6 max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg px-2">
              Nuestra marca Aroma_Ticas ofrece productos elaborados artesanalmente con plantas medicinales. Cremas
              naturales, ungüentos y bálsamos, oleatos e infusiones, jabones y cosmética natural.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#84AEBC] mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg px-2">
              <strong>Filosofía:</strong> productos libres de químicos agresivos, respetuosos con el medio ambiente y
              creados para el cuidado integral de tu cuerpo.
            </p>

            {loading ? (
              <div className="text-center py-8">
                <div className="text-[#406577] text-lg">Cargando productos...</div>
              </div>
            ) : (
              <>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12 px-2">
                  {categories.map((category, index) => (
                    <Button
                      key={category.id}
                      variant={activeCategory === category.id ? "default" : "outline"}
                      size="lg"
                      className={
                        activeCategory === category.id
                          ? "bg-[#406577] text-white hover:bg-[#84AEBC] border-0 px-4 sm:px-6 md:px-8 py-2 md:py-3 text-sm sm:text-base md:text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                          : "bg-[#C7D1D8] border-2 border-[#406577]/60 text-[#406577] hover:bg-[#84AEBC] hover:text-white hover:border-[#406577]/80 backdrop-blur-sm px-4 sm:px-6 md:px-8 py-2 md:py-3 text-sm sm:text-base md:text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                      }
                      onClick={() => setActiveCategory(category.id)}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {filteredProducts.map((product, index) => (
                    <Card
                      key={product.id}
                      className="border backdrop-blur-md group hover:transform hover:scale-105 hover:shadow-2xl animate-on-scroll transition-all duration-700"
                      style={{
                        background: `linear-gradient(135deg, 
                          rgba(199, 209, 216, 0.08) 0%, 
                          rgba(132, 174, 188, 0.05) 100%)`,
                        borderColor: "rgba(199, 209, 216, 0.25)",
                        animationDelay: `${index * 150}ms`,
                      }}
                    >
                      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-t-lg">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#406577]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-gradient-to-r from-[#84AEBC] to-[#C7D1D8] text-[#406577] px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          Nuevo
                        </div>
                      </div>
                      <CardHeader className="pb-3 md:pb-4 px-4 md:px-6">
                        <CardTitle className="text-lg sm:text-xl text-[#406577] mb-2 font-bold drop-shadow-lg group-hover:text-[#84AEBC] transition-colors duration-300 leading-tight">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-[#84AEBC] font-semibold mb-3 md:mb-4 text-base sm:text-lg drop-shadow-lg leading-tight">
                          {product.subtitle}
                        </CardDescription>
                        <CardDescription className="text-[#406577] leading-relaxed font-medium drop-shadow-lg text-sm md:text-base">
                          {product.description}
                        </CardDescription>
                        <p className="text-[#84AEBC] text-xs sm:text-sm mt-2 md:mt-3 font-medium drop-shadow-lg">
                          A medida que la vela se consume, un mensaje oculto será revelado. Abre tu corazón y déjate
                          sorprender.
                        </p>
                      </CardHeader>
                      <CardContent className="px-4 md:px-6">
                        <Button
                          className="w-full bg-green-600 hover:bg-green-500 text-white border-0 py-2.5 md:py-3 text-sm sm:text-base md:text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                          onClick={() => openWhatsApp(product.name)}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                          Consultar por WhatsApp
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredProducts.length === 0 && !loading && (
                  <div className="text-center py-8">
                    <div className="text-[#406577] text-lg">No hay productos disponibles en esta categoría.</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-on-scroll">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#406577] mb-6 md:mb-8 drop-shadow-2xl">
              Contacto
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-[#84AEBC] to-[#C7D1D8] mx-auto mb-6 md:mb-8 rounded-full animate-pulse"></div>
            <p className="text-base sm:text-lg md:text-xl text-[#406577] max-w-4xl mx-auto leading-relaxed font-medium drop-shadow-lg mb-4 md:mb-6 px-2">
              Te esperamos en nuestro acogedor espacio en el centro histórico de Zapatoca, donde podrás conocer todos
              nuestros productos y servicios de primera mano en un ambiente cálido y familiar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            {[
              {
                icon: MapPin,
                title: "Nuestra Ubicación",
                content: (
                  <>
                    <p className="font-bold text-lg md:text-xl">Carrera 12 # 17-51</p>
                    <p className="text-base md:text-lg font-semibold">Zapatoca, Santander</p>
                    <p
                      className="mt-3 md:mt-4 font-medium drop-shadow-sm text-sm md:text-base"
                      style={{ color: "#84AEBC" }}
                    >
                      En el corazón del pueblo colonial, fácil acceso y parqueadero disponible
                    </p>
                    <p className="text-xs md:text-sm" style={{ color: "#84AEBC" }}>
                      Cerca de la plaza principal y sitios turísticos
                    </p>
                  </>
                ),
              },
              {
                icon: Clock,
                title: "Horarios de Atención",
                content: (
                  <>
                    <p className="font-bold text-lg md:text-xl">Miércoles a Lunes</p>
                    <p className="text-base md:text-lg font-semibold">Mañana: 9:00 AM - 12:00 PM</p>
                    <p className="text-base md:text-lg font-semibold">Tarde: 3:00 PM - 6:00 PM</p>
                    <p
                      className="mt-3 md:mt-4 font-medium drop-shadow-sm text-sm md:text-base"
                      style={{ color: "#84AEBC" }}
                    >
                      Los martes es nuestro día de descanso
                    </p>
                    <p className="text-xs md:text-sm" style={{ color: "#84AEBC" }}>
                      Atención personalizada - Citas especiales disponibles
                    </p>
                  </>
                ),
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="border backdrop-blur-md hover:scale-105 hover:shadow-2xl animate-on-scroll group transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(199, 209, 216, 0.12) 0%, 
                    rgba(132, 174, 188, 0.08) 100%)`,
                  borderColor: "rgba(199, 209, 216, 0.3)",
                }}
              >
                <CardHeader className="pb-4 md:pb-6">
                  <CardTitle className="text-[#406577] flex items-center gap-3 text-lg sm:text-xl md:text-2xl font-bold drop-shadow-lg">
                    <div className="bg-gradient-to-br from-[#84AEBC] to-[#406577] p-2.5 md:p-3 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 flex-shrink-0">
                      <item.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <span className="leading-tight">{item.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-[#406577] space-y-2 md:space-y-3 text-left drop-shadow-lg text-sm md:text-base px-4 md:px-6">
                  {item.content}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mb-8 md:mb-12 animate-on-scroll">
            <Card
              className="border backdrop-blur-md hover:scale-105 hover:shadow-2xl max-w-2xl mx-auto transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(199, 209, 216, 0.12) 0%, 
                  rgba(132, 174, 188, 0.08) 100%)`,
                borderColor: "rgba(199, 209, 216, 0.3)",
              }}
            >
              <CardHeader>
                <CardTitle className="text-[#406577] text-xl md:text-2xl font-bold drop-shadow-lg">Políticas</CardTitle>
              </CardHeader>
              <CardContent className="text-[#406577] space-y-2 md:space-y-3 text-left drop-shadow-lg text-sm md:text-base px-4 md:px-6">
                <p>
                  <strong>Pagos:</strong> Se aceptan transferencias, efectivo y medios digitales.
                </p>
                <p>
                  <strong>Envíos:</strong> Cobertura nacional, tiempos de entrega entre 3 y 5 días hábiles.
                </p>
                <p>
                  <strong>Cambios y devoluciones:</strong> Aplican solo en productos físicos, no en servicios.
                </p>
                <p>
                  <strong>Privacidad:</strong> Los datos de nuestros clientes son confidenciales.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center animate-on-scroll">
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-500 text-white rounded-full p-4 md:p-5 shadow-2xl border-0 hover:scale-110 transition-all duration-300 w-full sm:w-auto"
              onClick={() => openWhatsApp()}
            >
              <MessageCircle className="mr-2 md:mr-3 h-5 w-5 md:h-6 md:w-6" />
              Contactar: 312 420 2504
            </Button>
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50">
        <Button
          className="bg-green-600 hover:bg-green-500 text-white rounded-full p-4 md:p-5 shadow-2xl border-0 hover:scale-110 transition-all duration-300 animate-pulse-slow"
          onClick={() => openWhatsApp()}
        >
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
        </Button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 20s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-on-scroll {
          opacity: 0.3;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .animate-on-scroll.animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}
