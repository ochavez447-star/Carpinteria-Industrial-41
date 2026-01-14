import { useState } from 'react';
import { useConfiguratorStore } from '../store/configuratorStore';
import ClosetViewer3D from '../components/ClosetViewer3D';
import materialsData from '../../../data/materials.json';
import { FaRuler, FaPalette, FaCalculator } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ClosetConfigurator() {
    const {
        width, height, depth, modules,
        melamine, thickness, hasDoors, doorsOpen, internalConfig,
        setDimension, setMelamine, setThickness, setHasDoors, setDoorsOpen, setModuleType
    } = useConfiguratorStore();

    const [showCustomerForm, setShowCustomerForm] = useState(false);
    const [activeTab, setActiveTab] = useState('dimensions');
    const [customerData, setCustomerData] = useState({
        name: '',
        whatsapp: '',
        email: ''
    });

    const selectedMaterial = materialsData.melamine.find(m => m.id === melamine);
    const materialCost = thickness === 15 ? selectedMaterial.thickness_15mm : selectedMaterial.thickness_18mm;

    // Simple pricing calculation (will be replaced by backend API)
    const estimatedSheets = Math.ceil((width * height * modules) / (1220 * 2440 * 1000));
    const totalMaterialCost = estimatedSheets * materialCost;
    const hardwareCost = 450 + (modules * 120) + ((height / 1000) * 25);
    const totalPrice = (totalMaterialCost * 2.5) + hardwareCost;

    const handleCalculateQuote = () => {
        setShowCustomerForm(true);
    };

    const handleSubmitQuote = async (e) => {
        e.preventDefault();

        if (!customerData.name || !customerData.whatsapp || !customerData.email) {
            toast.error('Por favor completa todos los campos');
            return;
        }

        // TODO: Send to backend API
        const quoteData = {
            customer: customerData,
            dimensions: { width, height, depth, modules },
            material: { melamine, thickness },
            pricing: {
                materialCost: totalMaterialCost,
                hardwareCost,
                total: totalPrice
            }
        };

        console.log('Quote:', quoteData);
        toast.success('¡Cotización generada! Revisa tu WhatsApp');

        // Generate WhatsApp message
        const message = `🪑 *Cotización Madera Precisa*\n\n` +
            `📐 Dimensiones: ${width}×${height}×${depth}mm\n` +
            `📦 Módulos: ${modules}\n` +
            `🎨 Material: ${selectedMaterial.name} ${thickness}mm\n\n` +
            `💰 *Total: $${totalPrice.toFixed(2)} MXN*\n\n` +
            `Cliente: ${customerData.name}`;

        const whatsappUrl = `https://wa.me/5215512345678?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const presets = [
        { name: 'Estándar 2m', width: 2000, height: 2400, depth: 600, modules: 2 },
        { name: 'Doble 3m', width: 3000, height: 2400, depth: 600, modules: 3 },
        { name: 'Walk-in 4m', width: 4000, height: 2600, depth: 800, modules: 4 },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-brand-dark mb-2">Configurador de Clósets 3D</h1>
            <p className="text-gray-600 mb-8">Diseña tu clóset personalizado y obtén una cotización instantánea</p>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Panel - Controls */}
                <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Tabs Header */}
                    <div className="flex border-b border-gray-200">
                        {[
                            { id: 'dimensions', label: 'Medidas', icon: FaRuler },
                            { id: 'layout', label: 'Distribución', icon: FaCalculator }, // Using Calculator icon as placeholder for layout or import FaLayerGroup
                            { id: 'materials', label: 'Acabados', icon: FaPalette },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-4 flex items-center justify-center gap-2 text-sm font-semibold transition-colors ${activeTab === tab.id
                                    ? 'text-brand-wood border-b-2 border-brand-wood bg-brand-wood/5'
                                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <tab.icon />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300">

                        {/* Tab: Dimensions */}
                        {activeTab === 'dimensions' && (
                            <div className="space-y-8 animate-fadeIn">
                                {/* Presets */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Medidas Predefinidas</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {presets.map((preset) => (
                                            <button
                                                key={preset.name}
                                                onClick={() => {
                                                    setDimension('width', preset.width);
                                                    setDimension('height', preset.height);
                                                    setDimension('depth', preset.depth);
                                                    setDimension('modules', preset.modules);
                                                }}
                                                className="px-3 py-2 text-xs font-medium bg-gray-100 hover:bg-brand-wood hover:text-white rounded-lg transition-colors border border-gray-200"
                                            >
                                                {preset.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sliders */}
                                <div className="space-y-6">
                                    {[
                                        { label: 'Ancho Total', val: width, set: 'width', min: 1000, max: 4000, step: 100 },
                                        { label: 'Altura', val: height, set: 'height', min: 1800, max: 2800, step: 100 },
                                        { label: 'Profundidad', val: depth, set: 'depth', min: 400, max: 800, step: 50 },
                                        { label: 'Cantidad de Módulos', val: modules, set: 'modules', min: 1, max: 6, step: 1 }
                                    ].map((control) => (
                                        <div key={control.label}>
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-medium text-gray-700">{control.label}</label>
                                                <span className="text-sm font-bold text-brand-wood">{control.val} {control.set === 'modules' ? '' : 'mm'}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min={control.min}
                                                max={control.max}
                                                step={control.step}
                                                value={control.val}
                                                onChange={(e) => setDimension(control.set, parseInt(e.target.value))}
                                                className="w-full accent-brand-wood h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tab: Layout/Distribution */}
                        {activeTab === 'layout' && (
                            <div className="space-y-8 animate-fadeIn">
                                {/* Doors Configuration */}
                                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Configuración de Puertas</h3>

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-medium text-gray-700">Incluir Puertas</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={hasDoors}
                                                onChange={(e) => setHasDoors(e.target.checked)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-wood/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-wood"></div>
                                        </label>
                                    </div>

                                    <div className={`flex items-center justify-between pl-4 border-l-2 border-brand-wood/20 transition-opacity ${!hasDoors ? 'opacity-40 pointer-events-none' : 'opacity-100'}`}>
                                        <span className="text-sm font-medium text-gray-600">↳ Abrir para ver interior</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={doorsOpen}
                                                onChange={(e) => setDoorsOpen(e.target.checked)}
                                                className="sr-only peer"
                                                disabled={!hasDoors}
                                            />
                                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-wood"></div>
                                        </label>
                                    </div>
                                </div>

                                {/* Modules Configuration */}
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Distribución Interior</h3>
                                    <div className="space-y-3">
                                        {Array.from({ length: modules }).map((_, i) => (
                                            <div key={i} className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg hover:border-brand-wood/30 transition-colors bg-white">
                                                <div className="w-8 h-8 rounded-full bg-brand-light text-brand-wood flex items-center justify-center font-bold text-sm">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1 grid grid-cols-2 gap-2">
                                                    {[
                                                        { id: 'shelves', label: 'Repisas' },
                                                        { id: 'drawers', label: 'Cajones' },
                                                        { id: 'hanging_short', label: 'C. Doble' },
                                                        { id: 'hanging_long', label: 'C. Largo' }
                                                    ].map((opt) => (
                                                        <button
                                                            key={opt.id}
                                                            onClick={() => setModuleType(i, opt.id)}
                                                            className={`text-xs py-1.5 px-2 rounded-md transition-all ${(internalConfig[i] || 'shelves') === opt.id
                                                                ? 'bg-brand-wood text-white shadow-sm'
                                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                                                }`}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: Materials */}
                        {activeTab === 'materials' && (
                            <div className="space-y-8 animate-fadeIn">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Selección de Melamina</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {materialsData.melamine.map((mat) => (
                                            <button
                                                key={mat.id}
                                                onClick={() => setMelamine(mat.id)}
                                                className={`group relative overflow-hidden rounded-xl border-2 transition-all text-left ${melamine === mat.id ? 'border-brand-wood ring-2 ring-brand-wood/20' : 'border-gray-200 hover:border-brand-accent'
                                                    }`}
                                            >
                                                <div className="aspect-video w-full relative">
                                                    <div
                                                        className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110"
                                                        style={{ backgroundColor: mat.color_hex, backgroundImage: `url(${mat.texture})` }}
                                                    />
                                                    {melamine === mat.id && (
                                                        <div className="absolute inset-0 bg-brand-wood/20 flex items-center justify-center">
                                                            <div className="bg-white rounded-full p-1 text-brand-wood">
                                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-3 bg-white">
                                                    <p className="font-semibold text-sm text-gray-900">{mat.name}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Grosor de Material</h3>
                                    <div className="flex p-1 bg-gray-100 rounded-lg">
                                        {[15, 18].map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setThickness(t)}
                                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${thickness === t
                                                    ? 'bg-white text-brand-wood shadow-sm'
                                                    : 'text-gray-500 hover:text-gray-700'
                                                    }`}
                                            >
                                                {t}mm
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Fixed Quote Footer */}
                    <div className="border-t border-gray-100 p-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <p className="text-xs text-gray-500">Precio Estimado</p>
                                <p className="text-2xl font-bold text-brand-dark">${totalPrice.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={handleCalculateQuote}
                                className="bg-brand-wood hover:bg-brand-dark text-white px-6 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-brand-wood/30 text-sm"
                            >
                                Cotizar Ahora
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Panel - 3D Viewer */}
                <div className="lg:sticky lg:top-24 h-[600px] bg-gray-100 rounded-2xl overflow-hidden shadow-inner border border-gray-200">
                    <ClosetViewer3D
                        width={width}
                        height={height}
                        depth={depth}
                        modules={modules}
                        melamine={selectedMaterial}
                        hasDoors={hasDoors}
                        doorsOpen={doorsOpen}
                        internalConfig={internalConfig}
                    />
                </div>
            </div>

            {/* Customer Form Modal */}
            {showCustomerForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-4">Datos de Contacto</h2>
                        <p className="text-gray-600 mb-6">Para enviarte la cotización, necesitamos tus datos:</p>

                        <form onSubmit={handleSubmitQuote} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Nombre Completo *</label>
                                <input
                                    type="text"
                                    value={customerData.name}
                                    onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-wood focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">WhatsApp *</label>
                                <input
                                    type="tel"
                                    value={customerData.whatsapp}
                                    onChange={(e) => setCustomerData({ ...customerData, whatsapp: e.target.value })}
                                    placeholder="5512345678"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-wood focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Email *</label>
                                <input
                                    type="email"
                                    value={customerData.email}
                                    onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-wood focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowCustomerForm(false)}
                                    className="flex-1 btn-secondary"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 btn-primary"
                                >
                                    Enviar Cotización
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
