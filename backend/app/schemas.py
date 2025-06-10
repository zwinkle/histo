# backend/app/schemas.py

from pydantic import BaseModel, ConfigDict
from typing import Optional

# Schema dasar untuk data pahlawan
class HeroBase(BaseModel):
    name: str
    description: Optional[str] = None
    birth_year: Optional[int] = None
    death_year: Optional[int] = None
    image_url: Optional[str] = None
    image_pos_x: Optional[float] = 50.0
    image_pos_y: Optional[float] = 50.0

# Schema untuk membuat pahlawan baru (digunakan di endpoint POST)
class HeroCreate(HeroBase):
    pass

# Schema untuk mengupdate pahlawan (semua field opsional)
class HeroUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    birth_year: Optional[int] = None
    death_year: Optional[int] = None
    image_url: Optional[str] = None
    image_pos_x: Optional[float] = 50.0
    image_pos_y: Optional[float] = 50.0

# Schema untuk membaca data pahlawan (digunakan di endpoint GET)
class Hero(HeroBase):
    id: int

    model_config = ConfigDict(from_attributes=True)