
import { useState, useRef } from 'react';
import { FaRuler, FaTh, FaPalette, FaFileInvoiceDollar, FaCheck, FaDownload, FaSpinner } from 'react-icons/fa';
import SalesViewer3D from '../components/SalesViewer3D';
import materialsData from '../../../data/materials.json';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import toast from 'react-hot-toast';

export default function SalesConfigurator() {
    const [step, setStep] = useState(1);
    const [activeWall, setActiveWall] = useState('A'); // 'A' (Main) or 'B' (Side)
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const [clientName, setClientName] = useState('');
    const viewerRef = useRef(null); // Ref for capturing 3D view

    const [config, setConfig] = useState({
        layout: 'linear', // linear, L, U
        width: 2400,
        widthB: 1800, // Secondary wall
        height: 2400,
        depth: 600,
        modules: 3,
        melamine: materialsData.melamine[0], // Default first material
        internal: {} // Internal distribution
    });

    // Steps definition
    const steps = [
        { id: 1, label: 'Espacio', icon: FaRuler },
        { id: 2, label: 'Distribución', icon: FaTh },
        { id: 3, label: 'Estilo', icon: FaPalette },
        { id: 4, label: 'Cotización', icon: FaFileInvoiceDollar },
    ];

    const updateDimension = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: parseInt(value) }));
    };

    const calculateTotal = () => {
        // Base Calculation
        const moduleBasePrice = 3500;
        const totalModulesA = config.modules;
        const totalModulesB = (config.layout === 'L' || config.layout === 'U') ? Math.floor(config.widthB / 800) + 1 : 0;

        let total = (totalModulesA + totalModulesB) * moduleBasePrice;

        // Add-ons
        Object.values(config.internal).forEach(type => {
            if (type === 'drawers') total += 1800;
            if (type === 'vitrina') total += 4500;
        });

        // Height factor
        if (config.height > 2400) total += 2000;

        return total;
    };

    const handleExportPDF = async () => {
        if (!clientName) {
            toast.error("Por favor ingresa el nombre del cliente");
            return;
        }

        setIsGeneratingPdf(true);
        const toastId = toast.loading('Generando cotización...');

        try {
            // 1. Capture 3D View
            // We need to wait a moment for the canvas to be ready or just capture existing
            const canvas = await html2canvas(viewerRef.current, {
                useCORS: true,
                scale: 2 // Higher resolution
            });
            const imgData = canvas.toDataURL('image/png');

            // 2. Create PDF
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();

            // Header
            doc.setFillColor(74, 55, 40); // Brand Wood Color
            doc.rect(0, 0, pageWidth, 40, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.text("Cotización de Proyecto", 20, 20);
            doc.setFontSize(12);
            doc.text("Madera Precisa - Carpintería Industrial", 20, 30);

            // Client Info
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.text(`Cliente: ${clientName} `, 20, 55);
            doc.text(`Fecha: ${new Date().toLocaleDateString()} `, 20, 62);

            // 3D Render Image
            const imgWidth = pageWidth - 40;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            doc.addImage(imgData, 'PNG', 20, 70, imgWidth, imgHeight);

            // Details Section
            let yPos = 70 + imgHeight + 10;
            doc.setFontSize(16);
            doc.text("Detalles del Diseño", 20, yPos);
            yPos += 10;

            doc.setFontSize(11);
            doc.setTextColor(80, 80, 80);
            const details = [
                `Layout: ${config.layout === 'linear' ? 'Lineal' : config.layout === 'L' ? 'En L' : 'En U'} `,
                `Medidas: ${config.width} mm(A) ${config.layout !== 'linear' ? `x ${config.widthB}mm (B)` : ''} x ${config.height} mm(H)`,
                `Material: ${config.melamine.name} `,
                `Módulos Totales: ${config.modules + ((config.layout === 'L' || config.layout === 'U') ? Math.floor(config.widthB / 800) + 1 : 0)} `,
            ];

            details.forEach(line => {
                doc.text(`• ${line} `, 25, yPos);
                yPos += 7;
            });

            // Pricing
            yPos += 10;
            doc.setFillColor(245, 245, 245);
            doc.rect(20, yPos, pageWidth - 40, 30, 'F');
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(14);
            doc.text("Total Estimado", 30, yPos + 12);
            doc.setFontSize(20);
            doc.setTextColor(74, 55, 40);
            doc.text(`$${calculateTotal().toLocaleString()} MXN`, pageWidth - 80, yPos + 12);
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text("*Precios sujetos a cambio. Incluye IVA.", 30, yPos + 22);

            // Footer
            doc.setFontSize(9);
            doc.setTextColor(150, 150, 150);
            doc.text("Generado con el Configurador 3D de Madera Precisa", pageWidth / 2, 280, { align: 'center' });

            doc.save(`Cotizacion_${clientName.replace(/\s+/g, '_')}.pdf`);
            toast.success('PDF descargado correctamente', { id: toastId });
        } catch (error) {
            console.error(error);
            toast.error('Error al generar PDF', { id: toastId });
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col">
            {/* Header / Stepper */}
            <div className="bg-white border-b border-gray-200 sticky top-[72px] z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex space-x-12">
                            {steps.map((s) => (
                                <div
                                    key={s.id}
                                    className={`flex items - center gap - 3 ${step === s.id ? 'text-brand-wood' : step > s.id ? 'text-green-600' : 'text-gray-400'} `}
                                >
                                    <div className={`w - 8 h - 8 rounded - full flex items - center justify - center font - bold border - 2
                                        ${step === s.id ? 'border-brand-wood bg-brand-wood/10' :
                                            step > s.id ? 'border-green-600 bg-green-50' : 'border-gray-300 bg-gray-50'
                                        } `}
                                    >
                                        {step > s.id ? <FaCheck size={12} /> : s.id}
                                    </div>
                                    <span className="font-medium hidden md:block">{s.label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4">
                            <span className="text-sm font-bold text-gray-500">Total Estimado:</span>
                            <span className="text-xl font-bold text-brand-dark">${calculateTotal().toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Split */}
            <div className="flex-1 max-w-7xl mx-auto w-full p-4 grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* 3D Viewer (Always Visible, Larger on Desktop) */}
                <div ref={viewerRef} className="lg:col-span-8 h-[400px] lg:h-auto bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden relative order-1 lg:order-2">
                    <SalesViewer3D
                        layout={config.layout}
                        dimensions={{ width: config.width, widthB: config.widthB, height: config.height, depth: config.depth }}
                        modules={config.modules}
                        melamine={config.melamine}
                        internalConfig={config.internal}
                    />

                    {/* Floating Controls for 3D */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-gray-600 shadow-sm border border-gray-200">
                        Vista Previa: {config.layout === 'linear' ? 'Muro Recto' : config.layout === 'L' ? 'En L' : 'En U'}
                    </div>
                </div>

                {/* Controls Panel (Left Side) */}
                <div className="lg:col-span-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col order-2 lg:order-1 h-fit">
                    <h2 className="text-xl font-bold text-brand-dark mb-6 border-b border-gray-100 pb-4">
                        {steps.find(s => s.id === step).label}
                    </h2>

                    {/* Step 1: Espacio */}
                    {step === 1 && (
                        <div className="space-y-8 animate-fadeIn">
                            {/* Layout Selector */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Forma del Closet</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { id: 'linear', label: 'Lineal' },
                                        { id: 'L', label: 'En L' },
                                        { id: 'U', label: 'En U' }
                                    ].map(type => (
                                        <button
                                            key={type.id}
                                            onClick={() => setConfig(prev => ({ ...prev, layout: type.id }))}
                                            className={`py - 3 px - 2 rounded - lg text - sm font - medium border - 2 transition - all block text - center
                                                ${config.layout === type.id
                                                    ? 'border-brand-wood bg-brand-wood/5 text-brand-wood'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                                } `}
                                        >
                                            {type.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dimensions */}
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">Medidas Generales</label>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs text-gray-500">Largo A (Principal)</span>
                                        <span className="text-xs font-bold">{config.width} mm</span>
                                    </div>
                                    <input type="range" min="1000" max="4000" step="50"
                                        value={config.width}
                                        onChange={(e) => updateDimension('width', e.target.value)}
                                        className="w-full accent-brand-wood h-2 bg-gray-200 rounded-lg"
                                    />
                                </div>

                                {/* Width B specific for L/U shapes */}
                                {(config.layout === 'L' || config.layout === 'U') && (
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-xs text-gray-500">Largo B (Lateral)</span>
                                            <span className="text-xs font-bold">{config.widthB} mm</span>
                                        </div>
                                        <input type="range" min="1000" max="3000" step="50"
                                            value={config.widthB}
                                            onChange={(e) => updateDimension('widthB', e.target.value)}
                                            className="w-full accent-brand-wood h-2 bg-gray-200 rounded-lg"
                                        />
                                    </div>
                                )}

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs text-gray-500">Altura</span>
                                        <span className="text-xs font-bold">{config.height} mm</span>
                                    </div>
                                    <input type="range" min="2000" max="3000" step="50"
                                        value={config.height}
                                        onChange={(e) => updateDimension('height', e.target.value)}
                                        className="w-full accent-brand-wood h-2 bg-gray-200 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-xs text-gray-500">Módulos (Muro A)</span>
                                        <span className="text-xs font-bold">{config.modules}</span>
                                    </div>
                                    <input type="range" min="1" max="5" step="1"
                                        value={config.modules}
                                        onChange={(e) => updateDimension('modules', e.target.value)}
                                        className="w-full accent-brand-wood h-2 bg-gray-200 rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Distribución */}
                    {step === 2 && (
                        <div className="space-y-6 animate-fadeIn h-[500px] overflow-y-auto pr-2">
                            {/* Wall Selector (Only for L/U shapes) */}
                            {(config.layout === 'L' || config.layout === 'U') && (
                                <div className="flex p-1 bg-gray-100 rounded-lg mb-4">
                                    <button
                                        onClick={() => setActiveWall('A')}
                                        className={`flex - 1 py - 2 text - sm font - bold rounded - md transition - all ${activeWall === 'A' ? 'bg-white text-brand-wood shadow-sm' : 'text-gray-500'} `}
                                    >
                                        Muro A (Principal)
                                    </button>
                                    <button
                                        onClick={() => setActiveWall('B')}
                                        className={`flex - 1 py - 2 text - sm font - bold rounded - md transition - all ${activeWall === 'B' ? 'bg-white text-brand-wood shadow-sm' : 'text-gray-500'} `}
                                    >
                                        Muro B (Lateral)
                                    </button>
                                </div>
                            )}

                            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3">
                                <div className="text-blue-500 mt-1"><FaTh /></div>
                                <div>
                                    <h4 className="text-sm font-bold text-blue-900">Configura cada módulo</h4>
                                    <p className="text-xs text-blue-700">Haz clic en un módulo para cambiar su contenido.</p>
                                </div>
                            </div>

                            {/* Module List for Active Wall */}
                            <div className="space-y-3">
                                {Array.from({ length: activeWall === 'A' ? config.modules : Math.floor(config.widthB / 800) + 1 }).map((_, i) => (
                                    <div key={i} className="border border-gray-200 rounded-xl overflow-hidden hover:border-brand-wood transition-colors bg-white shadow-sm">
                                        <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                                            <span className="text-xs font-bold text-gray-500">Módulo {i + 1}</span>
                                            <span className="text-xs font-semibold text-brand-wood bg-brand-wood/10 px-2 py-0.5 rounded">
                                                {/* Translate internal config key code to readable text */}
                                                {(config.internal[`${activeWall} -${i} `] || 'shelves') === 'shelves' ? 'Repisas' :
                                                    (config.internal[`${activeWall} -${i} `]) === 'drawers' ? 'Cajonera' :
                                                        (config.internal[`${activeWall} -${i} `]) === 'hanging_short' ? 'Colgado Doble' :
                                                            (config.internal[`${activeWall} -${i} `]) === 'hanging_long' ? 'Colgado Largo' :
                                                                (config.internal[`${activeWall} -${i} `]) === 'vitrina' ? 'Vitrina' : 'Repisas'}
                                            </span>
                                        </div>
                                        <div className="p-2 grid grid-cols-4 gap-2">
                                            {[
                                                { id: 'shelves', label: 'Repisas', icon: '☰' },
                                                { id: 'drawers', label: 'Cajones', icon: 'mn=' },
                                                { id: 'hanging_short', label: 'Doble', icon: 'H' }, // Using text icons for simplicity or import specific ones
                                                { id: 'hanging_long', label: 'Largo', icon: '[]' },
                                                { id: 'vitrina', label: 'Vitrina', icon: '[]' }
                                            ].map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setConfig(prev => ({
                                                        ...prev,
                                                        internal: { ...prev.internal, [`${activeWall} -${i} `]: opt.id }
                                                    }))}
                                                    className={`flex flex - col items - center justify - center py - 3 rounded - lg border transition - all ${opt.id === 'vitrina' ? 'col-span-4' : 'col-span-auto'}
                                                         ${(config.internal[`${activeWall}-${i}`] || 'shelves') === opt.id
                                                            ? 'bg-brand-wood text-white border-brand-wood shadow-md'
                                                            : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                                                        } `}
                                                >
                                                    <span className="text-lg mb-1 opacity-80">{opt.icon}</span>
                                                    <span className="text-[10px] font-medium">{opt.label} {opt.id === 'vitrina' && <span className="text-[9px] bg-yellow-100 text-yellow-800 px-1 rounded ml-1">Premium</span>}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Estilo */}
                    {step === 3 && (
                        <div className="grid grid-cols-2 gap-3 h-[400px] overflow-y-auto pr-2">
                            {materialsData.melamine.map((mat) => (
                                <button
                                    key={mat.id}
                                    onClick={() => setConfig(prev => ({ ...prev, melamine: mat }))}
                                    className={`group relative overflow - hidden rounded - xl border - 2 transition - all
                                        ${config.melamine.id === mat.id ? 'border-brand-wood ring-2 ring-brand-wood/20' : 'border-gray-200'} `}
                                >
                                    <div className="aspect-square bg-gray-100 relative">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{ backgroundColor: mat.color_hex, backgroundImage: `url(${mat.texture})` }}
                                        />
                                        {config.melamine.id === mat.id && (
                                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white">
                                                <FaCheck />
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-2 text-xs font-medium text-center truncate">{mat.name}</div>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Step 4: Cotización (Placeholder) */}
                    {step === 4 && (
                        <div className="text-center py-6 animate-fadeIn">
                            <div className="text-5xl font-bold text-brand-dark mb-2 animate-bounce-slow">${calculateTotal().toLocaleString()}</div>
                            <p className="text-gray-500 mb-8">Precio Estimado (IVA Incluido)</p>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-6 text-left">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre del Cliente / Proyecto</label>
                                <input
                                    type="text"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    placeholder="Ej. Casa Bosques - Residencia Principal"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-wood focus:border-transparent outline-none transition-all"
                                />
                                <p className="text-xs text-gray-400 mt-2">* Este nombre aparecerá en la hoja de cotización.</p>
                            </div>

                            <button
                                onClick={handleExportPDF}
                                disabled={isGeneratingPdf || !clientName}
                                className={`w - full py - 4 text - white rounded - xl font - bold shadow - lg transition - all flex items - center justify - center gap - 3
                                    ${!clientName ? 'bg-gray-300 cursor-not-allowed' :
                                        isGeneratingPdf ? 'bg-brand-wood/80 cursor-wait' : 'bg-brand-wood hover:bg-brand-dark hover:scale-[1.02]'
                                    } `}
                            >
                                {isGeneratingPdf ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                                {isGeneratingPdf ? 'Generando PDF...' : 'Descargar Cotización (PDF)'}
                            </button>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-auto pt-6 flex gap-3">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="px-6 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                Atrás
                            </button>
                        )}
                        {step < 4 && (
                            <button
                                onClick={() => setStep(s => s + 1)}
                                className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-brand-dark hover:bg-black transition-colors shadow-lg"
                            >
                                Siguiente
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

