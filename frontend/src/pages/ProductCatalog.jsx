import React, { useState } from 'react';
import { FiShoppingCart, FiInfo, FiCheck } from 'react-icons/fi';
import ContactModal from '../components/ContactModal';

// Pricing Configuration
const PRICING_TIERS = {
    pino: [
        { min: 1, max: 9, price: 145 },
        { min: 10, max: 24, price: 125 },
        { min: 25, max: 49, price: 110 },
        { min: 50, max: 99, price: 95 },
        { min: 100, max: Infinity, price: 85 }
    ],
    cedro: [
        { min: 1, max: 9, price: 345 },
        { min: 10, max: 24, price: 300 },
        { min: 25, max: 49, price: 265 },
        { min: 50, max: 99, price: 225 },
        { min: 100, max: Infinity, price: 205 }
    ]
};

const PRODUCTS = [
    {
        id: 'pino',
        name: 'Tabla de Pino',
        description: 'Madera de pino de primera calidad, ideal para picar o presentar alimentos. Tono claro y veta suave.',
        image: '/assets/wood-pine.jpg',
        defaultPrice: 145,
        type: 'pino'
    },
    {
        id: 'cedro',
        name: 'Tabla de Cedro',
        description: 'Madera de cedro aromático, resistente y con un elegante tono rojizo. Acabado premium.',
        image: '/assets/wood-cedar.png', // Note: Using png as uploaded
        defaultPrice: 345,
        type: 'cedro'
    }
];

const ProductCatalog = () => {
    const [quantities, setQuantities] = useState({ pino: 1, cedro: 1 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductForModal, setSelectedProductForModal] = useState(null);

    const getPrice = (type, quantity) => {
        const tiers = PRICING_TIERS[type];
        const tier = tiers.find(t => quantity >= t.min && quantity <= t.max);
        return tier ? tier.price : tiers[0].price;
    };

    const handleQuantityChange = (id, val) => {
        const newQty = Math.max(1, parseInt(val) || 1);
        setQuantities(prev => ({ ...prev, [id]: newQty }));
    };

    const handleOrderClick = (product) => {
        const qty = quantities[product.id];
        const price = getPrice(product.type, qty);
        setSelectedProductForModal({
            ...product,
            quantity: qty,
            unitPrice: price,
            total: price * qty
        });
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-brand-light py-12">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Accesorios de Cocina</h1>
                    <p className="text-lg text-brand-dark/60 max-w-2xl mx-auto">
                        Tablas de corte y presentación fabricadas con madera selecta.
                        <br />
                        <span className="text-brand-accent font-semibold">Precios especiales por volumen para distribuidores y restaurantes.</span>
                    </p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {PRODUCTS.map((product) => {
                        const qty = quantities[product.id];
                        const currentPrice = getPrice(product.type, qty);
                        const nextTier = PRICING_TIERS[product.type].find(t => t.min > qty);

                        return (
                            <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-brand-accent/10 flex flex-col">
                                {/* Image Area */}
                                <div className="h-64 overflow-hidden relative group">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <h2 className="text-2xl font-bold text-brand-dark mb-2">{product.name}</h2>
                                    <p className="text-brand-dark/70 text-sm mb-6 flex-grow">{product.description}</p>

                                    {/* Pricing Configurator */}
                                    <div className="bg-brand-light/50 p-4 rounded-xl mb-6 border border-brand-accent/10">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-sm font-semibold text-brand-dark">Cantidad:</label>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, qty - 1)}
                                                    className="w-8 h-8 rounded-full bg-brand-dark/10 hover:bg-brand-accent hover:text-white transition-colors flex items-center justify-center font-bold"
                                                >
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={qty}
                                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                                    className="w-16 text-center bg-transparent border-b border-brand-dark/20 focus:outline-none font-bold text-lg"
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(product.id, qty + 1)}
                                                    className="w-8 h-8 rounded-full bg-brand-dark/10 hover:bg-brand-accent hover:text-white transition-colors flex items-center justify-center font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-end border-t border-brand-dark/10 pt-4">
                                            <div>
                                                <p className="text-xs text-brand-dark/50">Precio Unitario</p>
                                                <p className="text-2xl font-bold text-brand-wood">${currentPrice}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-brand-dark/50">Total</p>
                                                <p className="text-xl font-bold text-brand-dark opacity-80">${(currentPrice * qty).toLocaleString()}</p>
                                            </div>
                                        </div>

                                        {/* Savings/Next Tier Hint */}
                                        {nextTier && (
                                            <div className="mt-3 text-xs text-brand-accent flex items-center gap-1 bg-brand-accent/5 p-2 rounded">
                                                <FiInfo />
                                                <span>Compra {nextTier.min} piezas para bajar a ${nextTier.price}/u</span>
                                            </div>
                                        )}
                                        {!nextTier && (
                                            <div className="mt-3 text-xs text-green-600 flex items-center gap-1 bg-green-50 p-2 rounded">
                                                <FiCheck />
                                                <span>¡Mejor precio de mayoreo aplicado!</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action */}
                                    <button
                                        onClick={() => handleOrderClick(product)}
                                        className="w-full bg-brand-wood hover:bg-brand-wood/90 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        <FiShoppingCart />
                                        Solicitar Pedido
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Pricing Tables Info */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <h3 className="text-xl font-bold text-center text-brand-dark mb-8">Tabla de Precios por Volumen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Pino Table */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-brand-accent/10">
                            <h4 className="text-lg font-bold text-brand-wood mb-4 bg-brand-light/50 p-2 rounded text-center">Tabla de Pino</h4>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-brand-dark/10">
                                        <th className="text-left py-2 text-brand-dark/60">Cantidad</th>
                                        <th className="text-right py-2 text-brand-dark/60">Precio Unitario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PRICING_TIERS.pino.map((tier, i) => (
                                        <tr key={i} className="border-b border-brand-dark/5 last:border-0 hover:bg-brand-light/30 transition-colors">
                                            <td className="py-2 text-brand-dark font-medium">
                                                {tier.min}{tier.max === Infinity ? '+' : ` - ${tier.max}`}
                                            </td>
                                            <td className="py-2 text-right font-bold text-brand-dark/80">${tier.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Cedro Table */}
                        <div className="bg-white p-6 rounded-xl shadow-md border border-brand-accent/10">
                            <h4 className="text-lg font-bold text-brand-wood mb-4 bg-brand-light/50 p-2 rounded text-center">Tabla de Cedro</h4>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-brand-dark/10">
                                        <th className="text-left py-2 text-brand-dark/60">Cantidad</th>
                                        <th className="text-right py-2 text-brand-dark/60">Precio Unitario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PRICING_TIERS.cedro.map((tier, i) => (
                                        <tr key={i} className="border-b border-brand-dark/5 last:border-0 hover:bg-brand-light/30 transition-colors">
                                            <td className="py-2 text-brand-dark font-medium">
                                                {tier.min}{tier.max === Infinity ? '+' : ` - ${tier.max}`}
                                            </td>
                                            <td className="py-2 text-right font-bold text-brand-dark/80">${tier.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>

            <ContactModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProductForModal}
            />
        </div>
    );
};

export default ProductCatalog;
