import React from 'react';
import { Link } from 'react-router-dom';
import { FaRulerCombined, FaLayerGroup, FaLightbulb, FaGem } from 'react-icons/fa';

const Vestidores = () => {
    return (
        <div className="min-h-screen bg-brand-light font-sans">
            {/* Hero Section - Warm Architectural Theme */}
            <div className="relative pt-24 pb-32 px-4 overflow-hidden bg-stone-200 flex items-center min-h-[500px]">
                {/* Background Overlay with Gradient */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <img
                        src="/textures/nogal_terracota.jpg"
                        alt="Luxury Wood Texture"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-stone-200/90 via-stone-200/95 to-brand-light"></div>

                <div className="container mx-auto text-center relative z-20">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-brand-dark">
                        El Vestidor de <span className="text-brand-wood">tus Sueños</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
                        Transformamos espacios en experiencias. Diseño de altura, materiales premium y una organización que inspira cada mañana.
                    </p>
                    <Link to="/configurador" className="inline-block bg-brand-wood hover:bg-brand-dark text-white font-bold py-4 px-10 rounded-full text-lg transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                        Diseñar mi Vestidor 3D
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 -mt-24 relative z-30">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 text-center group hover:border-brand-wood/30 transition-all">
                        <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-3xl text-brand-wood mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <FaRulerCombined />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-4">A Tu Medida</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Aprovechamos cada milímetro. Desde techos altos hasta esquinas complejas, diseñamos islas, zapateras y áreas de colgado que encajan a la perfección.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 text-center group hover:border-brand-wood/30 transition-all">
                        <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-3xl text-brand-wood mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <FaGem />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-4">Lujo y Detalle</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Selección exclusiva de texturas: maderas naturales, alto brillo, vidrio tintado y herrajes de cierre suave que definen la calidad.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-stone-100 text-center group hover:border-brand-wood/30 transition-all">
                        <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-3xl text-brand-wood mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <FaLightbulb />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-4">Tecnología LED</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Iluminación integrada en barras y repisas. Sensores de movimiento que encienden tu colección al entrar.
                        </p>
                    </div>
                </div>
            </div>

            {/* Inspiration Gallery */}
            <div className="py-24 bg-white mt-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-brand-accent font-bold tracking-widest uppercase text-sm">Portafolio</span>
                        <h2 className="text-4xl font-bold text-brand-dark mt-2">Inspiración Real</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto md:h-[600px]">
                        {/* Gallery Item 1 (Large - Walk-in) */}
                        <div className="relative group overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 shadow-lg cursor-zoom-in">
                            <img
                                src="/projects/vestidor-walk-in-hero.png"
                                alt="Walk-in Boutique"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <h3 className="text-white text-3xl font-bold mb-1">Walk-in Boutique</h3>
                                <p className="text-gray-300 text-sm">Residencia Lomas - Acabado Nogal Terracota</p>
                            </div>
                        </div>

                        {/* Gallery Item 2 (L Shape / Context) */}
                        <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                            <img
                                src="/projects/vestidor-l-shape-hero.png"
                                alt="Closet en L"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl font-bold">Closet en L</h3>
                                <p className="text-gray-300 text-xs">Optimización de espacio</p>
                            </div>
                        </div>

                        {/* Gallery Item 3 (Island / Drawers) */}
                        <div className="relative group overflow-hidden rounded-2xl shadow-lg">
                            <img
                                src="/projects/vestidor-island-hero.png"
                                alt="Isla Central"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <h3 className="text-white text-xl font-bold">Isla Central</h3>
                                <p className="text-gray-300 text-xs">Con cajones joyeros</p>
                            </div>
                        </div>

                        {/* Gallery Item 4 (Wide - Vitrinas) */}
                        <div className="relative group overflow-hidden rounded-2xl md:col-span-2 shadow-lg">
                            <img
                                src="/projects/vestidor-vitrinas-hero.png"
                                alt="Vitrinas Iluminadas"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-center"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <h3 className="text-white text-2xl font-bold">Vitrinas Iluminadas</h3>
                                <p className="text-gray-300 text-sm">Para bolsos y zapatos exclusivos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="py-20 bg-stone-50 text-center border-t border-stone-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-brand-dark mb-6">Comienza tu Proyecto</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        No necesitas imaginarlo. Usa nuestra herramienta inteligente para crear una propuesta en minutos.
                    </p>
                    <Link to="/configurador" className="bg-brand-wood text-white font-bold py-4 px-12 rounded-xl shadow-xl hover:bg-brand-dark transition-colors text-lg">
                        Ir al Configurador Inteligente
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Vestidores;
