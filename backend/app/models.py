# backend/app/models.py

from sqlalchemy import Column, Integer, String, Text, Float
from .database import Base

class Hero(Base):
    __tablename__ = "heroes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    birth_year = Column(Integer)
    death_year = Column(Integer)
    description = Column(Text)
    image_url = Column(String)

    image_pos_x = Column(Float, default=50.0)
    image_pos_y = Column(Float, default=50.0)