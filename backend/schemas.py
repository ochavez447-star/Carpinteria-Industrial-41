from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from datetime import datetime

# Shared properties
class CustomerBase(BaseModel):
    name: str
    whatsapp: str
    email: EmailStr

# --- Quote Schemas ---
class QuoteCreate(CustomerBase):
    width: int
    height: int
    depth: int
    modules: int
    melamine_id: str
    thickness: int
    
    material_cost: float
    hardware_cost: float
    total_price: float
    
    config_json: Optional[Dict[str, Any]] = None

class QuoteResponse(QuoteCreate):
    id: int
    status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Lead Schemas ---
class LeadCreate(CustomerBase):
    product_interest: str
    notes: Optional[str] = None

class LeadResponse(LeadCreate):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

# --- Calculation Schemas ---
class CalculationRequest(BaseModel):
    width: int
    height: int
    depth: int
    modules: int
    melamine_id: str
    thickness: int

class CalculationResponse(BaseModel):
    material_cost: float
    hardware_cost: float
    total_price: float
    details: Dict[str, Any]
