import { useState } from 'react';
import { FaLock, FaSearch, FaDownload, FaEye } from 'react-icons/fa';

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // Placeholder data
    const quotes = [
        { id: 101, date: '2023-10-25', client: 'Juan Pérez', total: 14500, status: 'Pendiente' },
        { id: 102, date: '2023-10-24', client: 'Ana García', total: 22100, status: 'Aprobado' },
        { id: 103, date: '2023-10-23', client: 'Restaurante El Fogón', total: 3500, status: 'Entregado' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123' || password === 'changeme123') {
            setIsAuthenticated(true);
        } else {
            alert('Contraseña incorrecta');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-light px-4">
                <div className="card w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-brand-dark">Panel Administrativo</h1>
                        <p className="text-gray-600">Acceso restringido</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Contraseña</label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="password"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-wood focus:border-transparent"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button type="submit" className="w-full btn-primary">
                            Ingresar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-brand-dark">Gestión de Pedidos</h1>
                <div className="flex gap-2">
                    <div className="relative">
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar cliente..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-wood focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {quotes.map((quote) => (
                                <tr key={quote.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{quote.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quote.date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{quote.client}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${quote.total.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${quote.status === 'Aprobado' ? 'bg-green-100 text-green-800' :
                                                quote.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {quote.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex gap-3">
                                            <button className="text-blue-600 hover:text-blue-900" title="Ver Detalles">
                                                <FaEye />
                                            </button>
                                            <button className="text-brand-wood hover:text-brand-accent" title="Descargar DXF">
                                                <FaDownload />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
