import React from 'react';
import { Link } from 'react-router-dom';
import { FaRulerCombined, FaLayerGroup, FaLightbulb, FaGem } from 'react-icons/fa';

const Vestidores = () => {
    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <div className="bg-brand-dark text-white pt-24 pb-32 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-wood opacity-10 rounded-l-full transform translate-x-1/3"></div>
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                        El Vestidor de <span className="text-brand-wood">tus Sueños</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
                        Transformamos espacios en experiencias. Diseño de altura, materiales premium y una organización que inspira cada mañana.
                    </p>
                    <Link to="/configurador" className="inline-block bg-brand-wood hover:bg-white hover:text-brand-dark text-white font-bold py-4 px-10 rounded-full text-lg transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
                        Diseñar mi Vestidor 3D
                    </Link>
                </div>
            </div>

            {/* Features Grid */}
            <div className="container mx-auto px-4 -mt-24 relative z-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center group hover:border-brand-wood/30 transition-all">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl text-brand-wood mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <FaRulerCombined />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-4">A Tu Medida</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Aprovechamos cada milímetro. Desde techos altos hasta esquinas complejas, diseñamos islas, zapateras y áreas de colgado que encajan a la perfección.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center group hover:border-brand-wood/30 transition-all">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl text-brand-wood mx-auto mb-6 group-hover:scale-110 transition-transform">
                            <FaGem />
                        </div>
                        <h3 className="text-2xl font-bold text-brand-dark mb-4">Lujo y Detalle</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Selección exclusiva de texturas: maderas naturales, alto brillo, vidrio tintado y herrajes de cierre suave que definen la calidad.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 text-center group hover:border-brand-wood/30 transition-all">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl text-brand-wood mx-auto mb-6 group-hover:scale-110 transition-transform">
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
            <div className="py-24 bg-gray-50 mt-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-brand-wood font-bold tracking-widest uppercase text-sm">Portafolio</span>
                        <h2 className="text-4xl font-bold text-brand-dark mt-2">Inspiración Real</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto md:h-[600px]">
                        {/* Gallery Item 1 (Large) */}
                        <div className="relative group overflow-hidden rounded-2xl md:col-span-2 md:row-span-2 bg-gray-800 shadow-lg">
                            {/* Placeholder Image Div */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:scale-105 transition-transform duration-700"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <span className="text-9xl text-white font-serif italic">1</span>
                            </div>
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <h3 className="text-white text-2xl font-bold mb-1">Walk-in Boutique</h3>
                                <p className="text-gray-300 text-sm">Residencia Lomas - Acabado Nogal Terracota</p>
                            </div>
                        </div>

                        {/* Gallery Item 2 */}
                        <div className="relative group overflow-hidden rounded-2xl bg-gray-800 shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-stone-600 to-stone-800 group-hover:scale-105 transition-transform duration-700"></div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <h3 className="text-white text-xl font-bold">Closet en L</h3>
                                <p className="text-gray-300 text-xs">Acabado Blanco Mate</p>
                            </div>
                        </div>

                        {/* Gallery Item 3 */}
                        <div className="relative group overflow-hidden rounded-2xl bg-gray-800 shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800 group-hover:scale-105 transition-transform duration-700"></div>
                            <div className="absolute bottom-0 left-0 p-6">
                                <h3 className="text-white text-xl font-bold">Isla Central</h3>
                                <p className="text-gray-300 text-xs">Con cajones joyeros</p>
                            </div>
                        </div>

                        {/* Gallery Item 4 (Wide) */}
                        <div className="relative group overflow-hidden rounded-2xl md:col-span-2 bg-gray-800 shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 group-hover:scale-105 transition-transform duration-700"></div>
                            <div className="absolute bottom-0 left-0 p-6 flex flex-col justify-end h-full">
                                <h3 className="text-white text-xl font-bold">Vitrinas Iluminadas</h3>
                                <p className="text-gray-300 text-xs">Para bolsos y zapatos exclusivos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div className="py-20 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-brand-dark mb-6">Comienza tu Proyecto</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        No necesitas imaginarlo. Usa nuestra herramienta inteligente para crear una propuesta en minutos.
                    </p>
                    <Link to="/configurador" className="bg-brand-dark text-white font-bold py-4 px-12 rounded-xl shadow-xl hover:bg-brand-wood transition-colors text-lg">
                        Ir al Configurador Inteligente
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Vestidores;
