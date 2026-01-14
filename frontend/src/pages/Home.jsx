import { Link } from 'react-router-dom';
import { FaCubes, FaUtensils, FaArrowRight, FaStar, FaCheck } from 'react-icons/fa';

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-brand-light">
            {/* Hero Section - Premium Dark Theme */}
            <section className="relative min-h-[700px] flex items-center overflow-hidden bg-brand-dark">
                {/* Background Overlay with Gradient */}
                <div className="absolute inset-0 z-0 opacity-40">
                    <img
                        src="/textures/nogal_terracota.jpg"
                        alt="Luxury Wood Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-transparent"></div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-brand-accent text-sm font-medium mb-8 animate-fade-in-up">
                            <FaStar className="text-xs" />
                            <span>La Nueva Era en Carpintería Industrial</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white tracking-tight">
                            Diseño que <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-200">Inspira</span>,<br />
                            Precisión que Perdura.
                        </h1>

                        <p className="text-xl md:text-2xl mb-10 text-gray-400 font-light leading-relaxed max-w-2xl">
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
                                className="px-8 py-4 bg-transparent border border-gray-600 text-white rounded-full font-medium text-lg hover:bg-white/5 hover:border-white transition-all backdrop-blur-sm"
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
                            <div className="p-4 bg-brand-light rounded-xl text-brand-wood group-hover:bg-brand-wood group-hover:text-white transition-colors duration-300">
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
        </div>
    );
}
