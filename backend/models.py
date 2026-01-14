from sqlalchemy import Column, Integer, String, Float, DateTime, Text, JSON
from sqlalchemy.sql import func
try:
    from backend.database import Base
except ImportError:
    from database import Base

class Quote(Base):
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(255), index=True)
    customer_whatsapp = Column(String(50))
    customer_email = Column(String(255))
    
    # Dimensions (stored in mm)
    width = Column(Integer)
    height = Column(Integer)
    depth = Column(Integer)
    modules = Column(Integer)
    
    # Material
    melamine_id = Column(String(100))
    thickness = Column(Integer)
    
    # Financials
    material_cost = Column(Float)
    hardware_cost = Column(Float)
    total_price = Column(Float)
    
    # Status
    status = Column(String(50), default="pending")  # pending, approved, production, completed
    
    # Metadata
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Store full configuration details if needed
    config_json = Column(JSON, nullable=True)

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(255))
    customer_whatsapp = Column(String(50))
    customer_email = Column(String(255))
    product_interest = Column(String(200))
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
