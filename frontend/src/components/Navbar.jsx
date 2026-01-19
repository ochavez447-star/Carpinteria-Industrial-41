import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

export default function Navbar() {
    return (
        <nav className="bg-brand-light/95 backdrop-blur-md sticky top-0 z-50 border-b border-brand-border/50 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-24 gap-8">

                    {/* Logo - Left */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                        <div className="bg-brand-dark/5 p-2 rounded-lg border border-brand-accent/20 group-hover:bg-brand-dark/10 transition-all duration-300">
                            <img src="/assets/logo.png" alt="Madera Precisa" className="h-14 w-auto object-contain filter brightness-100" />
                        </div>
                    </Link>

                    {/* Search Bar - Center */}
                    <div className="hidden md:block flex-1 max-w-xl relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiSearch className="text-brand-accent/60 text-lg group-focus-within:text-brand-accent transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-12 pr-4 py-3 bg-white border border-brand-border rounded-full text-brand-dark placeholder-brand-dark/40 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all shadow-inner"
                            placeholder="Buscar en catálogo..."
                        />
                    </div>

                    {/* Navigation & Actions - Right */}
                    <div className="flex items-center gap-8">
                        {/* Desktop Links */}
                        <div className="hidden lg:flex items-center gap-6 text-sm font-medium tracking-wide">
                            <Link to="/" className="text-brand-dark hover:text-brand-accent font-semibold tracking-wide hover:-translate-y-0.5 transition-all">INICIO</Link>
                            <Link to="/vestidores" className="text-brand-dark hover:text-brand-accent font-semibold tracking-wide hover:-translate-y-0.5 transition-all">VESTIDORES</Link>
                            <Link to="/productos" className="text-brand-dark hover:text-brand-accent font-semibold tracking-wide hover:-translate-y-0.5 transition-all text-center leading-tight">
                                ACCESORIOS<br />DE COCINA
                            </Link>
                            <Link to="/otros-productos" className="text-brand-dark hover:text-brand-accent font-semibold tracking-wide hover:-translate-y-0.5 transition-all">OTROS</Link>
                            <Link to="/configurador" className="px-5 py-2 bg-brand-wood hover:bg-brand-wood/90 text-white rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                DISEÑAR CLÓSET
                            </Link>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-5 border-l border-white/10 pl-6">
                            <button className="flex flex-col items-center gap-1 text-brand-dark/70 hover:text-brand-accent transition-colors group">
                                <FaUser className="text-xl group-hover:-translate-y-0.5 transition-transform" />
                                <span className="text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-5">Cuenta</span>
                            </button>
                            <button className="flex flex-col items-center gap-1 text-brand-dark/70 hover:text-brand-accent transition-colors relative group">
                                <div className="relative">
                                    <FaShoppingCart className="text-xl group-hover:-translate-y-0.5 transition-transform" />
                                    <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-accent text-brand-dark text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">0</span>
                                </div>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button className="lg:hidden p-2 text-brand-dark hover:text-brand-accent transition-colors">
                            <FaBars className="text-2xl" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
