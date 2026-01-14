import { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

export default function ContactModal({ isOpen, onClose, product, message }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        notes: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const text = message || `Hola, me interesa el producto: ${product?.name}`;
        const fullMessage = `${text}\n\nMis datos:\nNombre: ${formData.name}\nEmail: ${formData.email}\nNotas: ${formData.notes}`;

        // In a real app, you'd save this to the backend first
        console.log('Lead captured:', { ...formData, product: product?.name });

        const whatsappUrl = `https://wa.me/5215585814258?text=${encodeURIComponent(fullMessage)}`;
        window.open(whatsappUrl, '_blank');
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full relative overflow-hidden animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <FaTimes size={24} />
                </button>

                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-2">Solicitar Pedido</h2>
                    {product && <p className="text-brand-wood font-medium mb-6">{product.name}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Nombre</label>
                            <input
                                type="text"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-wood focus:border-transparent"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">WhatsApp</label>
                            <input
                                type="tel"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-wood focus:border-transparent"
                                value={formData.whatsapp}
                                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-wood focus:border-transparent"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Comentarios adicionales</label>
                            <textarea
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-wood focus:border-transparent"
                                rows="3"
                                value={formData.notes}
                                onChange={e => setFormData({ ...formData, notes: e.target.value })}
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                            <FaWhatsapp size={20} />
                            Enviar Solicitud
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
