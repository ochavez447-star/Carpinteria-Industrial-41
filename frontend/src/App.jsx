import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ClosetConfigurator from './pages/ClosetConfigurator';
import ProductCatalog from './pages/ProductCatalog';
import AdminDashboard from './pages/AdminDashboard';
import Vestidores from './pages/Vestidores';
import OtherProducts from './pages/OtherProducts';
import AcrylicConfigurator from './pages/AcrylicConfigurator';
import SalesConfigurator from './pages/SalesConfigurator';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-brand-light flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/configurador" element={<ClosetConfigurator />} />
            <Route path="/configurador-ventas" element={<SalesConfigurator />} />
            <Route path="/productos" element={<ProductCatalog />} />
            <Route path="/vestidores" element={<Vestidores />} />
            <Route path="/otros-productos" element={<OtherProducts />} />
            <Route path="/otros-productos/vitrinas-acrilico" element={<AcrylicConfigurator />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </BrowserRouter>
  );
}

export default App;
