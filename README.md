# Madera-Precisa

Sistema integral de carpintería CNC con catálogo B2C, configurador 3D de clósets y gestión de producción.

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+
- Python 3.9+
- MySQL (producción) o SQLite (desarrollo)

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/Carpinteria-Industrial-41.git
cd Carpinteria-Industrial-41

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend
cd ../frontend
npm install
```

### Desarrollo

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
uvicorn main:app --reload

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Abrir: http://localhost:5173

## 📁 Estructura

```
/frontend       - React + Vite + Three.js
/backend        - FastAPI + SQLAlchemy
/data           - Datos de materiales y seeds
/docs           - Documentación técnica
```

## 📖 Documentación

- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Development Guide](docs/DEVELOPMENT.md)

## 🛠️ Stack Tecnológico

- **Frontend**: React, Vite, Tailwind CSS, Three.js, React Three Fiber
- **Backend**: Python, FastAPI, SQLAlchemy
- **Database**: MySQL (producción), SQLite (desarrollo)
- **3D**: React Three Fiber, @react-three/drei
- **CNC**: DXF generation via ezdxf

## 📦 Módulos

1. **Catálogo B2C** - Tablas de picar profesionales
2. **Configurador 3D** - Clósets personalizados con cotización instantánea
3. **CRM** - Captura de leads y gestión de cotizaciones
4. **Producción** - Generación de archivos DXF y etiquetas para CNC

---

**Madera-Precisa** - Muebles CNC a Medida
