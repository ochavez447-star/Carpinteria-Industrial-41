import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaCube, FaRulerVertical, FaRulerHorizontal, FaArrowsAltH } from 'react-icons/fa';
import AcrylicViewer3D from '../components/AcrylicViewer3D';

/**
 * Acrylic Display Case Configurator
 * Calculates price based on dimensions (surface area estimation)
 */
const AcrylicConfigurator = () => {
    const [dims, setDims] = useState({ length: 30, width: 20, height: 15 }); // cm
    const [baseType, setBaseType] = useState('flat'); // 'flat' | 'stepped'
    const [stepsCount, setStepsCount] = useState(3);
    const [price, setPrice] = useState(0);

    // Pricing Constants (Example placeholder logic)
    const PRICE_PER_CM2 = 0.15;
    const BASE_FEE = 200;
    const STEP_FEE = 50; // Fee per individual step

    useEffect(() => {
        calculatePrice();
    }, [dims, baseType, stepsCount]);

    const calculatePrice = () => {
        const surfaceArea = (2 * dims.length * dims.height) + (2 * dims.width * dims.height) + (2 * dims.length * dims.width);

        // Base cost calculation
        let calculated = (surfaceArea * PRICE_PER_CM2) + BASE_FEE;

        // Add cost for steps if selected
        if (baseType === 'stepped') {
            calculated += (STEP_FEE * stepsCount) + (dims.length * 2 * stepsCount);
        }

        setPrice(Math.round(calculated));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDims(prev => ({
            ...prev,
            [name]: Math.max(0, parseFloat(value) || 0)
        }));
    };

    const handleWhatsAppClick = () => {
        const baseText = baseType === 'stepped' ? `Con Gradas (${stepsCount} escalones)` : 'Base Plana';
        const message = `Hola Madera Precisa, me interesa cotizar una Vitrina de Acrílico con estas especificaciones:\n\n` +
            `📏 Largo: ${dims.length} cm\n` +
            `📏 Ancho: ${dims.width} cm\n` +
            `📏 Alto: ${dims.height} cm\n` +
            `🏗️ Estilo: ${baseText}\n\n` +
            `💰 Precio Estimado: $${price.toLocaleString()}\n\n` +
            `¿Me podrían confirmar disponibilidad y tiempo de entrega?`;

        const url = `https://wa.me/5215585814258?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-brand-light py-12 px-4 flex items-center justify-center">
            <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 items-start">

                {/* Visualizer (3D Canvas) */}
                <div className="bg-white rounded-3xl p-2 shadow-xl border border-brand-accent/10 h-[500px] md:h-[600px] flex flex-col relative overflow-hidden">
                    <AcrylicViewer3D
                        length={dims.length}
                        width={dims.width}
                        height={dims.height}
                        baseType={baseType}
                        stepsCount={stepsCount}
                    />

                    <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-sm font-bold text-brand-dark flex items-center gap-2">
                            <FaCube className="text-brand-accent" />
                            Vista Previa 3D
                        </h2>
                    </div>
                </div>

                {/* Controls */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-brand-accent/10 flex flex-col gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-dark mb-2">Configurar Vitrina</h1>
                        <p className="text-gray-500 text-sm">Diseña tu vitrina a medida. Ideal para autos a escala, figuras y coleccionables.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Base Type Selection */}
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <label className="block text-sm font-bold text-brand-dark mb-3">Tipo de Base</label>
                            <div className="grid grid-cols-2 gap-3 mb-4">
                                <button
                                    onClick={() => setBaseType('flat')}
                                    className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${baseType === 'flat'
                                            ? 'bg-brand-wood text-white shadow-md'
                                            : 'bg-white text-gray-600 border border-gray-300 hover:border-brand-wood'
                                        }`}
                                >
                                    Base Plana
                                </button>
                                <button
                                    onClick={() => setBaseType('stepped')}
                                    className={`px-4 py-3 rounded-lg text-sm font-semibold transition-all ${baseType === 'stepped'
                                            ? 'bg-brand-wood text-white shadow-md'
                                            : 'bg-white text-gray-600 border border-gray-300 hover:border-brand-wood'
                                        }`}
                                >
                                    Con Gradas
                                </button>
                            </div>

                            {/* Stepped Details (Conditional) */}
                            {baseType === 'stepped' && (
                                <div className="animate-fade-in-down">
                                    <label className="flex items-center justify-between text-sm font-bold text-brand-dark mb-2">
                                        <span>Número de Escalones</span>
                                        <span className="text-brand-wood">{stepsCount}</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="5"
                                        step="1"
                                        value={stepsCount}
                                        onChange={(e) => setStepsCount(parseInt(e.target.value))}
                                        className="w-full accent-brand-wood"
                                    />
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>1</span>
                                        <span>5</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Dimensions Inputs */}
                        <div className="space-y-4">
                            {/* Length */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-brand-dark mb-2">
                                    <FaArrowsAltH className="text-brand-wood" /> Largo (cm)
                                </label>
                                <div className="flex gap-4 items-center">
                                    <input
                                        type="range"
                                        name="length"
                                        min="10" max="120"
                                        value={dims.length}
                                        onChange={handleInputChange}
                                        className="flex-grow accent-brand-wood"
                                    />
                                    <input
                                        type="number"
                                        name="length"
                                        value={dims.length}
                                        onChange={handleInputChange}
                                        className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-center font-bold focus:ring-2 focus:ring-brand-accent/50 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Width */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-brand-dark mb-2">
                                    <span className="transform -rotate-45 block"><FaArrowsAltH className="text-brand-wood" /></span> Profundidad (cm)
                                </label>
                                <div className="flex gap-4 items-center">
                                    <input
                                        type="range"
                                        name="width"
                                        min="10" max="80"
                                        value={dims.width}
                                        onChange={handleInputChange}
                                        className="flex-grow accent-brand-wood"
                                    />
                                    <input
                                        type="number"
                                        name="width"
                                        value={dims.width}
                                        onChange={handleInputChange}
                                        className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-center font-bold focus:ring-2 focus:ring-brand-accent/50 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Height */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-bold text-brand-dark mb-2">
                                    <FaRulerVertical className="text-brand-wood" /> Alto (cm)
                                </label>
                                <div className="flex gap-4 items-center">
                                    <input
                                        type="range"
                                        name="height"
                                        min="10" max="100"
                                        value={dims.height}
                                        onChange={handleInputChange}
                                        className="flex-grow accent-brand-wood"
                                    />
                                    <input
                                        type="number"
                                        name="height"
                                        value={dims.height}
                                        onChange={handleInputChange}
                                        className="w-20 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-center font-bold focus:ring-2 focus:ring-brand-accent/50 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-dashed border-gray-300 my-2 pt-6">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-gray-500 font-medium">Precio Estimado</span>
                            <span className="text-4xl font-bold text-brand-wood">${price.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-right text-gray-400 mb-6">IVA incluido. Envío se cotiza aparte.</p>

                        <button
                            onClick={handleWhatsAppClick}
                            className="w-full bg-brand-wood text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:bg-brand-wood/90 transition-all flex items-center justify-center gap-3 text-lg"
                        >
                            <FaWhatsapp className="text-2xl" />
                            Cotizar por WhatsApp
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AcrylicConfigurator;
