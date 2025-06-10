# backend/app/crud.py

from sqlalchemy.orm import Session
from . import models, schemas

# === READ ===
def get_hero(db: Session, hero_id: int):
    return db.query(models.Hero).filter(models.Hero.id == hero_id).first()

def get_heroes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Hero).offset(skip).limit(limit).all()

def get_hero_by_name(db: Session, name: str):
    return db.query(models.Hero).filter(models.Hero.name == name).first()

# === CREATE ===
def create_hero(db: Session, hero: schemas.HeroCreate):
    db_hero = models.Hero(**hero.model_dump())
    db.add(db_hero)
    db.commit()
    db.refresh(db_hero)
    return db_hero

# === UPDATE ===
def update_hero(db: Session, hero_id: int, hero_update: schemas.HeroUpdate):
    db_hero = get_hero(db, hero_id)
    if not db_hero:
        return None
    
    update_data = hero_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_hero, key, value)
        
    db.add(db_hero)
    db.commit()
    db.refresh(db_hero)
    return db_hero

# === DELETE ===
def delete_hero(db: Session, hero_id: int):
    db_hero = get_hero(db, hero_id)
    if not db_hero:
        return None
    
    db.delete(db_hero)
    db.commit()
    return db_hero