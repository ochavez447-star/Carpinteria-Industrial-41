from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
try:
    from backend.database import engine, Base
except ImportError:
    from database import engine, Base
import os
from dotenv import load_dotenv

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Madera Precisa API", version="1.0.0")

# Configure CORS
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://madera-precisa.com",
    "https://www.madera-precisa.com",
    "https://*.onrender.com",  # Allow Render previews
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure generated directory exists
os.makedirs("generated", exist_ok=True)

# Mount static files for generated DXF/PDFs
app.mount("/files", StaticFiles(directory="generated"), name="files")

# Import and include routers
try:
    from backend.routes import quotes, calculator, production
except ImportError:
    from routes import quotes, calculator, production
app.include_router(quotes.router, prefix="/api/quotes", tags=["quotes"])
app.include_router(calculator.router, prefix="/api/calculate", tags=["calculator"])
app.include_router(production.router, prefix="/api/production", tags=["production"])

@app.get("/")
def read_root():

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
