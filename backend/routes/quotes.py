from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Quote, Lead
from schemas import QuoteCreate, QuoteResponse, LeadCreate, LeadResponse

router = APIRouter()

@router.post("/quotes", response_model=QuoteResponse)
def create_quote(quote: QuoteCreate, db: Session = Depends(get_db)):
    db_quote = Quote(
        customer_name=quote.name,
        customer_whatsapp=quote.whatsapp,
        customer_email=quote.email,
        width=quote.width,
        height=quote.height,
        depth=quote.depth,
        modules=quote.modules,
        melamine_id=quote.melamine_id,
        thickness=quote.thickness,
        material_cost=quote.material_cost,
        hardware_cost=quote.hardware_cost,
        total_price=quote.total_price,
        config_json=quote.config_json
    )
    db.add(db_quote)
    db.commit()
    db.refresh(db_quote)
    return db_quote

@router.get("/quotes", response_model=List[QuoteResponse])
def read_quotes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # In a real app, verify admin authentication here
    quotes = db.query(Quote).order_by(Quote.created_at.desc()).offset(skip).limit(limit).all()
    
    # Map fields to match schema if names differ (CustomerBase vs DB columns)
    # Pydantic's from_attributes handles direct mapping if names match, 
    # but here we flattened customer info in DB models.
    # Manual mapping might be needed if Pydantic doesn't inference flattened fields.
    # Actually, let's fix the Response schema or Model to match. 
    # For simplicity, we'll construct the response list manually or rely on mapping aliases if we configured them.
    
    # Let's simpler: update the response objects
    results = []
    for q in quotes:
        results.append(QuoteResponse(
            id=q.id,
            name=q.customer_name,
            whatsapp=q.customer_whatsapp,
            email=q.customer_email,
            width=q.width,
            height=q.height,
            depth=q.depth,
            modules=q.modules,
            melamine_id=q.melamine_id,
            thickness=q.thickness,
            material_cost=q.material_cost,
            hardware_cost=q.hardware_cost,
            total_price=q.total_price,
            status=q.status,
            created_at=q.created_at,
            config_json=q.config_json
        ))
    return results

@router.post("/leads", response_model=LeadResponse)
def create_lead(lead: LeadCreate, db: Session = Depends(get_db)):
    db_lead = Lead(
        customer_name=lead.name,
        customer_whatsapp=lead.whatsapp,
        customer_email=lead.email,
        product_interest=lead.product_interest,
        notes=lead.notes
    )
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    
    # Adapt to response schema
    return LeadResponse(
        id=db_lead.id,
        name=db_lead.customer_name,
        whatsapp=db_lead.customer_whatsapp,
        email=db_lead.customer_email,
        product_interest=db_lead.product_interest,
        notes=db_lead.notes,
        created_at=db_lead.created_at
    )
