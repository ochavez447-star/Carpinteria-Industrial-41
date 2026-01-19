import React from 'react';
import { FiInstagram, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-brand-secondary border-t border-brand-accent/20 pt-12 pb-6 text-brand-dark">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

                    {/* Brand & Social */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="text-2xl font-bold text-brand-accent mb-2 tracking-wider">MADERA PRECISA</h2>
                        <p className="text-sm text-gray-800 mb-6 max-w-xs">
                            Muebles CNC a medida con precisión milimétrica y acabados premium.
                        </p>
                        <a
                            href="https://www.instagram.com/madera.precisa?igsh=c2ZrMjlwZzU1cHMx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-gray-900 hover:text-brand-accent transition-colors border border-brand-accent/30 rounded-full px-4 py-2 hover:bg-brand-accent/10"
                        >
                            <FiInstagram className="text-xl" />
                            <span>Síguenos en Instagram</span>
                        </a>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-lg font-semibold text-brand-accent mb-4 border-b border-brand-accent/30 pb-1 inline-block">Contacto</h3>
                        <ul className="space-y-4 text-sm text-gray-800">
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <FaWhatsapp className="text-brand-accent text-lg flex-shrink-0" />
                                <a href="https://wa.me/5585814258" target="_blank" rel="noopener noreferrer" className="hover:text-brand-accent transition-colors">
                                    55-8581-4258
                                </a>
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <FiPhone className="text-brand-accent text-lg flex-shrink-0" />
                                <a href="tel:5585814258" className="hover:text-brand-accent transition-colors">
                                    55-8581-4258
                                </a>
                            </li>
                            <li className="flex items-center gap-3 justify-center md:justify-start">
                                <FiMail className="text-brand-accent text-lg flex-shrink-0" />
                                <a href="mailto:contacto@madera-precisa.com" className="hover:text-brand-accent transition-colors">
                                    contacto@madera-precisa.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <h3 className="text-lg font-semibold text-brand-accent mb-4 border-b border-brand-accent/30 pb-1 inline-block">Ubicación</h3>
                        <div className="flex gap-3 justify-center md:justify-start text-sm text-gray-800">
                            <FiMapPin className="text-brand-accent text-xl flex-shrink-0 mt-1" />
                            <p className="max-w-xs leading-relaxed">
                                Castilla #6281 esquina con Villa Alegre.<br />
                                Col. Villa Alegre,<br />
                                Monterrey, Nuevo León.
                            </p>
                        </div>

                        {/* Map Link (Optional) */}
                        <a
                            href="https://maps.google.com/?q=Castilla+6281+Villa+Alegre+Monterrey"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 text-xs text-brand-accent hover:underline flex items-center gap-1"
                        >
                            Ver en Google Maps &rarr;
                        </a>
                    </div>

                </div>

                {/* Copyright */}
                <div className="border-t border-brand-accent/10 pt-6 text-center text-xs text-gray-700">
                    <p>&copy; {new Date().getFullYear()} Madera Precisa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
