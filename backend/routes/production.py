from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from database import get_db
from models import Quote
from optimiza_corte import OptimizadorMecatronicoFinal
from routes.calculator import generate_pieces
import os
import zipfile
import io

router = APIRouter()

SHEET_WIDTH = 1220
SHEET_HEIGHT = 2440
KERF = 3

@router.post("/generate/{quote_id}")
def generate_production_files(quote_id: int, db: Session = Depends(get_db)):
    quote = db.query(Quote).filter(Quote.id == quote_id).first()
    if not quote:
        raise HTTPException(status_code=404, detail="Quote not found")
        
    pieces = generate_pieces(
        quote.width, quote.height, quote.depth, quote.modules, quote.thickness
    )
    
    output_dir = f"generated/quote_{quote_id}"
    os.makedirs(output_dir, exist_ok=True)
    
    optimizer = OptimizadorMecatronicoFinal(SHEET_WIDTH, SHEET_HEIGHT, KERF, output_dir)
    optimizer.cargar_desde_lista(pieces)
    optimizer.ejecutar_nesting()
    generated_files = optimizer.exportar_todo(prefix=f"p{quote_id}")
    
    # Create a ZIP file
    zip_filename = f"generated/produccion_proyecto_{quote_id}.zip"
    with zipfile.ZipFile(zip_filename, 'w') as zipf:
        for file in generated_files:
            zipf.write(file, os.path.basename(file))
            
    return {"message": "Files generated", "download_url": f"/files/produccion_proyecto_{quote_id}.zip"}
