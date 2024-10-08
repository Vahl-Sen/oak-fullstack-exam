from sqlalchemy import Column, Integer, Float, String
from database import Base

# Items Table
class Items(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    price = Column(Float)