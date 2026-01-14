import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxOpen, FaArrowRight } from 'react-icons/fa';

/**
 * Menu page for "Otros Productos"
 */
const OtherProducts = () => {
    return (
        <div className="min-h-screen bg-brand-light py-12 px-4">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold text-brand-dark mb-2 text-center">Otros Productos</h1>
                <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
                    Soluciones especializadas para exhibición, organización y decoración.
                </p>

                <div className="grid md:grid-cols-2 gap-8">

                    {/* Acrylic Display Card */}
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group hover:shadow-xl transition-all">
                        <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div> {/* Glass effect placaholder */}
                            <FaBoxOpen className="text-6xl text-brand-wood/50 relative z-10" />
                            <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-brand-dark shadow-sm">
                                A Medida
                            </div>
                        </div>
                        <div className="p-8">
                            <h2 className="text-2xl font-bold text-brand-dark mb-3">Vitrinas Exhibidoras de Acrílico</h2>
                            <p className="text-gray-600 mb-6">
                                Protege tus colecciones de Legos, autos a escala y figuras de acción del polvo y la humedad. Fabricadas con acrílico de alta transparencia y corte láser preciso.
                            </p>
                            <ul className="text-sm text-gray-500 mb-6 space-y-2">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>Acrílico Premium 3mm/5mm</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>Base personalizada (Madera/Negro)</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>Cotización inmediata por tamaño</li>
                            </ul>

                            <Link to="/otros-productos/vitrinas-acrilico" className="block w-full bg-brand-wood text-white text-center py-3 rounded-xl font-bold hover:bg-brand-wood/90 transition-colors flex items-center justify-center gap-2 group-hover:gap-4">
                                Configurar Medidas <FaArrowRight />
                            </Link>
                        </div>
                    </div>

                    {/* Placeholder for Future Product */}
                    <div className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center p-12 opacity-60">
                        <p className="font-bold text-gray-400 text-lg mb-2">Próximamente</p>
                        <p className="text-sm text-gray-400">Más soluciones de organización en camino.</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OtherProducts;
