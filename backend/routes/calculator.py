from fastapi import APIRouter, HTTPException, Depends
from schemas import CalculationRequest, CalculationResponse
from optimiza_corte import OptimizadorMecatronicoFinal
import os

router = APIRouter()

# Constants
SHEET_WIDTH = 1220
SHEET_HEIGHT = 2440
KERF = 3  # Blade thickness in mm

# Mock database for material prices (in a real app, from DB)
MATERIAL_PRICES = {
    "roble_nordico": {15: 1250.00, 18: 1450.00},
    "blanco_oslo": {15: 1100.00, 18: 1300.00},
    "nogal_terracota": {15: 1350.00, 18: 1550.00},
    "gris_humo": {15: 1150.00, 18: 1350.00}
}
HARDWARE_BASE_COST = 450
HARDWARE_PER_MODULE = 120
HARDWARE_PER_METER = 25

def generate_pieces(width, height, depth, modules, thickness):
    """
    Decomposes closet dimensions into cut pieces.
    """
    pieces = []
    
    # 1. External Structure
    # Sides (2)
    pieces.append({'id': 1, 'w': depth, 'h': height, 'qty': 2, 'desc': 'Lateral'})
    # Top/Bottom (2) - Full width
    pieces.append({'id': 2, 'w': depth, 'h': width - (2 * thickness), 'qty': 2, 'desc': 'Techo/Piso'})
    
    # 2. Internal Dividers
    # Vertical dividers (modules - 1)
    internal_height = height - (2 * thickness)
    internal_depth = depth - 20 # Sligthly recessed
    if modules > 1:
        pieces.append({'id': 3, 'w': internal_depth, 'h': internal_height, 'qty': modules - 1, 'desc': 'División Vertical'})
        
    # 3. Shelves
    # Calculate internal width of each module
    # Total internal width = Width - (2 * Side Thickness) - ((Modules - 1) * Divider Thickness)
    total_internal_width = width - (2 * thickness) - ((modules - 1) * thickness)
    module_width = total_internal_width / modules
    
    # 3 shelves per module
    pieces.append({'id': 4, 'w': internal_depth, 'h': module_width, 'qty': modules * 3, 'desc': 'Entrepaño'})
    
    # 4. Doors (Sliding)
    # Typically 2 or 3 doors. if width > 2000 probably 3 doors? 
    # Let's simple rule: 2 doors for width < 2500, 3 for >= 2500
    num_doors = 3 if width >= 2500 else 2
    door_width = (width / num_doors) + 50 # Overlap
    pieces.append({'id': 5, 'w': door_width, 'h': height - 50, 'qty': num_doors, 'desc': 'Puerta'})
    
    return pieces

@router.post("/", response_model=CalculationResponse)
async def calculate_price(request: CalculationRequest):
    try:
        # 1. Get material price
        mat_prices = MATERIAL_PRICES.get(request.melamine_id)
        if not mat_prices:
            raise HTTPException(status_code=400, detail="Material not found")
        
        sheet_price = mat_prices.get(request.thickness)
        if not sheet_price:
            raise HTTPException(status_code=400, detail="Thickness not available")
            
        # 2. Generate pieces list
        pieces = generate_pieces(
            request.width, 
            request.height, 
            request.depth, 
            request.modules, 
            request.thickness
        )
        
        # 3. Run optimization
        # We use a temporary directory for output (or null if we handle it) but script creates files.
        # For calculation we only need sheet count, so we can point to a temp dir and ignore files, 
        # or rely on our refactor that 'exportar_todo' is optional.
        
        optimizer = OptimizadorMecatronicoFinal(SHEET_WIDTH, SHEET_HEIGHT, KERF, "./generated/temp")
        optimizer.cargar_desde_lista(pieces)
        optimizer.ejecutar_nesting()
        sheets_needed = optimizer.get_sheet_count()
        
        # 4. Calculate Costs
        material_cost = sheets_needed * sheet_price
        
        hardware_cost = HARDWARE_BASE_COST + \
                        (request.modules * HARDWARE_PER_MODULE) + \
                        ((request.height / 1000) * HARDWARE_PER_METER)
                        
        total_price = (material_cost * 2.5) + hardware_cost
        
        return {
            "material_cost": round(material_cost, 2),
            "hardware_cost": round(hardware_cost, 2),
            "total_price": round(total_price, 2),
            "details": {
                "sheets_count": sheets_needed,
                "sheet_price": sheet_price,
                "pieces_count": sum(p['qty'] for p in pieces)
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
