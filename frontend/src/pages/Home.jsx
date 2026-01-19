import { Link } from 'react-router-dom';
import { FaCubes, FaUtensils, FaArrowRight, FaStar, FaCheck } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-light">
            {/* Hero Section - Premium Light Industrial Theme (Refined) */}
            <section className="relative min-h-[700px] flex items-center overflow-hidden bg-stone-200">
                {/* Background Overlay with Gradient */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="/textures/nogal_terracota.jpg"
                        alt="Luxury Wood Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-stone-200 via-stone-200/95 to-transparent"></div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-secondary/50 backdrop-blur-sm border border-brand-wood/20 text-brand-wood text-sm font-medium mb-8 animate-fade-in-up">
                            <FaStar className="text-xs" />
                            <span>La Nueva Era en Carpintería Industrial</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-brand-dark tracking-tight">
                            Diseño que <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-wood">Inspira</span>,<br />
                            Precisión que Perdura.
                        </h1>

                        <p className="text-xl md:text-2xl mb-10 text-gray-600 font-light leading-relaxed max-w-2xl">
                            Fusionamos la calidez de la madera con la exactitud del CNC. Diseña tu clóset ideal o descubre accesorios de cocina de grado profesional.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link
                                to="/configurador"
                                className="group relative px-8 py-4 bg-brand-wood text-white rounded-full font-semibold text-lg overflow-hidden transition-all hover:bg-opacity-90 hover:scale-105 hover:shadow-lg hover:shadow-brand-wood/30"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Configurar Clóset 3D
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            <Link
                                to="/productos"
                                className="px-8 py-4 bg-transparent border-2 border-brand-wood text-brand-wood rounded-full font-bold text-lg hover:bg-brand-wood hover:text-white transition-all hover:shadow-lg"
                            >
                                Accesorios de Cocina
                            </Link>
                        </div>

                        <div className="mt-12 flex gap-8 text-sm text-gray-500 font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-brand-wood/20 flex items-center justify-center text-brand-wood"><FaCheck size={10} /></div>
                                Envíos a todo México
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-brand-wood/20 flex items-center justify-center text-brand-wood"><FaCheck size={10} /></div>
                                Garantía de por vida
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Featured Modules - Floating Cards */}
            <section className="relative z-20 -mt-24 pb-20 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">

                    {/* Card 1: Closets */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100" onClick={() => window.location.href = '/configurador'}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-brand-secondary rounded-xl text-brand-wood group-hover:bg-brand-wood group-hover:text-white transition-colors duration-300">
                                <FaCubes className="text-3xl" />
                            </div>
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">B2B & Hogar</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-brand-dark group-hover:text-brand-wood transition-colors">Configurador Inteligente Closets</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Herramienta 3D profesional para arquitectos y particulares. Visualiza materiales, calcula costos en tiempo real y descarga planos de corte.
                        </p>
                        <div className="flex items-center text-brand-wood font-semibold group-hover:translate-x-2 transition-transform">
                            Empezar proyecto <FaArrowRight className="ml-2" />
                        </div>
                    </div>

                    {/* Card 2: Vestidores (NEW) */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100" onClick={() => window.location.href = '/vestidores'}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-brand-light rounded-xl text-brand-wood group-hover:bg-brand-wood group-hover:text-white transition-colors duration-300">
                                {/* Using FaStar as a placeholder for a 'Look' or 'Style' icon until imported */}
                                <FaStar className="text-3xl" />
                            </div>
                            <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Alta Gama</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-brand-dark group-hover:text-brand-wood transition-colors">Configurador Inteligente Vestidores</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Diseña espacios exclusivos tipo walk-in closet. Personaliza islas, zapateras y áreas de lujo con acabados premium.
                        </p>
                        <div className="flex items-center text-brand-wood font-semibold group-hover:translate-x-2 transition-transform">
                            Diseñar Vestidor <FaArrowRight className="ml-2" />
                        </div>
                    </div>

                    {/* Card 3: Accesorios de Cocina */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100" onClick={() => window.location.href = '/productos'}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-brand-light rounded-xl text-brand-wood group-hover:bg-brand-wood group-hover:text-white transition-colors duration-300">
                                <FaUtensils className="text-3xl" />
                            </div>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Colección Chef</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-brand-dark group-hover:text-brand-wood transition-colors">Accesorios de Cocina</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Piezas únicas fabricadas con maderas exóticas y acabados aptos para alimentos. La elección número uno de restaurantes y chefs.
                        </p>
                        <div className="flex items-center text-brand-wood font-semibold group-hover:translate-x-2 transition-transform">
                            Explorar tienda <FaArrowRight className="ml-2" />
                        </div>
                    </div>

                    {/* Card 4: Otros (NEW) */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100" onClick={() => window.location.href = '/otros-productos'}>
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-4 bg-brand-light rounded-xl text-brand-wood group-hover:bg-brand-wood group-hover:text-white transition-colors duration-300">
                                <FaCubes className="text-3xl" />
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Acrílicos y Más</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-brand-dark group-hover:text-brand-wood transition-colors">Otros</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Vitrinas de acrílico con vista 3D transparente, exhibidores y soluciones personalizadas para tu negocio.
                        </p>
                        <div className="flex items-center text-brand-wood font-semibold group-hover:translate-x-2 transition-transform">
                            Ver catálogo <FaArrowRight className="ml-2" />
                        </div>
                    </div>

                </div>
            </section>

            {/* Featured Projects Section (Masonry Grid) */}
            <section className="py-24 bg-stone-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div>
                            <span className="text-brand-accent font-bold tracking-widest uppercase text-sm mb-2 block">Portafolio Selecto</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark tracking-tight">
                                Proyectos <span className="text-brand-wood">Recientes</span>
                            </h2>
                        </div>
                        <p className="text-brand-dark/70 max-w-md text-lg leading-relaxed">
                            Explora nuestra colección de espacios transformados con precisión industrial y diseño arquitectónico.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

                        {/* HERO ITEM (Sliding Doors) - Spans 2 cols, 2 rows */}
                        <div className="group relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden shadow-xl cursor-zoom-in">
                            <img
                                src="/projects/project-hero-sliding.jpg"
                                alt="Vestidor Residencial con Iluminación"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-brand-accent font-bold text-sm tracking-wider mb-1">RESIDENCIAL • VALLE ORIENTE</span>
                                <h3 className="text-white text-2xl font-bold">Vestidor Master Suite con Iluminación Integrada</h3>
                            </div>
                        </div>

                        {/* DETAIL 1 (Drawers) */}
                        <div className="group relative rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src="/projects/project-detail-1.jpg"
                                alt="Detalle de Cajones"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-medium tracking-wide border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">Ver Detalle</span>
                            </div>
                        </div>

                        {/* DETAIL 2 (Shelving) */}
                        <div className="group relative rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src="/projects/project-detail-2.jpg"
                                alt="Organización Interna"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white font-medium tracking-wide border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">Organización</span>
                            </div>
                        </div>

                        {/* CONTEXT 1 (Closet Angle) - Spans 1 col, 2 rows (Tall) */}
                        <div className="group relative md:row-span-2 rounded-2xl overflow-hidden shadow-xl">
                            <img
                                src="/projects/project-context-1.jpg"
                                alt="Vista Vertical"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl font-bold">Acabados Premium</h3>
                            </div>
                        </div>

                        {/* CONTEXT 2 (Filler) */}
                        <div className="group relative rounded-2xl overflow-hidden shadow-lg md:col-start-3">
                            <img
                                src="/projects/project-context-2.jpg"
                                alt="Detalle Carpintería"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/vestidores" className="inline-flex items-center gap-2 text-brand-wood font-bold hover:text-brand-accent transition-colors border-b-2 border-brand-wood hover:border-brand-accent pb-1">
                            Ver Galería Completa <FiArrowRight />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
